import Colors from "@theme/Colors";
import { scale, scaleHeight } from "@utils/Helpers";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	container: {
		alignItems: "center",
		justifyContent: "center",
	},
	packageIconContainer: {
		borderRadius: "100%",
		backgroundColor: Colors.cardColor.purple["50"],
		padding: scale(12),
		alignItems: "center",
		justifyContent: "center",
		marginHorizontal: "auto",
	},
	packageIcon: {
		width: scale(20),
		height: scale(20),
	},
	amount: {
		fontWeight: "bold",
		marginVertical: scaleHeight(2),
	},
	reference: {
		fontSize: scale(12),
	},
});
