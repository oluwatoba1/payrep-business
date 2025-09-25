import Colors from "@theme/Colors";
import { moderateScale, scale, scaleHeight } from "@utils/Helpers";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	accountContainer: {
		padding: scaleHeight(8),
		borderRadius: moderateScale(8),
		backgroundColor: Colors.gray["50"],
		borderWidth: 1,
		borderColor: "#E7E9E9",
		width: "100%",
	},
	successIcon: {
		width: scale(96),
		height: scaleHeight(56),
		resizeMode: "contain",
	},
	addMemberIcon: {
		width: scaleHeight(16),
		height: scaleHeight(16),
		resizeMode: "contain",
	},
});

export default styles;
