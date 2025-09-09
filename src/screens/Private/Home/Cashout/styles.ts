import {StyleSheet} from 'react-native';
import {
  width,
  MAIN_LAYOUT_HORIZONTAL_PADDING,
  height,
  BOTTOM_TAB_CONTAINER_HEIGHT,
} from '@utils/Constants';
import {moderateScale, scale, scaleHeight} from '@utils/Helpers';
import Colors from '@theme/Colors';

const styles = StyleSheet.create({
  container: {
    width: width - scale(2 * MAIN_LAYOUT_HORIZONTAL_PADDING),
    height: height - scale(2 * MAIN_LAYOUT_HORIZONTAL_PADDING),
  },
  detailsContainer: {
    paddingVertical: scaleHeight(12),
    gap: scaleHeight(4),
  },
  amountContainer: {
    borderRadius: moderateScale(8),
    backgroundColor: Colors.primary[100],
    paddingHorizontal: scale(12),
    paddingVertical: scaleHeight(12),
    gap: scaleHeight(12),
  },
  withdrawalDetails: {
    flexDirection: 'row',
    alignSelf: 'stretch',
    justifyContent: 'space-between',
  },
  pinArea: {
    justifyContent: 'center',
    gap: scaleHeight(16),
    alignItems: 'center',
  },
  btn: {
    position: 'absolute',
    bottom: scaleHeight(BOTTOM_TAB_CONTAINER_HEIGHT * 1.5),
    alignSelf: 'center',
    width: '100%',
  },
});

export default styles;
