import Colors from "@theme/Colors";
import { scale, scaleHeight } from "@utils/Helpers";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	container: {
		backgroundColor: Colors.white,
		borderRadius: scale(16),
		paddingHorizontal: scale(20),
		paddingVertical: scaleHeight(20),
		// marginHorizontal: scale(20),
		marginVertical: scaleHeight(10),
		borderWidth: scale(1),
		borderColor: Colors.gray[100],
	},
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: scaleHeight(4),
	},
	headerTitle: {
		flex: 1,
	},
	closeButton: {
		width: scale(32),
		height: scale(32),
		borderRadius: scale(16),
		backgroundColor: Colors.gray[900],
		justifyContent: "center",
		alignItems: "center",
		marginLeft: scale(10),
	},
	closeButtonText: {
		color: Colors.white,
		fontSize: scale(18),
		fontWeight: "bold",
		lineHeight: scale(20),
	},
	stepsContainer: {
		marginTop: scaleHeight(4),
	},
	stepItem: {
		flexDirection: "row",
		alignItems: "flex-start",
		paddingVertical: scaleHeight(12),
	},
	iconContainer: {
		width: scale(40),
		height: scale(40),
		borderRadius: scale(20),
		// backgroundColor: Colors.gray[100],
		borderColor: Colors.gray[200],
		borderWidth: scale(1),
		justifyContent: "center",
		alignItems: "center",
		marginRight: scale(16),
		marginTop: scaleHeight(2),
	},
	stepIcon: {
		width: scale(20),
		height: scale(20),
		tintColor: Colors.gray[400],
		resizeMode: "contain",
	},
	textContainer: {
		flex: 1,
		justifyContent: "flex-start",
	},
	stepTitle: {
		marginBottom: scaleHeight(4),
		fontSize: scale(16),
		fontWeight: "600",
	},
	stepDescription: {
		fontSize: scale(14),
		lineHeight: scaleHeight(20),
	},
});
