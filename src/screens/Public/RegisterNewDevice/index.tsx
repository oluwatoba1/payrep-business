import { ActivityIndicator, AppState, AppStateStatus } from "react-native";
import DeviceInfo from "react-native-device-info";
import { StackScreenProps } from "@react-navigation/stack";

import { Button, PinPad, Typography } from "@components/Forms";
import { MainLayout, Row } from "@components/Layout";
import Pad from "@components/Pad";
import { PublicNavigatorParamList } from "@navigation/types";
import { useEffect, useRef, useState } from "react";
import {
	useRegisterDeviceMutation,
	useVerifyMobileNumberMutation,
} from "@store/apis/authApi";
import useToast from "@hooks/useToast";
import { DEFAULT_ERROR_MESSAGE, RESEND_COUNTDOWN } from "@utils/Constants";
import Colors from "@theme/Colors";
import { formatCountdown } from "@utils/Helpers";

type RegisterNewDeviceProps = StackScreenProps<
	PublicNavigatorParamList,
	"RegisterNewDevice"
>;

export default function RegisterNewDevice({
	navigation: { navigate, goBack },
	route,
}: RegisterNewDeviceProps) {
	const { showToast } = useToast();
	const [registerDevice, { isLoading }] = useRegisterDeviceMutation();
	const [verifyMobileNumber, { isLoading: isResending }] =
		useVerifyMobileNumberMutation();

	const [otp, setOtp] = useState<string>("");
	const [error, setError] = useState<string>("");
	const [countdown, setCountdown] = useState<number>(RESEND_COUNTDOWN);
	const [countdownEndTime, setCountdownEndTime] = useState<number>(
		Date.now() + RESEND_COUNTDOWN * 1000
	);

	const appState = useRef(AppState.currentState);

	const submit = async () => {
		if (!otp) {
			setError("Please input an OTP");
			return;
		}
		try {
			const { status, data, message } = await registerDevice({
				username: route.params.username || "",
				otp,
				device_id: await DeviceInfo.getUniqueId(),
				customer_type: "corporate",
			}).unwrap();
			if (status && !data?.facial_recognition) {
				route.params.action === "password_reset"
					? navigate("ResetPassword", { username: route.params.username })
					: navigate("Login");
				return;
			} else if (status && data?.facial_recognition) {
				navigate("FacialRecognition", {
					token: data.token,
					customer: data.customer,
				});
			} else {
				showToast("danger", message);
			}
		} catch (error: any) {
			showToast(
				"danger",
				error.data?.message || error.message || DEFAULT_ERROR_MESSAGE
			);
		}
	};

	const resend = async () => {
		setOtp("");
		try {
			const { status } = await verifyMobileNumber({
				mobile_number: route.params.username || "",
			}).unwrap();
			if (status) {
				const endTime = Date.now() + RESEND_COUNTDOWN * 1000;
				setCountdownEndTime(endTime);
			}
		} catch (error: any) {
			showToast(
				"danger",
				error.data?.message || error.message || DEFAULT_ERROR_MESSAGE
			);
		}
	};

	useEffect(() => {
		const interval = setInterval(() => {
			const now = Date.now();
			const secondsLeft = Math.max(
				Math.floor((countdownEndTime - now) / 1000),
				0
			);
			setCountdown(secondsLeft);
		}, 1000);

		return () => clearInterval(interval);
	}, [countdownEndTime]);

	useEffect(() => {
		const handleAppStateChange = (nextAppState: AppStateStatus) => {
			if (
				appState.current.match(/inactive|background/) &&
				nextAppState === "active"
			) {
				const now = Date.now();
				const secondsLeft = Math.max(
					Math.floor((countdownEndTime - now) / 1000),
					0
				);
				setCountdown(secondsLeft);
			}
			appState.current = nextAppState;
		};

		const subscription = AppState.addEventListener(
			"change",
			handleAppStateChange
		);

		return () => {
			subscription.remove();
		};
	}, [countdownEndTime]);

	return (
		<MainLayout backAction={goBack} isLoading={isLoading}>
			<Typography title='Device Registration' type='heading' />
			<Pad />
			<Typography
				title='Please enter the OTP sent to your mobile number to register the new device'
				type='body-sb'
			/>

			<Pad size={30} />

			<PinPad
				pin={otp}
				onInput={setOtp}
				codeLength={6}
				secure={false}
				error={error}
			/>

			<Pad size={16} />

			<Row
				alignItems='flex-end'
				justifyContent={countdown === 0 ? "flex-start" : "space-between"}
			>
				{countdown ? (
					<Typography
						title={`Code to be resent in ${formatCountdown(countdown)}`}
						type='body-sb'
						color={Colors.black}
					/>
				) : (
					<Typography
						title='Resend'
						type='body-b'
						color={Colors.primary.base}
						onPress={resend}
					/>
				)}
			</Row>

			{isResending ? (
				<ActivityIndicator size={16} color={Colors.black} />
			) : null}

			<Pad size={50} />

			<Button title='Register' onPress={submit} />
		</MainLayout>
	);
}
