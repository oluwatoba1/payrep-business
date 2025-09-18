import { StyleSheet } from "react-native";
import Colors from "@theme/Colors";
import { scale, scaleHeight } from "@utils/Helpers";

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingVertical: scaleHeight(24),
	},
	iconContainer: {
		width: scale(80),
		height: scale(80),
		borderRadius: scale(40),
		backgroundColor: Colors.primary[50],
		justifyContent: "center",
		alignItems: "center",
		marginHorizontal: "auto",
	},
	transactionIcon: {
		width: scale(30),
		height: scaleHeight(30),
	},
	amountContainer: {
		alignItems: "center",
	},
	amountText: {
		fontSize: scale(24),
		fontWeight: "bold",
	},
	typeContainer: {
		alignItems: "center",
	},
	typeText: {
		fontSize: scale(16),
	},
	statusContainer: {
		marginBottom: scaleHeight(40),
		alignItems: "center",
	},
	statusBadge: {
		flexDirection: "row",
		alignItems: "center",
		paddingHorizontal: scale(16),
		paddingVertical: scaleHeight(8),
		gap: scale(8),
		borderRadius: scale(20),
		borderWidth: 1,
		borderColor: Colors.success[200],
	},

	statusIcon: {
		width: scale(20),
		height: scaleHeight(20),
	},
	checkmarkIcon: {
		fontSize: scale(10),
		fontWeight: "bold",
	},
	statusText: {
		fontSize: scale(12),
		fontWeight: "600",
	},
	transNumberContainer: {
		flexDirection: "row",
		gap: scale(4),
		alignItems: "center",
		justifyContent: "center",
	},
	transNumberPressable: {
		flexDirection: "row",
		gap: scale(4),
		alignItems: "center",
		justifyContent: "center",
	},
	copyIcon: {
		width: scale(16),
		height: scale(16),
	},
	downloadReceiptContainer: {
		flexDirection: "row",
		gap: scale(4),
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: Colors.primary.base,
		padding: scale(16),
		borderRadius: 200,
		width: scale(200),
		marginHorizontal: "auto",
	},
	downloadIcon: {
		width: scale(16),
		height: scale(16),
	},
});
