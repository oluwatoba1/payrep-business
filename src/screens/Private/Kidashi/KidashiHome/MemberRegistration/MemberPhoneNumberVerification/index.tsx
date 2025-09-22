import { useRef } from "react";
import {
	ActivityIndicator,
	View,
	AppState,
	AppStateStatus,
} from "react-native";
import { MainLayout, Row } from "@components/Layout";
import { Button, HybridTypography, Typography } from "@components/Forms";
import { StackScreenProps } from "@react-navigation/stack";
import { MemberRegistrationStackParamList } from "@navigation/types";
import { useEffect, useState } from "react";
import PinPad from "@components/Forms/PinPad";
import Pad from "@components/Pad";
import { formatCountdown } from "@utils/Helpers";
import { DEFAULT_ERROR_MESSAGE, RESEND_COUNTDOWN } from "@utils/Constants";
import { useAppSelector } from "@store/hooks";
import useToast from "@hooks/useToast";
import useVerifyMobileValidation from "./validators";
import {
	useRegisterMobileNumberMutation,
	useVerifyMobileNumberMutation,
} from "@store/apis/authApi";
import Colors from "@theme/Colors";

type MemberPhoneNumberVerificationProps = StackScreenProps<
	MemberRegistrationStackParamList,
	"MemberPhoneNumberVerification"
>;

export default function MemberPhoneNumberVerification({
	navigation: { navigate, goBack },
}: MemberPhoneNumberVerificationProps) {
	const { showToast } = useToast();
	const {
		formErrors,
		formData: { otp },
		validateForm,
		setOtp,
	} = useVerifyMobileValidation();
	const [verifyMobileNumber, { isLoading: isResending }] =
		useVerifyMobileNumberMutation();

	const [registerMobileNumber, { isLoading }] =
		useRegisterMobileNumberMutation();

	const mobileNumber = useAppSelector(
		(state) => state.auth.registration.mobileNumber
	);

	const [countdown, setCountdown] = useState<number>(RESEND_COUNTDOWN);
	const [countdownEndTime, setCountdownEndTime] = useState<number>(
		Date.now() + RESEND_COUNTDOWN * 1000
	);
	const [loadingTitle, setLoadingTitle] = useState<string>("");

	const appState = useRef(AppState.currentState);

	const submit = async () => {
		setLoadingTitle("Verifying OTP");
		try {
			const { status, message } = await registerMobileNumber({
				mobile_number: mobileNumber,
				type: "corporate",
				otp,
			}).unwrap();
			if (status) {
				navigate("MemberEmail");
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

	const resend = async () => {
		setOtp("");
		try {
			const { status } = await verifyMobileNumber({
				mobile_number: mobileNumber,
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
		<MainLayout
			backAction={goBack}
			isLoading={isLoading}
			loadingTitle={loadingTitle}
			keyboardAvoidingType='scroll-view'
		>
			<Typography title='Verify Your Phone Number' type='heading-sb' />

			<HybridTypography
				textTray={[
					{ text: "We sent a 6-digit code to ", bold: false },
					{ text: `${mobileNumber} `, bold: true },
					{ text: "Enter it below to continue", bold: false },
				]}
			/>

			<Pad size={16} />

			<PinPad
				pin={otp}
				onInput={setOtp}
				codeLength={6}
				error={formErrors.otp}
			/>

			<Pad size={16} />

			<Typography
				title={
					countdown === 0
						? "Resend"
						: `Didn't get the code? Resend in ${formatCountdown(countdown)}`
				}
				type='body-sb'
				onPress={() => countdown === 0 && resend()}
			/>

			{isResending ? (
				<ActivityIndicator size={16} color={Colors.black} />
			) : null}

			<Pad size={176} />

			<Button title='Continue' onPress={() => navigate("MemberEmail")} />
		</MainLayout>
	);
}
