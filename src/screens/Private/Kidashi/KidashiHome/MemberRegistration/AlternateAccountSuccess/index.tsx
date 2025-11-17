import { useCallback } from "react";
import { BackHandler, Image, View } from "react-native";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { StackScreenProps } from "@react-navigation/stack";

import { Button, Typography } from "@components/Forms";
import { MainLayout, Row } from "@components/Layout";
import {
	KidashiBottomTabParamList,
	KidashiHomeStackParamList,
	MemberRegistrationStackParamList,
	TrustCircleStackParamList,
} from "@navigation/types";
import { CompositeScreenProps, useFocusEffect } from "@react-navigation/native";
import Pad from "@components/Pad";
import ScreenImages from "@assets/images/screens";
import styles from "./styles";
import Colors from "@theme/Colors";
import { MAIN_LAYOUT_HORIZONTAL_PADDING, width } from "@utils/Constants";
import { scale } from "@utils/Helpers";

type AlternateAccountSuccessProps = CompositeScreenProps<
	StackScreenProps<MemberRegistrationStackParamList, "AlternateAccountSuccess">,
	BottomTabScreenProps<KidashiHomeStackParamList, "KidashiDashboard">
>;

export default function AlternateAccountSuccess({
	navigation: { navigate },
	route: {
		params: { womanId },
	},
}: AlternateAccountSuccessProps) {
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

				<Typography
					title='Bank Details Added Successfully'
					type='heading-sb'
					color={Colors.neutral["600"]}
				/>
				<Typography
					title='Your alternative account has been saved. We’ll use it if your main account can’t receive disbursements.'
					type='label-r'
					color={Colors.neutral["300"]}
					style={{ textAlign: "center" }}
				/>

				<Pad size={16} />

				<Button
					title='Add Another Alternate Bank Details'
					onPress={() => navigate("AlternateAccount", { womanId: womanId! })}
					containerStyle={{ backgroundColor: "#FAFAFA" }}
				/>

				<Pad />

				<Button
					title='Return to Home'
					onPress={() => navigate("KidashiDashboard")}
					containerStyle={{
						width: width - 2 * scale(MAIN_LAYOUT_HORIZONTAL_PADDING),
					}}
				/>

				<Pad size={16} />

				<Button
					title='Return Home'
					containerStyle={{ backgroundColor: "transparent" }}
					onPress={() => navigate("KidashiDashboard")}
				/>
			</View>
		</MainLayout>
	);
}
