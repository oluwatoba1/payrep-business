import { useCallback, useState } from "react";
import { Alert, BackHandler, Image, View } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";

import { MainLayout, Row } from "@components/Layout";
import { Button, IconButton, TextInput, Typography } from "@components/Forms";
import {
	KidashiHomeStackParamList,
	MemberRegistrationStackParamList,
} from "@navigation/types";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import useRegisterEmailValidation from "./validator";
import useToast from "@hooks/useToast";
import { CompositeScreenProps, useFocusEffect } from "@react-navigation/native";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import Pad from "@components/Pad";
import ComponentImages from "@assets/images/components";
import styles from "../styles";
import Colors from "@theme/Colors";
import { useVerifyWomanEmailMutation } from "@store/apis/kidashiApi";
import { setRegistrationDetails } from "@store/slices/authSlice";
import { DEFAULT_ERROR_MESSAGE } from "@utils/Constants";
import { useVerifyEmailMutation } from "@store/apis/authApi";

type MemberEmailProps = CompositeScreenProps<
	StackScreenProps<MemberRegistrationStackParamList, "MemberEmail">,
	BottomTabScreenProps<KidashiHomeStackParamList, "KidashiDashboard">
>;

export default function MemberEmail({
	navigation: { navigate },
}: MemberEmailProps) {
	const dispatch = useAppDispatch();
	const { showToast } = useToast();
	const {
		formErrors,
		formData: { email },
		validateForm,
		setEmail,
	} = useRegisterEmailValidation();
	const [verifyEmail, { isLoading }] = useVerifyEmailMutation();

	const { mobileNumber, customer_id } = useAppSelector(
		(state) => state.auth.registration
	);

	const submit = async () => {
		try {
			const { status } = await verifyEmail({ email }).unwrap();
			if (status) {
				dispatch(setRegistrationDetails({ mobileNumber, email, customer_id }));
				navigate("MemberEmailVerification");
			}
		} catch (error: any) {
			console.log(error);
			showToast(
				"danger",
				error.data?.message || error.message || DEFAULT_ERROR_MESSAGE
			);
		}
	};

	const backAction = () => {
		navigate("KidashiDashboard");
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

	return (
		<MainLayout backAction={backAction} isLoading={isLoading}>
			<Typography title='Provide your Email Address' type='heading-sb' />
			<Typography title='Please enter a valid email address' type='label-sb' />

			<TextInput
				type='text'
				label='Email (optional)'
				placeholder='e.g. zababubakarr@gmail.com'
				value={email}
				onChangeText={setEmail}
				error={formErrors.email}
			/>

			<Pad />

			<Button title='Continue' onPress={() => validateForm(submit)} />

			<Pad size={24} />

			<IconButton onPress={() => navigate("MemberMeansOfVerification")}>
				<Row gap={8} alignItems='center' justifyContent='center'>
					<Typography
						title='Skip for now'
						type='label-sb'
						color={Colors.primary["600"]}
					/>
					<Image
						source={ComponentImages.kidashiCard.arrowRight}
						style={styles.skipIcon}
					/>
				</Row>
			</IconButton>
		</MainLayout>
	);
}
