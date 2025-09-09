import {StyleSheet} from 'react-native';
import {scale} from '@utils/Helpers';
import {MAIN_LAYOUT_HORIZONTAL_PADDING, width} from '@utils/Constants';

export const styles = StyleSheet.create({
  cardFormContainer: {},
  innerInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  inputSize: {
    width: (width - scale(2 * MAIN_LAYOUT_HORIZONTAL_PADDING) - scale(10)) / 2,
  },
});
