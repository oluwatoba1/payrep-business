import { StyleSheet } from "react-native";
import Colors from "@theme/Colors";
import { scale, scaleHeight } from "@utils/Helpers";

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.white,
	},
	contentContainer: {
		paddingHorizontal: scale(20),
		paddingBottom: scaleHeight(100),
		flex: 1,
	},
	skipIcon: {
		width: scale(24),
		height: scale(24),
		resizeMode: "contain",
		tintColor: Colors.gray[400],
	},
	skipButton: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
	},
});

export default styles;
