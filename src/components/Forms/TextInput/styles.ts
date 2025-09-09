import Colors from '@theme/Colors';
import {PNR} from '@theme/Fonts';
import {MAIN_LAYOUT_HORIZONTAL_PADDING, width} from '@utils/Constants';
import {moderateScale, scale, scaleHeight} from '@utils/Helpers';
import {StyleSheet} from 'react-native';

const labelLineHeight = moderateScale(18);

const styles = StyleSheet.create({
  inputContainer: {
    position: 'relative',
    marginTop: scaleHeight(16),
  },
  inputLabel: {
    position: 'absolute',
    top: -labelLineHeight / 2,
    left: scale(16),
    zIndex: 10,
    backgroundColor: Colors.white,
  },
  leftNodeContainer: {
    paddingLeft: scale(16),
    alignItems: 'center',
    justifyContent: 'center',
  },
  rightNodeContainer: {
    paddingRight: scale(16),
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: moderateScale(8),
    borderColor: Colors.custom.textInputBorderColor,
    width: width - scale(2 * MAIN_LAYOUT_HORIZONTAL_PADDING),
  },
  textInput: {
    flex: 1,
    minHeight: scaleHeight(50),
    paddingVertical: scaleHeight(16),
    fontFamily: PNR,
    fontSize: moderateScale(16),
    color: Colors.black,
  },
  flagIcon: {
    width: scale(24),
    height: scaleHeight(17),
    resizeMode: 'contain',
  },
});

export default styles;
