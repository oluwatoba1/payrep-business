import { useCallback, useState } from "react";
import { View } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";

import { MainLayout } from "@components/Layout";
import { Button, Typography } from "@components/Forms";
import { styles } from "./styles";
import { KidashiHomeStackParamList } from "@navigation/types";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import PinInputModal from "@components/Modal/PinInputModal";
import RetryPinModal from "@components/Modal/RetryModal";
import { formatValue, removeCommas } from "@utils/Helpers";
import useToast from "@hooks/useToast";
import { useBankTransferMutation } from "@store/apis/transferApi";
import { setSelectedTransaction } from "@store/slices/accountSlice";
import Pad from "@components/Pad";

type TransferConfirmationProps = StackScreenProps<
	KidashiHomeStackParamList,
	"TransferConfirmation"
>;

export default function TransferConfirmation({
	navigation: { navigate, goBack },
}: TransferConfirmationProps) {
	// selectors
	const transferDetails = useAppSelector(
		(state) => state.transfer.transferDetails
	);

	const dispatch = useAppDispatch();
	const { showToast } = useToast();

	const formatAmount = formatValue(transferDetails?.amount || "0.00");
	const formatCharges = formatValue(transferDetails?.charges || "0.00");
	const formatDeductible = formatValue(transferDetails?.deductible || "0.00");

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
				title='Enter your four digit PIN'
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
			<View>
				<Typography title='Transaction Confirmation' />
			</View>
			<View style={styles.transactionDetailsContainer}>
				<View style={styles.detailRow}>
					<Typography title='Sender' type='label-r' />
					<Typography
						title={`${sourceAccount?.accountName} - ${sourceAccount?.accountNumber}`}
						type='body-sb'
					/>
				</View>
				<View style={styles.detailRow}>
					<Typography title='Receiver' type='label-r' />
					<Typography
						title={`${destinationAccount?.accountName} - ${destinationAccount?.accountNumber}`}
						type='body-sb'
					/>
				</View>
			</View>
			<View style={styles.detailItem}>
				<Typography title='Bank' type='label-r' />
				<Typography title={`${destinationAccount?.bankName}`} type='body-sb' />
			</View>
			<View style={styles.detailItem}>
				<Typography title='Narration' type='label-r' />
				<Typography title={`${transferDetails?.narration}`} type='body-sb' />
			</View>
			<View style={styles.amountDetailsContainer}>
				<View style={styles.amountRow}>
					<Typography title='Amount' type='label-r' />
					<Typography title={`${formatAmount}`} type='label-sb' />
				</View>
				<View style={styles.amountRow}>
					<Typography title='Charges (Fee & VAT)' type='label-r' />
					<Typography title={`${formatCharges}`} type='label-sb' />
				</View>
				<View style={styles.amountRow}>
					<Typography title='Total' type='label-r' />
					<Typography title={`${formatDeductible}`} type='label-sb' />
				</View>
			</View>

			<Pad size={20} />

			<Button title='Pay now' onPress={() => setPinModalVisible(true)} />
		</MainLayout>
	);
}
