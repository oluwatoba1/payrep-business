import { StyleSheet } from "react-native";
import Colors from "../../../theme/Colors";
import { scale } from "../../../utils/Helpers";

export const styles = StyleSheet.create({
    verticalLine : {
        height: '80%', 
        width: 1,       
        backgroundColor: Colors.black, 
        marginHorizontal: scale(10),  
    },
    cardContainer:{
        backgroundColor: 'transparent',
        shadowColor: 'transparent',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 0,
        shadowRadius: 0,
        borderBottomWidth: 0.2,
    }
})