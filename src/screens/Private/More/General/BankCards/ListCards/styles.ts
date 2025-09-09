import {StyleSheet} from 'react-native';
import {scale, scaleHeight} from '@utils/Helpers';
import {
  BOTTOM_TAB_CONTAINER_HEIGHT,
  MAIN_LAYOUT_HORIZONTAL_PADDING,
  width,
} from '@utils/Constants';

export const styles = StyleSheet.create({
  scrollContainer: {
    paddingBottom: scaleHeight(BOTTOM_TAB_CONTAINER_HEIGHT + 16),
  },
});
