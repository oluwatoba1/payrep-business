import { StyleSheet } from "react-native";
import { scale, scaleHeight } from "../../../utils/Helpers";

export const styles = StyleSheet.create({
    container:{
        height:scaleHeight(250),
        gap: scale(24)
    }
})