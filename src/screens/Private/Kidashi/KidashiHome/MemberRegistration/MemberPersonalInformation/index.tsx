import { useState, useEffect } from "react";
import { StackScreenProps } from "@react-navigation/stack";

import { MainLayout } from "@components/Layout";
import {
	Button,
	DateField,
	Dropdown,
	TextInput,
	Typography,
} from "@components/Forms";
import { useUpdateLocationMutation } from "@store/apis/customerApi";
import {
	useFetchStatesQuery,
	useFetchLgasMutation,
	useFetchCountriesQuery,
} from "@store/apis/generalApi";
import Pad from "@components/Pad";
import useLocationValidation from "./validator";
import { MemberRegistrationStackParamList } from "@navigation/types";
import useToast from "@hooks/useToast";
import { DEFAULT_ERROR_MESSAGE } from "@utils/Constants";

type MemberPersonalInformationProps = StackScreenProps<
	MemberRegistrationStackParamList,
	"MemberPersonalInformation"
>;

export default function MemberPersonalInformation({
	navigation: { navigate, goBack },
}: MemberPersonalInformationProps) {
	const {
		formData,
		formErrors,
		validateForm,
		setCountry,
		setState,
		setLga,
		setResidentialAddress,
	} = useLocationValidation();
	const { showToast } = useToast();

	const [updateLocation, { isLoading }] = useUpdateLocationMutation();

	// Fetch states and countries
	const { data: statesData, isLoading: statesLoading } = useFetchStatesQuery();
	const { data: countriesData, isLoading: countriesLoading } =
		useFetchCountriesQuery();

	// Fetch LGAs dynamically
	const [fetchLgas, { isLoading: lgasLoading }] = useFetchLgasMutation();

	// Local states for dropdown selections
	const [selectedState, setSelectedState] = useState<
		DefaultDropdownOption | undefined
	>(undefined);
	const [selectedCountry, setSelectedCountry] =
		useState<DefaultDropdownOption | null>(null);
	const [lgas, setLgas] = useState<any[]>([]);
	const [selectedLga, setSelectedLga] = useState<
		DefaultDropdownOption | undefined
	>(undefined);

	const submit = async () => {
		try {
			const { status, message } = await updateLocation({
				state: formData.state,
				country: formData.country,
				lga: formData.lga,
				residential_address: formData.residentialAddress,
			}).unwrap();
			if (status) {
				navigate("MemberMeansOfIdentification");
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

	// Update LGAs when state changes
	useEffect(() => {
		if (selectedState) {
			_fetchLgas();
		}
	}, [selectedState]);

	useEffect(() => {
		let country = null;
		if (countriesData?.data) {
			country = countriesData?.data.find(
				(country: ICountry) => country.name?.toLowerCase() === "nigeria"
			);
		}

		if (country) {
			setSelectedCountry({ label: country.name, value: country.id });
			setCountry(country.id);
		}
	}, [countriesData]);

	return (
		<MainLayout
			backAction={goBack}
			isLoading={isLoading}
			keyboardAvoidingType='scroll-view'
		>
			<Typography title='Complete Your Profile' type='heading-sb' />
			<Typography
				type='label-r'
				title='Provide your information to complete your profile creation'
			/>

			<Pad size={24} />

			<TextInput
				label='First Name'
				placeholder='Zainab'
				onChangeText={setResidentialAddress}
				value={formData.residentialAddress}
				error={formErrors.residentialAddress}
			/>

			<Pad />

			<TextInput
				label='Last Name'
				placeholder='Abubakar'
				onChangeText={setResidentialAddress}
				value={formData.residentialAddress}
				error={formErrors.residentialAddress}
			/>

			<Pad />

			<DateField
				label='Date of Birth'
				date=''
				onDateChange={() => {}}
				error=''
			/>

			<Pad />

			<Dropdown
				label='Gender'
				options={[
					{ label: "Male", value: "Male" },
					{ label: "Female", value: "Female" },
				]}
				selectedOption={selectedCountry}
				onSelect={(option) => {
					setSelectedCountry(option);
					setCountry(option.value);
				}}
				error={formErrors.country}
				isLoading={countriesLoading}
				editable={false}
			/>

			<Pad />

			<Dropdown
				label='Marital Status'
				options={[
					{ label: "Single", value: "Single" },
					{ label: "Married", value: "Married" },
					{ label: "Divorced", value: "Divorced" },
					{ label: "Widowed", value: "Widowed" },
				]}
				selectedOption={selectedCountry}
				onSelect={(option) => {
					setSelectedCountry(option);
					setCountry(option.value);
				}}
				error={formErrors.country}
				isLoading={countriesLoading}
				editable={false}
			/>

			<Pad />

			{/* Country Dropdown */}
			<Dropdown
				label='Country'
				options={
					countriesData?.data.map((option: any) => ({
						label: option.name,
						value: option.id,
					})) || []
				}
				selectedOption={selectedCountry}
				onSelect={(option) => {
					setSelectedCountry(option);
					setCountry(option.value);
				}}
				error={formErrors.country}
				isLoading={countriesLoading}
				editable={false}
			/>

			<Pad />

			{/* State Dropdown */}
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
				error={formErrors.state}
				isLoading={statesLoading}
			/>

			<Pad />

			{/* LGA Dropdown */}
			<Dropdown
				label='LGA'
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

			<Pad />

			<TextInput
				label='Address'
				placeholder='Enter your address'
				onChangeText={setResidentialAddress}
				value={formData.residentialAddress}
				error={formErrors.residentialAddress}
			/>

			<Pad />

			<TextInput
				label='Community'
				placeholder='Enter community'
				onChangeText={setResidentialAddress}
				value={formData.residentialAddress}
				error={formErrors.residentialAddress}
			/>

			<Pad size={40} />

			<Button
				title='Save'
				onPress={() => navigate("MemberMeansOfIdentification")}
			/>
		</MainLayout>
	);
}
