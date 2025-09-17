import Colors from "@theme/Colors";
import { scale, scaleHeight } from "@utils/Helpers";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	container: {
		paddingVertical: scaleHeight(10),
		borderBottomWidth: 1,
		borderBottomColor: Colors.neutral["50"],
	},
	iconContainer: {
		height: scaleHeight(40),
		width: scaleHeight(40),
		borderRadius: scaleHeight(40),
		backgroundColor: "#E6E6E6",
	},
	icon: {
		height: scaleHeight(24),
		width: scaleHeight(24),
		borderRadius: scaleHeight(40),
		resizeMode: "contain",
	},
});

export default styles;
