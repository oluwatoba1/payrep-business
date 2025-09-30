import { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, BackHandler, View } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { CompositeScreenProps, useFocusEffect } from "@react-navigation/native";
import WebView from "react-native-webview";

import { Button, Checkbox, Typography } from "@components/Forms";
import { MainLayout } from "@components/Layout";
import Pad from "@components/Pad";
import {
	KidashiHomeStackParamList,
	MemberRegistrationStackParamList,
} from "@navigation/types";
import useToast from "@hooks/useToast";
import {
	DEFAULT_ERROR_MESSAGE,
	defaultAttestationText,
} from "@utils/Constants";
import { useAffirmAttestationMutation } from "@store/apis/customerApi";
import { useGetAttestationMutation } from "@store/apis/complianceApi";
import styles from "./styles";
import Colors from "@theme/Colors";
import { useAppSelector } from "@store/hooks";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import {
	useAffirmWomanAttestationMutation,
	useOnboardWomanMutation,
} from "@store/apis/kidashiApi";

type MemberAttestationProps = CompositeScreenProps<
	StackScreenProps<MemberRegistrationStackParamList, "MemberAttestation">,
	BottomTabScreenProps<KidashiHomeStackParamList, "KidashiDashboard">
>;

export default function MemberAttestation({
	navigation: { navigate, canGoBack, goBack },
}: MemberAttestationProps) {
	const { showToast } = useToast();
	const customer = useAppSelector((state) => state.customer.customer);
	const womanCustomerId = useAppSelector(
		(state) => state.auth.registration.customer_id
	);
	const [affirmAttestation, { isLoading }] = useAffirmAttestationMutation();
	const [onboardWoman, { isLoading: isOnboarding }] = useOnboardWomanMutation();
	const [getAttestion, { isLoading: isLoadingAttestation }] =
		useGetAttestationMutation();

	const [agreementHtml, setAgreementHtml] = useState<string>(
		defaultAttestationText(
			`${customer?.first_name || ""} ${customer?.surname || ""}`
		)
	);
	const [isChecked, setIsChecked] = useState<boolean>(false);

	const formatAttestation = (text: string) =>
		text.replace(
			/\[Full Name\]/g,
			`${customer?.first_name || ""} ${customer?.surname || ""}`
		);

	const fetchAttestation = async () => {
		try {
			const { status, message, data } = await getAttestion({
				name: "attestation",
			}).unwrap();
			if (status && data) {
				setAgreementHtml(formatAttestation(data));
			}
		} catch (error: ErrorResponse | any) {
			// fail silently
		}
	};

	const registerWoman = async () => {
		try {
			const { status, message } = await onboardWoman({
				vendor_cba_customer_id: customer?.id || "",
				woman_cba_customer_id: womanCustomerId,
			}).unwrap();
			if (status) {
				navigate("MemberSuccessScreen");
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

	const submit = async () => {
		if (!isChecked) {
			showToast("danger", "Agree to submit");
			return;
		}
		try {
			const { status, message } = await affirmAttestation().unwrap();
			if (status) {
				registerWoman();
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

	useEffect(() => {
		fetchAttestation();
	}, []);

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
			isLoading={isLoading || isOnboarding}
			keyboardAvoidingType='scroll-view'
			backAction={backAction}
		>
			<Typography title='Attestation' type='heading-sb' />
			<Typography title='Complete this step to create member' type='label-sb' />

			<Pad size={16} />
			<View style={styles.webViewContainer}>
				{isLoadingAttestation ? (
					<ActivityIndicator size={20} color={Colors.black} />
				) : (
					<WebView
						key={agreementHtml}
						originWhitelist={["*"]}
						source={{ html: `${agreementHtml}` }}
						style={styles.webView}
						showsVerticalScrollIndicator={false}
					/>
				)}
			</View>

			<Pad size={30} />

			<Checkbox
				label='I agree'
				value={isChecked}
				onPress={() => setIsChecked(!isChecked)}
			/>

			<Pad size={30} />

			<Button title='Submit' onPress={submit} disabled={!isChecked} />
		</MainLayout>
	);
}
