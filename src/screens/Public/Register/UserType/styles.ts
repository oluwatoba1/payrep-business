import {StyleSheet} from 'react-native';

// LOCAL
import {scale, scaleHeight} from '@utils/Helpers';
import {
  HEADER_CONTAINER_HEIGHT,
  MAIN_LAYOUT_HORIZONTAL_PADDING,
  height,
  width,
} from '@utils/Constants';

export const styles = StyleSheet.create({
  userTypeContainer: {
    height: height - scaleHeight(HEADER_CONTAINER_HEIGHT),
    width: width - scale(2 * MAIN_LAYOUT_HORIZONTAL_PADDING),
    alignItems: 'center',
    justifyContent: 'center',
  },
});
