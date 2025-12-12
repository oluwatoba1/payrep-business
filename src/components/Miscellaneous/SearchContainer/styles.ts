import Colors from "@theme/Colors";
import { width } from "@utils/Constants";
import { moderateScale, scale, scaleHeight } from "@utils/Helpers";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	searchContainer: {
		borderBottomWidth: 1,
		borderBottomColor: Colors.neutral["50"],
		paddingVertical: scaleHeight(8),
	},
	searchInputContainer: {
		width: width / 1.5,
		borderWidth: 1,
		borderColor: Colors.neutral["50"],
		borderRadius: moderateScale(32),
	},
	searchInput: {
		paddingVertical: scaleHeight(6),
		paddingHorizontal: scale(16),
	},
	searchIcon: {
		height: scaleHeight(12),
		width: scaleHeight(12),
		tintColor: Colors.danger["700"],
		resizeMode: "contain",
	},
	searchButton: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "flex-start",
		borderWidth: 1,
		borderColor: "#E5D9BB",
		backgroundColor: "#FFF1D0",
		gap: scale(8),
		borderRadius: moderateScale(32),
		paddingVertical: scaleHeight(6),
		paddingHorizontal: scale(8),
		marginTop: scaleHeight(16),
	},
	clearContainer: {
		backgroundColor: Colors.neutral.base,
		height: scaleHeight(20),
		width: scaleHeight(20),
		borderRadius: scaleHeight(20),
		alignItems: "center",
		justifyContent: "center",
	},
});

export default styles;
