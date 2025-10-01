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
		fontSize: scale(12),
		color: Colors.gray["400"],
		lineHeight: scale(20),
		marginBottom: scaleHeight(12),
		textAlign: "center",
	},
	scheduleCardHeader: {
		padding: scale(12),
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
	scheduleCard: {
		borderWidth: 1,
		borderColor: Colors.success["200"],
		backgroundColor: Colors.success["50"],
		borderRadius: scale(12),
		overflow: "hidden",
	},
	sectionTitle: {
		color: Colors.gray["700"],
	},
	cardInner: {
		backgroundColor: Colors.success["100"],
		padding: scale(12),
	},
	amountRow: {
		paddingVertical: scaleHeight(12),
	},
	totalPayableRow: {
		borderTopWidth: 1,
		borderTopColor: Colors.gray["200"],
	},
});
