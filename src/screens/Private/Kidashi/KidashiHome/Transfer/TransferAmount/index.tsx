import { useState } from "react";
import { StackScreenProps } from "@react-navigation/stack";
import DeviceInfo from "react-native-device-info";

import { Button, TextInput, Typography } from "@components/Forms";
import { MainLayout, Row } from "@components/Layout";
import Pad from "@components/Pad";
import { KidashiHomeStackParamList } from "@navigation/types";
import ScreenImages from "@assets/images/screens";
import { TrustCirclePill } from "@components/UI";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import useToast from "@hooks/useToast";
import { Stepper } from "@components/Miscellaneous";
import { addCommas, removeCommas } from "@utils/Helpers";
import { setTransferDetails } from "@store/slices/transferSlice";
import { useCheckTransferLimitsMutation } from "@store/apis/transferApi";
import { DEFAULT_ERROR_MESSAGE } from "@utils/Constants";
import { LimitExceededModal } from "@components/Modal";

type TransferAmountProps = StackScreenProps<
	KidashiHomeStackParamList,
	"TransferAmount"
>;

const BANK_CODE = "95138";
const BANK_TRANSFER_SERVICE_CODE = "tran01";

export default function TransferAmount({
	navigation: { navigate, goBack },
}: TransferAmountProps) {
	const dispatch = useAppDispatch();
	const { showToast } = useToast();

	const selectedAccount = useAppSelector(
		(state) => state.account.selectedAccount
	);
	const womanAccount = useAppSelector(
		(state) => state.kidashi.selected_account
	);

	const [checkTransferLimits, { isLoading: isCheckingLimits }] =
		useCheckTransferLimitsMutation();

	const [amount, setAmount] = useState<string>("");
	const [amountError, setAmountError] = useState<string>("");
	const [amountLeft, setAmountLeft] = useState("");
	const [errorLimitMessage, setErrorLimitMessage] = useState("");
	const [showLimitModal, setShowLimitModal] = useState(false);

	const handleContinueTransfer = async () => {
		try {
			const result = await checkTransferLimits({
				amount: removeCommas(amount),
				source_account_number: selectedAccount?.account_number,
			}).unwrap();

			if (!result.status && !result.amount_left) {
				showToast("danger", result.message);
				return;
			}
			if (!result.status && result.amount_left) {
				setShowLimitModal(true);
				setAmountLeft(result.amount_left);
				setErrorLimitMessage(result.message);
				return;
			}

			const transferDetails = {
				sourceAccount: {
					accountName: selectedAccount?.account_name || "",
					accountNumber: selectedAccount?.account_number || "",
					balance: selectedAccount?.balance || "0.00",
				},
				destinationAccount: {
					accountName: `${womanAccount?.customer__first_name || ""} ${
						womanAccount?.customer__surname || ""
					}`,
					accountNumber: womanAccount?.account_number || "",
					bankName: "Payrep",
					bankCode: BANK_CODE,
				},
				amount,
				narration: "Woman funding",
				charges: result.charges || "0.00",
				deductible: result.deductible || "0.00",
				isFromBeneficiaryList: false,
				timestamp: new Date().toISOString(),
				transferType: "intra",
				deviceId: await DeviceInfo.getUniqueId(),
				fi: result.fi || "Payrep",
				service: BANK_TRANSFER_SERVICE_CODE,
				kyc: 0,
				ner: "",
				bvn: "",
			};

			dispatch(setTransferDetails(transferDetails));

			navigate("TransferConfirmation");
		} catch (error: any) {
			showToast(
				"danger",
				error.data?.message || error.message || DEFAULT_ERROR_MESSAGE
			);
		}
	};

	const submit = () => {
		navigate("TransferConfirmation");
	};

	return (
		<MainLayout backAction={goBack} keyboardAvoidingType='view'>
			<LimitExceededModal
				showModal={showLimitModal}
				onClose={() => setShowLimitModal(false)}
				transactionAmount={amount || "0.00"}
				amountLeft={amountLeft || "0.00"}
				limitMessage={errorLimitMessage}
			/>

			<Pad size={16} />

			<Stepper steps={3} currentStep={2} />

			<Pad size={16} />

			<Typography title='Transfer to Bank Account' type='heading-sb' />
			<Typography
				title='Enter the amount you want to transfer. The money will be deducted from your account and deposited directly into this member’s account'
				type='label-r'
			/>

			<Pad size={12} />

			<TrustCirclePill
				icon={ScreenImages.kidashiMemberAddition.verifierTrustCircle}
				title={`${womanAccount?.customer__first_name} ${womanAccount?.customer__surname}`}
			/>

			<Pad size={24} />

			<TextInput
				label='Amount'
				type='text'
				placeholder='Enter Amount'
				keyboardType='numeric'
				error={amountError}
				value={amount}
				onChangeText={(text) => setAmount(addCommas(text))}
			/>

			<Pad size={4} />

			<Typography
				title={`My Balance: N${addCommas(selectedAccount?.balance || 0)}`}
				type='label-sb'
			/>

			<Pad size={30} />

			<Button title='Continue' onPress={handleContinueTransfer} />
		</MainLayout>
	);
}
