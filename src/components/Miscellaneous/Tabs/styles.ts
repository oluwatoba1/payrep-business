import { StyleSheet } from "react-native";
import { scale, scaleHeight } from "../../../utils/Helpers";
import Colors from "../../../theme/Colors";

const styles = StyleSheet.create({
    tabsContainer: {
        width: '100%',
        paddingHorizontal: scale(8),
        paddingVertical: scaleHeight(8),
        alignItems: 'center',
        gap: scale(4),
        borderRadius: scale(32),
        backgroundColor: Colors.gray[50],
        flexDirection: 'row',
        marginVertical: scaleHeight(12),
    },
    tab: {
        paddingHorizontal: scale(12),
        paddingVertical: scaleHeight(4),
        justifyContent: 'center',
        alignItems: 'center',
        gap: scale(4),
        borderRadius: scale(24),
    },
    tabActive: {
        paddingHorizontal: scale(12),
        paddingVertical: scaleHeight(4),
        justifyContent: 'center',
        alignItems: 'center',
        gap: scale(4),
        borderRadius: scale(24),
        backgroundColor: 'rgba(254, 184, 0, 0.30)'
    },
    tabText: {

    }
})

export default styles;