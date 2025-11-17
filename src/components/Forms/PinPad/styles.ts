import { TextStyle, ViewStyle } from "react-native";
import { moderateScale, scale } from "../../../utils/Helpers";
import { PNB } from "../../../theme/Fonts";
import Colors from "../../../theme/Colors";
import { MAIN_LAYOUT_HORIZONTAL_PADDING, width } from "@utils/Constants";

interface PinPadStyleFunction {
	(
		isFocused: boolean,
		isLastItem: boolean,
		boxSide: number,
		gap: number
	): ViewStyle;
}

interface PinPadInputStyleFunction {
	(codeLength: number): TextStyle;
}

type PinPadStyle = {
	pinPadContainer: ViewStyle;
	pinBoxContainer: PinPadStyleFunction;
	pinText: TextStyle;
	error: TextStyle;
	pinInput: PinPadInputStyleFunction;
	hiddenInput: ViewStyle;
	resendOtpText: TextStyle;
};

const styles: PinPadStyle = {
	pinPadContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "flex-start",
		alignSelf: "center",
	},
	pinBoxContainer: (isFocused, isLastItem, boxSide, gap) => ({
		borderWidth: 1,
		borderColor: isFocused ? Colors.primary.base : Colors.gray[400],
		borderRadius: moderateScale(10),
		width: boxSide,
		height: boxSide,
		marginRight: isLastItem ? 0 : gap,
		alignItems: "center",
		justifyContent: "center",
	}),
	pinInput: (codeLength) => ({
		flex: 1,
		fontSize: codeLength === 4 ? moderateScale(16) : moderateScale(12),
		textAlign: "center",
		color: Colors.black,
	}),
	pinText: {
		fontSize: moderateScale(24),
		fontFamily: PNB,
		color: Colors.black,
		textAlign: "center",
	},
	hiddenInput: {
		position: "absolute",
		opacity: 0,
		width: 1,
		height: 1,
	},
	error: {
		fontSize: scale(12),
		color: Colors.danger.base,
		marginTop: scale(4),
		textAlign: "center",
	},
	resendOtpText: {
		color: Colors.primary.base,
		fontSize: scale(14),
		fontFamily: PNB,
		textAlign: "center",
		marginTop: scale(8),
	},
};

export default styles;
