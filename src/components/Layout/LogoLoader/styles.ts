import {StyleSheet} from 'react-native';

import Colors from '@theme/Colors';
import {moderateScale, scale, scaleHeight} from '@utils/Helpers';

const styles = StyleSheet.create({
  loaderPage: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  loaderContainer: {
    backgroundColor: Colors.transparent,
    width: scale(178),
    height: scaleHeight(178),
    borderRadius: moderateScale(16),
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: scale(84),
    height: scaleHeight(84),
  },
  textContainer: {
    paddingHorizontal: scale(20),
    paddingVertical: 0,
  },
});

export default styles;
