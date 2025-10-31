import Colors from "@theme/Colors";
import { MAIN_LAYOUT_HORIZONTAL_PADDING, width } from "@utils/Constants";
import { scale, scaleHeight } from "@utils/Helpers";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	headerContainer: {
		alignItems: "center",
		justifyContent: "center",
	},
	backIcon: {
		width: scaleHeight(24),
		height: scaleHeight(24),
		resizeMode: "contain",
	},
	headerIcon: {
		width: scaleHeight(41),
		height: scaleHeight(41),
		resizeMode: "contain",
	},
	successIcon: {
		height: scaleHeight(26),
		resizeMode: "contain",
	},
	itemContainer: {
		borderBottomWidth: 1,
		borderColor: Colors.gray["1000"],
		paddingVertical: scaleHeight(12),
	},
	button: {
		width: (width - scale(2 * MAIN_LAYOUT_HORIZONTAL_PADDING) - scale(20)) / 2,
	},
});

export default styles;
