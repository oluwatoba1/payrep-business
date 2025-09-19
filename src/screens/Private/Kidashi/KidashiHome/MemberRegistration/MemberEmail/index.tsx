import { useCallback, useState } from "react";
import { Alert, BackHandler, View } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";

import { MainLayout } from "@components/Layout";
import { Button, TextInput, Typography } from "@components/Forms";
import {
	KidashiHomeStackParamList,
	MemberRegistrationStackParamList,
} from "@navigation/types";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import useRegisterEmailValidation from "./validator";
import useToast from "@hooks/useToast";
import { useVerifyEmailMutation } from "@store/apis/authApi";
import { CompositeScreenProps, useFocusEffect } from "@react-navigation/native";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import Pad from "@components/Pad";

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

	const mobileNumber = useAppSelector(
		(state) => state.auth.registration.mobileNumber
	);

	const submit = async () => {};

	const handleSkip = () => {
		navigate("MemberMeansOfVerification");
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
			<Typography title='Provide your Email Address' type='heading4-sb' />
			<Typography
				title='Please enter a valid email address'
				type='subheading'
			/>

			<TextInput
				type='text'
				label='Email (optional)'
				placeholder='e.g. zababubakarr@gmail.com'
				value={email}
				onChangeText={setEmail}
				error={formErrors.email}
			/>

			<Pad size={176} />

			<Button
				title='Continue'
				onPress={() => navigate("MemberEmailVerification")}
			/>
		</MainLayout>
	);
}
