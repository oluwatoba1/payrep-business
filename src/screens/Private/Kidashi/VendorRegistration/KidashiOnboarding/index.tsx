import { useCallback } from "react";
import { BackHandler } from "react-native";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { StackScreenProps } from "@react-navigation/stack";

import { BottomTabParamList, KidashiStackParamList } from "@navigation/types";
import { KidashiOnboarder } from "@components/Miscellaneous";
import { CompositeScreenProps, useFocusEffect } from "@react-navigation/native";

type KidashiOnboardingProps = CompositeScreenProps<
	StackScreenProps<KidashiStackParamList, "KidashiOnboarding">,
	BottomTabScreenProps<BottomTabParamList, "Home">
>;

export default function KidashiOnboarding({
	navigation: { navigate },
}: KidashiOnboardingProps) {
	const backAction = () => {
		navigate("Home", { screen: "Dashboard" });
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
		<KidashiOnboarder
			onProceed={() => navigate("VendorInformation")}
			onCancel={backAction}
		/>
	);
}
