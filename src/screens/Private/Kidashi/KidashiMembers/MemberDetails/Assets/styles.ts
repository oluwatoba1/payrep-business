import Colors from "@theme/Colors";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	rejectedCardContainer: {
		backgroundColor: Colors.danger["50"],
		borderWidth: 1,
		borderColor: Colors.danger["100"],
	},
});
