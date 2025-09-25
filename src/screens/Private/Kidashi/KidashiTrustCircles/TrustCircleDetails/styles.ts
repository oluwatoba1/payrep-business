import { StyleSheet } from "react-native";

// Local
import {  scaleHeight } from "@utils/Helpers";

const styles = StyleSheet.create({
	backIcon: {
		width: scaleHeight(24),
		height: scaleHeight(24),
		resizeMode: "contain",
	},
	trustCircleDetailsIcon: {
		width: scaleHeight(46),
		height: scaleHeight(46),
		resizeMode: "contain",
	},
    proceedToMemberIcon: {
        width: scaleHeight(24),
		height: scaleHeight(24),
		resizeMode: "contain",
	},
});

export default styles;
