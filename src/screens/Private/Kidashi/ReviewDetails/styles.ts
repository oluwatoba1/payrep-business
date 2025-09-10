import { StyleSheet } from "react-native";

import { moderateScale, scaleHeight } from "@utils/Helpers";
import Colors from "@theme/Colors";

const styles = StyleSheet.create({
	vendorPlaceholderContainer: {
		width: scaleHeight(56),
		height: scaleHeight(56),
		borderRadius: scaleHeight(28),
	},
	vendorPlaceholderImage: {
		width: scaleHeight(56),
		height: scaleHeight(56),
		resizeMode: "contain",
	},
	editContainer: {
		backgroundColor: "transparent",
		borderRadius: moderateScale(16),
		borderColor: Colors.gray["1000"],
	},
	editIcon: {
		width: scaleHeight(16),
		height: scaleHeight(16),
		resizeMode: "contain",
	},
	reviewCardContainer: {
		padding: scaleHeight(12),
		borderRadius: moderateScale(12),
		borderWidth: 1,
		borderColor: Colors.gray["1000"],
		marginBottom: scaleHeight(16),
	},
	reviewCardHeader: {
		borderBottomWidth: 1,
		borderBottomColor: Colors.gray["1000"],
	},
});

export default styles;
