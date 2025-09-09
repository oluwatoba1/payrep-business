import { StyleSheet } from "react-native";
import { moderateScale, scaleHeight } from "../../utils/Helpers";
import Colors from "../../theme/Colors";

export const styles = StyleSheet.create({
    section: {
        paddingVertical:scaleHeight(24),
      },
      sectionWithBorder: {
        borderBottomWidth: moderateScale(1),
        borderBottomColor: Colors.gray.base,
        borderStyle: 'dashed',
      },
})