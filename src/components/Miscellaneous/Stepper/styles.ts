import { StyleSheet } from "react-native";

import Colors from "@theme/Colors";
import { scale, scaleHeight } from "@utils/Helpers";

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingVertical: scaleHeight(8),
	},
	step: {
		width: scaleHeight(40),
		height: scaleHeight(40),
		borderRadius: scaleHeight(20),
		justifyContent: "center",
		alignItems: "center",
	},
	activeStep: {
		backgroundColor: Colors.primary.base,
	},
	inactiveStep: {
		backgroundColor: Colors.gray["300"],
	},
	stepperDivider: {
		height: 2,
		backgroundColor: Colors.neutral["300"],
		marginHorizontal: scale(10),
	},
});

export default styles;
