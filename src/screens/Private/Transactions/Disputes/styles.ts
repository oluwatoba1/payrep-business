import {StyleSheet} from 'react-native';
import {scale, scaleHeight} from '@utils/Helpers';
import {
  BOTTOM_TAB_CONTAINER_HEIGHT,
  MAIN_LAYOUT_HORIZONTAL_PADDING,
  height,
  width,
} from '@utils/Constants';
import Colors from '@theme/Colors';

const styles = StyleSheet.create({
  container: {
    width: width - scale(2 * MAIN_LAYOUT_HORIZONTAL_PADDING),
    height: height - scale(2 * MAIN_LAYOUT_HORIZONTAL_PADDING),
  },
  detailsContainer: {
    gap: scaleHeight(16),
  },
  details: {
    flexDirection: 'row',
    width: '100%',
    paddingVertical: scaleHeight(8),
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 0.3,
    borderBottomColor: Colors.gray[200],
  },
  buttonContainer: {
    left: 0,
    right: 0,
    position: 'absolute',
    bottom: scaleHeight(BOTTOM_TAB_CONTAINER_HEIGHT * 1.3),
  },
});

export default styles;
