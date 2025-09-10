import React, { useCallback, useEffect, useState } from "react";
import { BackHandler, View } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { CompositeScreenProps, useFocusEffect } from "@react-navigation/native";

import { MainLayout } from "@components/Layout";
import { Typography, Button, TextInput, Dropdown } from "@components/Forms";
import { KidashiStackParamList, BottomTabParamList } from "@navigation/types";
import useToast from "@hooks/useToast";
import { DEFAULT_ERROR_MESSAGE } from "@utils/Constants";

import Pad from "@components/Pad";
import { useUpdateBusinessInformationMutation } from "@store/apis/customerApi";
import useVendorItems from "./validators";
import styles from "./styles";
import { Stepper } from "@components/Miscellaneous";

type VendorItemsProps = CompositeScreenProps<
	StackScreenProps<KidashiStackParamList, "VendorItems">,
	StackScreenProps<BottomTabParamList, "Home">
>;

export default function VendorItems({
	navigation: { navigate, goBack },
}: VendorItemsProps) {
	const { showToast } = useToast();
	const { formData, formErrors, validateForm, setBusinessDescription } =
		useVendorItems();
	const [updateBusinessInformation, { isLoading }] =
		useUpdateBusinessInformationMutation();

	const submit = async () => {
		navigate("GuarantorDetails");
	};

	useFocusEffect(
		useCallback(() => {
			const backAction = () => {
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
			keyboardAvoidingType='scroll-view'
			backAction={goBack}
			isLoading={isLoading}
			rightTitle='Vendor Items'
		>
			<Stepper steps={3} currentStep={2} />

			<Pad size={20} />

			<Typography type='heading4-sb' title='What do you sell?' />
			<Typography
				type='body-r'
				title='Give a short description of your business so we know the kind of goods or services you provide'
			/>

			<TextInput
				label='Business Description'
				placeholder='e.g., I sell Foodstuff, Provisions, Second-hand clothes'
				onChangeText={setBusinessDescription}
				value={formData.businessDescription}
				error={formErrors.businessDescription}
				customTextInputStyle={styles.customTextInputStyle}
			/>

			<Pad size={80} />

			<Button title='Save' onPress={submit} />

			<Pad size={40} />
		</MainLayout>
	);
}
