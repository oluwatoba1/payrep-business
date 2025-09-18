import { MAIN_LAYOUT_HORIZONTAL_PADDING, width } from "@utils/Constants";
import { scale, scaleHeight } from "@utils/Helpers";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	checkIcon: {
		width: scaleHeight(56),
		height: scaleHeight(56),
		resizeMode: "contain",
	},
	homeButton: {
		width: width - 2 * scale(MAIN_LAYOUT_HORIZONTAL_PADDING),
	},
});

export default styles;
