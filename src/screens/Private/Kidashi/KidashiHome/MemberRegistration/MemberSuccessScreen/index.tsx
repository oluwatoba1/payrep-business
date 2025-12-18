import { useCallback } from "react";
import { BackHandler, Image, Pressable, View } from "react-native";
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
import Clipboard from "@react-native-clipboard/clipboard";
import useToast from "@hooks/useToast";

type MemberSuccessScreenProps = CompositeScreenProps<
	StackScreenProps<MemberRegistrationStackParamList, "MemberSuccessScreen">,
	CompositeScreenProps<
		BottomTabScreenProps<KidashiHomeStackParamList, "KidashiDashboard">,
		BottomTabScreenProps<KidashiBottomTabParamList, "Trust Circles">
	>
>;

export default function MemberSuccessScreen({
	navigation: { navigate },
	route,
}: MemberSuccessScreenProps) {
	const { showToast } = useToast();
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
					title='Account Created Successfully'
					type='heading-sb'
					color={Colors.neutral["600"]}
				/>
				<Typography
					title='Congratulations, member account has been created successfully'
					type='label-r'
					color={Colors.neutral["300"]}
					style={{ textAlign: "center" }}
				/>

				<Pad size={16} />

				<View style={styles.accountContainer}>
					<Pressable
						onPress={() => {
							Clipboard.setString(route.params.accountNumber || "");
							showToast("success", "Account number copied to clipboard");
						}}
					>
						<Row alignItems='center' justifyContent='space-between'>
							<Typography title='Account number' type='label-r' />
							<Typography
								title={route.params.accountNumber || ""}
								type='body-b'
								selectable={true}
							/>
						</Row>
					</Pressable>
					<Row alignItems='center' justifyContent='space-between'>
						<Typography title='Tier Type' type='label-r' />
						<Typography title='Tier 1' type='body-b' />
					</Row>
				</View>

				<Pad size={24} />

				<Button
					title='Add Member to Kidashi'
					onPress={() =>
						navigate("Trust Circles", {
							screen: "EnterAccountNumber",
							params: { accountNumber: route.params.accountNumber || "" },
						})
					}
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
