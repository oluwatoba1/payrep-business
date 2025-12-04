import { useState } from "react";
import { View, Alert } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";

import { MainLayout } from "@components/Layout";
import { Button, TextInput, Typography } from "@components/Forms";
import { PublicNavigatorParamList } from "@navigation/types";
import Pad from "@components/Pad";
import { NewDeviceDetectedModal } from "@components/Modal";
import useToast from "@hooks/useToast";
import {
	useInitiatePasswordResetMutation,
	useVerifyDeviceMutation,
} from "@store/apis/authApi";
import styles from "./styles";
import { DEFAULT_ERROR_MESSAGE } from "@utils/Constants";
import DeviceInfo from "react-native-device-info";

type ForgotPasswordProps = StackScreenProps<
	PublicNavigatorParamList,
	"ForgotPassword"
>;

export default function ForgotPassword({
	navigation: { navigate, goBack },
}: ForgotPasswordProps) {
	const { showToast } = useToast();
	const [verifyDevice] = useVerifyDeviceMutation();
	const [initiateResetPassword, { isLoading }] =
		useInitiatePasswordResetMutation();

	const [username, setUsername] = useState<string>("");
	const [showRegisterDeviceModal, setShowRegisterDeviceModal] =
		useState<boolean>(false);

	const sendOtp = async () => {
		try {
			const { status } = await verifyDevice({
				mobile_number: `0${username}`,
				type: "corporate",
			}).unwrap();
			if (status) {
				navigate("RegisterNewDevice", { username, action: "password_reset" });
			}
		} catch (error: any) {
			showToast(
				"danger",
				error.data?.message || error.message || DEFAULT_ERROR_MESSAGE
			);
		} finally {
			setShowRegisterDeviceModal(false);
		}
	};

	const proceedToReset = async () => {
		try {
			const { status, message, data } = await initiateResetPassword({
				username,
				device_id: DeviceInfo.getDeviceId(),
			}).unwrap();

			if (data?.is_new_device) {
				setShowRegisterDeviceModal(true);
				return;
			}

			if (status) {
				navigate("ResetPassword", { username });
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
		<MainLayout backAction={goBack} isLoading={isLoading}>
			<NewDeviceDetectedModal
				showModal={showRegisterDeviceModal}
				onClose={() => setShowRegisterDeviceModal(false)}
				onProceed={sendOtp}
			/>
			<View style={styles.titleContainer}>
				<Typography title='Password Recovery' type='heading4-sb' />
				<Typography
					title='Please enter your username to receive an OTP for password recovery.'
					type='body-r'
				/>
			</View>
			<TextInput
				type='text'
				label='Username'
				keyboardType='numeric'
				placeholder='Ex: 8123456789'
				maxLength={10}
				value={username}
				onChangeText={setUsername}
			/>

			<Pad size={40} />

			<Button title='Proceed' onPress={proceedToReset} />
		</MainLayout>
	);
}
