import { scale, scaleHeight } from "@utils/Helpers";
import { StyleSheet } from "react-native";
import Colors from "@theme/Colors";

export const styles = StyleSheet.create({
	container: {
		flex: 1,
	},

	sectionTitle: {
		fontSize: scale(14),
		fontWeight: "600",
		color: Colors.gray[700],
	},
	detailsContainer: {
		// backgroundColor: Colors.white,
	},
	detailRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingVertical: scaleHeight(8),
	},
	itemCountBadge: {
		backgroundColor: Colors.gray[700],
		borderRadius: scale(12),
		paddingHorizontal: scale(8),
		paddingVertical: scaleHeight(4),
		minWidth: scale(24),
		alignItems: "center",
		justifyContent: "center",
	},
	itemsContainer: {
		backgroundColor: Colors.white,
		marginTop: scaleHeight(8),
	},
	itemRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingVertical: scaleHeight(8),
	},
	totalSection: {
		// paddingHorizontal: scale(16),
		paddingVertical: scaleHeight(12),
		// backgroundColor: Colors.gray[50],
		borderTopWidth: 1,
		borderBottomWidth: 1,
		borderTopColor: Colors.gray[200],
		borderBottomColor: Colors.gray[200],
	},
	rejectedCardContainer: {
		backgroundColor: Colors.danger["50"],
		flex: 1,
		borderWidth: 1,
		borderColor: Colors.danger["100"],
	},
});
