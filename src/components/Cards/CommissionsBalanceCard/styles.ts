import { StyleSheet } from "react-native";
import { width, MAIN_LAYOUT_HORIZONTAL_PADDING, height } from "../../../utils/Constants";
import { moderateScale, scale, scaleHeight } from "../../../utils/Helpers";

const styles = StyleSheet.create({
    container: {
        width: width - (2 * MAIN_LAYOUT_HORIZONTAL_PADDING)
    },
    card: {
        width: '100%',
        height: scaleHeight(154),
        borderRadius: moderateScale(8),
    },
    details: {
        gap: scaleHeight(2),
        alignItems: 'center',
        paddingTop: scaleHeight(24)
    },
    walletBalance: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: scale(8)
    },
    viewIcon: {
        width: scale(24),
        height: scale(24),
        justifyContent: 'center',
        alignItems: 'center',
    },
})

export default styles;