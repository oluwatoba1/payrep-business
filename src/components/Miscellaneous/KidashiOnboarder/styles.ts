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
	},
	headerContainer: {
		position: "absolute",
		top: scaleHeight(50),
		zIndex: 10,
		width: "100%",
		paddingHorizontal: scale(MAIN_LAYOUT_HORIZONTAL_PADDING),
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
		position: "absolute",
		bottom: scaleHeight(70),
		alignItems: "center",
		width: "100%",
	},
	kidashiLogo: {
		height: scaleHeight(24),
		resizeMode: "contain",
	},
	onboardingTitle: {
		fontSize: scale(22),
		lineHeight: scale(26),
		color: Colors.white,
		textAlign: "center",
	},
	onboardingDescription: {
		color: Colors.white,
		textAlign: "center",
	},
	dotContainer: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		marginBottom: scaleHeight(12),
	},
	activeDot: {
		height: scaleHeight(6),
		width: scale(30),
		borderRadius: scale(7),
		backgroundColor: Colors.white,
		marginHorizontal: scale(3),
	},
	inactiveDot: {
		height: scaleHeight(6),
		width: scaleHeight(6),
		borderRadius: scaleHeight(6),
		backgroundColor: "#919091",
		marginHorizontal: scale(3),
	},
	overlay: {
		...StyleSheet.absoluteFillObject,
		backgroundColor: "rgba(0,0,0,0.45)"
	},
	rootContainer: {
		flex: 1,
		backgroundColor: Colors.black,
	},
	cancelContainer: {
		paddingHorizontal: scale(5)
	},

	navButtonsContainer: {
		width: width - 2 * scale(MAIN_LAYOUT_HORIZONTAL_PADDING),
	},

	navButton: {
		width: width * 0.4,
		alignSelf: "center",
	},
	textContainer: {
		position: "absolute",
		bottom: scaleHeight(190),
		width: width - 2 * scale(MAIN_LAYOUT_HORIZONTAL_PADDING),
		alignSelf: "center",
		alignItems: "center",
	},
	outlinedButton: {
		width: width * 0.4,
		borderWidth: 1,
		borderColor: Colors.white,
		backgroundColor: "transparent",
		alignSelf: "center",
	},
	fullButton: {
		width: width * 0.9,
		alignSelf: "center",
	},

});

export default styles;
