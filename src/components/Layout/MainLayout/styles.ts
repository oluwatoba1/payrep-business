import { StyleSheet } from "react-native";

// Local
import {
	MAIN_LAYOUT_HORIZONTAL_PADDING,
	height,
	width,
} from "@utils/Constants";
import { scale } from "@utils/Helpers";

const styles = StyleSheet.create({
	mainLayoutContainer: {
		flex: 1,
		paddingHorizontal: scale(MAIN_LAYOUT_HORIZONTAL_PADDING),
	},
	container: {
		flex: 1,
		height,
		width: width - 2 * scale(MAIN_LAYOUT_HORIZONTAL_PADDING),
	},
});

export default styles;
