import {StyleSheet} from 'react-native';
import {moderateScale, scale, scaleHeight} from '../../../utils/Helpers';
import Colors from '@theme/Colors';

export const styles = StyleSheet.create({
  checkbox: {
    height: scaleHeight(22),
    width: scaleHeight(22),
    borderWidth: 2,
    borderColor: Colors.primary.base,
    borderRadius: moderateScale(5),
    alignItems: 'center',
    justifyContent: 'center',
  },
  check: {
    height: scaleHeight(16),
    width: scaleHeight(16),
    backgroundColor: Colors.black,
    borderRadius: moderateScale(3),
  },
});
