import { View, Image, Pressable } from "react-native";
import React, { useState } from "react";
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

interface Verifier {
	id: string;
	name: string;
	phone: string;
	status: "pending" | "verified";
}

const EnterVerifierOTPModal = ({
	visible,
	onClose,
}: {
	visible: boolean;
	onClose: () => void;
}) => {
	const [otp, setOtp] = useState("");

	const handleVerify = () => {
		if (otp.length === 6) {
			// TODO: Implement verification logic
			console.log("Verifying OTP:", otp);
			onClose();
		}
	};

	const handleResend = () => {
		// TODO: Implement resend logic
		console.log("Resending OTP");
	};

	const handleRemove = () => {
		// TODO: Implement remove verifier logic
		console.log("Removing verifier");
		onClose();
	};

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
};

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
	const [searchText, setSearchText] = useState("");
	const [foundAccount, setFoundAccount] = useState<{
		name: string;
		accountNumber: string;
	} | null>(null);
	const [showOTPModal, setShowOTPModal] = useState(false);
	const [showGenerateOTPModal, setShowGenerateOTPModal] = useState(false);

	const verifiers: Verifier[] = [
		{
			id: "1",
			name: "Aisha Bello",
			phone: "090**** 1234",
			status: "pending",
		},
		{
			id: "2",
			name: "Dorcas Danjuma",
			phone: "081**** 4321",
			status: "verified",
		},
	];

	const handleSearch = () => {
		if (searchText.trim()) {
			// Simulate finding an account
			setFoundAccount({
				name: "Kande Ibrahim",
				accountNumber: searchText,
			});
		}
	};

	const handleGenerateOTP = () => {
		setShowGenerateOTPModal(true);
	};

	const handleVerifierPress = (verifier: Verifier) => {
		if (verifier.status === "pending") {
			setShowOTPModal(true);
		}
	};

	return (
		<SafeAreaWrapper canScroll title='Manage Verifiers'>
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
					value={searchText}
					onChangeText={setSearchText}
					placeholder='e.g., 0123456789 (Account no)'
					placeholderTextColor={Colors.gray["400"]}
					keyboardType='numeric'
					rightNode={
						searchText ? (
							<Pressable
								onPress={handleSearch}
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

				{foundAccount && (
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
									<Typography title={foundAccount.name} type='body-sb' />
								</Row>
								<Radio label='' value={true} onPress={() => {}} />
							</Row>
						</View>
						<Button title='Generate OTP' onPress={handleGenerateOTP} />
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
					{verifiers.map((verifier) => (
						<View key={verifier.id}>
							<Pressable
								style={styles.verifierItem}
								onPress={() => handleVerifierPress(verifier)}
							>
								<View style={styles.avatarPlaceholder}>
									<Image
										source={ScreenImages.kidashiMemberDetails.userPlaceholder}
										style={styles.avatarPlaceholderImage}
									/>
								</View>
								<View style={styles.verifierInfo}>
									<Row alignItems='center' gap={8} justifyContent='flex-start'>
										<Typography title={verifier.name} type='body-sb' />
										{verifier.status === "pending" ? (
											<Badge type='pending' />
										) : (
											<Image
												source={ScreenImages.kidashiMemberDetails.checkIcon}
												style={styles.checkIcon}
											/>
										)}
									</Row>
									<Typography
										title={verifier.phone}
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
			/>
		</SafeAreaWrapper>
	);
};

export default ManageVerfiers;
