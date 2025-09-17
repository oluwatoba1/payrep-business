import Colors from "@theme/Colors";
import { scale } from "@utils/Helpers";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	nameContainer: {
		flexDirection: "row",
		alignItems: "center",
		gap: scale(10),
		backgroundColor: Colors.neutral["50"],
		padding: scale(10),
	},
	nameImage: {
		width: scale(50),
		height: scale(50),
		borderRadius: scale(12),
		resizeMode: "contain",
	},
	nameText: {
		fontSize: scale(14),
	},
	nextOfKinContainer: {
		borderRadius: scale(16),
		overflow: "hidden",
	},
	nextOfKinItem: {
		padding: scale(10),
		backgroundColor: Colors.white,
	},
});
