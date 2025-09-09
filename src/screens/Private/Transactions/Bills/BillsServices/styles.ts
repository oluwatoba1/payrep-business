import {StyleSheet} from 'react-native';
import {width, MAIN_LAYOUT_HORIZONTAL_PADDING, height} from '@utils/Constants';
import {moderateScale, scale, scaleHeight} from '@utils/Helpers';

const styles = StyleSheet.create({
  container: {
    width: width - scale(2 * MAIN_LAYOUT_HORIZONTAL_PADDING),
    maxHeight: height - scale(2 * MAIN_LAYOUT_HORIZONTAL_PADDING),
  },
  emptyBox: {
    height: scaleHeight(64),
    width: scaleHeight(64),
  },
  shimmerContainer: {
    borderRadius: moderateScale(8),
    height: scaleHeight(150),
    width: (width - 2 * scale(MAIN_LAYOUT_HORIZONTAL_PADDING) - scale(10)) / 2,
  },
  serviceContainer: {
    width: (width - 2 * scale(MAIN_LAYOUT_HORIZONTAL_PADDING) - scale(10)) / 2,
    height: scaleHeight(120),
    borderWidth: 1,
    borderRadius: moderateScale(8),
    marginBottom: scaleHeight(10),
    overflow: 'hidden',
  },
  defaultServiceContainer: {
    width: (width - 2 * scale(MAIN_LAYOUT_HORIZONTAL_PADDING) - scale(10)) / 2,
    height: scaleHeight(120),
    borderWidth: 1,
    borderRadius: moderateScale(8),
    marginBottom: scaleHeight(10),
    alignItems: 'center',
    justifyContent: 'center',
  },
  serviceImage: {
    resizeMode: 'cover',
    width: (width - 2 * scale(MAIN_LAYOUT_HORIZONTAL_PADDING) - scale(10)) / 2,
    height: scaleHeight(120),
    borderRadius: moderateScale(8),
  },
  categoriesContainer: {
    gap: 12,
  },
  categories: {
    gap: 16,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  category: {
    width: scale(163.5),
    height: scaleHeight(100),
    borderRadius: scale(8),
    shadowColor: '#32323214',
    shadowOffset: {
      height: 2,
      width: 0,
    },
    shadowOpacity: 8,
    shadowRadius: 4,
    justifyContent: 'center',
  },
  categoryArrow: {
    height: scale(24),
    width: scale(24),
    top: scaleHeight(8),
    alignSelf: 'flex-end',
    right: scale(8),
    position: 'absolute',
  },
  categoryIcon: {
    alignSelf: 'center',
  },
});

export default styles;
