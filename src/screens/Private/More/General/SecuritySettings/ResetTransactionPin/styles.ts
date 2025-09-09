import { StyleSheet } from "react-native";
import { scaleHeight } from "../../../../../../utils/Helpers";

export const styles = StyleSheet.create({
    pinContainer: {
        paddingTop: scaleHeight(24),
        justifyContent: 'center',
        alignItems: 'center'
    },
    pinHolder: {
        paddingTop: scaleHeight(24),
        gap: scaleHeight(10)
    },
    text: {
        textAlign: 'center'
    }
})