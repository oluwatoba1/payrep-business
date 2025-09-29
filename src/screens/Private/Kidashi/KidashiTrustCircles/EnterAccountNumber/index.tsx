import { useState } from "react";
import { Image, Pressable, View } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";

import useBvnVerificationValidation from "./validator";
import { Button, TextInput, Typography } from "@components/Forms";
import { MainLayout, Row } from "@components/Layout";
import Pad from "@components/Pad";
import { useAppDispatch } from "@store/hooks";
import useToast from "@hooks/useToast";
import { TrustCircleStackParamList } from "@navigation/types";
import ComponentImages from "@assets/images/components";
import styles from "./styles";
import Colors from "@theme/Colors";
import ScreenImages from "@assets/images/screens";
import { useGetAccountsMutation } from "@store/apis/accountApi";

type EnterAccountNumberProps = StackScreenProps<
	TrustCircleStackParamList,
	"EnterAccountNumber"
>;

export default function EnterAccountNumber({
	navigation: { navigate, goBack },
}: EnterAccountNumberProps) {
	const dispatch = useAppDispatch();
	const { showToast } = useToast();
	const { formData, formErrors, validateForm, setIdNumber, clearFormError } =
		useBvnVerificationValidation();

	const [getAccounts, { data: accounts, isLoading: isLoadingAccounts }] =
		useGetAccountsMutation();

	const [showAccountContainer, setShowAccountContainer] =
		useState<boolean>(false);

	// Submit dynamically depending on ID type
	const submit = async () => {};

	const fetchAccounts = async () => {
		validateForm(async () => {
			await getAccounts({ account_number: formData.idNumber })
				.unwrap()
				.then((res) => {
					if (res.status) {
						console.log(res.data);
					} else {
						showToast("danger", res.message);
					}
				})
				.catch((err) => {
					console.log(err);
					showToast("danger", err.message);
				});
		});
	};

	return (
		<MainLayout backAction={goBack} keyboardAvoidingType='scroll-view'>
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
				maxLength={11} // adjust if NIN length differs
				onChangeText={(text) => {
					setIdNumber(text);
					clearFormError("idNumber");
				}}
				value={formData.idNumber}
				error={formErrors.idNumber}
				rightNode={
					<Pressable
						onPress={() => fetchAccounts()}
						disabled={isLoadingAccounts}
					>
						<Row alignItems='center' gap={6}>
							<Typography
								title={isLoadingAccounts ? "Searching..." : "Search"}
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
								title='Zainab Abubakar'
								type='body-sb'
								color={Colors.neutral["600"]}
							/>
						</Row>

						<Row alignItems='center' gap={7}>
							<Typography
								title='Tier 1'
								type='label-sb'
								color={Colors.primary["600"]}
							/>
						</Row>
					</Row>
				</View>
			) : null}

			<Pad size={100} />

			<Button
				title='Add Member to Trust Circle'
				onPress={() => navigate("SelectVerifiers")}
			/>
		</MainLayout>
	);
}
