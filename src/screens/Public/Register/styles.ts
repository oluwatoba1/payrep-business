import {StyleSheet} from 'react-native';
import {MAIN_LAYOUT_HORIZONTAL_PADDING, width} from '@utils/Constants';
import {moderateScale, scale, scaleHeight} from '@utils/Helpers';

export const mainRegisterStyles = StyleSheet.create({
  mainContainer: {
    width: width - scale(2 * MAIN_LAYOUT_HORIZONTAL_PADDING),
  },
  titleContainer: {
    gap: scale(8),
  },
  textInputContainer: {
    marginVertical: scaleHeight(24),
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flexDirection: 'row',
    gap: moderateScale(4),
    paddingHorizontal: scale(60),
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
    paddingVertical: scaleHeight(16),
  },
  codeContainer: {
    alignSelf: 'flex-start',
    paddingHorizontal: scale(40),
  },
  text: {
    textAlign: 'center',
  },
});
