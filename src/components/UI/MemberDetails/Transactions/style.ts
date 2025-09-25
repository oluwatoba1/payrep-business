import { moderateScale, scale, scaleHeight } from "@utils/Helpers";
import { StyleSheet } from "react-native";
import Colors from "@theme/Colors";

export const styles = StyleSheet.create({
	container: {
		// flex: 1,
	},
	iconContainer: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		width: scaleHeight(46),
		height: scaleHeight(46),
		borderRadius: moderateScale(46),
		padding: scale(16),
	},
	iconContainerCredit: {
		backgroundColor: Colors.success[50],
		borderColor: Colors.success[200],
	},
	iconContainerUnknown: {
		backgroundColor: Colors.cardColor.purple[50],
	},
	iconContainerDebit: {
		backgroundColor: Colors.primary[100],
	},
	transactionIcon: {
		width: scaleHeight(24),
		height: scaleHeight(24),
	},
});
