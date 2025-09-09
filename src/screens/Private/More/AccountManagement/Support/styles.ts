import { StyleSheet } from "react-native";
import { scale, scaleHeight } from "../../../../../utils/Helpers";

export const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: 'row',
        // justifyContent: 'center',
        alignItems: 'center'

    },
    supportSection: {
        gap: scaleHeight(16),
        marginBottom: scaleHeight(16)
      },
    
      supportContact:{
        paddingHorizontal: scale(40)
      }
    
})