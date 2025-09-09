import React from "react";
import {StyleSheet} from "react-native"
import Colors from "../../../../../../theme/Colors"
import { scale, scaleHeight } from "../../../../../../utils/Helpers";


export const styles = StyleSheet.create({
    cardContainer: {
        backgroundColor: Colors.success[800],
    },
    cardContent: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: scale(32),
        height:scaleHeight(32),
        marginBottom: scaleHeight(8),
    },
    text: {
        color: Colors.white,
        textAlign: 'center',
        borderBottomWidth:1,
        borderBottomColor: Colors.white
    },
})