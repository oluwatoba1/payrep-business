import Colors from "@theme/Colors";
import { moderateScale, scaleHeight } from "@utils/Helpers";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	container: {
		padding: scaleHeight(16),
		borderRadius: moderateScale(12),
		backgroundColor: Colors.gray["1000"],
		borderWidth: 1,
		borderColor: Colors.neutral["200"],
	},
	headerImage: {
		width: "100%",
		height: scaleHeight(126),
		resizeMode: "cover",
	},
	arrowRight: {
		width: scaleHeight(16),
		height: scaleHeight(16),
		resizeMode: "contain",
	},
});

export default styles;
