import Colors from "@theme/Colors";
import { MAIN_LAYOUT_HORIZONTAL_PADDING, width } from "@utils/Constants";
import { moderateScale, scale, scaleHeight } from "@utils/Helpers";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	cardContainer: {
		padding: scale(12),
		borderRadius: moderateScale(12),
		borderWidth: 1,
		borderColor: Colors.neutral["50"],
		width: width - 2 * scale(MAIN_LAYOUT_HORIZONTAL_PADDING),
	},
	card: {
		borderRadius: moderateScale(12),
		paddingHorizontal: scale(12),
		paddingVertical: scaleHeight(8),
		width:
			(width - 2 * scale(MAIN_LAYOUT_HORIZONTAL_PADDING) - scale(12 * 3)) / 2,
	},
});

export default styles;
