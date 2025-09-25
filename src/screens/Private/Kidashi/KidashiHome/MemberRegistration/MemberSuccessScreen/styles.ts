import Colors from "@theme/Colors";
import { MAIN_LAYOUT_HORIZONTAL_PADDING, width } from "@utils/Constants";
import { moderateScale, scale, scaleHeight } from "@utils/Helpers";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	accountContainer: {
		padding: scaleHeight(8),
		borderRadius: moderateScale(8),
		backgroundColor: Colors.gray["50"],
		borderWidth: 1,
		borderColor: "#E7E9E9",
		width: width - 2 * scale(MAIN_LAYOUT_HORIZONTAL_PADDING),
	},
	successIcon: {
		width: scale(96),
		height: scaleHeight(56),
		resizeMode: "contain",
	},
});

export default styles;
