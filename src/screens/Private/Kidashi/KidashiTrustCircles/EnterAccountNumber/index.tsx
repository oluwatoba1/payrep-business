import { useCallback, useState, useEffect } from "react";
import { BackHandler, Image, Pressable, View } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";

import useAccountNumberValidation from "./validator";
import { Button, TextInput, Typography } from "@components/Forms";
import { MainLayout, Row } from "@components/Layout";
import Pad from "@components/Pad";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import useToast from "@hooks/useToast";
import { TrustCircleStackParamList } from "@navigation/types";
import ComponentImages from "@assets/images/components";
import styles from "./styles";
import Colors from "@theme/Colors";
import ScreenImages from "@assets/images/screens";
import { useGetAccountsMutation } from "@store/apis/accountApi";
import {
	useAddMemberToTrustCircleMutation,
	useGetWomanDetailsMutation,
} from "@store/apis/kidashiApi";
import { DEFAULT_ERROR_MESSAGE } from "@utils/Constants";
import { setSelectedAccountDetails } from "@store/slices/kidashiSlice";
import { useFocusEffect } from "@react-navigation/native";

type EnterAccountNumberProps = StackScreenProps<
	TrustCircleStackParamList,
	"EnterAccountNumber"
>;

export default function EnterAccountNumber({
	navigation: { navigate, goBack, reset },
}: EnterAccountNumberProps) {
	const dispatch = useAppDispatch();
	const { showToast } = useToast();
	const {
		formData,
		formErrors,
		validateForm,
		setAccountNumber,
		clearFormError,
	} = useAccountNumberValidation();
	const circle_details = useAppSelector(
		(state) => state.kidashi.circle_details
	);
	// console.log({ circle_details });

	const [getAccounts, { isLoading: isLoadingAccounts }] =
		useGetAccountsMutation();
	const [
		addMemberToTrustCircle,
		{ isLoading: isLoadingAddMemberToTrustCircle },
	] = useAddMemberToTrustCircleMutation();
	const [getWomanDetails, { isLoading: isLoadingWomanDetails }] =
		useGetWomanDetailsMutation();
	const vendor_id = useAppSelector((state) => state.kidashi.vendor?.id);
	const selected_account = useAppSelector(
		(state) => state.kidashi.selected_account
	);

	const [showAccountContainer, setShowAccountContainer] =
		useState<boolean>(false);
	const [woman_details, setWomanDetails] = useState<iWomanMemberDetails | null>(
		null
	);
	// Auto-fetch account when number reaches 10 digits
	useEffect(() => {
		if (formData.accountNumber.length === 10) {
			fetchAccounts();
		}
	}, [formData.accountNumber]);

	// console.log({ selected_account });

	const fetchWomanDetails = async (id: string) => {
		await getWomanDetails({
			cba_customer_id: id,
		})
			.unwrap()
			.then((res) => {
				if (res.status) {
					setWomanDetails(res.data as iWomanMemberDetails);
					setShowAccountContainer(true);
				}
			})
			.catch((err) => {
				console.log(err);
				showToast("danger", err.data.message || DEFAULT_ERROR_MESSAGE);
			});
	};

	// Submit dynamically depending on ID type
	const submit = async () => {
		if (circle_details?.members_count && circle_details?.members_count >= 3) {
			navigate("SelectVerifiers");
		} else {
			const payload = {
				initiating_vendor_id: vendor_id || "",
				woman_id: woman_details?.id || "",
				trust_circle_id: circle_details?.id || "",
			};
			await addMemberToTrustCircle(payload)
				.unwrap()
				.then((res) => {
					if (res.status) {
						navigate("MemberAdditionSuccessScreen");
					} else {
						showToast("danger", res.message || DEFAULT_ERROR_MESSAGE);
					}
				})
				.catch((err) => {
					console.log(err);
					// remove this after testing
					// navigate("MemberAdditionSuccessScreen");
					showToast("danger", err.data.message || DEFAULT_ERROR_MESSAGE);
				});
		}
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
					console.log(err);
					showToast("danger", err.data.message || DEFAULT_ERROR_MESSAGE);
				});
		});
	};

	const backAction = () => {
		goBack();
		return true; // Prevent default behavior
	};

	const resetAndGoBack = () => {
		navigate("TrustCircles");
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
				title='Enter the account number linked to the member'
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
									isLoadingAccounts || isLoadingWomanDetails
										? "Searching..."
										: "Search"
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

						{/* <Row alignItems='center' gap={7}>
							<Typography
								title={accountData?.customer__email}
								type='label-sb'
								color={Colors.primary["600"]}
							/>
						</Row> */}
					</Row>
				</View>
			) : null}

			<Pad size={100} />

			<Button
				title={
					isLoadingAddMemberToTrustCircle
						? "Adding Member..."
						: "Add Member to Trust Circle"
				}
				onPress={() => submit()}
				disabled={!showAccountContainer || isLoadingAddMemberToTrustCircle}
			/>
		</MainLayout>
	);
}
