import Colors from "@theme/Colors";
import { moderateScale, scale, scaleHeight } from "@utils/Helpers";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
      width: "100%",
    },
    title: {
      marginBottom: scaleHeight(8),
    },
    rangeContainer: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    dateButton: {
      flex: 1,
      padding: scaleHeight(12),
      borderRadius: moderateScale(8),
      borderWidth: 1,
      borderColor: Colors.gray[100],
      backgroundColor: Colors.gray[100],
    },
    dateSelected: {
      borderColor: Colors.primary[100],
      backgroundColor: Colors.primary[50],
    },
    dateText: {
      color: Colors.black,
    },
    dateTextSelected: {
      color: Colors.black,
    },
    toText: {
      marginHorizontal: scale(8),
    },
    disabled: {
      opacity: 0.5,
    },
  })