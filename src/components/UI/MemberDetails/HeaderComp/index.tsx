import { View, Image, TouchableOpacity } from "react-native";
import React from "react";
import ScreenImages from "@assets/images/screens";
import { Typography } from "@components/Forms";
import { styles } from "./style";
import Colors from "@theme/Colors";

interface MemberDetailsHeaderCompProps {
	userName?: string;
	balance?: string;
	onOTPManagePress?: () => void;
	status?: string;
}

const MemberDetailsHeaderComp = ({
	userName,
	balance = "₦0.00",
	onOTPManagePress,
	status,
}: MemberDetailsHeaderCompProps) => {
	return (
		<View style={styles.container}>
			{/* Avatar Section */}
			<View style={styles.avatarContainer}>
				<Image
					source={ScreenImages.kidashiMemberDetails.userPlaceholder}
					style={styles.avatar}
					resizeMode='cover'
				/>
			</View>

			{/* User Name */}
			<View style={styles.userNameContainer}>
				<Typography
					title={userName || ""}
					type='heading-sb'
					color={Colors.black}
				/>
			</View>

			{/* OTP Status Bar */}

			<TouchableOpacity
				style={styles.otpStatusBar}
				onPress={onOTPManagePress}
				activeOpacity={0.7}
			>
				<View style={styles.otpStatusContent}>
					<Image
						source={ScreenImages.kidashiMemberDetails.infoIcon}
						style={styles.infoIcon}
						resizeMode='contain'
					/>
					<Typography
						title={
							status === "INACTIVE"
								? "OTP pending to join circle: Tap to manage verifiers"
								: "OTP verified"
						}
						type='label-r'
						color={Colors.cardColor.brown[200]}
						style={styles.otpText}
					/>
					<Image
						source={ScreenImages.kidashiMemberDetails.arrowRightIcon}
						style={styles.arrowIcon}
						resizeMode='contain'
					/>
				</View>
			</TouchableOpacity>

			{/* Balance Section */}
			<View style={styles.balanceContainer}>
				<View style={styles.balanceContent}>
					<Typography title='Balance' type='label-r' color={Colors.gray[700]} />
				</View>
				<View style={styles.balanceAmountContainer}>
					<Typography title={balance} type='heading-sb' color={Colors.black} />
				</View>
			</View>
		</View>
	);
};

export default MemberDetailsHeaderComp;
