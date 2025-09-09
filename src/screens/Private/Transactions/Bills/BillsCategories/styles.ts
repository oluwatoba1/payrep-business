import {StyleSheet} from 'react-native';
import {moderateScale, scale, scaleHeight} from '../../../../../utils/Helpers';
import {MAIN_LAYOUT_HORIZONTAL_PADDING, width} from '@utils/Constants';

export const styles = StyleSheet.create({
  container: {
    // borderWidth: 1,
  },
  categories: {
    // flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    gap: scale(24),
    justifyContent: 'space-between',
    // borderWidth: 1,
    // marginBottom: 10
  },
  searchContainer: {
    marginVertical: scaleHeight(16),
  },
  shimmerContainer: {
    borderRadius: moderateScale(8),
    height: scaleHeight(150),
    width: (width - 2 * scale(MAIN_LAYOUT_HORIZONTAL_PADDING) - scale(10)) / 2,
  },
  categoryContainer: {
    width: (width - 2 * scale(MAIN_LAYOUT_HORIZONTAL_PADDING) - scale(10)) / 2,
    height: scaleHeight(180),
    borderWidth: 1,
    borderRadius: moderateScale(8),
    paddingHorizontal: scale(12),
    paddingVertical: scaleHeight(16),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: scaleHeight(10),
  },
  categoryIcon: {
    width: scale(24),
    height: scaleHeight(24),
  },
});
