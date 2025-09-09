import { StyleSheet } from "react-native";
import { scale, scaleHeight } from "../../../utils/Helpers";

const styles = StyleSheet.create({
    categories: {
        gap: 16,
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    category: {
        width: scale(163.5),
        height: scaleHeight(100),
        borderRadius: scale(8),
        shadowColor: '#32323214',
        // shadowRadius: 
        shadowOffset: {
            height: 2,
            width: 0
        },
        shadowOpacity: 8,
        shadowRadius: 4,
        justifyContent: 'center',

    },
    categoryArrow: {
        height: scale(24),
        width: scale(24),
        top: scaleHeight(8),
        alignSelf: 'flex-end',
        right: scale(8),
        position: 'absolute'
    },
    categoryIcon: {
        // width: scale(107.71),
        // height: scaleHeight(20),
        alignSelf: 'center',
    },
})

export default styles;