import {StyleSheet} from 'react-native';
import {moderateScale, scale, scaleHeight} from '../../../utils/Helpers';
import Colors from '../../../theme/Colors';

export const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: moderateScale(8),
    paddingVertical: scaleHeight(0),
    paddingHorizontal: scaleHeight(8),
    gap: scaleHeight(8),
    minHeight: scaleHeight(40),
  },
  searchIcon: {
    width: scaleHeight(16),
    height: scaleHeight(20),
    marginRight: scale(8),
    resizeMode: 'contain',
  },
  searchInput: {
    flex: 1,
    fontSize: moderateScale(16),
    color: Colors.gray[700],
  },
});
