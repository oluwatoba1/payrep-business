import { StyleSheet } from "react-native";

import { PNB, PNSB } from "@theme/Fonts";
import { scale, scaleHeight, moderateScale } from "@utils/Helpers";
import {
	BOTTOM_TAB_CONTAINER_HEIGHT,
	MAIN_LAYOUT_HORIZONTAL_PADDING,
	width,
} from "@utils/Constants";
import Colors from "@theme/Colors";

const styles = StyleSheet.create({
	container: {
		position: "absolute",
		bottom: 0,
		borderTopWidth: 0, // Removes top border
		elevation: 0,
		width,
		flexDirection: "row",
		paddingVertical: scaleHeight(12),
		alignItems: "center",
		justifyContent: "space-evenly",
		backgroundColor: "rgba(255, 255, 255, 0.95)",
		height: scaleHeight(BOTTOM_TAB_CONTAINER_HEIGHT),
		zIndex: 100,
	},
	tabItem: {
		justifyContent: "center",
		alignItems: "center",
		width: (width - 2 * scale(MAIN_LAYOUT_HORIZONTAL_PADDING)) / 5,
	},
	blankSpace: {
		flex: 1,
	},
	tabLabel: {
		color: Colors.neutral["400"],
		fontFamily: PNSB,
		fontSize: moderateScale(12),
		lineHeight: moderateScale(12 * 1.5),
	},
	activeTabLabel: {
		color: Colors.black,
	},
	tabIcon: {
		width: scale(24),
		height: scale(24),
		resizeMode: "contain",
	},
	activeIcon: {
		tintColor: Colors.black,
	},
	homeTabItemContainer: {
		position: "relative",
		height: scaleHeight(80),
		width: scaleHeight(80),
	},
	homeTabItemInnerContainer: {
		position: "absolute",
		height: scaleHeight(80),
		width: scaleHeight(80),
		bottom: scaleHeight(80 / 2),
		alignItems: "center",
		justifyContent: "center",
		borderRadius: scaleHeight(80 / 2),
		backgroundColor: Colors.appBackground,
	},
	homeIconWrapper: {
		width: scaleHeight(65),
		height: scaleHeight(65),
		borderRadius: scaleHeight(35),
		backgroundColor: Colors.primary.base,
		alignItems: "center",
		justifyContent: "center",
		borderWidth: moderateScale(4),
		borderColor: Colors.white,
	},
	comingSoonText: {
		fontSize: moderateScale(9),
		fontFamily: PNB,
		color: Colors.primary.base,
		textShadowColor: Colors.black, // Black outline
		textShadowOffset: { width: 0.4, height: 0.4 }, // Stroke width
		textShadowRadius: 0.6,
	},
});

export default styles;
