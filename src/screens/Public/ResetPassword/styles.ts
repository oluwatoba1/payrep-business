import {StyleSheet} from 'react-native';
import {scale} from '@utils/Helpers';
import {MAIN_LAYOUT_HORIZONTAL_PADDING, width} from '@utils/Constants';

const styles = StyleSheet.create({
  mainContainer: {
    width: width - scale(2 * MAIN_LAYOUT_HORIZONTAL_PADDING),
    flex: 1,
  },
  titleContainer: {
    gap: scale(8),
  },
  btn: {
    width: '100%',
    flex: 1,
    justifyContent: 'flex-end',
  },
});
export default styles;
