import { StyleSheet } from "react-native";
import { scale, scaleHeight } from "@utils/Helpers";
import { PNB, PNSB } from "@theme/Fonts";
import Colors from "@theme/Colors";
import {
	height,
	MAIN_LAYOUT_HORIZONTAL_PADDING,
	width,
} from "@utils/Constants";

const styles = StyleSheet.create({
	onboardingContainer: {
		height,
		width,
		paddingHorizontal: scale(MAIN_LAYOUT_HORIZONTAL_PADDING),
		justifyContent: "space-between",
	},
	headerContainer: {
		paddingTop: scaleHeight(40),
	},
	headerContainerLeft: {
		width: scaleHeight(56),
		height: scaleHeight(56),
		backgroundColor: "transparent",
	},
	headerContainerMiddle: {
		width: scaleHeight(56),
		height: scaleHeight(56),
		borderRadius: scaleHeight(28),
		backgroundColor: `${Colors.white}1A`,
		alignItems: "center",
		justifyContent: "center",
	},
	headerContainerMiddleLogo: {
		width: scaleHeight(24),
		height: scaleHeight(24),
		resizeMode: "contain",
	},
	cancelIcon: {
		width: scaleHeight(16),
		height: scaleHeight(16),
		resizeMode: "contain",
	},
	footerContainer: {
		alignItems: "center",
		justifyContent: "flex-end",
		paddingBottom: scaleHeight(40),
	},
	kidashiLogo: {
		height: scaleHeight(24),
		resizeMode: "contain",
	},
	onboardingTitle: {
		fontSize: scale(20),
		lineHeight: scale(20 * 1.24),
		color: Colors.white,
		textAlign: "center",
	},
	onboardingDescription: {
		color: Colors.white,
		textAlign: "center",
	},
	dotContainer: {
		justifyContent: "center",
		flexDirection: "row",
	},
	activeDot: {
		height: scaleHeight(6),
		width: scale(31),
		borderRadius: scale(7),
		backgroundColor: Colors.white,
		marginRight: scale(6),
	},
	inactiveDot: {
		height: scaleHeight(6),
		width: scaleHeight(6),
		borderRadius: scaleHeight(6),
		backgroundColor: "#919091",
		marginRight: scale(6),
	},
	onboardingButtonContainer: {
		position: "absolute",
		bottom: scaleHeight(75),
		left: 0,
		width,
		paddingHorizontal: scale(38),
	},
	joinNowButton: {
		width: width - 2 * scale(MAIN_LAYOUT_HORIZONTAL_PADDING),
	},
});

export default styles;
