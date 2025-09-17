import { View, Pressable, Image } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import ScreenImages from "@assets/images/screens";
import { Typography } from "@components/Forms";
import { styles } from "./style";
import { scale, scaleHeight } from "@utils/Helpers";
import Colors from "@theme/Colors";
import LinearGradient from "react-native-linear-gradient";

const CreateTrustCircleHeader = () => {
	const navigation = useNavigation();
	return (
		<LinearGradient
			colors={[Colors.primary["100"], "#FFFFFF"]} // Light yellow gradient
		>
			{/* Header with back button */}
			<View style={styles.header}>
				<Pressable
					onPress={() => navigation.goBack()}
					style={styles.backButton}
				>
					<Image
						source={ScreenImages.kidashiCreateTrustCircles.backIcon}
						style={styles.backIcon}
					/>
				</Pressable>
			</View>

			{/* Main content area */}
			<View style={styles.contentContainer}>
				<View style={styles.iconContainer}>
					<Image
						source={ScreenImages.kidashiCreateTrustCircles.headericon}
						style={styles.headerIcon}
					/>
				</View>

				{/* Title */}
				<Typography
					title='Create a Trust Circle'
					type='heading4-sb'
					color={Colors.gray[900]}
					style={styles.title}
				/>

				{/* Subtitle */}
				<Typography
					title='Bring women together, build trust, and manage your group with ease'
					type='body-r'
					color={Colors.gray[600]}
					style={styles.subtitle}
				/>
			</View>
		</LinearGradient>
	);
};

export default CreateTrustCircleHeader;
