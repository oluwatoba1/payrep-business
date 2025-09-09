import { StyleSheet, ViewStyle, TextStyle, ImageStyle, Animated } from "react-native";
import { moderateScale, scale, scaleHeight } from "../../../utils/Helpers";

interface Styles {
  container: ViewStyle;
  optionContainer: ViewStyle;
  image: ImageStyle;
//   typography: TextStyle;
}

const styles = StyleSheet.create<Styles>({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  optionContainer: {
    height: scaleHeight(44),
    borderRadius: moderateScale(4),
    borderWidth: moderateScale(1),
    paddingHorizontal: scale(16),
    paddingVertical: scaleHeight(8),
    flexDirection: "row",
    // borderColor: "#A1A7AA",
    alignItems: "center",
    // marginRight: scale(8),
    // marginBottom: scaleHeight(8),
  },
  image: {
    width: scale(20),
    height: scaleHeight(20),
  }
});

export const getAnimatedViewStyles = (animatedScale: Animated.Value): ViewStyle => ({
    transform: [{ scale: animatedScale }],
    marginRight: scale(8),
  });

export default styles;
