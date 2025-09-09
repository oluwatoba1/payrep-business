import {StyleSheet} from 'react-native';
import {moderateScale, scale, scaleHeight} from '../../../utils/Helpers';
import {MAIN_LAYOUT_HORIZONTAL_PADDING, width} from '../../../utils/Constants';
import Colors from '../../../theme/Colors';

export const generalStyles = StyleSheet.create({
  container: {
    flex: 1,
    width: width - 2 * MAIN_LAYOUT_HORIZONTAL_PADDING,
  },
  buttonContainer: {
    bottom: 0,
    marginHorizontal: scale(1),
    position: 'absolute',
    left: 0,
    right: 0,
  },
  icon: {
    width: scale(24),
    height: scale(24),
    marginRight: 16,
  },
  titleContainer: {
    gap: moderateScale(16),
    marginBottom: scaleHeight(24),
  },
  searchTextColor: {
    color: Colors.black,
  },
});
