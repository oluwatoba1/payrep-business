import { useCallback } from "react";
import { BackHandler, Image, View } from "react-native";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { StackScreenProps } from "@react-navigation/stack";

import { Button, Typography } from "@components/Forms";
import { MainLayout, Row } from "@components/Layout";
import {
	KidashiHomeStackParamList,
	MemberRegistrationStackParamList,
} from "@navigation/types";
import { CompositeScreenProps, useFocusEffect } from "@react-navigation/native";
import Pad from "@components/Pad";
import ScreenImages from "@assets/images/screens";
import styles from "./styles";

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
		<MainLayout showHeader={false}>
			<View style={styles.container}>
				<Image
					source={ScreenImages.kidashiMemberRegistration.success}
					style={styles.successIcon}
				/>

				<Pad size={8} />

				<Typography title='Account Created Successfully' type='heading-sb' />

				<Pad size={16} />

				<View style={styles.accountContainer}>
					<Row alignItems='center' justifyContent='space-between'>
						<Typography title='Account number' type='label-r' />
						<Typography title='0123456789' type='body-b' />
					</Row>
					<Row alignItems='center' justifyContent='space-between'>
						<Typography title='Tier Type' type='label-r' />
						<Typography title='Tier 1' type='body-b' />
					</Row>
				</View>

				<Pad size={24} />

				<Button title='Add Member to Kidashi' />

				<Pad size={16} />

				<Button
					title='Return Home'
					containerStyle={{ backgroundColor: "transparent" }}
				/>
			</View>
		</MainLayout>
	);
}
