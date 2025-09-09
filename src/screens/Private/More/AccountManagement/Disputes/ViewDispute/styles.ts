import { StyleSheet } from "react-native";
import { scaleHeight } from "../../../../../../utils/Helpers";

export const styles = StyleSheet.create({
    header: {
        marginBottom: scaleHeight(24),
    },
    detailsContainer: {
        gap: scaleHeight(24),
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
});