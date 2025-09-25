import { StyleSheet } from "react-native";
import Colors from "@theme/Colors";
import { scale, scaleHeight } from "@utils/Helpers";

export const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	screenTitle: {
		fontSize: scale(20),
		fontWeight: "500",
		color: Colors.gray["900"],
		marginVertical: scaleHeight(8),
		textAlign: "center",
	},
	screenSubTitle: {
		fontSize: scale(14),
		color: Colors.gray["600"],
		lineHeight: scale(20),
		marginBottom: scaleHeight(12),
		textAlign: "center",
	},

	sectionTitle: {
		marginBottom: scaleHeight(12),
	},
	row: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingVertical: scaleHeight(14),
		borderBottomWidth: 1,
		borderBottomColor: Colors.gray["200"],
	},
	dividerBottom: {
		marginBottom: scaleHeight(8),
	},
	itemsHeader: {
		paddingVertical: scaleHeight(8),
	},
	itemCountBadge: {
		width: scale(24),
		height: scale(24),
		borderRadius: scale(12),
		backgroundColor: Colors.gray["800"],
		justifyContent: "center",
		alignItems: "center",
		marginLeft: scale(8),
	},
	totalRow: {
		borderBottomWidth: 0,
		marginTop: scaleHeight(8),
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
