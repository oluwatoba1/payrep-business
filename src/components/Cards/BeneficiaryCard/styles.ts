import { StyleSheet } from "react-native";
import Colors from "../../../theme/Colors";
import { scale, scaleHeight } from "../../../utils/Helpers";

export const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: scaleHeight(12),
      paddingHorizontal: scale(19),
      backgroundColor: Colors.gray[50],
      borderRadius: scaleHeight(4),
      shadowColor: '#000', 
      shadowOffset: { width: 0, height: 2 }, 
      shadowOpacity: 0.1, 
      shadowRadius: 8, 
      elevation: 3, 
    },
    imageContainer: {
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 10,
      borderRadius: 100,
      width: scale(48),
      height: scaleHeight(48),
      backgroundColor: Colors.gray[200]
    },
    image: {
      width: scale(24), 
      height: scaleHeight(24),
    },
    verticalLine: {
      width: scale(1),
      height: '100%',
      backgroundColor: Colors.gray[300], 
      marginHorizontal: scale(10),
    },
    horinzontalLine: {
        width: "100%",
        height: scaleHeight(2),
        backgroundColor: Colors.gray[300], 
    },
    detailsContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      flex: 1,
      justifyContent: 'space-between',
    },
    textContainer: {
      flex: 1,
    },
    closeButton: {
      padding: 10,
    },
    closeIcon: {
      width: scale(24), 
      height: scaleHeight(24), 
    },
  });