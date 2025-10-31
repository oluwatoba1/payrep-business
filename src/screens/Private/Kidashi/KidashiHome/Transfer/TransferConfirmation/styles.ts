import { StyleSheet } from "react-native";
import { scale, scaleHeight } from "@utils/Helpers";
import Colors from "@theme/Colors";

export const styles = StyleSheet.create({
	summaryContainer: {
		borderTopWidth: 1,
		borderColor: Colors.gray["1000"],
	},
	itemContainer: {
		borderBottomWidth: 1,
		borderColor: Colors.gray["1000"],
		paddingVertical: scaleHeight(12),
	},
	transactionDetailsContainer: {
		borderBottomWidth: scale(1),
		borderColor: Colors.gray[50],
		borderRadius: scaleHeight(8),
		marginVertical: scaleHeight(16),
	},
	detailRow: {
		marginBottom: scaleHeight(8),
	},
	detailItem: {
		marginBottom: scaleHeight(16),
		borderBottomWidth: scaleHeight(1),
		borderColor: Colors.gray[50],
		paddingVertical: scaleHeight(12),
	},
	amountDetailsContainer: {
		backgroundColor: Colors.primary[50],
		padding: scaleHeight(16),
		borderRadius: scaleHeight(8),
		marginBottom: scaleHeight(16),
	},
	amountRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: scaleHeight(8),
	},
	pinPadContainer: {
		marginVertical: scaleHeight(60),
		justifyContent: "center",
		alignItems: "center",
		gap: scaleHeight(16),
	},
	boxIconContainer: {
		width: scale(60),
		height: scale(60),
		borderRadius: "100%",
		backgroundColor: Colors.gray["100"],
		justifyContent: "center",
		alignItems: "center",
		marginHorizontal: "auto",
	},
	boxIcon: {
		width: scale(30),
		height: scale(30),
	},
});
