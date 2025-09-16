import { StyleSheet } from "react-native";

import { moderateScale, scale, scaleHeight } from "@utils/Helpers";
import Colors from "@theme/Colors";
import {
	BOTTOM_TAB_CONTAINER_HEIGHT,
	MAIN_LAYOUT_HORIZONTAL_PADDING,
} from "@utils/Constants";

const styles = StyleSheet.create({
	earningsBanner: {
		paddingHorizontal: scale(12),
		paddingVertical: scaleHeight(5),
		borderRadius: moderateScale(44),
		backgroundColor: Colors.white,
		width: "85%",
		borderWidth: 1,
		borderColor: Colors.neutral["50"],
	},
	caretIcon: {
		width: scale(16),
		height: scaleHeight(16),
	},
	plusIconContainer: {
		position: "absolute",
		right: scale(MAIN_LAYOUT_HORIZONTAL_PADDING),
		bottom: scaleHeight(BOTTOM_TAB_CONTAINER_HEIGHT) + scaleHeight(21),
		width: scaleHeight(54),
		height: scaleHeight(54),
		borderRadius: scaleHeight(54),
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: Colors.primary.base,
	},
	plusIcon: {
		width: scaleHeight(16),
		height: scaleHeight(16),
		resizeMode: "contain",
	},
});

export default styles;
