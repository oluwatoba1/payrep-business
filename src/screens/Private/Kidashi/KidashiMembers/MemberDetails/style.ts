import { scale } from "@utils/Helpers";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: scale(16),
		paddingTop: scale(50),
		paddingBottom: scale(100),
	},
});
