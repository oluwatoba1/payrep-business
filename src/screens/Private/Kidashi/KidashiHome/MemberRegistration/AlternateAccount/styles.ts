import { StyleSheet } from "react-native";
import { moderateScale, scale, scaleHeight } from "@utils/Helpers";
import Colors from "@theme/Colors";

export const styles = StyleSheet.create({
	skipIcon: {
		width: scaleHeight(16),
		height: scaleHeight(16),
		resizeMode: "contain",
	},
	accountContainer: {
		paddingVertical: scaleHeight(24),
		borderTopColor: Colors.neutral["50"],
		borderTopWidth: 1,
		borderBottomColor: Colors.neutral["50"],
		borderBottomWidth: 1,
		marginTop: scaleHeight(16),
	},
	accountWrapper: {
		backgroundColor: Colors.primary["100"],
		borderWidth: 1,
		borderColor: Colors.primary["200"],
		paddingVertical: scaleHeight(11),
		paddingHorizontal: scale(7),
		borderRadius: moderateScale(40),
	},
	skipButton: {
		backgroundColor: 'transparent',
	},
	skipButtonText: {
		color: Colors.primary.base,
	},
});
