import Colors from "@theme/Colors";
import { moderateScale, scale, scaleHeight } from "@utils/Helpers";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
      justifyContent:'center',
      overflow: 'hidden',
    },
    header: {
      alignItems: 'center',
      paddingTop: scaleHeight(24),
      paddingBottom: scaleHeight(16),
      backgroundColor: Colors.gray[200],
      borderTopLeftRadius: moderateScale(16),
      borderTopRightRadius: moderateScale(16),
    },
    iconContainer: {
      width: scale(64),
      height: scaleHeight(64),
      borderRadius: moderateScale(32),
      backgroundColor: Colors.danger.base,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: scaleHeight(16),
    },
    alertIcon: {
      width: scale(32),
      height: scaleHeight(32),
      alignItems: 'center',
      justifyContent: 'center',
    },
    exclamation: {
      width: scale(4),
      height: scaleHeight(16),
      backgroundColor: Colors.white,
      borderRadius: moderateScale(2),
    },
    dot: {
      width: 4,
      height: scaleHeight(4),
      backgroundColor: Colors.white,
      borderRadius: moderateScale(2),
      marginTop: scaleHeight(2),
    },
    title: {
      marginBottom: scaleHeight(8),
      fontSize: moderateScale(18),
      textAlign: 'center',
    },
    subtitle: {
      textAlign: 'center',
      paddingHorizontal: scale(16),
    },
    buttonContainer: {
      padding: scaleHeight(16),
      backgroundColor: Colors.white,
    },
    retryButton: {
      marginBottom: scaleHeight(16),
    },
    forgotPinContainer: {
      alignItems: 'center',
      paddingVertical: scaleHeight(8),
    },
    forgotPinText: {
      color: Colors.primary.base,
    },
    lockedIcon: {
        backgroundColor: Colors.danger.base
    },
    supportButton: {
    backgroundColor: '#007AFF',
    marginBottom: 16,
    },
  });
  