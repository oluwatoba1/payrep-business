import {StyleSheet} from 'react-native';
import {moderateScale, scale, scaleHeight} from '../../../utils/Helpers';
import Colors from '../../../theme/Colors';

export const styles = StyleSheet.create({
  imagePickerContainer: {
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  imageButton: {
    width: '100%',
    borderWidth: 1,
    borderColor: Colors.primary[300],
    padding: scaleHeight(16),
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: moderateScale(16),
    borderRadius: moderateScale(8),
    marginVertical: scaleHeight(16),
  },
  imageIcon: {
    width: scale(40),
    height: scaleHeight(40),
  },
  imagePreview: {
    width: scale(300),
    height: scaleHeight(200),
    borderRadius: moderateScale(8),
    marginTop: scaleHeight(16),
    resizeMode: 'cover',
  },
});
