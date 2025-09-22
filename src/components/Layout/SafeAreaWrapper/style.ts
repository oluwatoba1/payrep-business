import { scale } from "@utils/Helpers";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: scale(16),
		paddingTop: scale(50),
		paddingBottom: scale(20),
		backgroundColor: "#FFFFFF",
	},
	header: {
		flexDirection: "row",
		alignItems: "center",
		gap: scale(16),
	},
	icon: {
		width: scale(20),
		height: scale(20),
		resizeMode: "contain",
	},
});
