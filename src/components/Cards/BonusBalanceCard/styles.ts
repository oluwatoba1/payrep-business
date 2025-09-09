import { StyleSheet } from "react-native";
import { width, MAIN_LAYOUT_HORIZONTAL_PADDING, height } from "../../../utils/Constants";
import { moderateScale, scale, scaleHeight } from "../../../utils/Helpers";
import Colors from "@theme/Colors";

const styles = StyleSheet.create({
    container: {
        width: width - (2 * MAIN_LAYOUT_HORIZONTAL_PADDING),
    },
    card: {
        width: '100%',
        height: scaleHeight(154),
    },
    cardImage: {
        borderRadius: moderateScale(8)
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
    cardHeader: {
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "flex-end",
        paddingRight: scale(15)
    },
    iconButtonContainerStyle: {
        backgroundColor: 'rgb(255, 193, 172)',
        borderRadius: moderateScale(90),
        padding: scaleHeight(5),

        shadowColor: Colors.black,
        shadowOffset: { width: 0, height: scaleHeight(1) },
        shadowOpacity: moderateScale(0.2),
        shadowRadius: moderateScale(3),
        elevation: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    iconButtonAlignment: {
        alignSelf: 'flex-end'
    },
})

export default styles;