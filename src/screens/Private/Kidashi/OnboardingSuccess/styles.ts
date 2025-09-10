import { scaleHeight } from "@utils/Helpers";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	checkIcon: {
		width: scaleHeight(56),
		height: scaleHeight(56),
		resizeMode: "contain",
	},
});

export default styles;
