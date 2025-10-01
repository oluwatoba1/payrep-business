import { useState } from "react";
import { View } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";

import { Button, TextInput, Typography } from "@components/Forms";
import { MainLayout } from "@components/Layout";
import { PublicNavigatorParamList } from "@navigation/types";
import { useAppDispatch } from "@store/hooks";
import { mainRegisterStyles } from "../styles";
import useToast from "@hooks/useToast";
import useRegisterMobileValidation from "./validator";
import { setRegistrationDetails } from "@store/slices/authSlice";
import {
	useVerifyMobileNumberMutation,
	useClonePersonalProfileMutation,
} from "@store/apis/authApi";
import { DEFAULT_ERROR_MESSAGE } from "@utils/Constants";
import { HasPersonalProfileModal } from "@components/Modal";

type MobileNumberProps = StackScreenProps<
	PublicNavigatorParamList,
	"MobileNumber"
>;

export default function MobileNumber({
	navigation: { navigate, goBack },
	route,
}: MobileNumberProps) {
	const dispatch = useAppDispatch();
	const { showToast } = useToast();
	const {
		formErrors,
		formData: { mobileNumber },
		validateForm,
		setMobileNumber,
	} = useRegisterMobileValidation();
	const [verifyMobileNumber, { isLoading }] = useVerifyMobileNumberMutation();
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
				navigate("VerificationCode", {
					userType: route.params.userType,
				});
				break;
			case "MOBILE_NUMBER_REGISTRATION":
				navigate("EmailAddress");
				break;

			case "EMAIL_REGISTRATION":
				navigate("CreatePassword");
				break;

			default:
				showToast("danger", "User already exists");
		}
	};

	const submit = async () => {
		try {
			const { status, data, message } = await verifyMobileNumber({
				mobile_number: mobileNumber.padStart(11, "0"),
				type: route.params.userType,
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
					navigate("VerificationCode", {
						userType: route.params.userType,
					});
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
				navigate("Login");
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

			<View style={mainRegisterStyles.mainContainer}>
				<View style={mainRegisterStyles.titleContainer}>
					<Typography title='Create your Account' type='heading4-sb' />
					<Typography
						title='Register with a number you have access to'
						type='subheading'
					/>
				</View>

				<View style={mainRegisterStyles.textInputContainer}>
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
				</View>
				<View>
					<Button title='Continue' onPress={() => validateForm(submit)} />
				</View>
			</View>
		</MainLayout>
	);
}
