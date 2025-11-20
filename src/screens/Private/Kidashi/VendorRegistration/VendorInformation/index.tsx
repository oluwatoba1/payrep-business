import React, { useCallback, useEffect, useState } from "react";
import { BackHandler } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { CompositeScreenProps, useFocusEffect } from "@react-navigation/native";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";

import { MainLayout } from "@components/Layout";
import { Typography, Button, TextInput, Dropdown } from "@components/Forms";
import {
	KidashiRegistrationStackParamList,
	BottomTabParamList,
} from "@navigation/types";
import useToast from "@hooks/useToast";
import { DEFAULT_ERROR_MESSAGE, VENDOR_CATEGORIES } from "@utils/Constants";
import useVendorInformation from "./validators";
import Pad from "@components/Pad";
import { Stepper } from "@components/Miscellaneous";
import { useAppDispatch } from "@store/hooks";
import { setRegistrationDetails } from "@store/slices/kidashiSlice";
import { useFetchKidashiLgasMutation, useFetchKidashiStatesQuery } from "@store/apis/kidashiApi";

type VendorInformationProps = CompositeScreenProps<
	StackScreenProps<KidashiRegistrationStackParamList, "VendorInformation">,
	BottomTabScreenProps<BottomTabParamList, "Home">
>;

export default function VendorInformation({
	navigation: { navigate },
}: VendorInformationProps) {
	const dispatch = useAppDispatch();
	const { showToast } = useToast();
	const {
		formData,
		formErrors,
		validateForm,
		setBusinessType,
		setState,
		setLga,
		setCommunity,
	} = useVendorInformation();

	const { data: statesData, isLoading: statesLoading } = useFetchKidashiStatesQuery();

	// Move Kaduna to the first position if present
	const sortedStates = statesData?.data
		? [
			...statesData.data.filter((s: any) => s.name === "Kaduna"),
			...statesData.data.filter((s: any) => s.name !== "Kaduna"),
		]
		: [];

	// Fetch LGAs dynamically
	const [fetchKidashiLgas, { isLoading: lgasLoading }] = useFetchKidashiLgasMutation();

	// Local states for dropdown selections
	const [selectedState, setSelectedState] = useState<
		DefaultDropdownOption | undefined
	>(undefined);
	const [lgas, setLgas] = useState<any[]>([]);
	const [selectedLga, setSelectedLga] = useState<
		DefaultDropdownOption | undefined
	>(undefined);
	const [selectedCategory, setSelectedCategory] = useState<
		DefaultDropdownOption | undefined
	>(undefined);

	const handleSubmit = () => {
		validateForm(
			(vendorData: Omit<VendorRegistrationRequest, "cba_customer_id">) => {
				dispatch(setRegistrationDetails({ ...vendorData }));
				navigate("VendorItems");
			}
		);
	};

	const _fetchLgas = async () => {
		try {
			const { status, message, data } = await fetchKidashiLgas({
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
				title='Provide Your Business Information'
			/>
			<Typography
				type='body-r'
				title='Take a moment to update your business information'
			/>
			<Dropdown
				label='Category'
				options={VENDOR_CATEGORIES}
				selectedOption={selectedCategory}
				onSelect={(option) => {
					setSelectedCategory(option);
					setBusinessType(option.value);
				}}
				error={formErrors.businessType}
				isLoading={statesLoading}
			/>

			<Pad size={12} />

			<Dropdown
				label='State'
				options={
					sortedStates.map((option: any) => ({
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

			<TextInput
				label='Community'
				placeholder='Enter community'
				onChangeText={setCommunity}
				value={formData.community}
				error={formErrors.community}
			/>

			<Pad size={150} />

			<Button title='Next' onPress={handleSubmit} />
		</MainLayout>
	);
}
