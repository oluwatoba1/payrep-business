import { useState } from "react";
import { StackScreenProps } from "@react-navigation/stack";

import { Button, TextInput, Typography, IconButton } from "@components/Forms";
import { MainLayout, Row } from "@components/Layout";
import {
	KidashiBottomTabParamList,
	MemberRegistrationStackParamList,
} from "@navigation/types";
import { useAppDispatch } from "@store/hooks";
import useToast from "@hooks/useToast";
import useRegisterMobileValidation from "./validator";
import { setRegistrationDetails } from "@store/slices/authSlice";
import {
	useVerifyMobileNumberMutation,
	useClonePersonalProfileMutation,
} from "@store/apis/authApi";
import { DEFAULT_ERROR_MESSAGE } from "@utils/Constants";
import { HasPersonalProfileModal } from "@components/Modal";
import Pad from "@components/Pad";
import { Image } from "react-native";
import ComponentImages from "@assets/images/components";
import styles from "../styles";
import { CompositeScreenProps } from "@react-navigation/native";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import Colors from "@theme/Colors";
import { useVerifyWomanMobileNumberMutation } from "@store/apis/kidashiApi";

type MemberPhoneNumberProps = CompositeScreenProps<
	StackScreenProps<MemberRegistrationStackParamList, "MemberPhoneNumber">,
	BottomTabScreenProps<KidashiBottomTabParamList, "Trust Circles">
>;

export default function MemberPhoneNumber({
	navigation: { navigate, goBack },
}: MemberPhoneNumberProps) {
	const dispatch = useAppDispatch();
	const { showToast } = useToast();
	const {
		formErrors,
		formData: { mobileNumber },
		validateForm,
		setMobileNumber,
	} = useRegisterMobileValidation();
	const [verifyMobileNumber, { isLoading }] =
		useVerifyWomanMobileNumberMutation();
	const [clonePersonalProfile, { isLoading: isCloning }] =
		useClonePersonalProfileMutation();

	const [hasPersonalProfileModal, setHasPersonalProfileModal] =
		useState<boolean>(false);
	const [personalCustomerId, setPersonalCustomerId] = useState<string | null>(
		null
	);

	const handleNavigation = (stage: RegistrationSteps) => {
		switch (stage) {
			case "NEW_USER":
				navigate("MemberPhoneNumberVerification");
				break;

			case "MOBILE_NUMBER_REGISTRATION":
				navigate("MemberEmail");
				break;

			case "EMAIL_REGISTRATION":
				navigate("MemberMeansOfVerification");
				break;

			case "BVN_VERIFICATION":
				navigate("MemberLocationDetails");
				break;

			case "ADDRESS_REGISTRATION":
				navigate("MemberMeansOfIdentification");
				break;

			case "IDENTIFICATION_REGISTRATION":
				navigate("MemberPep");
				break;

			case "PEP_IDENTIFICATION":
				navigate("MemberSourceOfIncome");
				break;

			case "SOURCE_OF_INCOME":
				navigate("MemberAttestation");
				break;

			default:
				showToast("danger", "User already exists");
		}
	};

	const submit = async () => {
		try {
			const { status, data, message } = await verifyMobileNumber({
				mobile_number: mobileNumber.padStart(11, "0"),
				type: "individual",
			}).unwrap();

			if (status) {
				if (data.has_personal_profile) {
					setHasPersonalProfileModal(true);
					setPersonalCustomerId(data.customer_id);
					return;
				}
				dispatch(
					setRegistrationDetails({
						mobileNumber: mobileNumber.padStart(11, "0"),
						email: "",
						customer_id: data.customer_id || "",
					})
				);

				if (data.stage == "NEW_USER") {
					navigate("MemberPhoneNumberVerification");
					return;
				}
				handleNavigation(data.stage);
				return;
			}
			showToast("danger", message);
		} catch (error: any) {
			showToast(
				"danger",
				error.data?.message || error.message || DEFAULT_ERROR_MESSAGE
			);
		}
	};

	const _clonePersonalProfile = async () => {
		try {
			const { status, message } = await clonePersonalProfile({
				customer_id: personalCustomerId || "",
			}).unwrap();

			if (status) {
				showToast("success", "Business profile created successfully");
				setHasPersonalProfileModal(false);
				goBack();
				return;
			}
			showToast("danger", message);
		} catch (error: any) {
			showToast(
				"danger",
				error.data?.message || error.message || DEFAULT_ERROR_MESSAGE
			);
		}
	};

	return (
		<MainLayout backAction={goBack} isLoading={isLoading || isCloning}>
			<HasPersonalProfileModal
				showModal={hasPersonalProfileModal}
				onClose={() => setHasPersonalProfileModal(false)}
				onSubmit={_clonePersonalProfile}
			/>

			<Typography title='Create your Account' type='heading-sb' />
			<Typography
				title='Register with a number you have access to'
				type='label-sb'
			/>

			<TextInput
				type='phone'
				label='Mobile Number'
				keyboardType='numeric'
				placeholder='Ex: 08123456789'
				value={mobileNumber}
				onChangeText={setMobileNumber}
				maxLength={11}
				error={formErrors.mobileNumber}
			/>

			<Pad size={176} />

			<Button title='Continue' onPress={() => validateForm(submit)} />

			<Pad size={360} />

			<IconButton
				onPress={() =>
					navigate("Trust Circles", { screen: "EnterAccountNumber" })
				}
			>
				<Row gap={8} alignItems='center' justifyContent='center'>
					<Typography
						title='Already have a PayRep Account'
						type='label-sb'
						color={Colors.primary["600"]}
					/>
					<Image
						source={ComponentImages.kidashiCard.arrowRight}
						style={styles.skipIcon}
					/>
				</Row>
			</IconButton>
		</MainLayout>
	);
}
