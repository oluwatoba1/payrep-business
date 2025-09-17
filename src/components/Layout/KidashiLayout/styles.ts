import { StatusBar, StyleSheet } from "react-native";

// Local
import {
	MAIN_LAYOUT_HORIZONTAL_PADDING,
	height,
	width,
} from "@utils/Constants";
import { scale, scaleHeight } from "@utils/Helpers";

const styles = StyleSheet.create({
	mainLayoutContainer: {
		flex: 1,
	},
	headerContainer: {
		paddingTop: StatusBar.currentHeight
			? StatusBar.currentHeight
			: scaleHeight(20),
		paddingBottom: scaleHeight(8),
		width,
		paddingHorizontal: scale(MAIN_LAYOUT_HORIZONTAL_PADDING),
	},
	kidashiLogo: {
		width: scaleHeight(83),
		height: scaleHeight(24),
		resizeMode: "contain",
	},
	bellIconContainer: {
		width: scaleHeight(32),
		height: scaleHeight(32),
		borderRadius: scaleHeight(32),
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "#FFF1D0",
		borderWidth: 1,
		borderColor: "#E5D9BB",
	},
	bellIcon: {
		width: scaleHeight(16),
		height: scaleHeight(16),
		resizeMode: "contain",
	},
	returnHomeContainer: {
		paddingHorizontal: scale(12),
		paddingVertical: scale(7),
		backgroundColor: "#FFF1D0",
		borderRadius: scaleHeight(16),
		borderWidth: 1,
		borderColor: "#E5D9BB",
	},
	returnHomeIcon: {
		width: scaleHeight(16),
		height: scaleHeight(16),
		resizeMode: "contain",
	},
	childrenContainer: {
		paddingHorizontal: scale(MAIN_LAYOUT_HORIZONTAL_PADDING),
		height: height - scaleHeight(120),
	},
});

export default styles;
