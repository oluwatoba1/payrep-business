import { View, Text, Image } from "react-native";
import React from "react";
import ScreenImages from "@assets/images/screens";
import { Typography } from "@components/Forms";
import { styles } from "./styles";

const AssetDetailsHeader = () => {
	return (
		<View style={styles.container}>
			<View style={styles.packageIconContainer}>
				<Image
					source={ScreenImages.kidashiMemberDetails.packageIcon}
					style={styles.packageIcon}
				/>
			</View>
			<Typography title='N200,000' type='body-b' style={styles.amount} />
			<Typography
				title='#2329230347'
				type='subheading'
				style={styles.reference}
			/>
		</View>
	);
};

export default AssetDetailsHeader;
