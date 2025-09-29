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
	Checkbox,
} from "@components/Forms";
import {
	KidashiRegistrationStackParamList,
	BottomTabParamList,
} from "@navigation/types";
import useToast from "@hooks/useToast";
import { DEFAULT_ERROR_MESSAGE } from "@utils/Constants";
import Pad from "@components/Pad";
import {
	useFetchLgasMutation,
	useFetchStatesQuery,
} from "@store/apis/generalApi";
import useGuarantorDetails from "./validators";
import { Stepper } from "@components/Miscellaneous";
import { useAppDispatch } from "@store/hooks";
import { setRegistrationDetails } from "@store/slices/kidashiSlice";

type GuarantorDetailsProps = CompositeScreenProps<
	StackScreenProps<KidashiRegistrationStackParamList, "GuarantorDetails">,
	StackScreenProps<BottomTabParamList, "Home">
>;

export default function GuarantorDetails({
	navigation: { navigate },
}: GuarantorDetailsProps) {
	const dispatch = useAppDispatch();
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
		guarantorNumber,
		setNin,
		setRelationship,
	} = useGuarantorDetails();

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
	const [selectedRelationship, setSelectedRelationship] = useState<
		DefaultDropdownOption | undefined
	>(undefined);
	const [agreed, setAgreed] = useState<boolean>(false);

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

	const handleSubmit = () => {
		validateForm((guarantors) => {
			console.log(guarantors);
			setSelectedGender(undefined);
			setSelectedState(undefined);
			setSelectedLga(undefined);
			setSelectedRelationship(undefined);
			setDateOfBirth(undefined);
			dispatch(setRegistrationDetails({ guarantors }));
			navigate("ReviewDetails");
		});
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
			backAction={() => navigate("VendorItems")}
		>
			<Stepper steps={3} currentStep={3} />

			<Pad size={20} />

			<Typography
				type='heading4-sb'
				title={`Guarantor Details #${guarantorNumber}`}
			/>
			<Typography
				type='body-r'
				title='Provide the details of a trusted guarantor. This helps us confirm credibility and support your application review'
			/>

			<View>
				<TextInput
					label='First Name'
					placeholder='e.g John'
					onChangeText={setFirstName}
					value={formData.firstName}
					error={formErrors.firstName}
				/>

				<Pad size={12} />

				<TextInput
					label='Last Name'
					placeholder='e.g Doe'
					onChangeText={setLastName}
					value={formData.lastName}
					error={formErrors.lastName}
				/>

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
						setState(option.value);
						setSelectedLga(undefined); // Reset LGA when state changes
					}}
					error=''
					isLoading={statesLoading}
				/>

				<Pad size={12} />

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
						setLga(option.value);
					}}
					error={formErrors.lga}
					isLoading={lgasLoading}
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

				<Pad size={12} />

				<TextInput
					label='Email'
					placeholder='e.g. zababubakarr@gmail.com'
					onChangeText={setEmail}
					value={formData.email}
					error={formErrors.email}
				/>

				<Pad size={12} />

				<TextInput
					label='NIN'
					keyboardType='numeric'
					placeholder='Ex: 12345678901'
					maxLength={11} // adjust if NIN length differs
					onChangeText={setNin}
					value={formData.nin}
					error={formErrors.nin}
				/>

				<Pad size={12} />

				<Dropdown
					label='Relationship'
					options={[
						{ label: "Family", value: "family" },
						{ label: "Friend", value: "friend" },
						{ label: "Colleague", value: "colleague" },
					]}
					selectedOption={selectedRelationship}
					onSelect={(option) => {
						setSelectedRelationship(option);
						setRelationship(option.value);
					}}
					error={formErrors.relationship}
				/>
			</View>

			<Pad size={12} />

			<Checkbox
				label='I confirm that the guarantor details I provided are correct, and that my guarantor is aware and has agreed to stand as my guarantor'
				value={agreed}
				onPress={() => setAgreed(!agreed)}
			/>

			<Pad size={80} />

			<Button title='Next' onPress={handleSubmit} />
			<Pad size={20} />
		</MainLayout>
	);
}
