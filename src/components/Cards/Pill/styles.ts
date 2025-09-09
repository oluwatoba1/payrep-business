import {StyleSheet} from 'react-native';

import Colors from '@theme/Colors';
import {moderateScale, scale, scaleHeight} from '@utils/Helpers';

const styles = StyleSheet.create({
  pill: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.black,
    borderRadius: moderateScale(10),
    paddingVertical: scaleHeight(2),
    paddingHorizontal: scale(10),
  },
});

export default styles;
