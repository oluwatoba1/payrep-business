import Colors from "@theme/Colors";
import { moderateScale, scale, scaleHeight } from "@utils/Helpers";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  modalContent: {
    padding: scaleHeight(20),
    maxHeight: "85%", // More responsive than fixed height
    justifyContent: "space-between",
  },
    container: {
      justifyContent: 'center',
      alignItems:'center',
      borderRadius: moderateScale(16),
      overflow: 'hidden',
    },
    header: {
      alignItems: 'center',
      paddingTop: scaleHeight(24),
      paddingBottom: scaleHeight(16),
      
    },
    iconContainer: {
      width: scale(64),
      height: scaleHeight(64),
      borderRadius: moderateScale(32),
      backgroundColor: Colors.primary.base,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: scaleHeight(16),
    },
    
    lockIcon: {
      width: scale(32),
      height: scaleHeight(32),
      alignItems: 'center',
    },
    lockBody: {
      width: scale(20),
      height: scaleHeight(14),
      backgroundColor: '#000',
      borderRadius: moderateScale(4),
      position: 'absolute',
      bottom: scaleHeight(0),
    },
    lockShackle: {
      width: scale(16),
      height: scaleHeight(16),
      borderWidth: 3,
      borderColor: '#000',
      borderBottomWidth: moderateScale(0),
      borderRadius: moderateScale(8),
      position: 'absolute',
      top: scaleHeight(0),
    },
    image: {
      width: scale(80),
      height: scaleHeight(80),
      marginBottom: scaleHeight(16),
      borderRadius: moderateScale(40),
    },
    title: {
      marginBottom: scaleHeight(20),
      fontSize: 18,
      textAlign: 'center',
      paddingHorizontal: scale(16),
    },
    pinDotsContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginBottom: scaleHeight(16),
    },
    pinDot: {
      width: scale(16),
      height: scaleHeight(16),
      borderRadius: moderateScale(8),
      backgroundColor: Colors.gray[100],
      marginHorizontal: 8,
      borderWidth: 1,
      borderColor: Colors.gray[400],
    },
    pinDotFilled: {
      backgroundColor: Colors.primary.base,
      borderColor: Colors.primary.base,
    },
    pinPadContainer: {
      // width: '50%',
      
      justifyContent: 'center',
      alignItems: 'center',
      padding: scaleHeight(16),
      backgroundColor: Colors.white,
    },
    forgotPinContainer: {
      alignItems: 'center',
      paddingVertical: scaleHeight(16),
      borderTopWidth: moderateScale(1),
      borderTopColor: Colors.gray[400],
    },
    forgotPinText: {
      color: Colors.primary.base,
    },
    loadingContainer: {
      padding: scaleHeight(32),
      alignItems: 'center',
      justifyContent: 'center',
    },
    loadingText: {
      marginTop: scaleHeight(16),
      color: Colors.gray[400],
    },
  });
  