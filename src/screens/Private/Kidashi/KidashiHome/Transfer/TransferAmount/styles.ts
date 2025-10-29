import Colors from "@theme/Colors";
import { moderateScale, scaleHeight } from "@utils/Helpers";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	trustCircleCard: {
		padding: scaleHeight(8),
		borderWidth: 1,
		backgroundColor: "#F1F3F3",
		borderColor: "#DCDFE0",
		borderRadius: moderateScale(24),
	},
	trustCircleIcon: {
		width: scaleHeight(16),
		height: scaleHeight(16),
		resizeMode: "contain",
	},
	memberHeader: {
		paddingVertical: scaleHeight(8),
		borderTopColor: Colors.neutral["50"],
		borderTopWidth: 1,
		borderBottomColor: Colors.neutral["50"],
		borderBottomWidth: 1,
	},
});

export default styles;
