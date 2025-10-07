import { useEffect, useRef, useState } from "react";
import {
	ActivityIndicator,
	AppState,
	AppStateStatus,
	View,
} from "react-native";
import { StackScreenProps } from "@react-navigation/stack";

// Local
import { MainLayout } from "@components/Layout";
import { Button, HybridTypography, Typography } from "@components/Forms";
import { MemberRegistrationStackParamList } from "@navigation/types";
import PinPad from "@components/Forms/PinPad";
import { useAppSelector } from "@store/hooks";
import { formatCountdown } from "@utils/Helpers";
import Pad from "@components/Pad";
import { DEFAULT_ERROR_MESSAGE, RESEND_COUNTDOWN } from "@utils/Constants";
import useToast from "@hooks/useToast";
import useVerifyMobileValidation from "./validator";
import {
	useRegisterEmailMutation,
	useVerifyMobileNumberMutation,
} from "@store/apis/authApi";
import Colors from "@theme/Colors";
import { useRegisterWomanEmailMutation } from "@store/apis/kidashiApi";

type MemberEmailVerificationProps = StackScreenProps<
	MemberRegistrationStackParamList,
	"MemberEmailVerification"
>;

export default function MemberEmailVerification({
	navigation: { navigate, goBack },
}: MemberEmailVerificationProps) {
	const { showToast } = useToast();
	const {
		formErrors,
		validateForm,
		formData: { otp },
		setOtp,
	} = useVerifyMobileValidation();
	const [registerEmail, { isLoading }] = useRegisterEmailMutation();
	const [verifyMobileNumber, { isLoading: isResending }] =
		useVerifyMobileNumberMutation();

	const { mobileNumber, email } = useAppSelector(
		(state) => state.auth.registration
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
			const { status } = await registerEmail({
				email,
				mobile_number: mobileNumber,
				otp,
				type: "individual",
			}).unwrap();
			if (status) {
				navigate("MemberMeansOfVerification");
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
		>
			<Typography title='Verify Email Address' type='heading-sb' />

			<HybridTypography
				textTray={[
					{ text: "We sent a 6-digit code to ", bold: false },
					{ text: `${email} `, bold: true },
					{ text: "Enter it below to continue", bold: false },
				]}
			/>

			<Pad size={16} />

			<PinPad
				pin={otp}
				onInput={setOtp}
				codeLength={6}
				secure={false}
				error={formErrors.otp}
			/>

			<Pad size={8} />

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

			<Button title='Continue' onPress={() => validateForm(submit)} />
		</MainLayout>
	);
}
