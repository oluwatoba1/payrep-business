import Colors from "@theme/Colors";
import { scaleHeight } from "@utils/Helpers";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	verifierContainer: {
		alignItems: "center",
		justifyContent: "center",
		paddingVertical: scaleHeight(16),
		borderBottomWidth: 1,
		borderBottomColor: Colors.neutral["50"],
	},
	skipIcon: {
		width: scaleHeight(16),
		height: scaleHeight(16),
		resizeMode: "contain",
	},
});

export default styles;
