import React, { useCallback, useEffect, useState } from "react";
import { BackHandler } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { CompositeScreenProps, useFocusEffect } from "@react-navigation/native";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";

import { MainLayout } from "@components/Layout";
import { Typography, Button, TextInput, Dropdown } from "@components/Forms";
import { KidashiStackParamList, BottomTabParamList } from "@navigation/types";
import useToast from "@hooks/useToast";
import { DEFAULT_ERROR_MESSAGE } from "@utils/Constants";
import useVendorInformation from "./validators";
import Pad from "@components/Pad";
import {
	useFetchLgasMutation,
	useFetchStatesQuery,
} from "@store/apis/generalApi";
import { Stepper } from "@components/Miscellaneous";

type VendorInformationProps = CompositeScreenProps<
	StackScreenProps<KidashiStackParamList, "VendorInformation">,
	BottomTabScreenProps<BottomTabParamList, "Home">
>;

export default function VendorInformation({
	navigation: { navigate },
}: VendorInformationProps) {
	const { showToast } = useToast();
	const {
		formData,
		formErrors,
		validateForm,
		setCommunity,
		setBusinessCategory,
		setState,
		setLga,
	} = useVendorInformation(showToast);

	const { data: statesData, isLoading: statesLoading } = useFetchStatesQuery();

	// Fetch LGAs dynamically
	const [fetchLgas, { isLoading: lgasLoading }] = useFetchLgasMutation();

	// Local states for dropdown selections
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
		navigate("VendorItems");
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
				navigate("Home", { screen: "Dashboard" });
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
		>
			<Stepper steps={3} currentStep={1} />

			<Pad size={20} />

			<Typography
				type='heading4-sb'
				title='Confirm Your Business Information'
			/>
			<Typography
				type='body-r'
				title='Here’s what we have on your business so far. Take a moment to review and update'
			/>
			<Dropdown
				label='Category'
				options={[]}
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

			<Pad size={12} />

			<TextInput
				label='Community'
				placeholder='Enter community'
				onChangeText={setCommunity}
				value={formData.community}
				error={formErrors.community}
			/>

			<Pad size={150} />

			<Button title='Next' onPress={submit} />
		</MainLayout>
	);
}
