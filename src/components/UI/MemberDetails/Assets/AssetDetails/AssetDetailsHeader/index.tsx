import { View, Text, Image } from "react-native";
import React from "react";
import ScreenImages from "@assets/images/screens";
import { Typography } from "@components/Forms";
import { styles } from "./styles";

const AssetDetailsHeader: React.FC<{ amount?: string; reference?: string }> = ({
	amount,
	reference,
}) => {
	return (
		<View style={styles.container}>
			<View style={styles.packageIconContainer}>
				<Image
					source={ScreenImages.kidashiMemberDetails.packageIcon}
					style={styles.packageIcon}
				/>
			</View>
			<Typography title={amount ?? "N/A"} type='body-b' style={styles.amount} />
			<Typography
				title={reference ?? ""}
				type='subheading'
				style={styles.reference}
			/>
		</View>
	);
};

export default AssetDetailsHeader;
