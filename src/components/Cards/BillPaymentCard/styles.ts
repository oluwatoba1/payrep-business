import { StyleSheet } from "react-native";
import { scale, scaleHeight } from "../../../utils/Helpers";

export const styles = StyleSheet.create({
    container: {
        // borderWidth: 1,
    },
    categories: {
        // flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: '100%',
        gap: scale(24),
        justifyContent: 'space-between',
        // borderWidth: 1,
        // marginBottom: 10
    },
    searchContainer: {
        marginVertical: scaleHeight(16)
    },
    category: {
        width: scale(159.5),
        height: scaleHeight(169),
        borderWidth: 0.3,
        borderRadius: 8,
        paddingHorizontal: scale(12),
        paddingVertical: scaleHeight(16),
        alignItems: 'center',
        gap: scaleHeight(8)
        // marginRight: 24
    },
    categoryIcon: {
        width: scale(24), height: scaleHeight(24),
    },
})