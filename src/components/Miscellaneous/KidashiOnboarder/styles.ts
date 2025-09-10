import { StyleSheet } from "react-native";
import { moderateScale, scale, scaleHeight } from "@utils/Helpers";
import { PNB, PNSB } from "@theme/Fonts";
import Colors from "@theme/Colors";
import { height, width } from "@utils/Constants";

const styles = StyleSheet.create({
	onboardingContainer: {
		height,
		width,
		paddingHorizontal: scale(38),
		position: "relative",
		flexDirection: "column",
		justifyContent: "space-between",
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
		justifyContent: "center",
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
		position: "absolute",
		top: scaleHeight(57),
		left: 0,
		width: "100%",
		justifyContent: "center",
		zIndex: 5,
		flexDirection: "row",
	},
	activeDot: {
		height: scaleHeight(7),
		width: scale(42),
		borderRadius: scale(7),
		backgroundColor: Colors.primary.base,
		marginRight: scale(6),
	},
	inactiveDot: {
		height: scaleHeight(7),
		width: scale(29),
		borderRadius: scale(7),
		backgroundColor: Colors.white,
		marginRight: scale(6),
	},
	onboardingButtonContainer: {
		position: "absolute",
		bottom: scaleHeight(75),
		left: 0,
		width,
		paddingHorizontal: scale(38),
	},
	skipButtonText: {
		fontFamily: PNSB,
		color: Colors.white,
		fontSize: scale(17),
		lineHeight: scale(17 * 1.44),
	},
	skipButtonContainer: {
		backgroundColor: "transparent",
	},
	signInText: {
		fontFamily: PNSB,
		color: Colors.white,
		fontSize: scale(17),
		lineHeight: scale(17 * 1.44),
	},
	signInButtonContainer: {
		backgroundColor: Colors.primary.base,
	},
});

export default styles;
