import Colors from "@theme/Colors";
import { PNR } from "@theme/Fonts";
import { MAIN_LAYOUT_HORIZONTAL_PADDING, width } from "@utils/Constants";
import { moderateScale, scale, scaleHeight } from "@utils/Helpers";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	inputContainer: {
		position: "relative",
		marginTop: scaleHeight(16),
	},
	leftNodeContainer: {
		paddingLeft: scale(16),
		paddingRight: scale(4),
		alignItems: "center",
		justifyContent: "center",
	},
	rightNodeContainer: {
		paddingRight: scale(16),
		alignItems: "center",
		justifyContent: "center",
	},
	textInputContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		borderWidth: 1,
		borderRadius: moderateScale(8),
		borderColor: Colors.custom.textInputBorderColor,
		width: width - scale(2 * MAIN_LAYOUT_HORIZONTAL_PADDING),
	},
	textInput: {
		minHeight: scaleHeight(50),
		flex: 1,
		paddingVertical: scaleHeight(16),
		fontFamily: PNR,
		fontSize: moderateScale(16),
		color: Colors.black,
		paddingHorizontal: scale(12),
	},
	flagIcon: {
		width: scale(24),
		height: scaleHeight(17),
		resizeMode: "contain",
	},
});

export default styles;
