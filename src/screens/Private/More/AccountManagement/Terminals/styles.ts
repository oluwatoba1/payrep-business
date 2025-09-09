import {StyleSheet} from 'react-native';
import {MAIN_LAYOUT_HORIZONTAL_PADDING, height, width} from '@utils/Constants';
import {scale, scaleHeight} from '@utils/Helpers';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width - 2 * MAIN_LAYOUT_HORIZONTAL_PADDING,
    height: height - 2 * MAIN_LAYOUT_HORIZONTAL_PADDING,
  },
  filterContainer: {
    paddingHorizontal: scale(4),
    paddingTop: scaleHeight(4),
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginVertical: scaleHeight(8),
  },
  filterIcon: {
    width: scale(16),
    height: scaleHeight(16),
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterArea: {
    gap: scale(16),
    flexDirection: 'row',
  },
  filter: {
    flexDirection: 'row',
    gap: scale(4),
    alignItems: 'center',
  },
});

export default styles;
