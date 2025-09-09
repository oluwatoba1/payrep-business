import { StyleSheet } from "react-native";
import { scaleHeight, scale } from "../../../utils/Helpers";
import Colors from "../../../theme/Colors";

const styles = StyleSheet.create({
    recentsContainer: {
        gap: scaleHeight(16),
        height: '100%',
        maxHeight: scaleHeight(142),
    },
    recentsEmpty: {
        alignSelf: 'center',
        width: scale(252),
        alignItems: 'center'
    },
    recentsOuter: {
        borderBottomColor: Colors.gray[300],
        borderBottomWidth: 0.3,
        paddingBottom: scaleHeight(8),
        width: '100%',
        alignItems: 'center',
        height: 'auto',
        // height: 'auto'
    },
    recents: {
        alignItems: 'center',
        gap: scale(8),
        justifyContent: 'space-between',
        // marginBottom: 10

    },
    recent: {
        gap: 4,
        // justifyContent: 'center'
        alignItems: 'center',
        maxHeight: scaleHeight(95)
        
    },
    recentProfile: {
        width: scale(48),
        height: scale(48),
        backgroundColor: Colors.gray[100],
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    emptyBox: {
        height: scale(64), width: scale(64)
    },
})

export default styles;