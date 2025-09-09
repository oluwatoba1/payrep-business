import {StyleSheet} from 'react-native';
import {scale, scaleHeight} from '../../../utils/Helpers';
import {height, width} from '../../../utils/Constants';

const styles = StyleSheet.create({
  splashContainer: {
    height: '100%',
    width,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  cbnLogoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: scaleHeight(300),
    gap: scale(4),
  },
  cbnLogo: {
    width: scale(24),
    height: scale(32),
  },
});

export default styles;
