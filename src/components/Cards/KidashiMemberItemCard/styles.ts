import Colors from "@theme/Colors";
import { scaleHeight } from "@utils/Helpers";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	cardContainer: {
		paddingVertical: scaleHeight(16),
		borderTopWidth: 1,
		borderBottomWidth: 1,
		borderTopColor: Colors.neutral["50"],
		borderBottomColor: Colors.neutral["50"],
	},
	memberIcon: {
		width: scaleHeight(40),
		height: scaleHeight(40),
		resizeMode: "contain",
	},
});

export default styles;
