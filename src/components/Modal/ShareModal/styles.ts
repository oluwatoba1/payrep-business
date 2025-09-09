import Colors from '@theme/Colors';
import {moderateScale, scale, scaleHeight} from '@utils/Helpers';
import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    marginBottom: scaleHeight(16),
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    paddingVertical: scaleHeight(14),
    paddingHorizontal: scale(16),
    borderRadius: moderateScale(12),
    marginBottom: scaleHeight(12),
    borderBottomWidth: moderateScale(0.5),
  },
  optionImage: {
    width: scale(40),
    height: scaleHeight(40),
    resizeMode: 'contain',
    marginRight: scale(12),
  },
});
