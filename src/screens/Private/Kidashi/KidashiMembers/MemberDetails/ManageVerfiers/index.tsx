import { View, Image, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import SafeAreaWrapper from "@components/Layout/SafeAreaWrapper";
import ScreenImages from "@assets/images/screens";
import {
	Typography,
	Button,
	TextInput,
	Radio,
	PinPad,
} from "@components/Forms";
import { Row } from "@components/Layout";
import { styles } from "./style";
import Colors from "@theme/Colors";
import { scale, scaleHeight } from "@utils/Helpers";
import Divider from "@components/Miscellaneous/Divider";
import { Badge } from "@components/Cards";
import { IconButton } from "@components/Forms";
import { ModalWrapper } from "@components/Modal";
import {
	useAddVoteMutation,
	useFetchVotesMutation,
	useGenerateOtpMutation,
	useGetWomanDetailsMutation,
	useRemoveVoteMutation,
	useValidateVoteMutation,
} from "@store/apis/kidashiApi";
import { useAppSelector } from "@store/hooks";
import useToast from "@hooks/useToast";
import { DEFAULT_ERROR_MESSAGE } from "@utils/Constants";
import { useGetAccountsMutation } from "@store/apis/accountApi";

interface Verifier {
	id: string;
	name: string;
	phone: string;
	status: "PENDING" | "APPROVED" | "REJECTED";
}

interface EnterVerifierOTPModalProps {
	visible: boolean;
	onClose: () => void;
	otp: string;
	setOtp: (otp: string) => void;
	handleVerify: () => void;
	handleResend: () => void;
	handleRemove: () => void;
}

const EnterVerifierOTPModal = ({
	visible,
	onClose,
	otp,
	setOtp,
	handleVerify,
	handleResend,
	handleRemove,
}: EnterVerifierOTPModalProps) => (
	<ModalWrapper visible={visible} onClose={onClose}>
		<Row justifyContent='flex-end'>
			<Pressable onPress={onClose} hitSlop={10}>
				<Image
					source={ScreenImages.kidashiMemberDetails.closeIcon}
					style={styles.modalCloseIcon}
				/>
			</Pressable>
		</Row>

		<View style={styles.otpModalContent}>
			<View style={styles.iconsContainer}>
				<View style={styles.centerIconContainer}>
					<Image
						source={ScreenImages.kidashiMemberDetails.shieldIcon}
						style={styles.shieldIcon}
					/>
				</View>
			</View>

			<Typography title='Enter Verifier Code' style={styles.otpModalTitle} />
			<Typography
				title='Ask the selected member for their OTP and enter it below to confirm verification'
				type='body-sr'
				style={styles.otpModalSubtitle}
			/>

			<PinPad pin={otp} onInput={setOtp} codeLength={6} />

			<Button
				title='Verify'
				onPress={handleVerify}
				disabled={otp.length !== 6}
				containerStyle={styles.verifyButton}
			/>

			<Row justifyContent='space-between' containerStyle={styles.actionRow}>
				<Pressable onPress={handleResend} style={styles.actionButton}>
					<Typography
						title='Resend otp'
						type='body-sb'
						style={styles.resendText}
					/>
					<Image
						source={ScreenImages.kidashiMemberDetails.resendIcon}
						style={styles.actionIcon}
					/>
				</Pressable>

				<Pressable onPress={handleRemove} style={styles.actionButton}>
					<Image
						source={ScreenImages.kidashiMemberDetails.trashIcon}
						style={styles.actionIcon}
					/>
					<Typography
						title='Remove Verifier'
						type='body-sb'
						style={styles.removeText}
					/>
				</Pressable>
			</Row>
		</View>
	</ModalWrapper>
);

const GenerateOTPModal = ({
	visible,
	onClose,
}: {
	visible: boolean;
	onClose: () => void;
}) => {
	return (
		<ModalWrapper visible={visible} onClose={onClose}>
			<Row justifyContent='flex-end'>
				<Pressable onPress={onClose} hitSlop={10}>
					<Image
						source={ScreenImages.kidashiMemberDetails.closeIcon}
						style={styles.modalCloseIcon}
					/>
				</Pressable>
			</Row>

			<View style={styles.modalContent}>
				<Image
					source={ScreenImages.kidashiMemberDetails.verifiedIcon}
					style={styles.successIcon}
				/>

				<Typography title='OTP Generated' style={styles.modalTitle} />
				<Typography
					title="A one-time code has been sent to the member's phone. Ask them to share it with you to complete the verification"
					type='body-sr'
					style={styles.modalSubtitle}
				/>

				<Button
					title='Done'
					onPress={onClose}
					containerStyle={styles.doneButton}
				/>
			</View>
		</ModalWrapper>
	);
};

const ManageVerfiers = () => {
	const { showToast } = useToast();
	const memberDetails = useAppSelector((state) => state.kidashi.memberDetails);

	const [validateVote] = useValidateVoteMutation();
	const [addVote] = useAddVoteMutation();
	const [removeVote] = useRemoveVoteMutation();
	const [fetchVotes, { isLoading: isLoadingVotes }] = useFetchVotesMutation();
	const [generateOtp] = useGenerateOtpMutation();
	const [getAccounts] = useGetAccountsMutation();
	const [getWomanDetails] = useGetWomanDetailsMutation();
	const [showOTPModal, setShowOTPModal] = useState(false);
	const [showGenerateOTPModal, setShowGenerateOTPModal] = useState(false);
	const [refresh, setRefresh] = useState(new Date().toISOString());
	const [accountNumber, setAccountNumber] = useState<string>("");
	const [voter, setVoter] = useState<iWomanMemberDetails | null>(null);
	const [votes, setVotes] = useState<IVerifier[]>([]);
	const [vote, setVote] = useState<IVerifier | null>(null);
	const [otp, setOtp] = useState<string>("");

	const fetchVoter = async (id: string) => {
		try {
			const { status, message, data } = await getWomanDetails({
				cba_customer_id: id,
			}).unwrap();

			if (status) {
				setVoter(data as iWomanMemberDetails);
				return;
			}
			showToast("danger", message);
		} catch (error: any) {
			showToast("danger", error.data.message || DEFAULT_ERROR_MESSAGE);
		}
	};

	const fetchAccounts = async () => {
		try {
			const { status, message, data } = await getAccounts({
				account_number: accountNumber,
			}).unwrap();

			if (status) {
				const account = data[0] as unknown as iWomanAccount;
				fetchVoter(account.customer_id);
			} else {
				showToast("danger", message || DEFAULT_ERROR_MESSAGE);
			}
		} catch (error: any) {
			showToast(
				"danger",
				error.message || error.data.message || DEFAULT_ERROR_MESSAGE
			);
		}
	};

	const getOtp = async () => {
		try {
			const { status, message } = await generateOtp({
				purpose: "VOTER_VALIDATION",
				recipient: voter?.mobile_number || "",
				subject_id: voter?.mobile_number || "",
				channel: "sms",
			}).unwrap();

			if (status) {
				setShowGenerateOTPModal(true);
			} else {
				showToast("danger", message);
			}
		} catch (error: ErrorResponse | any) {
			showToast(
				"danger",
				error.data?.message || error.message || DEFAULT_ERROR_MESSAGE
			);
		}
	};

	const retrieveVotes = async () => {
		try {
			const { status, message, data } = await fetchVotes({
				trust_circle_id: memberDetails?.trust_circle_id || "",
				candidate_member: memberDetails?.id || "",
			}).unwrap();
			if (status) {
				setVotes(data);
			} else {
				showToast("danger", message);
			}
		} catch (error: ErrorResponse | any) {
			showToast(
				"danger",
				error.data?.message || error.message || DEFAULT_ERROR_MESSAGE
			);
		}
	};

	const _validateVote = async () => {
		try {
			const { status, message } = await validateVote([
				{
					vote_id: vote?.id || "",
					otp,
				},
			]).unwrap();
			if (status) {
				getOtp();
				setRefresh(new Date().toISOString());
			} else {
				showToast("danger", message);
			}
		} catch (error: ErrorResponse | any) {
			showToast(
				"danger",
				error.data?.message || error.message || DEFAULT_ERROR_MESSAGE
			);
		}
	};

	const _addVote = async () => {
		try {
			const { status, message } = await addVote({
				vote_id: vote?.id || "",
				voter_id: voter?.id || "",
			}).unwrap();
			if (status) {
				getOtp();
				setRefresh(new Date().toISOString());
			} else {
				showToast("danger", message);
			}
		} catch (error: ErrorResponse | any) {
			showToast(
				"danger",
				error.data?.message || error.message || DEFAULT_ERROR_MESSAGE
			);
		}
	};

	const _removeVote = async () => {
		try {
			const { status, message } = await removeVote({
				vote_id: vote?.id || "",
			}).unwrap();
			if (status) {
				setRefresh(new Date().toISOString());
			} else {
				showToast("danger", message);
			}
		} catch (error: ErrorResponse | any) {
			showToast(
				"danger",
				error.data?.message || error.message || DEFAULT_ERROR_MESSAGE
			);
		}
	};

	const handleVerifierPress = (verifier: IVerifier) => {
		if (verifier.status === "PENDING") {
			setShowOTPModal(true);
			setVote(verifier);
		}
	};

	useEffect(() => {
		retrieveVotes();
	}, [refresh]);

	return (
		<SafeAreaWrapper
			canScroll
			title='Manage Verifiers'
			isLoading={isLoadingVotes}
		>
			<View style={styles.container}>
				<View style={styles.headerSection}>
					<View style={styles.iconContainer}>
						<Image
							source={ScreenImages.kidashiMemberDetails.shieldIcon}
							style={styles.headerIcon}
						/>
					</View>
					<Typography title='Manage Verifiers' style={styles.title} />
					<Typography
						title='Review and manage the members vouching for this account. You can resend OTPs or remove a voucher if needed'
						type='body-sr'
						style={styles.subtitle}
					/>
					<Row containerStyle={styles.infoBanner}>
						<Image
							source={ScreenImages.kidashiMemberDetails.infoIcon}
							style={styles.infoIcon}
						/>
						<Typography
							title='Verification requires 3 verifiers: Add more to complete.'
							type='body-sb'
							style={styles.infoText}
						/>
					</Row>
				</View>

				<Typography
					title='Search a verifier (Account Number)'
					type='body-sb'
					style={styles.searchLabel}
				/>

				<TextInput
					label='Account Number'
					value={accountNumber}
					onChangeText={setAccountNumber}
					placeholder='e.g., 0123456789 (Account no)'
					placeholderTextColor={Colors.gray["400"]}
					keyboardType='numeric'
					maxLength={10}
					rightNode={
						accountNumber ? (
							<Pressable
								onPress={fetchAccounts}
								style={styles.searchButtonContainer}
							>
								<Typography
									title='Search'
									type='body-sb'
									color={Colors.black}
								/>
								<Image
									source={ScreenImages.kidashiMemberDetails.arrowRightIcon}
									style={styles.arrowIcon}
								/>
							</Pressable>
						) : null
					}
				/>

				{voter && (
					<View style={styles.accountFoundSection}>
						<Typography
							title='Account found:'
							type='body-sb'
							style={styles.accountFoundLabel}
						/>
						<View style={styles.accountFoundCard}>
							<Row alignItems='center' justifyContent='space-between'>
								<Row alignItems='center' gap={8}>
									<Image
										source={ScreenImages.kidashiMemberDetails.infoRedIcon}
										style={styles.infoRedIcon}
									/>
									<Typography
										title={`${voter?.first_name || ""} ${voter?.surname || ""}`}
										type='body-sb'
									/>
								</Row>
								<Radio label='' value={true} onPress={() => {}} />
							</Row>
						</View>
						<Button title='Generate OTP' onPress={_addVote} />
					</View>
				)}

				<View style={styles.verifiersSection}>
					<Divider gapY={scaleHeight(16)} gapX={scale(-16)} />
					<Typography
						title='Verifiers'
						type='body-sb'
						style={styles.sectionTitle}
					/>
					<Divider gapY={scaleHeight(16)} gapX={scale(-16)} />
					{votes.map((vote) => (
						<View key={vote.id}>
							<Pressable
								style={styles.verifierItem}
								onPress={() => handleVerifierPress(vote)}
							>
								<View style={styles.avatarPlaceholder}>
									<Image
										source={ScreenImages.kidashiMemberDetails.userPlaceholder}
										style={styles.avatarPlaceholderImage}
									/>
								</View>
								<View style={styles.verifierInfo}>
									<Row alignItems='center' gap={8} justifyContent='flex-start'>
										<Typography
											title={`${vote.voter__first_name || ""} ${
												vote.voter__surname || ""
											}`}
											type='body-sb'
										/>
										{vote.status === "PENDING" ? (
											<Badge type='pending' />
										) : (
											<Image
												source={ScreenImages.kidashiMemberDetails.checkIcon}
												style={styles.checkIcon}
											/>
										)}
									</Row>
									<Typography
										title={vote.voter__mobile_number || ""}
										type='body-r'
										color={Colors.gray["600"]}
										style={styles.phoneText}
									/>
								</View>
								<Image
									source={ScreenImages.kidashiMemberDetails.chevronRightIcon}
									style={styles.chevronIcon}
								/>
							</Pressable>
							<Divider gapY={scaleHeight(16)} />
						</View>
					))}
				</View>
			</View>
			<GenerateOTPModal
				visible={showGenerateOTPModal}
				onClose={() => setShowGenerateOTPModal(false)}
			/>
			<EnterVerifierOTPModal
				visible={showOTPModal}
				onClose={() => setShowOTPModal(false)}
				otp={otp}
				setOtp={setOtp}
				handleVerify={_validateVote}
				handleResend={getOtp}
				handleRemove={_removeVote}
			/>
		</SafeAreaWrapper>
	);
};

export default ManageVerfiers;
