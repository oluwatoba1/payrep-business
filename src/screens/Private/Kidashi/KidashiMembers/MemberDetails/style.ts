import Colors from "@theme/Colors";
import { scale } from "@utils/Helpers";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: scale(16),
		paddingTop: scale(50),
		paddingBottom: scale(100),
	},
	performActionButton: {
		padding: scale(10),
		paddingHorizontal: scale(16),
		backgroundColor: Colors.primary["base"],
		borderRadius: 200,
		alignItems: "center",
		justifyContent: "center",
		marginHorizontal: "auto",
		position: "absolute",
		bottom: scale(16),
		right: scale(16),
		flexDirection: "row",
		gap: scale(8),
		alignSelf: "center",
		elevation: 10,
		shadowColor: Colors.black,
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.25,
		shadowRadius: 1,
	},
	boltIcon: {
		width: scale(20),
		height: scale(20),
		resizeMode: "contain",
	},
	performActionText: {
		fontSize: scale(12),
	},
});
