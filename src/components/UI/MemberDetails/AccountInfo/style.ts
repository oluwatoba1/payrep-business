import Colors from "@theme/Colors";
import { moderateScale, scale, scaleHeight } from "@utils/Helpers";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	accountNumberContainer: {
		flexDirection: "row",
		gap: scale(4),
		alignItems: "center",
		justifyContent: "center",
	},
	copyIcon: {
		width: scaleHeight(16),
		height: scaleHeight(16),
	},
	copyIconPressable: {
		flexDirection: "row",
		gap: scale(4),
		backgroundColor: Colors.white,
		paddingVertical: scaleHeight(4),
		paddingHorizontal: scale(10),
		borderRadius: moderateScale(20),
		alignItems: "center",
		justifyContent: "center",
		shadowColor: Colors.black,
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 5,
		elevation: 5,
	},
});
