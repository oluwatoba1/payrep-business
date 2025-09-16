import { StyleSheet, Platform } from "react-native";
import Colors from "@theme/Colors";
import { scale, scaleHeight } from "@utils/Helpers";

export const styles = StyleSheet.create({
	container: {
		paddingTop: scaleHeight(50), // Account for status bar
	},
	header: {
		flexDirection: "row",
		alignItems: "center",
		paddingHorizontal: scale(20),
		paddingVertical: scaleHeight(16),
	},
	backButton: {
		padding: scale(8),
	},
	backIcon: {
		width: scale(24),
		height: scale(24),
		tintColor: Colors.gray[900],
		resizeMode: "contain",
	},
	contentContainer: {
		alignItems: "center",
		justifyContent: "center",
		// backgroundColor: "red",
		transform: [{ translateY: scaleHeight(-100) }],
		// paddingHorizontal: scale(40),
		// paddingTop: scaleHeight(40),
	},
	iconContainer: {
		position: "relative",
		marginBottom: scaleHeight(32),
		alignItems: "center",
		justifyContent: "center",
	},

	headerIcon: {
		width: scale(200),
		height: scale(200),
	},
	title: {
		textAlign: "center",
		marginBottom: scaleHeight(16),
		fontSize: scale(28),
		fontWeight: "bold",
	},
	subtitle: {
		textAlign: "center",
		lineHeight: scaleHeight(24),
		fontSize: scale(16),
		maxWidth: scale(280),
	},
});
