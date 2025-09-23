import Colors from "@theme/Colors";
import { moderateScale, scale } from "@utils/Helpers";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	closeIcon: {
		width: scale(16),
		height: scale(16),
		resizeMode: "contain",
	},
	closeButton: {
		padding: scale(8),
	},
	actionCard: {},
	iconContainer: {
		borderRadius: "100%",
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: Colors.neutral[50],
		padding: scale(12),
	},
	icon: {
		width: scale(30),
		height: scale(30),
	},
	subTitle: {
		fontSize: moderateScale(12),
	},
	chevronRightIcon: {
		width: scale(24),
		height: scale(24),
		resizeMode: "contain",
	},
});
