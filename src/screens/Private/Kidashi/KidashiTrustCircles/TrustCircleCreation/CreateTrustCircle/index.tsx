import { View, Text, Image, BackHandler } from "react-native";
import React, { useCallback } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

import styles from "./styles";
import { Button, Typography } from "@components/Forms";
import Pad from "@components/Pad";
import { Pressable, ScrollView } from "react-native-gesture-handler";
import Colors from "@theme/Colors";
import ScreenImages from "@assets/images/screens";
import { CreateTrustCircleHeader, TrustCircleHowItWorks } from "@components/UI";
import { StackScreenProps } from "@react-navigation/stack";
import {
	KidashiBottomTabParamList,
	TrustCircleStackParamList,
} from "@navigation/types";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { persistAppState } from "@utils/Helpers";
import { updateAppstate } from "@store/slices/appSlice";
import { useAppDispatch } from "@store/hooks";

type CreateTrustCircleProps = StackScreenProps<
	TrustCircleStackParamList,
	"CreateTrustCircle"
>;

export default function CreateTrustCircle({
	navigation: { navigate },
}: CreateTrustCircleProps) {
	const dispatch = useAppDispatch();

	const { reset } =
		useNavigation<BottomTabNavigationProp<KidashiBottomTabParamList>>();

	const resetAndGoBack = () => {
		persistAppState({
			newKidashiVendor: false,
		});
		dispatch(
			updateAppstate({
				newKidashiVendor: false,
			})
		);
		reset({
			index: 0,
			routes: [{ name: "Trust Circles" }],
		});
		navigate("TrustCircles");
	};

	const proceed = () => {
		persistAppState({
			newKidashiVendor: false,
		});
		dispatch(
			updateAppstate({
				newKidashiVendor: false,
			})
		);

		navigate("CircleName");
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
		<ScrollView style={styles.container}>
			<CreateTrustCircleHeader />
			<View style={styles.contentContainer}>
				<TrustCircleHowItWorks />
				<Pad size={30} />
				<Pressable style={styles.skipButton} onPress={resetAndGoBack}>
					<Typography
						title='Skip for now'
						type='body-sb'
						color={Colors.gray[400]}
					/>
					<Image
						source={ScreenImages.kidashiCreateTrustCircles.forwardIcon}
						style={styles.skipIcon}
					/>
				</Pressable>
				<Pad size={40} />
				<Button onPress={proceed} title={`Alright, Let's Go`} />
			</View>
		</ScrollView>
	);
}
