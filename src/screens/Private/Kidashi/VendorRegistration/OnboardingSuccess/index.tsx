import { MainLayout } from "@components/Layout";
import { BackHandler, Image, View } from "react-native";
import styles from "./styles";
import ScreenImages from "@assets/images/screens";
import Pad from "@components/Pad";
import { Button, Typography } from "@components/Forms";
import {
	CompositeScreenProps,
	useFocusEffect,
	useNavigation,
} from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";
import {
	BottomTabParamList,
	HomeStackParamList,
	KidashiBottomTabParamList,
	KidashiRegistrationStackParamList,
} from "@navigation/types";
import {
	BottomTabNavigationProp,
	BottomTabScreenProps,
} from "@react-navigation/bottom-tabs";
import { useCallback } from "react";

type OnboardingSuccessProps = CompositeScreenProps<
	StackScreenProps<KidashiRegistrationStackParamList, "OnboardingSuccess">,
	BottomTabScreenProps<BottomTabParamList, "Home">
>;

export default function OnboardingSuccess({
	navigation: { navigate },
}: OnboardingSuccessProps) {
	const { reset } =
		useNavigation<BottomTabNavigationProp<BottomTabParamList>>();

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
		navigate("Home", { screen: "Dashboard" });
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
		<MainLayout showHeader={false}>
			<View style={styles.container}>
				<Image
					source={ScreenImages.kidashiOnboardingStatus.success}
					style={styles.checkIcon}
				/>

				<Pad size={8} />

				<Typography title='Request Submitted' type='heading-sb' />

				<Pad size={8} />

				<Typography
					title='We’ve received your request to be a vendor for our asset financing program. We’ll notify you once it’s reviewed'
					type='body-r'
					style={{ textAlign: "center" }}
				/>

				<Pad size={8} />
				<Button
					title='Return to home'
					onPress={navigateToHome}
					containerStyle={styles.homeButton}
				/>
			</View>
		</MainLayout>
	);
}
