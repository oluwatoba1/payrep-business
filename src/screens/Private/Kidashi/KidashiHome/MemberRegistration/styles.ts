import { StyleSheet } from "react-native";

import { scaleHeight } from "@utils/Helpers";

const styles = StyleSheet.create({
	skipIcon: {
		width: scaleHeight(16),
		height: scaleHeight(16),
		resizeMode: "contain",
	},
});

export default styles;
