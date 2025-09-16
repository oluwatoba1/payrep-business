import Colors from "@theme/Colors";
import { MAIN_LAYOUT_HORIZONTAL_PADDING, width } from "@utils/Constants";
import { scale, scaleHeight } from "@utils/Helpers";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	tabContainer: {
		maxHeight: scaleHeight(40),
	},
	tabItemContainer: {
		width: width - 2 * scale(MAIN_LAYOUT_HORIZONTAL_PADDING),
		borderBottomWidth: 1,
		borderBottomColor: Colors.gray["1000"],
	},
	tabItem: {
		paddingVertical: scaleHeight(8),
		paddingHorizontal: scale(16),
		borderBottomColor: Colors.black,
		height: "100%",
	},
});

export default styles;
