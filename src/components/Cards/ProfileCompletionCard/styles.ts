import { StyleSheet } from "react-native";
import Colors from "../../../theme/Colors";
import { scaleHeight } from "../../../utils/Helpers";

export const styles = StyleSheet.create({
    ProfileCompletionCardContainer: {
        backgroundColor: Colors.gray[800]
    },
    textColor: {
        color: Colors.white
    },
    textColor1: {
        color: Colors.primary['100']
    },
    itemContainer: {
        gap:scaleHeight(16)
    },
    textContainer: {
        gap: scaleHeight(8)
    }
})