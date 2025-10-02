import { View, Text, TouchableOpacity, Image, Pressable } from "react-native";
import React from "react";
import Clipboard from "@react-native-clipboard/clipboard";
import { Row } from "@components/Layout";
import { Typography } from "@components/Forms";
import { styles } from "./style";
import IconImages from "@assets/images/appIcons";
import Divider from "@components/Miscellaneous/Divider";
import { addCommas, scaleHeight } from "@utils/Helpers";

interface AccountInfoProps {
	details: IWomanDetails | null;
}

const AccountInfo = ({ details }: AccountInfoProps) => {
	const copyToClipboard = async (text: string) => {
		try {
			await Clipboard.setString(text);
		} catch (error) {
			console.error("Failed to copy text to clipboard:", error);
		}
	};

	return (
		<View>
			<Row>
				<Typography title='Account Number' type='body-r' />
				<Row gap={8} alignItems='center'>
					<Pressable
						onPress={() => copyToClipboard(details?.account_number || "")}
						style={styles.copyIconPressable}
					>
						<Image source={IconImages.icon.copyDark} style={styles.copyIcon} />
						<Typography title='Copy' type='body-r' />
					</Pressable>
					<Typography title={details?.account_number || ""} type='body-r' />
				</Row>
			</Row>
			<Divider gapY={scaleHeight(10)} />
			<Row>
				<Typography title='Account Tier' type='body-r' />
				<Typography title={details?.tier || ""} type='body-r' />
			</Row>
			<Divider gapY={scaleHeight(10)} />
			<Row>
				<Typography title='Maximum Balance' type='body-r' />
				<Typography
					title={`${addCommas(details?.maximum_balance || 0)}` || ""}
					type='body-r'
				/>
			</Row>
		</View>
	);
};

export default AccountInfo;
