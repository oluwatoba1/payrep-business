import React, { useCallback, useEffect, useState } from "react";
import { BackHandler, View } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { CompositeScreenProps, useFocusEffect } from "@react-navigation/native";

import { MainLayout, Row } from "@components/Layout";
import {
	Typography,
	Button,
	TextInput,
	Dropdown,
	DateField,
} from "@components/Forms";
import { KidashiStackParamList, BottomTabParamList } from "@navigation/types";
import useToast from "@hooks/useToast";
import { DEFAULT_ERROR_MESSAGE } from "@utils/Constants";
import Pad from "@components/Pad";
import { useUpdateBusinessInformationMutation } from "@store/apis/customerApi";
import {
	useFetchLgasMutation,
	useFetchStatesQuery,
} from "@store/apis/generalApi";
import useGuarantorDetails from "./validators";

type GuarantorDetailsProps = CompositeScreenProps<
	StackScreenProps<KidashiStackParamList, "GuarantorDetails">,
	StackScreenProps<BottomTabParamList, "Home">
>;

export default function GuarantorDetails({
	navigation: { navigate },
}: GuarantorDetailsProps) {
	const { showToast } = useToast();
	const {
		formData,
		formErrors,
		validateForm,
		setFirstName,
		setLastName,
		setGender,
		setPhoneNumber,
		setDateOfBirth,
		setState,
		setLga,
		setEmail,
		setNin,
	} = useGuarantorDetails();
	const [updateBusinessInformation, { isLoading }] =
		useUpdateBusinessInformationMutation();

	const { data: statesData, isLoading: statesLoading } = useFetchStatesQuery();

	// Fetch LGAs dynamically
	const [fetchLgas, { isLoading: lgasLoading }] = useFetchLgasMutation();

	// Local states for dropdown selections
	const [selectedGender, setSelectedGender] = useState<
		DefaultDropdownOption | undefined
	>(undefined);
	const [selectedState, setSelectedState] = useState<
		DefaultDropdownOption | undefined
	>(undefined);
	const [lgas, setLgas] = useState<any[]>([]);
	const [selectedLga, setSelectedLga] = useState<
		DefaultDropdownOption | undefined
	>(undefined);

	const _fetchLgas = async () => {
		try {
			const { status, message, data } = await fetchLgas({
				state: formData.state,
			}).unwrap();
			if (status) {
				setLgas(data);
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

	const submit = async () => {
		navigate("ReviewDetails");
	};

	// Update LGAs when state changes
	useEffect(() => {
		if (selectedState) {
			_fetchLgas();
		}
	}, [selectedState]);

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
			backAction={() => navigate("Home", { screen: "Dashboard" })}
			isLoading={isLoading}
			rightTitle='Guarantor Details'
		>
			<Typography
				type='heading4-sb'
				title='Confirm Your Business Information'
			/>
			<Typography
				type='body-r'
				title='Here’s what we have on your business so far. Take a moment to review and update'
			/>
			<Row alignItems='center' justifyContent='flex-start' gap={10}>
				<TextInput
					label='First Name'
					placeholder='e.g John'
					onChangeText={setFirstName}
					value={formData.firstName}
					error={formErrors.firstName}
				/>

				<TextInput
					label='Last Name'
					placeholder='e.g Doe'
					onChangeText={setLastName}
					value={formData.lastName}
					error={formErrors.lastName}
				/>
			</Row>

			<Pad size={12} />

			<Dropdown
				label='State'
				options={
					statesData?.data.map((option: any) => ({
						label: option.name,
						value: option.id,
					})) || []
				}
				selectedOption={selectedState}
				onSelect={(option) => {
					setSelectedState(option);

					setSelectedLga(undefined); // Reset LGA when state changes
				}}
				error=''
				isLoading={statesLoading}
			/>

			<Pad size={12} />

			<Dropdown
				label='Gender'
				options={[
					{ label: "Male", value: "male" },
					{ label: "Female", value: "female" },
				]}
				selectedOption={selectedGender}
				onSelect={(option) => {
					setSelectedGender(option);
					setGender(option.value);
				}}
				error={formErrors.gender}
			/>

			<Pad size={12} />

			<TextInput
				type='phone'
				label='Phone Number'
				keyboardType='numeric'
				placeholder='Ex: 8000000000'
				value={formData.phoneNumber}
				onChangeText={setPhoneNumber}
				maxLength={11}
				error={formErrors.phoneNumber}
			/>

			<Pad size={12} />

			<DateField
				label='Date of Birth'
				onDateChange={setDateOfBirth}
				error={formErrors.dateOfBirth}
			/>

			<Row alignItems='center' justifyContent='flex-start' gap={10}>
				<Dropdown
					label='State'
					options={
						statesData?.data.map((option: any) => ({
							label: option.name,
							value: option.id,
						})) || []
					}
					selectedOption={selectedState}
					onSelect={(option) => {
						setSelectedState(option);

						setSelectedLga(undefined); // Reset LGA when state changes
					}}
					error=''
					isLoading={statesLoading}
				/>

				{/* LGA Dropdown */}
				<Dropdown
					label='Local Govt. Area'
					options={
						lgas.map((option: any) => ({
							label: option.name,
							value: option.id,
						})) || []
					}
					selectedOption={selectedLga}
					onSelect={(option) => {
						setSelectedLga(option);
					}}
					error=''
					isLoading={lgasLoading}
				/>
			</Row>

			<Pad size={12} />

			<TextInput
				label='Email'
				placeholder='e.g. zababubakarr@gmail.com'
				onChangeText={setEmail}
				value={formData.email}
				error={formErrors.email}
			/>

			<TextInput
				label='NIN'
				keyboardType='numeric'
				placeholder='Ex: 12345678901'
				maxLength={11} // adjust if NIN length differs
				onChangeText={setNin}
				value={formData.nin}
				error={formErrors.nin}
			/>

			<Pad size={40} />

			<Button title='Save' onPress={submit} />
		</MainLayout>
	);
}
