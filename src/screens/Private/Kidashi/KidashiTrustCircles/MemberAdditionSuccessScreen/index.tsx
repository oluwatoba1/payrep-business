import { useCallback } from "react";
import { BackHandler, Image, View } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";

import { Button, IconButton, Typography } from "@components/Forms";
import { MainLayout, Row } from "@components/Layout";
import { TrustCircleStackParamList } from "@navigation/types";
import { useFocusEffect } from "@react-navigation/native";
import Pad from "@components/Pad";
import ScreenImages from "@assets/images/screens";
import styles from "./styles";
import Colors from "@theme/Colors";
import { MAIN_LAYOUT_HORIZONTAL_PADDING, width } from "@utils/Constants";
import { scale } from "@utils/Helpers";

type MemberAdditionSuccessScreenProps = StackScreenProps<
	TrustCircleStackParamList,
	"MemberAdditionSuccessScreen"
>;

export default function MemberAdditionSuccessScreen({
	navigation: { navigate },
}: MemberAdditionSuccessScreenProps) {
	const backAction = () => {
		navigate("TrustCircleDetails");
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
					title='New Member Added!'
					type='heading-sb'
					color={Colors.neutral["600"]}
				/>

				<Pad size={8} />

				<Typography
					title='Zainab Abubakar has been added to Ladi Cooperative Group'
					type='label-r'
					color={Colors.neutral["300"]}
				/>

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

				<Pad size={16} />

				<Typography
					title='Every member makes the trust circle more dependable'
					type='label-sb'
					color={Colors.neutral["400"]}
				/>

				<Pad size={8} />

				<Button
					title='View Trust Circle'
					containerStyle={{
						width: width - 2 * scale(MAIN_LAYOUT_HORIZONTAL_PADDING),
					}}
					onPress={() => navigate("TrustCircleDetails")}
				/>

				<Pad size={24} />

				<IconButton onPress={() => navigate("EnterAccountNumber")}>
					<Row gap={8}>
						<Image
							source={ScreenImages.kidashiMemberAddition.addAnotherMemberIcon}
							style={styles.addMemberIcon}
						/>
						<Typography
							title='Add another member'
							type='label-sb'
							color={Colors.primary["600"]}
						/>
					</Row>
				</IconButton>
			</View>
		</MainLayout>
	);
}
