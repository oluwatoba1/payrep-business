import { MainLayout } from "@components/Layout";
import { BackHandler, Image, View } from "react-native";
import styles from "./styles";
import ScreenImages from "@assets/images/screens";
import Pad from "@components/Pad";
import { Button, Typography } from "@components/Forms";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import { BottomTabParamList, KidashiStackParamList } from "@navigation/types";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { useCallback, useState } from "react";

type OnboardingStatusProps = StackScreenProps<
	KidashiStackParamList,
	"OnboardingStatus"
>;

export default function OnboardingStatus({}: OnboardingStatusProps) {
	const { reset } =
		useNavigation<BottomTabNavigationProp<BottomTabParamList>>();

	const [status] = useState<"rejected" | "in-review">("in-review");

	const navigateToHome = () => {
		reset({
			index: 0,
			routes: [
				{
					name: "Home",
					state: {
						index: 0,
						routes: [{ name: "Dashboard" }],
					},
				},
			],
		});
		return true;
	};

	useFocusEffect(
		useCallback(() => {
			const backHandler = BackHandler.addEventListener(
				"hardwareBackPress",
				navigateToHome
			);

			return () => backHandler.remove(); // Cleanup
		}, [])
	);

	return (
		<MainLayout>
			<View style={styles.container}>
				<Image
					source={ScreenImages.kidashiOnboardingState.success}
					style={styles.checkIcon}
				/>

				<Pad size={8} />

				<Typography
					title={
						status === "in-review"
							? "We’re Reviewing Your Request"
							: "Application Not Approved"
					}
					type='heading-sb'
				/>

				<Pad size={8} />

				<Typography
					title={
						status === "in-review"
							? "Your application to join the financing program is in progress. Sit tight — we’ll notify you as soon as it’s approved"
							: "Thanks for your interest in joining Asset Finance. Right now, our program isn’t active in your community — but we’re working on reaching more locations soon"
					}
					type='label-r'
				/>

				<Pad size={8} />

				<Button title='Return to home' onPress={navigateToHome} />
			</View>
		</MainLayout>
	);
}
