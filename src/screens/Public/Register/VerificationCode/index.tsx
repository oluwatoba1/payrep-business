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
import { PublicNavigatorParamList } from "@navigation/types";
import { useEffect, useState } from "react";
import PinPad from "@components/Forms/PinPad";
import { mainRegisterStyles } from "../styles";
import Pad from "@components/Pad";
import { formatCountdown } from "@utils/Helpers";
import { DEFAULT_ERROR_MESSAGE, RESEND_COUNTDOWN } from "@utils/Constants";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import useToast from "@hooks/useToast";
import useVerifyMobileValidation from "./validators";
import {
	useRegisterMobileNumberMutation,
	useVerifyMobileNumberMutation,
} from "@store/apis/authApi";
import Colors from "@theme/Colors";
import { setRegistrationDetails } from "@store/slices/authSlice";

type VerificationCodeProps = StackScreenProps<
	PublicNavigatorParamList,
	"VerificationCode"
>;

export default function VerificationCode({
	navigation: { navigate, goBack },
	route,
}: VerificationCodeProps) {
	const dispatch = useAppDispatch();
	const { showToast } = useToast();
	const customerId = useAppSelector(
		(state) => state.auth.registration.customer_id
	);
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
			const { status, message, data } = await registerMobileNumber({
				mobile_number: mobileNumber,
				type: route.params.userType,
				otp,
			}).unwrap();
			if (status) {
				dispatch(
					setRegistrationDetails({
						mobileNumber: mobileNumber.padStart(11, "0"),
						email: "",
						customer_id: data?.customer_id || "",
					})
				);
				navigate("EmailAddress");
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
		>
			<View style={mainRegisterStyles.mainContainer}>
				<Typography title='Enter your code' type='heading4-sb' />

				<Pad size={16} />

				<HybridTypography
					textTray={[
						{ text: "We sent an OTP to ", bold: false },
						{ text: `${mobileNumber} `, bold: true },
						{ text: "Please enter the code", bold: false },
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

				<Pad size={176} />

				<Button title='Continue' onPress={() => validateForm(submit)} />
			</View>
		</MainLayout>
	);
}
