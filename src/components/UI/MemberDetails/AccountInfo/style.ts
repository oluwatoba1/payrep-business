import Colors from "@theme/Colors";
import { scale } from "@utils/Helpers";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	accountNumberContainer: {
		flexDirection: "row",
		gap: scale(4),
		alignItems: "center",
		justifyContent: "center",
	},
	copyIcon: {
		width: scale(16),
		height: scale(16),
	},
	copyIconPressable: {
		flexDirection: "row",
		gap: scale(4),
		backgroundColor: Colors.white,
		padding: scale(4),
		borderRadius: scale(8),
		alignItems: "center",
		justifyContent: "center",
		shadowColor: Colors.black,
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 5,
		elevation: 5,
	},
});
