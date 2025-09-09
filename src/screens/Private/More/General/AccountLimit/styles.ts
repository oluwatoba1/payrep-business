import {StyleSheet} from 'react-native';
import {
  MAIN_LAYOUT_HORIZONTAL_PADDING,
  width,
} from '../../../../../utils/Constants';
import {scale, scaleHeight} from '../../../../../utils/Helpers';

export const mainAccountLimitStyles = StyleSheet.create({
  container: {
    width: width - 2 * MAIN_LAYOUT_HORIZONTAL_PADDING,
    // height: height * 0.9,
    flex: 1
  },
  scrollContentContainer: {
    paddingBottom: scaleHeight(30),
  },
  heading: {
    gap: scaleHeight(16),
    marginBottom: scaleHeight(24)
  },
  upgradeTierCard: {
    backgroundColor: '#D9DCDD'
  },
  limitCard: {
    backgroundColor: '#828A8E'
  },
  limitText: {
    color: '#434F56'
  },
  buttonContainer: {
    bottom: 0
  }
});
