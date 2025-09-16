import { StyleSheet } from "react-native";

import { scaleHeight } from "@utils/Helpers";
import Colors from "@theme/Colors";

const styles = StyleSheet.create({
	emptyStateContainer: {
		alignItems: "center",
		justifyContent: "center",
		paddingVertical: scaleHeight(56),
	},
	iconContainer: {
		width: scaleHeight(54),
		height: scaleHeight(54),
		borderRadius: scaleHeight(27),
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: Colors.neutral["50"],
	},
	icon: {
		width: scaleHeight(24),
		height: scaleHeight(24),
		resizeMode: "contain",
	},
});

export default styles;
