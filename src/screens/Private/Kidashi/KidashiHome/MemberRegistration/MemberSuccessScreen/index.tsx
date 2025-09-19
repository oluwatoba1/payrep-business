import { useCallback } from "react";
import { BackHandler } from "react-native";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { StackScreenProps } from "@react-navigation/stack";

import { Typography } from "@components/Forms";
import { MainLayout } from "@components/Layout";
import {
	KidashiHomeStackParamList,
	MemberRegistrationStackParamList,
} from "@navigation/types";
import { CompositeScreenProps, useFocusEffect } from "@react-navigation/native";

type MemberSuccessScreenProps = CompositeScreenProps<
	StackScreenProps<MemberRegistrationStackParamList, "MemberSuccessScreen">,
	BottomTabScreenProps<KidashiHomeStackParamList, "KidashiDashboard">
>;

export default function MemberSuccessScreen({
	navigation: { navigate },
}: MemberSuccessScreenProps) {
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
		<MainLayout backAction={backAction}>
			<Typography title='Success' />
		</MainLayout>
	);
}
