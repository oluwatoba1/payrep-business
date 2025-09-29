import { StyleSheet } from "react-native";

// Local
import { moderateScale, scale, scaleHeight } from "@utils/Helpers";
import Colors from "@theme/Colors";

const styles = StyleSheet.create({
	backIcon: {
		width: scaleHeight(24),
		height: scaleHeight(24),
		resizeMode: "contain",
	},
	trustCircleDetailsIcon: {
		width: scaleHeight(46),
		height: scaleHeight(46),
		resizeMode: "contain",
	},
	proceedToMemberIcon: {
		width: scaleHeight(24),
		height: scaleHeight(24),
		resizeMode: "contain",
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
		bottom: scaleHeight(60),
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
});

export default styles;
