import React, { useCallback, useEffect, useState, useRef } from "react";
import { ActivityIndicator, BackHandler, View } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { CompositeScreenProps, useFocusEffect } from "@react-navigation/native";

import { MainLayout } from "@components/Layout";
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
import useGuarantorDetails from "./validators";
import { Stepper } from "@components/Miscellaneous";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { setRegistrationDetails } from "@store/slices/kidashiSlice";
import { useNinLookupMutation } from "@store/apis/complianceApi";
import { useFetchKidashiLgasMutation, useFetchKidashiStatesQuery } from "@store/apis/kidashiApi";

type GuarantorDetailsProps = CompositeScreenProps<
	StackScreenProps<KidashiRegistrationStackParamList, "GuarantorDetails">,
	StackScreenProps<BottomTabParamList, "Home">
>;

interface DefaultDropdownOption {
	label: string;
	value: string;
}

export default function GuarantorDetails({
	navigation: { navigate },
}: GuarantorDetailsProps) {
	const dispatch = useAppDispatch();
	const vendorGuarantors = useAppSelector(
		(state) => state.kidashi.registration.guarantors
	);
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
		guarantors,
		setGuarantors,
		guarantorNumber,
		setNin,
		setRelationship,
		clearFormError,
	} = useGuarantorDetails();

	const { data: statesData, isLoading: statesLoading } = useFetchKidashiStatesQuery();

	const sortedStates = statesData?.data
		? [
			...statesData.data.filter((s: any) => s.name === "Kaduna"),
			...statesData.data.filter((s: any) => s.name !== "Kaduna"),
		]
		: [];

	const [fetchKidashiLgas, { isLoading: lgasLoading }] = useFetchKidashiLgasMutation();
	const [ninLookup, { isLoading: ninLookupLoading }] = useNinLookupMutation();

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

	const [ninLookupPerformed, setNinLookupPerformed] = useState<{
		[key: number]: string;
	}>({});

	const [hasNINData, setHasNINData] = useState(false);

	const ninLookupInProgress = useRef(false);

	const clearFormFields = () => {
		setFirstName("");
		setLastName("");
		setGender("");
		setPhoneNumber("");
		setDateOfBirth("");
		setEmail("");
		setSelectedGender(undefined);
		setHasNINData(false);
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

	const _ninLookup = async (nin: string) => {
		if (ninLookupInProgress.current) return;
		// if (ninLookupPerformed[guarantorNumber] === nin) return;

		try {
			ninLookupInProgress.current = true;

			const { status, message, data } = await ninLookup({
				nin: nin,
			}).unwrap();

			if (status && data) {
				setHasNINData(true);

				setNinLookupPerformed((prev) => ({
					...prev,
					[guarantorNumber]: nin,
				}));

				setFirstName(data.first_name || "");
				setLastName(data.last_name || "");
				setGender(data.gender || "");
				setPhoneNumber(data.phone_number || "");
				setDateOfBirth(data.date_of_birth || "");

				// Update selected gender for the dropdown
				if (data.gender) {
					setSelectedGender({ label: data.gender, value: data.gender });
				}
			} else {
				setHasNINData(false);
				showToast("danger", message);
			}
		} catch (error: ErrorResponse | any) {
			setHasNINData(false);
			showToast(
				"danger",
				error.data?.message || error.message || DEFAULT_ERROR_MESSAGE
			);
		} finally {
			ninLookupInProgress.current = false;
		}
	};

	const handleSubmit = () => {
		if (!agreed) {
			showToast("danger", "Please confirm the guarantor details");
			return;
		}

		validateForm((updatedGuarantors) => {
			console.log("Guarantors:", updatedGuarantors);

			dispatch(setRegistrationDetails({ guarantors: updatedGuarantors }));
			if (updatedGuarantors.length === 2) {
				navigate("ReviewDetails");
			} else {
				clearFormFields();
				setSelectedState(undefined);
				setSelectedLga(undefined);
				setSelectedRelationship(undefined);
				setAgreed(false);
				setNin("");
				showToast("success", "Guarantor 1 saved. Please add Guarantor 2");
			}
		});
	};

	useEffect(() => {
		if (selectedState && formData.state) {
			_fetchLgas();
		}
	}, [selectedState, formData.state]);

	useEffect(() => {
		if (formData.nin && formData.nin.length === 11) {
			_ninLookup(formData.nin);
		} else if (formData.nin && formData.nin.length < 11) {
			setHasNINData(false);
		}
	}, [formData.nin, guarantorNumber]);

	useEffect(() => {
		const existingGuarantor = guarantors[guarantorNumber - 1];

		if (existingGuarantor) {
			setNin(existingGuarantor.nin || "");
			setFirstName(existingGuarantor.first_name || "");
			setLastName(existingGuarantor.surname || "");
			setPhoneNumber(existingGuarantor.phone || "");
			setDateOfBirth(existingGuarantor.dob || "");
			setEmail(existingGuarantor.email || "");

			if (existingGuarantor.gender) {
				setGender(existingGuarantor.gender);
				setSelectedGender({
					label: existingGuarantor.gender,
					value: existingGuarantor.gender,
				});
			}

			if (existingGuarantor.state_id) {
				setState(existingGuarantor.state_id);
				const state = sortedStates.find(
					(s: any) => s.id === existingGuarantor.state_id
				);
				if (state) {
					setSelectedState({ label: state.name, value: state.id });
				}
			}

			if (existingGuarantor.lga_id) {
				setLga(existingGuarantor.lga_id);
			}

			if (existingGuarantor.relationship) {
				setRelationship(existingGuarantor.relationship);
				const relationshipLabel =
					existingGuarantor.relationship.charAt(0).toUpperCase() +
					existingGuarantor.relationship.slice(1);
				setSelectedRelationship({
					label: relationshipLabel,
					value: existingGuarantor.relationship,
				});
			}

			if (existingGuarantor.nin) {
				setHasNINData(true);
				setNinLookupPerformed((prev) => ({
					...prev,
					[guarantorNumber]: existingGuarantor.nin,
				}));
			}
		} else {
			clearFormFields();
			setNin("");
			setSelectedState(undefined);
			setSelectedLga(undefined);
			setSelectedRelationship(undefined);
			setAgreed(false);
		}
	}, [guarantorNumber]);

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

	const guarantorDetails = vendorGuarantors.length
		? vendorGuarantors
		: guarantors;

	return (
		<MainLayout
			keyboardAvoidingType='scroll-view'
			backAction={() => {
				setGuarantors([]);
				navigate("VendorItems");
			}}
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
					label='NIN'
					placeholder='Ex: 12345678901'
					keyboardType='numeric'
					maxLength={11}
					onChangeText={(text) => {
						clearFormError("nin");
						setNin(text);
						if (text.length < 11) {
							setHasNINData(false);
						}
					}}
					value={formData.nin}
					error={formErrors.nin}
					rightNode={ninLookupLoading ? <ActivityIndicator /> : undefined}
				/>

				<Pad size={12} />

				<TextInput
					label='First Name'
					placeholder='e.g John'
					onChangeText={(text) => {
						clearFormError("firstName");
						setFirstName(text);
					}}
					value={formData.firstName}
					error={formErrors.firstName}
					editable={!hasNINData}
				/>

				<Pad size={12} />

				<TextInput
					label='Last Name'
					placeholder='e.g Doe'
					onChangeText={(text) => {
						clearFormError("lastName");
						setLastName(text);
					}}
					value={formData.lastName}
					error={formErrors.lastName}
					editable={!hasNINData}
				/>

				<Pad size={12} />

				<Dropdown
					label='State'
					options={
						sortedStates.map((option: any) => ({
							label: option.name,
							value: String(option.id),
						})) || []
					}
					selectedOption={selectedState}
					onSelect={(option) => {
						clearFormError("state");
						clearFormError("lga");
						setSelectedState(option);
						setState(option.value);
						setSelectedLga(undefined); // Reset LGA when state changes
						setLga("");
					}}
					error={formErrors.state}
					isLoading={statesLoading}
				/>

				<Pad size={12} />

				<Dropdown
					label='Local Govt. Area'
					options={
						lgas.map((option: any) => ({
							label: option.name,
							value: String(option.id),
						})) || []
					}
					selectedOption={selectedLga}
					onSelect={(option) => {
						clearFormError("lga");
						setSelectedLga(option);
						setLga(option.value);
					}}
					error={formErrors.lga}
					isLoading={lgasLoading}
				/>

				<Pad size={12} />

				{hasNINData ? (
					<TextInput
						label='Gender'
						value={selectedGender?.label || formData.gender || ""}
						editable={false}
					/>
				) : (
					<Dropdown
						label='Gender'
						options={[
							{ label: "Male", value: "Male" },
							{ label: "Female", value: "Female" },
						]}
						selectedOption={selectedGender}
						onSelect={(option) => {
							clearFormError("gender");
							setSelectedGender(option);
							setGender(option.value);
						}}
						error={formErrors.gender}
					/>
				)}

				<Pad size={12} />

				<TextInput
					type='phone'
					label='Phone Number'
					keyboardType='numeric'
					placeholder='Ex: 08012345678'
					value={formData.phoneNumber}
					onChangeText={(text) => {
						clearFormError("phoneNumber");
						setPhoneNumber(text);
					}}
					maxLength={11}
					error={formErrors.phoneNumber}
				/>

				<Pad size={12} />

				{hasNINData ? (
					<TextInput
						label='Date of Birth'
						value={formData.dateOfBirth || ""}
						editable={false}
					/>
				) : (
					<DateField
						label='Date of Birth'
						onDateChange={(date) => {
							clearFormError("dateOfBirth");
							setDateOfBirth(date);
						}}
						error={formErrors.dateOfBirth}
					/>
				)}

				<Pad size={12} />

				<TextInput
					label='Email'
					placeholder='e.g. zababubakarr@gmail.com'
					onChangeText={(text) => {
						clearFormError("email");
						setEmail(text);
					}}
					value={formData.email}
					error={formErrors.email}
					autoCapitalize='none'
					keyboardType='email-address'
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
						clearFormError("relationship");
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

			<Button
				title={guarantorNumber === 1 ? "Next" : "Submit"}
				onPress={handleSubmit}
				disabled={!agreed}
			/>
			<Pad size={20} />
		</MainLayout>
	);
}
