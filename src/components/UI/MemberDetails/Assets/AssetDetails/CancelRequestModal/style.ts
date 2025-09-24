import Colors from "@theme/Colors";
import { scale } from "@utils/Helpers";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		paddingHorizontal: scale(8),
		paddingVertical: scale(16),
		// justifyContent: "center",
	},
	cautionIcon: {
		width: scale(24),
		height: scale(24),
		resizeMode: "contain",
	},
	cautionIconContainer: {
		backgroundColor: Colors.danger[50],
		borderRadius: "100%",
		padding: scale(20),
		alignItems: "center",
		justifyContent: "center",
	},
	buttonContainer: {
		gap: scale(12),
		width: "100%",
	},
	closeButton: {
		backgroundColor: Colors.gray[50],
	},
});
