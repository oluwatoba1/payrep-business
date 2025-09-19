import { StyleSheet } from "react-native";
import Colors from "@theme/Colors";
import { scale, scaleHeight } from "@utils/Helpers";

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.white,
		borderTopLeftRadius: scale(20),
		borderTopRightRadius: scale(20),
		paddingTop: scaleHeight(20),
	},
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: scale(20),
		paddingBottom: scaleHeight(20),
	},
	closeButton: {
		padding: scale(4),
	},
	closeIcon: {
		width: scale(16),
		height: scale(16),
		resizeMode: "contain",
		tintColor: Colors.gray[400],
	},
	optionsContainer: {
		flex: 1,
		paddingHorizontal: scale(10),
		paddingBottom: scaleHeight(16),
	},
	optionContent: {
		flexDirection: "row",
		alignItems: "center",
		paddingVertical: scaleHeight(16),
	},
	iconContainer: {
		width: scale(40),
		height: scale(40),
		borderRadius: scale(20),
		backgroundColor: Colors.gray[100],
		justifyContent: "center",
		alignItems: "center",
		marginRight: scale(16),
	},
	optionIcon: {
		width: scale(16),
		height: scale(16),
		tintColor: Colors.neutral[700],
		resizeMode: "contain",
	},
	textContainer: {
		flex: 1,
		justifyContent: "center",
	},
	arrowIcon: {
		width: scale(16),
		height: scale(16),
		tintColor: Colors.gray[400],
	},
});
