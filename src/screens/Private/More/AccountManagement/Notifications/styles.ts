import { StyleSheet } from "react-native";
import { scaleHeight } from "../../../../../utils/Helpers";

export const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: scaleHeight(16)
    }
})