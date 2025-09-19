import { View, Text, TouchableOpacity, Image, Pressable } from "react-native";
import React from "react";
import Clipboard from "@react-native-clipboard/clipboard";
import { Row } from "@components/Layout";
import { Typography } from "@components/Forms";
import { styles } from "./style";
import IconImages from "@assets/images/appIcons";
import Divider from "@components/Miscellaneous/Divider";
import { scaleHeight } from "@utils/Helpers";

const AccountInfo = () => {
	const copyToClipboard = async (text: string) => {
		try {
			await Clipboard.setString(text);
			console.log("Text copied to clipboard:", text);
		} catch (error) {
			console.error("Failed to copy text to clipboard:", error);
		}
	};

	return (
		<View>
			<Row>
				<Typography title='Account Number' type='body-r' />
				<View style={styles.accountNumberContainer}>
					<Pressable
						onPress={() => copyToClipboard("1234567890")}
						style={styles.copyIconPressable}
					>
						<Image source={IconImages.icon.copyDark} style={styles.copyIcon} />
						<Typography title='Copy' type='body-r' />
					</Pressable>
					<Typography title='1234567890' type='body-r' />
				</View>
			</Row>
			<Divider gapY={scaleHeight(10)} />
			<Row>
				<Typography title='Account Tier' type='body-r' />
				<Typography title='Tier 0' type='body-r' />
			</Row>
			<Divider gapY={scaleHeight(10)} />
			<Row>
				<Typography title='Maximum Balance' type='body-r' />
				<Typography title='N100,000' type='body-r' />
			</Row>
		</View>
	);
};

export default AccountInfo;
