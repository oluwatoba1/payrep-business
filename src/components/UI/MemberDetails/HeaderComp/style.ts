import { StyleSheet } from "react-native";
import Colors from "@theme/Colors";
import { scale } from "@utils/Helpers";

export const styles = StyleSheet.create({
	container: {
		paddingVertical: 24,
		alignItems: "center",
	},
	avatarContainer: {
		marginBottom: 16,
		alignItems: "center",
	},
	avatar: {
		width: 80,
		height: 80,
		borderRadius: 40,
	},
	userNameContainer: {
		marginBottom: 20,
		alignItems: "center",
	},
	otpStatusBar: {
		backgroundColor: Colors.primary["100"],
		borderColor: Colors.primary[300],
		borderWidth: 1,
		borderRadius: 12,
		marginBottom: 16,
		width: "100%",
	},
	otpStatusContent: {
		flexDirection: "row",
		alignItems: "center",
		paddingHorizontal: 16,
		paddingVertical: 12,
	},
	infoIcon: {
		width: 16,
		height: 16,
		marginRight: 8,
	},
	otpText: {
		flex: 1,
		marginRight: 8,
	},
	arrowIcon: {
		width: 16,
		height: 16,
	},
	balanceContainer: {
		backgroundColor: Colors.primary[50],
		borderColor: Colors.primary[200],
		borderWidth: 1,
		borderRadius: 12,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	},
	balanceContent: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingHorizontal: 16,
		paddingVertical: scale(4),
	},
	balanceAmountContainer: {
		flexDirection: "row",
		alignItems: "center",
		paddingHorizontal: 16,
		paddingVertical: scale(4),
		backgroundColor: Colors.primary["100"],
	},
});
