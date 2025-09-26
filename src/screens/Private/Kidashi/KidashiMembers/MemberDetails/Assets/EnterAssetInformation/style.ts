import { StyleSheet } from "react-native";
import Colors from "@theme/Colors";
import { scale, scaleHeight } from "@utils/Helpers";

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.white,
	},
	screenTitle: {
		fontSize: scale(24),
		fontWeight: "500",
		color: Colors.gray["900"],
		marginBottom: scaleHeight(8),
	},
	screenSubTitle: {
		fontSize: scale(14),
		color: Colors.gray["600"],
		lineHeight: scale(20),
	},
	itemListContainer: {
		marginBottom: scaleHeight(16),
	},
	itemCountBadge: {
		width: scale(24),
		height: scale(24),
		borderRadius: scale(12),
		backgroundColor: Colors.gray["800"],
		justifyContent: "center",
		alignItems: "center",
		marginHorizontal: scale(8),
	},
	addMoreButton: {
		flexDirection: "row",
		alignItems: "center",
		gap: scale(4),
	},
	plusIcon: {
		width: scale(16),
		height: scale(16),
		// tintColor: Colors.primary["base"],
	},
	itemRow: {
		marginBottom: scaleHeight(16),
	},
	itemLabel: {
		fontSize: scale(14),
		color: Colors.gray["700"],
		marginBottom: scaleHeight(8),
	},
	itemInput: {
		flex: 1,
		height: scale(48),
		borderRadius: scale(100),
		borderWidth: 1,
		borderColor: Colors.gray["300"],
		backgroundColor: Colors.gray["50"],
		paddingHorizontal: scale(12),
		fontSize: scale(12),
		color: Colors.gray["900"],
	},
	priceInput: {
		flex: 1,
		height: scale(48),
		fontSize: scale(12),
		color: Colors.gray["900"],
		textAlign: "right",
	},
	priceInputContainer: {
		width: scale(120),
		height: scale(48),
		borderRadius: scale(100),
		borderWidth: 1,
		borderColor: Colors.gray["300"],
		backgroundColor: Colors.gray["50"],
		paddingHorizontal: scale(12),
		flexDirection: "row",
		alignItems: "center",
		gap: scale(6),
	},
	nairaPrefix: {
		color: Colors.gray["900"],
		fontSize: scale(12),
	},
	deleteButton: {
		// width: scale(48),
		// height: scale(48),
		// justifyContent: "center",
		// alignItems: "center",
	},
	trashIcon: {
		width: scale(20),
		height: scale(20),
		tintColor: Colors.danger["base"],
	},
	trashIconDisabled: {
		opacity: 0.3,
	},
	nextButtonContainer: {
		position: "absolute",
		bottom: scaleHeight(16),
		left: scale(16),
		right: scale(16),
	},
	nextButton: {
		backgroundColor: Colors.primary["base"],
		borderRadius: scale(12),
		height: scale(56),
		justifyContent: "center",
		alignItems: "center",
	},
	nextButtonText: {
		color: Colors.white,
		fontSize: scale(16),
		fontWeight: "600",
	},
});
