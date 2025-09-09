import Colors from '@theme/Colors';
import {MAIN_LAYOUT_HORIZONTAL_PADDING, width} from '@utils/Constants';
import {moderateScale, scale, scaleHeight} from '@utils/Helpers';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  idCardContainer: {
    borderRadius: moderateScale(4),
    borderWidth: 1,
    borderColor: Colors.custom.textInputBorderColor,
    paddingVertical: scaleHeight(12),
    paddingHorizontal: scale(16),
    width: (width - scale(2 * MAIN_LAYOUT_HORIZONTAL_PADDING) - scale(16)) / 2,
  },
});

export default styles;
