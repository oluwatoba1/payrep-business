import { StyleSheet } from "react-native";
import Colors from "@theme/Colors";
import { scale, scaleHeight } from "@utils/Helpers";

export const styles = StyleSheet.create({
	container: {},
	closeIcon: {
		width: scale(18),
		height: scale(18),
	},
	headerIconContainer: {
		width: scale(72),
		height: scale(72),
		borderRadius: scale(36),
		backgroundColor: Colors.gray["50"],
		justifyContent: "center",
		alignItems: "center",
		marginHorizontal: "auto",
	},
	headerIcon: {
		width: scale(28),
		height: scale(28),
		tintColor: Colors.gray["700"],
		resizeMode: "contain",
	},
	title: {
		textAlign: "center",
		marginTop: scaleHeight(8),
	},
	subtitle: {
		textAlign: "center",
		marginTop: scaleHeight(4),
		color: Colors.gray["600"],
	},
	phoneContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		gap: scale(8),
		backgroundColor: Colors.gray["50"],
		paddingHorizontal: scale(16),
		height: scaleHeight(44),
		borderRadius: scale(22),
		alignSelf: "center",
		marginTop: scaleHeight(12),
	},
	phoneIcon: {
		width: scale(16),
		height: scale(16),
		tintColor: Colors.gray["700"],
	},
	infoBox: {
		flexDirection: "row",
		alignItems: "center",
		gap: scale(8),
		backgroundColor: Colors.gray["50"],
		padding: scale(12),
		borderRadius: scale(12),
	},
	infoIcon: {
		width: scale(16),
		height: scale(16),
		tintColor: Colors.gray["700"],
		marginTop: scaleHeight(2),
	},
	resendIcon: {
		width: scale(16),
		height: scale(16),
		resizeMode: "contain",
	},
});
