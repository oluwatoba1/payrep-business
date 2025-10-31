import { useCallback, useState } from "react";
import { Image, View } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";

import { MainLayout, Row } from "@components/Layout";
import { Button, Typography } from "@components/Forms";
import { styles } from "./styles";
import { KidashiHomeStackParamList } from "@navigation/types";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import PinInputModal from "@components/Modal/PinInputModal";
import RetryPinModal from "@components/Modal/RetryModal";
import { removeCommas } from "@utils/Helpers";
import useToast from "@hooks/useToast";
import { useBankTransferMutation } from "@store/apis/transferApi";
import { setSelectedTransaction } from "@store/slices/accountSlice";
import Pad from "@components/Pad";
import ScreenImages from "@assets/images/screens";

type TransferConfirmationProps = StackScreenProps<
	KidashiHomeStackParamList,
	"TransferConfirmation"
>;

export default function TransferConfirmation({
	navigation: { navigate, goBack },
}: TransferConfirmationProps) {
	const dispatch = useAppDispatch();
	const { showToast } = useToast();

	// selectors
	const transferDetails = useAppSelector(
		(state) => state.transfer.transferDetails
	);
	// hooks
	const [bankTransfer, { isLoading: isProcessingTransfer }] =
		useBankTransferMutation();

	//
	const sourceAccount = transferDetails?.sourceAccount;
	const destinationAccount = transferDetails?.destinationAccount;

	// states
	const [pinModalVisible, setPinModalVisible] = useState<boolean>(false);
	const [retryModalVisible, setRetryModalVisible] = useState<boolean>(false);
	const [isValidating, setIsValidating] = useState<boolean>(false);
	const [isLocked, setIsLocked] = useState<boolean>(false);
	const [attemptsLeft] = useState<number>(3);
	const [pinError, setPinError] = useState<string | undefined>(undefined);

	// handles

	const handlePinValidation = async (enteredPin: string): Promise<boolean> => {
		setIsValidating(true);

		try {
			const { status, data, message } = await bankTransfer({
				source_account_number: sourceAccount?.accountNumber || "",
				beneficiary_account_number: destinationAccount?.accountNumber || "",
				beneficiary_account_name: destinationAccount?.accountName || "",
				bank_code: destinationAccount?.bankCode || "",
				bank_name: destinationAccount?.bankName || "",
				amount: parseFloat(removeCommas(transferDetails?.amount || "0")),
				pin: enteredPin,
				transfer_type:
					transferDetails?.transferType as ITransferRequest["transfer_type"],
				remarks: transferDetails?.narration || "",
				fi: transferDetails?.fi ?? "",
				device_id: transferDetails?.deviceId || "",
				kyc: transferDetails?.kyc || 0,
				ner: transferDetails?.ner || "",
				bvn: transferDetails?.bvn || "",
			}).unwrap();

			if (status && data.txn_status === "successful") {
				dispatch(setSelectedTransaction(data));
				navigate("TransferSuccess");
				return true;
			} else {
				handleFailedTransfer(data, message);
				return false;
			}
		} catch (error: any) {
			handleTransferError(error);
			return false;
		} finally {
			setPinModalVisible(false);
			setIsValidating(false);
		}
	};

	const handleFailedTransfer = (
		response: ITransferResponse,
		message: string
	) => {
		if (!!response?.is_invalid) {
			setIsLocked(false);
			setRetryModalVisible(true);
			setPinError(message || "Invalid PIN");
		} else if (!!response?.pin_try_exceed) {
			setIsLocked(true);
			setRetryModalVisible(true);
			setPinError(
				message || "Too many failed attempts. Your account has been locked."
			);
		} else {
			setIsLocked(true);
			showToast("danger", message || "Transaction failed");
		}
	};

	const handleTransferError = (error: any) => {
		const errorMessage =
			error.data?.message || error.message || "Transaction failed";
		showToast("danger", errorMessage);
	};

	// Handle retry
	const handleRetry = useCallback(() => {
		setRetryModalVisible(false);

		if (isLocked) {
			showToast("danger", pinError || "Your account has been locked");
		} else {
			setPinModalVisible(true);
		}
	}, [retryModalVisible, pinModalVisible]);

	return (
		<MainLayout
			backAction={goBack}
			keyboardAvoidingType='scroll-view'
			isLoading={isProcessingTransfer || isValidating}
		>
			<PinInputModal
				title='Enter Transaction PIN'
				description='For security, please enter your 4-digit PIN to complete this funding'
				showModal={pinModalVisible}
				onClose={() => setPinModalVisible(false)}
				onProceed={handlePinValidation}
				isLoadingPin={isValidating}
			/>

			<RetryPinModal
				showModal={retryModalVisible}
				onClose={() => setRetryModalVisible(false)}
				onRetry={handleRetry}
				attemptsLeft={attemptsLeft}
				errorMessage={pinError}
				isLocked={isLocked}
			/>

			<View style={styles.boxIconContainer}>
				<Image
					source={ScreenImages.kidashiMemberDetails.boxIcon}
					style={styles.boxIcon}
				/>
			</View>

			<Pad size={8} />

			<Typography
				title='Review Funding Details'
				type='heading4-sb'
				style={{ textAlign: "center" }}
			/>
			<Typography
				title='You are about to fund this member’s account'
				type='body-r'
				style={{ textAlign: "center" }}
			/>

			<Pad size={16} />

			<View style={styles.summaryContainer}>
				<Row containerStyle={styles.itemContainer}>
					<Typography title='Summary' type='body-sb' />
				</Row>
				<Row containerStyle={styles.itemContainer}>
					<Typography title='Member Name' type='body-r' />
					<Typography
						title={transferDetails?.destinationAccount.accountName || ""}
						type='body-sb'
					/>
				</Row>
				<Row containerStyle={styles.itemContainer}>
					<Typography title='Account Number' type='body-r' />
					<Typography
						title={transferDetails?.destinationAccount.accountNumber || ""}
						type='body-sb'
					/>
				</Row>
				<Row
					containerStyle={{
						...styles.itemContainer,
						borderTopWidth: 1.5,
						borderBottomWidth: 1.5,
					}}
				>
					<Typography title='Amount' type='body-sb' />
					<Typography
						title={`₦${transferDetails?.amount || 0}`}
						type='body-sb'
					/>
				</Row>
			</View>

			<Pad size={80} />

			<Button title='Confirm' onPress={() => setPinModalVisible(true)} />
		</MainLayout>
	);
}
