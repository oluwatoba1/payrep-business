import Colors from "@theme/Colors";
import { scale, scaleHeight } from "@utils/Helpers";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: "100%",
		height: scaleHeight(6),
		backgroundColor: Colors.gray["100"],
		borderRadius: scale(20),
		overflow: "hidden",
	},
	progressBar: {
		height: scaleHeight(6),
		borderRadius: scale(20),
	},
});
