import Colors from "@theme/Colors";
import { moderateScale, scale, scaleHeight } from "@utils/Helpers";
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    searchIcon: {
        width: scale(16),
        height: scale(16),
    },
    packageIconContainer: {
        borderRadius: "100%",
        backgroundColor: Colors.cardColor.purple["50"],
        padding: scale(12),
    },
    packageIcon: {
        width: scale(20),
        height: scale(20),
    },
    assetTitleContainer: {
        flex: 1,
    },
    chevronRightIcon: {
        width: scale(20),
        height: scale(20),
    },
    arrowRightIcon: {
        width: scale(20),
        height: scaleHeight(20),
        color: Colors.primary[600]
    },
    assetTitle: {
        fontSize: moderateScale(14),
    },
    assetSubTitle: {
        fontSize: moderateScale(12),
    },
    assetStatusContainer: {
        paddingHorizontal: scale(10),
        paddingVertical: scaleHeight(2),
        borderRadius: scale(100),
        textTransform: "capitalize",
        fontSize: 12,
    },
    dot: {
        width: scale(5),
        height: scale(5),
        borderRadius: "100%",
        backgroundColor: Colors.neutral["400"],
    },
    infoRedIcon: {
        width: scale(16),
        height: scale(16),
    },
    infoRedIconContainer: {
        padding: scale(8),
        paddingVertical: scaleHeight(4),
        borderRadius: 100,
        backgroundColor: Colors.primary["50"],
        borderWidth: scale(2),
        borderColor: Colors.danger["50"],
        flexDirection: "row",
        alignItems: "center",
        gap: 8,
    },
    infoRedIconText: {
        fontSize: 12,
    },
});

export default styles;
