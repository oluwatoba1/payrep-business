import React, { useEffect, useState } from "react";
import { Image, View, Platform } from "react-native";
import { useQoreIdSdk, OnResult } from "@qore-id/react-native-qoreid-sdk";
import { request, PERMISSIONS, RESULTS } from "react-native-permissions";

import { MainLayout, Row } from "@components/Layout";
import { Button, Typography } from "@components/Forms";
import CustomCard from "@components/Cards/CustomCard";
import { styles } from "./styles";
import IconImages from "@assets/images/appIcons";
import { StackScreenProps } from "@react-navigation/stack";
import { PublicNavigatorParamList } from "@navigation/types";
import useToast from "@hooks/useToast";
import {
	BASE_URL,
	DEFAULT_ERROR_MESSAGE,
	KYCLOG_TYPES,
	QOREID_CLIENT_ID,
} from "@utils/Constants";
import Pad from "@components/Pad";
import { useDeviceRegistrationLogCheckMutation } from "@store/apis/authApi";
import { useAppDispatch } from "@store/hooks";
import { setCredentials } from "@store/slices/authSlice";

interface VerifyBvnProps {
	startTime: number;
	startDate: Date;
	timeout: number;
	verificationId: string;
}

type FacialRecognitionScreenProps = StackScreenProps<
	PublicNavigatorParamList,
	"FacialRecognition"
>;

const tips = [
	"Make sure your face is clearly and entirely visible.",
	"Ensure your environment is bright enough for a clear photo.",
	"Remove any hats, sunglasses, or masks that may obscure your face.",
	"Keep your camera steady to avoid blurry images.",
	"Position your face within the frame and look directly at the camera.",
	"Avoid harsh shadows by standing in a well-lit area.",
];

export default function FacialRecognition({
	navigation: { goBack, reset },
	route,
}: FacialRecognitionScreenProps) {
	const dispatch = useAppDispatch();
	const { showToast } = useToast();
	const params = route.params;

	const [deviceRegistrationLogCheck, { isLoading: isChecking }] =
		useDeviceRegistrationLogCheckMutation();

	const [customer, setCustomer] = useState<CustomerBasicResponse | null>(null);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	const timeoutAction = (args: VerifyBvnProps) => {
		if (Date.now() - args.startTime < args.timeout) {
			verifyDeviceRegistration(args);
		} else {
			showToast("danger", "Verification pending, check back later");
			navigateToLogin();
		}
	};

	const navigateToLogin = () =>
		reset({
			index: 0,
			routes: [
				{
					name: "Login",
				},
			],
		});

	const verifyDeviceRegistration = async (args: VerifyBvnProps) => {
		try {
			const { status, data } = await deviceRegistrationLogCheck({
				verification: args.verificationId,
			}).unwrap();
			if (status) {
				if (!data.length) {
					timeoutAction(args);
					return;
				}
				data[0].status
					? navigateToLogin()
					: showToast("danger", "Device registration failed");
			} else {
				timeoutAction(args);
			}
		} catch (error: ErrorResponse | any) {
			showToast(
				"danger",
				error.data?.message || error.message || DEFAULT_ERROR_MESSAGE
			);
		}
	};

	const initiatePoll = (verificationId: string, timeout: number = 30000) => {
		const startTime = Date.now();
		const startDate = new Date();

		verifyDeviceRegistration({ startTime, startDate, timeout, verificationId });
	};

	const callback = (data: OnResult) => {
		if (["E_USER_CANCELED", "E_GENERAL"].includes(data.code)) {
			showToast("danger", data.message);
			return;
		}
		initiatePoll(data.data.verification.id);
	};

	const { launchQoreId } = useQoreIdSdk({
		onResult: callback,
	});

	const onSubmit = async () => {
		const cameraPermission = await request(
			Platform.OS === "ios"
				? PERMISSIONS.IOS.CAMERA
				: PERMISSIONS.ANDROID.CAMERA
		);
		const phoneNumber = customer?.mobile_number;

		if (cameraPermission === RESULTS.GRANTED) {
			const formData = {
				flowId: 0 /* Required for workflow */,
				clientId: QOREID_CLIENT_ID /* Required */,
				productCode: "liveness_bvn" /* Required for collection */,
				customerReference: (customer?.id || "") + "_devicereg" /* Required */,
				applicantData: {
					firstName: customer?.first_name,
					middleName: customer?.other_name,
					lastName: customer?.surname,
					gender: "",
					phoneNumber: "+234" + phoneNumber?.substring(1),
					email: customer?.email,
				},
				identityData: {
					idType: "bvn",
					idNumber: customer?.kyc?.bvn,
				},
				addressData: {
					address: "",
					city: "",
					lga: "",
				},
			};

			launchQoreId(formData);
		} else {
			showToast("danger", "Camera permission denied");
		}
	};

	const fetchCustomerDetails = async () => {
		try {
			const result = await fetch(
				`${BASE_URL}/api/v1/customer/mobile/customer_basic/${params.customer}`,
				{
					headers: {
						Authorization: `Bearer ${params.token}`,
					},
				}
			);
			const { status, message, data }: AuthResponse<CustomerBasicResponse> =
				await result.json();

			if (status) {
				setCustomer(data);
			} else {
				showToast("danger", message);
			}
		} catch (error: ErrorResponse | any) {
			if (error.data?.message?.toLowerCase() === "invalid token") {
				dispatch(setCredentials({ token: null, user_id: null }));
				return;
			}
			showToast(
				"danger",
				error.data?.message || error.message || DEFAULT_ERROR_MESSAGE
			);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchCustomerDetails();
	}, []);

	return (
		<MainLayout
			keyboardAvoidingType='scroll-view'
			backAction={goBack}
			isLoading={isLoading || isChecking}
			loadingTitle=''
			rightTitle='BVN Facial Recognition'
		>
			<Pad size={16} />
			<Typography
				type='body-r'
				title='Please capture a photo of yourself. This will be used to confirm that your face matches the image on your identity card.'
			/>
			<Pad size={24} />

			<View style={styles.cardContainer}>
				<CustomCard visible={true} customContainerStyle={styles.container}>
					<View style={{ gap: 14, alignItems: "center" }}>
						<Typography title='Face Recognition Tips' />

						<View style={{ alignSelf: "center" }}>
							<Image
								source={IconImages.popup.faceRecognition}
								style={{ width: 48, height: 48 }}
							/>
						</View>

						{tips.map((tip, index) => (
							<Row
								key={index}
								gap={10}
								alignItems='flex-start'
								justifyContent='flex-start'
								containerStyle={{ width: "95%" }}
							>
								<Typography title='•' type='body-r' />
								<Typography type='label-r' title={tip} />
							</Row>
						))}
					</View>
				</CustomCard>
			</View>

			<Pad size={100} />

			<Button title='Capture' onPress={onSubmit} />
		</MainLayout>
	);
}
