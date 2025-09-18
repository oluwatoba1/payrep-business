import Colors from "@theme/Colors";
import { MAIN_LAYOUT_HORIZONTAL_PADDING, width } from "@utils/Constants";
import { moderateScale, scale, scaleHeight } from "@utils/Helpers";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	cardContainer: {
		width: width - 2 * scale(MAIN_LAYOUT_HORIZONTAL_PADDING),
	},
	card: {
		borderRadius: moderateScale(12),
		paddingHorizontal: scale(12),
		paddingVertical: scaleHeight(8),
		width:
			(width - 2 * scale(MAIN_LAYOUT_HORIZONTAL_PADDING) - scale(12 * 1)) / 2,
	},
	chevronRightIcon: {
		width: scale(16),
		height: scale(16),
		resizeMode: "contain",
	},
	dot: {
		width: scale(12),
		height: scale(12),
		borderRadius: "100%",
		backgroundColor: Colors.primary[600],
	},
});

export default styles;
