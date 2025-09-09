import { StyleSheet } from "react-native";
import { MAIN_LAYOUT_HORIZONTAL_PADDING, width } from "../../../../../../utils/Constants";
import { scale, scaleHeight } from "../../../../../../utils/Helpers";
import Colors from "../../../../../../theme/Colors";

export const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection:'row',
        justifyContent: 'center',
        alignItems: 'center',
        gap: scaleHeight(16),
        marginHorizontal: scaleHeight(16),
        bottom: 0
    },
    innerInputContainer: {
        flexDirection:'row',
    },
   
    editButton: {
        width:'50%'
    },

    deleteButton: {
        backgroundColor: Colors.danger.base, 
        width:'50%',
    },
    textStyles: {
        color: Colors.white
    },
    description: {
        marginBottom:scaleHeight(24),
        color: Colors.gray[700],
    },
    inputContainer: {
        marginBottom: 20,
    },
    input: {
        backgroundColor: Colors.white,
        
    },
})