import Colors from "@theme/Colors";
import { scale, scaleHeight } from "@utils/Helpers";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	container: {},
	assetStatusContainer: {
		paddingHorizontal: scale(10),
		paddingVertical: scaleHeight(2),
		borderRadius: scale(100),
		textTransform: "capitalize",
		fontSize: 12,
	},
	assetStatusContainerView: {
		alignItems: "center",
		justifyContent: "center",
		marginTop: scaleHeight(4),
	},
	ongoingCardContainer: {
		borderWidth: scale(2),
		borderColor: Colors.cardColor.brown["100"],
		borderRadius: scale(12),
		overflow: "hidden",
	},
	ongoingCardProgressContainer: {
		padding: scale(8),
		backgroundColor: Colors.primary["50"],
	},
	ongoingCardDetailsContainer: {
		padding: scale(8),
		backgroundColor: Colors.primary["100"],
		borderTopWidth: scale(2),
		borderColor: Colors.cardColor.brown["100"],
	},
	cardLabel: {
		color: Colors.neutral[400],
		fontSize: scale(12),
		fontWeight: "600",
	},
	cardLabel2: {
		color: Colors.neutral["base"],
		fontSize: scale(12),
		fontWeight: "600",
	},
	cardAmount: {
		color: Colors.black,
		fontSize: scale(12),
		fontWeight: "bold",
	},
	approvedCardContainer: {
		borderWidth: scale(2),
		borderColor: Colors.success["100"],
		borderRadius: scale(12),
		overflow: "hidden",
	},
	approvedCardHeaderContainer: {
		padding: scale(8),
		backgroundColor: Colors.success["50"],
	},
	approvedCardDetailsContainer: {
		padding: scale(8),
		backgroundColor: Colors.success["100"],
		borderTopWidth: scale(2),
		borderColor: Colors.success["100"],
	},
	deniedCardContainer: {
		borderWidth: scale(1),
		borderColor: Colors.danger[200],
		borderRadius: scale(12),
		overflow: "hidden",
		backgroundColor: Colors.danger[50],
	},
	deniedCardHeader: {
		padding: scale(12),
		backgroundColor: Colors.danger[50],
		borderBottomWidth: scale(1),
		borderBottomColor: Colors.danger[200],
	},
	deniedIconContainer: {
		width: scale(20),
		height: scale(20),
		borderRadius: scale(10),
		borderWidth: scale(1),
		borderColor: Colors.danger[400],
		// backgroundColor: Colors.danger[600],
		justifyContent: "center",
		alignItems: "center",
	},
	deniedIcon: {
		fontSize: scale(12),
		fontWeight: "bold",
	},
	deniedTitle: {
		fontSize: scale(12),
		fontWeight: "600",
		flex: 1,
	},
	deniedCardBody: {
		padding: scale(12),
		backgroundColor: Colors.danger[100],
	},
	deniedMessage: {
		fontSize: scale(12),
		lineHeight: scale(16),
		textAlign: "left",
	},
	rejectedCardContainer: {
		borderWidth: scale(1),
		borderColor: Colors.gray[200],
		borderRadius: scale(12),
		overflow: "hidden",
		backgroundColor: Colors.gray[50],
	},
	rejectedCardHeader: {
		padding: scale(12),
		backgroundColor: Colors.gray[50],
		borderBottomWidth: scale(1),
		borderBottomColor: Colors.gray[200],
	},
	rejectedHeaderLabel: {
		fontSize: scale(12),
		fontWeight: "600",
	},
	rejectedHeaderValue: {
		fontSize: scale(12),
		fontWeight: "400",
	},
	rejectedCardBody: {
		padding: scale(12),
		backgroundColor: Colors.gray[100],
	},
	rejectedDetailRow: {
		marginBottom: scaleHeight(8),
	},
	rejectedLabel: {
		fontSize: scale(12),
		fontWeight: "400",
		marginBottom: scaleHeight(2),
	},
	rejectedValue: {
		fontSize: scale(12),
		fontWeight: "600",
		lineHeight: scale(16),
	},
});
