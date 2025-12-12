import React, { useCallback, useState } from "react";
import { BackHandler, View } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";

import { MainLayout } from "@components/Layout";
import { Typography, Button, PinPad } from "@components/Forms";
import { ProfileStackParamList } from "@navigation/types";

import usePinValidation from "./validators";
import { useCreatePinMutation } from "@store/apis/customerApi";
import useToast from "@hooks/useToast";
import { DEFAULT_ERROR_MESSAGE } from "@utils/Constants";
import { useAppSelector } from "@store/hooks";
import Pad from "@components/Pad";
import { useFocusEffect } from "@react-navigation/native";

type PinProps = StackScreenProps<ProfileStackParamList, "Pin">;

export default function Pin({ navigation: { navigate } }: PinProps) {
	const { formData, formErrors, validateForm, setPin } = usePinValidation();
	const [createPin, { isLoading }] = useCreatePinMutation();
	const { showToast } = useToast();

	const submit = async () => {
		try {
			const { status, message } = await createPin({
				pin: formData.pin,
			}).unwrap();
			if (status) {
				navigate("Attestation");
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

	useFocusEffect(
		useCallback(() => {
			const backAction = () => {
				navigate("ProfileCompletionIntro");
				return true; // Prevent default behavior
			};

			const backHandler = BackHandler.addEventListener(
				"hardwareBackPress",
				backAction
			);

			return () => backHandler.remove(); // Cleanup
		}, [])
	);

	return (
		<MainLayout
			backAction={() => navigate("ProfileCompletionIntro")}
			isLoading={isLoading}
		>
			<Typography type='heading4-sb' title='PIN creation' />
			<Typography
				type='body-r'
				title='Create your transaction PIN to authorize future payments.'
			/>

			<Pad size={30} />

			<PinPad
				pin={formData.pin}
				onInput={setPin}
				codeLength={4}
				error={formErrors.pin}
			/>

			<Pad size={60} />

			<Button title='Save' onPress={() => validateForm(submit)} />
		</MainLayout>
	);
}
