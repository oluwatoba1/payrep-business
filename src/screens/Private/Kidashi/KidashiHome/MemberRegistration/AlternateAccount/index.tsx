import React, { useCallback, useEffect, useState } from "react";
import { BackHandler, Image, Keyboard, View } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";

import { MainLayout, Row } from "@components/Layout";
import { Typography, Button, TextInput, Dropdown } from "@components/Forms";
import { MemberRegistrationStackParamList } from "@navigation/types";
import { styles } from "./styles";
import useAlternateAccountValidation from "./validators";
import { useCreateAlternateAccountMutation } from "@store/apis/kidashiApi";
import useToast from "@hooks/useToast";
import { DEFAULT_ERROR_MESSAGE } from "@utils/Constants";
import { useAppSelector } from "@store/hooks";
import Pad from "@components/Pad";
import { useFocusEffect } from "@react-navigation/native";
import ScreenImages from "@assets/images/screens";
import Colors from "@theme/Colors";
import { BankModal } from "@components/Modal";
import {
	useFetchBanksMutation,
	useNameEnquiryMutation,
} from "@store/apis/transferApi";

type AlternateAccountProps = StackScreenProps<
	MemberRegistrationStackParamList,
	"AlternateAccount"
>;

const INITIAL_BANK_STATE = { label: "", value: "" };

export default function AlternateAccount({
	navigation: { navigate },
	route: {
		params: { womanId },
	},
}: AlternateAccountProps) {
	const selectedAccount = useAppSelector(
		(state) => state.account.selectedAccount
	);

	const {
		formData,
		formErrors,
		validateForm,
		setBankName,
		setBankCode,
		setAccountNumber,
		setAccountName,
		clearFormError,
	} = useAlternateAccountValidation();
	const [createAlternateAccount, { isLoading }] =
		useCreateAlternateAccountMutation();

	const { showToast } = useToast();

	const [fetchBanks, { isLoading: isFetchingBanks }] = useFetchBanksMutation();
	const [
		nameEnquiry,
		{ isLoading: isNameEnquiryLoading, error: nameEnquiryError },
	] = useNameEnquiryMutation();

	const [showAccountContainer, setShowAccountContainer] =
		useState<boolean>(false);
	const [showBankModal, setShowBankModal] = useState(false);
	const [relatedBanks, setRelatedBanks] = useState<IBank[]>([]);
	const [selectedBank, setSelectedBank] = useState<{
		label: string;
		value: string;
	}>(INITIAL_BANK_STATE);
	const [enquiryResponse, setEnquiryResponse] = useState<INameEnquiryResponse>({
		status: false,
		response_code: "",
		message: "",
		transfer_type: "debit",
		beneficiary_account_number: "",
		beneficiary_account_name: "",
		bank_code: "",
		bank_name: "",
		ner: "",
		session_id: "",
		bvn: "",
		kyc: 0,
		fi: "",
	});

	// Loading States
	const [isLoadingMoreBanks, setIsLoadingMoreBanks] = useState(false);

	// ---------- handlers ----------

	//Bank Data Fetching
	const handleBankFetch = useCallback(async () => {
		setIsLoadingMoreBanks(true);
		try {
			const result = await fetchBanks({}).unwrap();

			if (result.status) {
				setRelatedBanks(result.data);
			} else {
				showToast("danger", "Failed to load banks");
			}
		} catch (error: any) {
			showToast(
				"danger",
				error.data?.message || error.message || DEFAULT_ERROR_MESSAGE
			);
		} finally {
			setIsLoadingMoreBanks(false);
		}
	}, [fetchBanks]);

	const performNameEnquiry = useCallback(
		async (accNumber: string, bankCode: string, bankName?: string) => {
			try {
				const result = await nameEnquiry({
					source_account_number: selectedAccount?.account_number || "",
					beneficiary_account_number: accNumber,
					bank_code: bankCode,
					bank_name: bankName || "",
				}).unwrap();

				setEnquiryResponse(result);

				if (result.status) {
					setAccountName(result.beneficiary_account_name || "");
					setBankName(result.bank_name || "");
					setBankCode(result.bank_code);
					setShowAccountContainer(!isNameEnquiryLoading);
				} else {
					showToast("danger", result.message);
				}
			} catch (error: any) {
				showToast(
					"danger",
					error.data?.message || error.message || DEFAULT_ERROR_MESSAGE
				);
				setShowAccountContainer(false);
			}
		},
		[nameEnquiry, selectedAccount]
	);

	const submit = async () => {
		try {
			const { status, message } = await createAlternateAccount({
				woman_id: womanId,
				bank_code: formData.bankCode,
				bank_name: formData.bankName,
				account_number: formData.accountNumber,
				account_name: formData.accountName,
			}).unwrap();
			if (status) {
				// navigate("");
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

	const backAction = () => {
		navigate("MemberSuccessScreen");
		return true; // Prevent default behavior
	};
	useFocusEffect(
		useCallback(() => {
			const backHandler = BackHandler.addEventListener(
				"hardwareBackPress",
				backAction
			);

			return () => backHandler.remove(); // Cleanup
		}, [])
	);

	useEffect(() => {
		handleBankFetch();
	}, []);

	useEffect(() => {
		formData.accountNumber.length === 10 && selectedBank.value
			? performNameEnquiry(
					formData.accountNumber,
					selectedBank.value,
					selectedBank.label
			  )
			: setShowAccountContainer(false);
	}, [formData.accountNumber, selectedBank]);

	return (
		<MainLayout
			backAction={backAction}
			isLoading={isLoading || isFetchingBanks}
		>
			<Typography type='heading4-sb' title='Add Alternate Bank Details' />
			<Typography
				type='body-r'
				title='Provide another bank account that can be used to receive asset financing or repayments as an alternative'
			/>
			<Pad />

			<TextInput
				label='Account Number'
				keyboardType='numeric'
				placeholder='e.g 0123456789'
				maxLength={10}
				onChangeText={(text) => {
					setAccountNumber(text);
					clearFormError("accountNumber");
				}}
				value={formData.accountNumber}
				error={formErrors.accountNumber}
			/>
			<Pad />

			<Dropdown
				label='Bank'
				options={relatedBanks.map((bank) => ({
					label: bank.name,
					value: bank.code,
				}))}
				selectedOption={selectedBank}
				onSelect={(bank) => {
					setSelectedBank(bank);
					if (formData.accountNumber.length === 10) {
						Keyboard.dismiss();
						performNameEnquiry(formData.accountNumber, bank.value, bank.label);
					}
				}}
			/>

			<Pad size={16} />

			{showAccountContainer ? (
				<View style={styles.accountContainer}>
					<Typography title='Account found:' type='label-r' />

					<Pad size={12} />

					<Row
						alignItems='center'
						justifyContent='space-between'
						containerStyle={styles.accountWrapper}
					>
						<Row alignItems='center' gap={7}>
							<Image
								source={ScreenImages.kidashiMemberAddition.noticeIcon}
								style={styles.skipIcon}
							/>
							<Typography
								title={formData.accountName}
								type='body-sb'
								color={Colors.neutral["600"]}
							/>
						</Row>
					</Row>
				</View>
			) : null}

			<Pad size={40} />
			<Button
				title='Skip'
				onPress={backAction}
				containerStyle={styles.skipButton}
				textStyle={styles.skipButtonText}
			/>
			<Pad />
			<Button title='Save details' onPress={() => validateForm(submit)} />
		</MainLayout>
	);
}
