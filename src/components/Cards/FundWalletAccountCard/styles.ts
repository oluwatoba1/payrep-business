import { StyleSheet } from "react-native";
import { scaleHeight } from "../../../utils/Helpers";

export const styles = StyleSheet.create({
    card: {
      backgroundColor: "white",
      padding: scaleHeight(16),
      borderRadius: scaleHeight(8),
      marginVertical: scaleHeight(16),
      elevation: 2, // Add elevation for shadow (Android)
      shadowColor: "#000", // Add shadow for iOS
      shadowOpacity: 0.2,
      shadowOffset: {
        width: 0,
        height: scaleHeight(2),
      },
    },
    row: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: scaleHeight(19),
    },
    textDetail: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: scaleHeight(10)
    }
  });