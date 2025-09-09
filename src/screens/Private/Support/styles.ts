import {StyleSheet} from 'react-native';
import {scaleHeight} from '../../../utils/Helpers';
import Colors from '@theme/Colors';

export const styles = StyleSheet.create({
  supportSection: {
    gap: scaleHeight(16),
    marginBottom: scaleHeight(16),
  },
  icon: {
    height: scaleHeight(20),
    width: scaleHeight(20),
    resizeMode: 'contain',
    tintColor: Colors.black,
  },
  socialMediaIcon: {
    height: scaleHeight(20),
    width: scaleHeight(20),
    resizeMode: 'contain',
  },
});
