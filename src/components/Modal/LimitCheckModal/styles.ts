import { StyleSheet } from "react-native"
import { scaleHeight, scale, moderateScale } from "@utils/Helpers"
import Colors from "@theme/Colors"

export const styles = StyleSheet.create({
  // Modal styles
  modalHeader: {
    width: "100%",
    alignItems: "center",
    paddingVertical: scaleHeight(15),
    borderBottomWidth: 1,
    borderBottomColor: Colors.primary.base,
  },
  modalContent: {
    padding: scale(20),
  },
  modalFooter: {
    padding: scale(20),
    borderTopWidth: 1,
    borderTopColor: Colors.primary.base,
  },

  limitMessage: {
    marginBottom: scaleHeight(15),
    textAlign: "center",
  },
  limitInfoContainer: {
    backgroundColor: Colors.primary[50],
    borderRadius: moderateScale(8),
    padding: scale(15),
    marginBottom: scaleHeight(15),
  },
  limitInfoRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: scaleHeight(10),
  },
  limitAdvice: {
    textAlign: "center",
  },
  // remainingLimit: {
  //   color: "#DC3545",
  // },

  // Close button
  closeButton: {
    position: "absolute",
    right: scale(15),
    top: scaleHeight(15),
  },
})

