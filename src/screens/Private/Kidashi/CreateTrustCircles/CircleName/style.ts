import { StyleSheet } from "react-native";
import Colors from "@theme/Colors";
import { scale, scaleHeight } from "@utils/Helpers";

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.white,
		padding: scale(8),
		paddingVertical: scaleHeight(50),
		paddingBottom: scaleHeight(100),
	},
	header: {
		flexDirection: "row",
		alignItems: "center",
		paddingHorizontal: scale(20),
		paddingVertical: scaleHeight(16),
	},
	backButton: {},
	backIcon: {
		width: scale(20),
		height: scale(20),
		tintColor: Colors.gray[900],
		resizeMode: "contain",
	},
	contentContainer: {
		paddingHorizontal: scale(20),
		paddingVertical: scaleHeight(16),
	},
	input: {
		backgroundColor: Colors.gray[100],
		borderRadius: scale(20),
		color: Colors.gray[900],
		padding: scale(16),
	},
});
