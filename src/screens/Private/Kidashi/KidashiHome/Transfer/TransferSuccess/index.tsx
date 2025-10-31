import React, { useCallback, useState } from "react";
import { BackHandler, Image, View } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";

import {
	KidashiBottomTabParamList,
	KidashiHomeStackParamList,
} from "@navigation/types";
import { useAppSelector } from "@store/hooks";
import { MainLayout } from "@components/Layout";
import ScreenImages from "@assets/images/screens";
import Pad from "@components/Pad";
import { Button, HybridTypography, Typography } from "@components/Forms";
import Colors from "@theme/Colors";
import { addCommas, scale } from "@utils/Helpers";
import styles from "./styles";
import { PNSB } from "@theme/Fonts";
import { MAIN_LAYOUT_HORIZONTAL_PADDING, width } from "@utils/Constants";

type TransactionSuccessProps = StackScreenProps<
	KidashiHomeStackParamList,
	"TransferSuccess"
>;

export default function TransactionSuccess({
	navigation: { navigate },
}: TransactionSuccessProps) {
	const { reset } =
		useNavigation<BottomTabNavigationProp<KidashiBottomTabParamList>>();

	const transferDetails = useAppSelector(
		(state) => state.transfer.transferDetails
	);

	const destinationAccount = transferDetails?.destinationAccount;

	const handleViewReceipt = () => {
		navigate("TransferDetails");
	};

	const handleNavigation = () => {
		reset({
			index: 0,
			routes: [
				{
					name: "KidashiHome",
					state: {
						index: 0,
						routes: [{ name: "KidashiDashboard" }],
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
				handleNavigation
			);

			return () => backHandler.remove(); // Cleanup
		}, [])
	);

	return (
		<MainLayout showHeader={false}>
			<View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
				<Image
					source={ScreenImages.kidashiHome.transferSuccessIcon}
					style={styles.successIcon}
				/>

				<Pad size={8} />

				<Typography
					title='Success'
					color={Colors.success.base}
					type='body-sb'
				/>

				<Pad size={8} />

				<Typography
					title={`₦${addCommas(transferDetails?.amount || 0)}`}
					type='heading'
				/>

				<Pad size={8} />

				<HybridTypography
					textTray={[
						{
							text: "has been transferred to ",
							bold: false,
						},
						{
							text: destinationAccount?.accountName || "",
							bold: true,
						},
						{
							text: " account",
							bold: false,
						},
					]}
					boldFontColor='#212121'
					textStyle={{ color: Colors.neutral["400"], fontFamily: PNSB }}
				/>

				<Pad />

				<Button
					title='View Receipt'
					onPress={handleViewReceipt}
					containerStyle={{
						width: width - 2 * scale(MAIN_LAYOUT_HORIZONTAL_PADDING),
					}}
				/>
			</View>
		</MainLayout>
	);
}
