import { StyleSheet } from "react-native";
import Colors from "../../../theme/Colors";
import { scaleHeight } from "../../../utils/Helpers";

export const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
    },
    backgroundBar: {
        width: '100%',
        height: scaleHeight(6),
        backgroundColor: 'black', 
        borderRadius: 5,
        overflow: 'hidden',
    },
    progressBar: {
        height: '100%',
        backgroundColor: Colors.white,
        borderRadius: scaleHeight(4),
        position: 'absolute',
        left: 0,
        top: 0,
    },
    text: {
        width: '100%',
        color: 'black', 
        marginTop: scaleHeight(5),
    },
});
