import { StyleSheet } from "react-native";
import { moderateScale, scale, scaleHeight } from "../../../../utils/Helpers";

export const styles = StyleSheet.create({
    titleContainer: {
        gap: 16,
    },
    actionButton: {
        paddingVertical: scaleHeight(4),
        paddingHorizontal: scale(16),
        gap: scale(4),
        borderRadius: moderateScale(40)
    },
    easySavingActionButtonBackground:{
        backgroundColor: '#FAE8DB',
    },
    easySavingActionButtonTextColor: {
        color: '#8B4513'
    },
    automatedSavingActionButtonBackground:{
        backgroundColor: '#005C5C',
    },
    automatedSavingActionButtonTextColor: {
        color: '#fff'
    },
    lockedSavingActionButtonBackground:{
        backgroundColor: '#35005C',
    },
    lockedSavingActionButtonTextColor: {
        color: '#fff'
    }

    
})