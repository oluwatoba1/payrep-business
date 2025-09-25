import { StyleSheet } from "react-native";
import { scale, scaleHeight } from "@utils/Helpers";
import Colors from "@theme/Colors";

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		paddingHorizontal: scale(16),
	},
	gifContainer: {
		width: scale(220),
		height: scale(220),
		marginBottom: scaleHeight(16),
	},
	webview: {
		backgroundColor: "transparent",
	},
	iconRow: {
		flexDirection: "row",
		alignItems: "center",
		gap: scale(8),
	},

	successIcon: {
		width: scale(56),
		height: scale(56),
		// tintColor: Colors.white,
		resizeMode: "contain",
	},
	boxIconContainer: {
		width: scale(64),
		height: scale(64),
		borderRadius: scale(32),
		backgroundColor: Colors.gray["100"],
		justifyContent: "center",
		alignItems: "center",
		marginLeft: scale(-20),
	},
	boxIcon: {
		width: scale(24),
		height: scale(24),
		tintColor: Colors.gray["700"],
		resizeMode: "contain",
	},
	badge: {
		paddingVertical: scaleHeight(8),
		paddingHorizontal: scale(16),
		backgroundColor: Colors.gray["100"],
		borderRadius: scale(24),
		marginTop: scaleHeight(12),
	},
	title: {
		textAlign: "center",
		marginTop: scaleHeight(16),
		fontSize: scale(20),
		fontWeight: "500",
		color: Colors.gray["900"],
	},
	subtitle: {
		textAlign: "center",
		color: Colors.gray["600"],
		marginTop: scaleHeight(8),
		lineHeight: scaleHeight(20),
		maxWidth: scale(340),
	},
});
