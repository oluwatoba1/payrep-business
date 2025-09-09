import {StyleSheet} from 'react-native';
import {moderateScale, scale, scaleHeight} from '../../../utils/Helpers';

export const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: scaleHeight(8),
  },
  imageContainer: {
    width: scale(100),
    height: scaleHeight(100),
    borderRadius: moderateScale(50),
    borderWidth: scale(2),
    borderColor: '#E9EBEC',
    backgroundColor: '#F9F8F4',
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: moderateScale(50),
  },
  textContainer: {
    gap: scaleHeight(4),
    alignItems: 'center',
  },
});
