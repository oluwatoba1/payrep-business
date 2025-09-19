import { useCallback } from "react";
import { BackHandler } from "react-native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { StackScreenProps } from "@react-navigation/stack";

import { Typography } from "@components/Forms";
import { MainLayout } from "@components/Layout";
import {
	KidashiBottomTabParamList,
	TrustCircleStackParamList,
} from "@navigation/types";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

type TrustCircleDetailsProps = StackScreenProps<
	TrustCircleStackParamList,
	"TrustCircleDetails"
>;

export default function TrustCircleDetails({
	navigation: { navigate, goBack },
}: TrustCircleDetailsProps) {
	const { reset } =
		useNavigation<BottomTabNavigationProp<KidashiBottomTabParamList>>();

	const resetAndGoBack = () => {
		reset({
			index: 0,
			routes: [{ name: "Trust Circles" }],
		});
	};

	useFocusEffect(
		useCallback(() => {
			const backHandler = BackHandler.addEventListener(
				"hardwareBackPress",
				() => {
					resetAndGoBack();
					return true;
				}
			);

			return () => backHandler.remove(); // Cleanup
		}, [])
	);

	return (
		<MainLayout backAction={resetAndGoBack}>
			<Typography title='Trust Circle Details' />
		</MainLayout>
	);
}
