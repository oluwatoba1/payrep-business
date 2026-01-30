import { BackHandler, Image } from "react-native";
import { CompositeScreenProps, useFocusEffect } from "@react-navigation/native";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { StackScreenProps } from "@react-navigation/stack";

import useBvnVerificationValidation from "./validator";
import {
	Button,
	Dropdown,
	IconButton,
	TextInput,
	Typography,
} from "@components/Forms";
import { MainLayout, Row } from "@components/Layout";
import Pad from "@components/Pad";

import { useAppDispatch, useAppSelector } from "@store/hooks";
import useToast from "@hooks/useToast";
import { useCallback, useState } from "react";
import { DEFAULT_ERROR_MESSAGE } from "@utils/Constants";
import { IsThisYouModal } from "@components/Modal";
import { updateBvnData, updateNinData } from "@store/slices/complianceSlice";
import {
	KidashiHomeStackParamList,
	MemberRegistrationStackParamList,
} from "@navigation/types";
import ComponentImages from "@assets/images/components";
import styles from "../styles";
import Colors from "@theme/Colors";
import {
	useWomanBvnLookupMutation,
	useWomanNinLookupMutation,
} from "@store/apis/kidashiApi";
import {
	useBvnLookupMutation,
	useNinLookupMutation,
} from "@store/apis/complianceApi";
import { Stepper } from "@components/Miscellaneous";

interface IKycData {
	customer: string;
	first_name: string;
	middle_name: string;
	last_name: string;
	dob: string;
	bvn?: string;
	nin?: string;
	phoneNumber: string;
	email: string;
	gender: string;
}

type MemberMeansOfVerificationProps = CompositeScreenProps<
	StackScreenProps<
		MemberRegistrationStackParamList,
		"MemberMeansOfVerification"
	>,
	BottomTabScreenProps<KidashiHomeStackParamList, "KidashiDashboard">
>;

export default function MemberMeansOfVerification({
	navigation: { navigate },
}: MemberMeansOfVerificationProps) {
	const dispatch = useAppDispatch();
	const { showToast } = useToast();

	const {
		formData: { idNumber }, // we can rename this to `idNumber` if you want generic
		setIdNumber, // same here, it’s just storing whichever number is typed
		formErrors,
		validateForm,
	} = useBvnVerificationValidation();

	const [bvnLookup, { isLoading: isBvnLoading }] = useBvnLookupMutation();
	const [ninLookup, { isLoading: isNinLoading }] = useNinLookupMutation();

	const [kycData, setKycData] = useState<IKycData>({
		customer: "",
		first_name: "",
		middle_name: "",
		last_name: "",
		dob: "",
		bvn: "",
		nin: "",
		gender: "",
		phoneNumber: "",
		email: "",
	});

	const [selectedOption, setSelectedOption] = useState({
		label: "",
		value: "",
	});

	const [showIsThisYouModal, setShowIsThisYouModal] = useState<boolean>(false);

	// Submit dynamically depending on ID type
	const submit = async () => {
		try {
			if (selectedOption.value === "bvn") {
				const { status, message, data } = await bvnLookup({
					bvn: idNumber,
					customer_type: "individual",
				}).unwrap();
				if (status && data) {
					setKycData({
						...data,
						bvn: idNumber,
						phoneNumber: data.phone_number1,
					});
					setShowIsThisYouModal(true);
				} else {
					showToast("danger", message);
				}
			} else if (selectedOption.value === "nin") {
				const { status, message, data } = await ninLookup({
					nin: idNumber,
					customer_type: "individual",
				}).unwrap();
				if (status && data) {
					setKycData({
						...data,
						nin: idNumber,
						phoneNumber: data.phone_number, // depends on API shape
					});
					setShowIsThisYouModal(true);
				} else {
					showToast("danger", message);
				}
			}
		} catch (error: ErrorResponse | any) {
			console.log(error);
			showToast(
				"danger",
				error.data?.message || error.message || DEFAULT_ERROR_MESSAGE
			);
		}
	};

	// Proceed also depends on ID type
	const proceed = () => {
		setShowIsThisYouModal(false);
		if (selectedOption.value === "bvn") {
			dispatch(
				updateNinData({
					firstName: "",
					lastName: "",
					middleName: "",
					dob: "",
					nin: "",
					gender: "",
					email: "",
					phoneNumber: "",
				})
			);
			dispatch(
				updateBvnData({
					firstName: kycData.first_name,
					lastName: kycData.last_name,
					middleName: kycData.middle_name,
					dob: kycData.dob,
					bvn: kycData.bvn!,
					gender: kycData.gender,
					email: kycData.email,
					phoneNumber: kycData.phoneNumber,
				})
			);
		} else if (selectedOption.value === "nin") {
			dispatch(
				updateBvnData({
					firstName: "",
					lastName: "",
					middleName: "",
					dob: "",
					bvn: "",
					gender: "",
					email: "",
					phoneNumber: "",
				})
			);
			dispatch(
				updateNinData({
					firstName: kycData.first_name,
					lastName: kycData.last_name,
					middleName: kycData.middle_name,
					dob: kycData.dob,
					nin: kycData.nin!,
					gender: kycData.gender,
					email: kycData.email,
					phoneNumber: kycData.phoneNumber,
				})
			);
		}

		navigate("MemberFaceCaptureVerification");
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
		<MainLayout
			isLoading={isBvnLoading || isNinLoading}
			backAction={backAction}
			keyboardAvoidingType='scroll-view'
		>
			<IsThisYouModal
				title={kycData.first_name + " " + kycData.last_name}
				showModal={showIsThisYouModal}
				onClose={() => setShowIsThisYouModal(false)}
				onProceed={proceed}
			/>

			<Pad size={16} />

			<Typography title='Means of Verification' type='heading-sb' />
			<Typography
				title='Select your identity verification method'
				type='label-sb'
			/>

			<Dropdown
				label='ID Type'
				options={[
					{ label: "BVN", value: "bvn" },
					{ label: "NIN", value: "nin" },
				]}
				selectedOption={selectedOption}
				onSelect={setSelectedOption}
			/>

			<TextInput
				label={
					selectedOption.value === "bvn"
						? "BVN (Dial *565*0# to retrieve your BVN)"
						: "NIN (Dial *346# to retrieve your NIN)"
				}
				keyboardType='numeric'
				placeholder={
					selectedOption.value === "bvn" ? "Ex: 22222222222" : "Ex: 12345678901"
				}
				maxLength={11} // adjust if NIN length differs
				onChangeText={setIdNumber}
				value={idNumber}
				error={formErrors.idNumber}
			/>

			<Pad size={100} />

			<Button title='Next' onPress={() => validateForm(submit)} />
		</MainLayout>
	);
}
