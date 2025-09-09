import {StyleSheet} from 'react-native';
import {moderateScale, scale, scaleHeight} from '../../../utils/Helpers';
import Colors from '../../../theme/Colors';

export const styles = StyleSheet.create({
  limitContainer: {
    backgroundColor: '#434F56',
    paddingHorizontal: scale(10),
    paddingVertical: scaleHeight(12),
    borderRadius: moderateScale(4),
  },
  labelStyle: {
    color: Colors.white,
    textShadowColor: Colors.black, // Black outline
    textShadowOffset: {width: 1, height: 1}, // Stroke width
    textShadowRadius: 1,
  },

  tierLogo: {
    width: scale(24),
    height: scaleHeight(24),
  },
  upgradeTierColor: {
    color: Colors.success.base,
  },
});
