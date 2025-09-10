import Colors from "@theme/Colors";
import { MAIN_LAYOUT_HORIZONTAL_PADDING, width } from "@utils/Constants";
import { scale, scaleHeight } from "@utils/Helpers";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	tabContainer: {
		width: width - 2 * scale(MAIN_LAYOUT_HORIZONTAL_PADDING),
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "flex-start",
		borderBottomWidth: 1,
		borderBottomColor: Colors.gray["1000"],
	},
	tabText: {
		paddingVertical: scaleHeight(8),
		paddingHorizontal: scale(16),
	},
});

export default styles;
