import {MAIN_LAYOUT_HORIZONTAL_PADDING, width} from '@utils/Constants';
import {scale, scaleHeight} from '@utils/Helpers';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  webViewContainer: {
    height: scaleHeight(450),
    alignItems: 'center',
    justifyContent: 'center',
  },
  webView: {
    width: width - scale(MAIN_LAYOUT_HORIZONTAL_PADDING),
  },
});

export default styles;
