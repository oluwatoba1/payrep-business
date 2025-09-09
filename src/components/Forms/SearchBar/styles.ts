import { StyleSheet } from "react-native";
import Colors from "../../../theme/Colors";
import { moderateScale, scale, scaleHeight } from "../../../utils/Helpers";
import { PNR } from "../../../theme/Fonts";

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: Colors.gray[50],
        paddingHorizontal: scale(8),
        gap: scale(8),
        alignItems: 'center',
        borderRadius: moderateScale(8),
        height: scaleHeight(37),
        overflow: 'hidden'
    },
    searchIcon: {
        height: scaleHeight(16),
        width: scale(16)
    },
    filterArea: {
        gap: scale(16),
        flexDirection: 'row'
    },
    searchInput: {
        color: Colors.gray[400],
        fontFamily: PNR,
        fontSize: 14,
        height: '100%',
        // overflow: 'scroll'
    }
})

export default styles;
