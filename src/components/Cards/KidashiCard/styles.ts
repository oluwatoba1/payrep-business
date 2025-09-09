import Colors from "@theme/Colors";
import { moderateScale, scaleHeight, scale } from "@utils/Helpers";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	container: {
		padding: scaleHeight(16),
		borderRadius: moderateScale(12),
		backgroundColor: Colors.gray["1000"],
		borderWidth: 1,
		borderColor: Colors.neutral["200"],
	},
	headerBackground: {
		width: scale(311),
		height: scaleHeight(141),
		borderRadius: moderateScale(12),
	},
	headerImage: {
		width: scale(311),
		height: scaleHeight(141),
		resizeMode: "cover",
	},
	arrowRight: {
		width: scaleHeight(16),
		height: scaleHeight(16),
		resizeMode: "contain",
	},
});

export default styles;
