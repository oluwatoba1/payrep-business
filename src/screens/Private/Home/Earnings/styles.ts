import {StyleSheet} from 'react-native';
import {width, MAIN_LAYOUT_HORIZONTAL_PADDING, height} from '@utils/Constants';
import {scale, scaleHeight} from '@utils/Helpers';

const styles = StyleSheet.create({
  container: {
    width: width - scale(2 * MAIN_LAYOUT_HORIZONTAL_PADDING),
    height: height - scale(2 * MAIN_LAYOUT_HORIZONTAL_PADDING),
  },
  filterContainer: {
    paddingHorizontal: scale(4),
    paddingVertical: scaleHeight(4),
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default styles;
