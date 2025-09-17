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
	valueContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	chevronRightIcon: {
		width: scale(16),
		height: scale(16),
		resizeMode: "contain",
	},
});

export default styles;
