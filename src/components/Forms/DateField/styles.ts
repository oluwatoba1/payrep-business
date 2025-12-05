import {StyleSheet} from 'react-native';

import {moderateScale, scale, scaleHeight} from '@utils/Helpers';
import Colors from '@theme/Colors';

export const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginTop: scaleHeight(16),
  },
  dateContainer: {
    borderWidth: 1,
    borderColor: Colors.custom.textInputBorderColor,
    borderRadius: moderateScale(8),
    minHeight: scaleHeight(50),
    padding: scale(16),
  },
});
