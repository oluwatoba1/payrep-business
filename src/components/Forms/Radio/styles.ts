import {StyleSheet} from 'react-native';
import {moderateScale, scale, scaleHeight} from '../../../utils/Helpers';
import Colors from '@theme/Colors';

export const styles = StyleSheet.create({
  container: {
    height: scaleHeight(20),
    width: scaleHeight(20),
    borderWidth: 2,
    borderColor: Colors.black,
    borderRadius: moderateScale(10),
    alignItems: 'center',
    justifyContent: 'center',
  },
  radio: {
    height: scaleHeight(12),
    width: scaleHeight(12),
    backgroundColor: Colors.black,
    borderRadius: moderateScale(6),
  },
});
