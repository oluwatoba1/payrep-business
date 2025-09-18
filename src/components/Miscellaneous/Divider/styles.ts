import { scaleHeight } from "@utils/Helpers";
import Colors from "@theme/Colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	separator: {
		height: 1,
		backgroundColor: Colors.gray[100],
		marginTop: scaleHeight(8),
	},
});
