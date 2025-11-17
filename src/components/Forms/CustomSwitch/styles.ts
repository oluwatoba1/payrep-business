import { StyleSheet } from "react-native";
import { scale, scaleHeight } from "../../../utils/Helpers";

export const styles = StyleSheet.create({
	wrapper: {
		alignSelf: "flex-start",
	},
	track: {
		width: scale(40),
		height: scaleHeight(20),
		borderRadius: scaleHeight(30),
		justifyContent: "center",
	},
	thumb: {
		width: scaleHeight(18),
		height: scaleHeight(18),
		borderRadius: scaleHeight(18),
		elevation: 2,
	},
});
