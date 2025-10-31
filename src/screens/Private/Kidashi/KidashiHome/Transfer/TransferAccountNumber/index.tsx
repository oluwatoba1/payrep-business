import { useCallback, useState, useEffect } from "react";
import { BackHandler, Image, Pressable, View } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";

import useAccountNumberValidation from "./validator";
import { Button, TextInput, Typography } from "@components/Forms";
import { MainLayout, Row } from "@components/Layout";
import Pad from "@components/Pad";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import useToast from "@hooks/useToast";
import { KidashiHomeStackParamList } from "@navigation/types";
import ComponentImages from "@assets/images/components";
import styles from "./styles";
import Colors from "@theme/Colors";
import ScreenImages from "@assets/images/screens";
import { useGetAccountsMutation } from "@store/apis/accountApi";
import { useGetMemberDetailsMutation } from "@store/apis/kidashiApi";
import { DEFAULT_ERROR_MESSAGE } from "@utils/Constants";
import {
	setMemberDetails,
	setSelectedAccountDetails,
} from "@store/slices/kidashiSlice";
import { useFocusEffect } from "@react-navigation/native";
import { Stepper } from "@components/Miscellaneous";

type TransferAccountNumberProps = StackScreenProps<
	KidashiHomeStackParamList,
	"TransferAccountNumber"
>;

export default function TransferAccountNumber({
	navigation: { navigate, goBack, reset },
}: TransferAccountNumberProps) {
	const dispatch = useAppDispatch();
	const { showToast } = useToast();
	const {
		formData,
		formErrors,
		validateForm,
		setAccountNumber,
		clearFormError,
	} = useAccountNumberValidation();

	const [getMemberDetails, { isLoading }] = useGetMemberDetailsMutation();
	const [getAccounts, { isLoading: isLoadingAccounts }] =
		useGetAccountsMutation();
	const selected_account = useAppSelector(
		(state) => state.kidashi.selected_account
	);

	const [showAccountContainer, setShowAccountContainer] =
		useState<boolean>(false);
	// Auto-fetch account when number reaches 10 digits
	useEffect(() => {
		if (formData.accountNumber.length === 10) {
			fetchAccounts();
		}
	}, [formData.accountNumber]);

	const fetchWomanDetails = async (id: string) => {
		try {
			const { status, message, data } = await getMemberDetails({
				cba_customer_id: id,
			}).unwrap();
			if (status) {
				setShowAccountContainer(true);
				dispatch(setMemberDetails({ ...data, cba_customer_id: id }));
			} else {
				showToast("danger", message);
				goBack();
			}
		} catch (error: ErrorResponse | any) {
			console.log(error);
			showToast(
				"danger",
				error.data?.message || error.message || DEFAULT_ERROR_MESSAGE
			);
		}
	};

	// Submit dynamically depending on ID type
	const submit = async () => {
		navigate("TransferAmount");
	};

	const fetchAccounts = async () => {
		validateForm(async () => {
			setShowAccountContainer(false);
			await getAccounts({ account_number: formData.accountNumber })
				.unwrap()
				.then((res) => {
					if (res.status) {
						const account = res.data[0] as unknown as iWomanAccount;
						fetchWomanDetails(account.customer_id);
						dispatch(setSelectedAccountDetails(account));
					} else {
						showToast("danger", res.message || DEFAULT_ERROR_MESSAGE);
					}
				})
				.catch((err) => {
					showToast("danger", err.data.message || DEFAULT_ERROR_MESSAGE);
				});
		});
	};

	const resetAndGoBack = () => {
		navigate("KidashiDashboard");
		return true;
	};

	useFocusEffect(
		useCallback(() => {
			const backHandler = BackHandler.addEventListener(
				"hardwareBackPress",
				resetAndGoBack
			);

			return () => backHandler.remove(); // Cleanup
		}, [])
	);

	return (
		<MainLayout backAction={resetAndGoBack} keyboardAvoidingType='scroll-view'>
			<Pad size={16} />

			<Typography title='Enter Account Number' type='heading-sb' />
			<Typography
				title='Add member’s account number to continue. If they don’t have one, you would need to create an account'
				type='label-r'
			/>

			<Pad size={16} />

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
				rightNode={
					<Pressable
						onPress={() => fetchAccounts()}
						disabled={isLoadingAccounts}
					>
						<Row alignItems='center' gap={6}>
							<Typography
								title={
									isLoadingAccounts || isLoading ? "Searching..." : "Search"
								}
								type='label-sb'
								color={Colors.danger["700"]}
							/>
							<Image
								source={ComponentImages.kidashiCard.arrowRight}
								style={styles.skipIcon}
							/>
						</Row>
					</Pressable>
				}
			/>

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
								title={`${selected_account?.customer__first_name} ${selected_account?.customer__other_name} ${selected_account?.customer__surname}`}
								type='body-sb'
								color={Colors.neutral["600"]}
							/>
						</Row>
					</Row>
				</View>
			) : null}

			<Pad size={100} />

			<Button title='Next' onPress={submit} disabled={!showAccountContainer} />
		</MainLayout>
	);
}
