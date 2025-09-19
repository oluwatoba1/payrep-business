import Colors from "@theme/Colors";
import { scale, scaleHeight } from "@utils/Helpers";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	searchIcon: {
		width: scale(16),
		height: scale(16),
	},
	packageIconContainer: {
		borderRadius: "100%",
		backgroundColor: Colors.cardColor.purple["50"],
		padding: scale(12),
	},
	packageIcon: {
		width: scale(20),
		height: scale(20),
	},
	assetTitleContainer: {
		flex: 1,
	},
	chevronRightIcon: {
		width: scale(20),
		height: scale(20),
	},
	assetTitle: {
		fontSize: 14,
	},
	assetStatusContainer: {
		paddingHorizontal: scale(10),
		paddingVertical: scaleHeight(2),
		borderRadius: scale(100),
		textTransform: "capitalize",
		fontSize: 12,
	},
	dot: {
		width: scale(8),
		height: scale(8),
		borderRadius: "100%",
		backgroundColor: Colors.neutral["400"],
	},
	infoRedIcon: {
		width: scale(16),
		height: scale(16),
	},
	infoRedIconContainer: {
		padding: scale(8),
		paddingVertical: scaleHeight(4),
		borderRadius: 100,
		backgroundColor: Colors.primary["50"],
		borderWidth: scale(2),
		borderColor: Colors.danger["50"],
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
	},
	infoRedIconText: {
		fontSize: 12,
	},
});

export default styles;
