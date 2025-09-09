import { StyleSheet } from "react-native";
import { scale, scaleHeight } from "../../../utils/Helpers";

export const styles = StyleSheet.create({
    cardContainer: {
        padding: 0,
        backgroundColor: "#feb800",
        
      },
      polygonOneContainer: {
        position: "absolute",
        top: scaleHeight(-100),
        left: scale(-110),
      },
      polygonOne: {
        width: scale(180),
        height: scaleHeight(160),
      },
      polygonTwoContainer: {
        position: "absolute",
        top: scaleHeight(-20),
        left: scale(-200),
      },
      contentContainer: {
        paddingVertical: scaleHeight(24),
        paddingHorizontal: scale(16),
        gap: scale(16),
      },
      balanceContainer: {
        justifyContent: "center",
        alignItems: "center",
      },
      balanceAmountContainer: {
        flexDirection: "row",
        alignItems: "center",
        gap: scaleHeight(4),
      },
      eyeIconPressable: {
        marginLeft: scale(8),
      },
      accountNumberContainer: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        gap: scaleHeight(4),
      },
      copyIconPressable: {
        marginLeft: scale(8),
      },
      icon: {
        width:  scale(16),
        height: scaleHeight(16),
      },
})