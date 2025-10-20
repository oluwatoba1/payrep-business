import Colors from "@theme/Colors";
import { BOTTOM_TAB_CONTAINER_HEIGHT } from "@utils/Constants";
import { moderateScale, scale, scaleHeight } from "@utils/Helpers";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: scale(16),
		paddingTop: scale(50),
		paddingBottom: scale(100),
	},
	performActionButton: {
		padding: scaleHeight(10),
		paddingHorizontal: scaleHeight(16),
		backgroundColor: Colors.primary["base"],
		borderRadius: 200,
		alignItems: "center",
		justifyContent: "center",
		marginHorizontal: "auto",
		position: "absolute",
		bottom: scaleHeight(16),
		right: scale(16),
		flexDirection: "row",
		gap: scale(8),
		alignSelf: "center",
		elevation: 10,
		shadowColor: Colors.black,
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.25,
		shadowRadius: 1,
	},
	boltIcon: {
		width: scaleHeight(20),
		height: scaleHeight(20),
		resizeMode: "contain",
	},
	performActionText: {
		fontSize: moderateScale(12),
	},
	transactionContainer: {
		height: scaleHeight(400),
		paddingTop: scaleHeight(10),
		paddingBottom: scaleHeight(BOTTOM_TAB_CONTAINER_HEIGHT * 5),
	},
});
