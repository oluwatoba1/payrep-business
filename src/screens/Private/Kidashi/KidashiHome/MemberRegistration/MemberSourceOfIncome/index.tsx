import React, { useCallback, useState } from "react";
import { BackHandler, View } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { CompositeScreenProps, useFocusEffect } from "@react-navigation/native";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";

import { MainLayout } from "@components/Layout";
import { Typography, Button, Dropdown } from "@components/Forms";
import {
	KidashiHomeStackParamList,
	MemberRegistrationStackParamList,
} from "@navigation/types";
import { styles } from "./styles";
import annualIcomeRanges from "@assets/json/annual_income_ranges.json";
import employmentTypes from "@assets/json/employment_types.json";
import occupations from "@assets/json/occupations.json";
import useSourceOfIncomeValidation from "./validators";
import { useUpdateIncomeMutation } from "@store/apis/customerApi";
import useToast from "@hooks/useToast";
import { DEFAULT_ERROR_MESSAGE } from "@utils/Constants";
import { useAppSelector } from "@store/hooks";
import Pad from "@components/Pad";
import { useUpdateWomanIncomeMutation } from "@store/apis/kidashiApi";
import { Stepper } from "@components/Miscellaneous";

type MemberSourceOfIncomeProps = CompositeScreenProps<
	StackScreenProps<MemberRegistrationStackParamList, "MemberSourceOfIncome">,
	BottomTabScreenProps<KidashiHomeStackParamList, "KidashiDashboard">
>;

export default function MemberSourceOfIncome({
	navigation: { navigate },
}: MemberSourceOfIncomeProps) {
	const customerId = useAppSelector(
		(state) => state.auth.registration.customer_id
	);
	const {
		formData,
		formErrors,
		validateForm,
		setOccupation,
		setAnnualIncome,
		setEmploymentType,
	} = useSourceOfIncomeValidation();
	const [updateIncome, { isLoading }] = useUpdateIncomeMutation();
	const { showToast } = useToast();

	const [selectedOccupation, setSelectedOccupation] = useState<
		DefaultDropdownOption | undefined
	>(undefined);
	const [selectedEmploymentType, setSelectedEmploymentType] = useState<
		DefaultDropdownOption | undefined
	>(undefined);
	const [selectedAnnualIncome, setSelectedAnnualIncome] = useState<
		DefaultDropdownOption | undefined
	>(undefined);

	const submit = async () => {
		try {
			const { status, message } = await updateIncome({
				occupation: formData.occupation,
				annual_income: formData.annualIncome,
				employment_type: formData.employmentType,
			}).unwrap();
			if (status) {
				navigate("MemberAttestation");
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
				navigate("KidashiDashboard");
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
			backAction={() => navigate("KidashiDashboard")}
			isLoading={isLoading}
		>
			<Stepper steps={8} currentStep={8} />
			<Typography type='heading4-sb' title='Source of Income' />
			<Typography
				type='body-r'
				title='Please fill out the following details about your financial background.'
			/>
			<Pad />
			<View style={styles.inputContainer}>
				{/* Occupation Dropdown */}
				<Dropdown
					label='Occupation'
					options={[...occupations]
						.sort((a, b) => a.localeCompare(b))
						.map((occupation) => ({
							label: occupation,
							value: occupation,
						}))}
					selectedOption={selectedOccupation}
					onSelect={(option) => {
						setSelectedOccupation(option);
						setOccupation(option.value);
					}}
					error={formErrors.occupation}
				/>

				{/* Employment type Dropdown */}
				<Dropdown
					label='Employment Type'
					options={employmentTypes.map((type) => ({
						label: type,
						value: type,
					}))}
					selectedOption={selectedEmploymentType}
					onSelect={(option) => {
						setSelectedEmploymentType(option);
						setEmploymentType(option.value);
					}}
					error={formErrors.employmentType}
				/>

				{/* Annual income Dropdown */}
				<Dropdown
					label='Annual Income'
					options={annualIcomeRanges.map((income) => ({
						label: income,
						value: income,
					}))}
					selectedOption={selectedAnnualIncome}
					onSelect={(option) => {
						setSelectedAnnualIncome(option);
						setAnnualIncome(option.value);
					}}
					error={formErrors.annualIncome}
				/>
			</View>
			<Pad size={40} />
			<Button title='Save and Continue' onPress={() => validateForm(submit)} />
		</MainLayout>
	);
}
