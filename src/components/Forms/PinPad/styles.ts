import {TextStyle, ViewStyle} from 'react-native';
import {moderateScale, scale, scaleHeight} from '../../../utils/Helpers';
import {PNB} from '../../../theme/Fonts';
import Colors from '../../../theme/Colors';
import {MAIN_LAYOUT_HORIZONTAL_PADDING, width} from '@utils/Constants';

interface PinPadStyleFunction {
  (
    isFocused: boolean,
    isLastItem: boolean,
    padLength: number,
    pinScale: number,
  ): ViewStyle;
}

type PinPadStyle = {
  pinPadContainer: ViewStyle;
  pinBoxContainer: PinPadStyleFunction;
  pinText: TextStyle;
  error: TextStyle;
  pinInput: TextStyle;
  hiddenInput: ViewStyle;
  resendOtpText: TextStyle;
};

const styles: PinPadStyle = {
  pinPadContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  pinBoxContainer: (isFocused, isLastItem, padLength, pinScale) => {
    const _width =
      (width -
        pinScale * scale(MAIN_LAYOUT_HORIZONTAL_PADDING) -
        (padLength + 1) * scale(16)) /
      padLength;
    return {
      borderWidth: 1,
      borderColor: isFocused ? Colors.primary.base : Colors.gray[400],
      borderRadius: moderateScale(10),
      width: scaleHeight(_width),
      height: scaleHeight(_width),
      marginRight: isLastItem ? 0 : scale(16),
      alignItems: 'center',
      justifyContent: 'center',
    };
  },
  pinInput: {
    flex: 1,
    fontSize: moderateScale(16),
    textAlign: 'center',
    color: Colors.black,
  },
  pinText: {
    fontSize: moderateScale(24),
    fontFamily: PNB,
    color: Colors.black,
    textAlign: 'center',
  },
  hiddenInput: {
    position: 'absolute',
    opacity: 0,
    width: 1,
    height: 1,
  },
  error: {
    fontSize: scale(12),
    color: Colors.danger.base,
    marginTop: scale(4),
    textAlign: 'center',
  },
  resendOtpText: {
    color: Colors.primary.base,
    fontSize: scale(14),
    fontFamily: PNB,
    textAlign: 'center',
    marginTop: scale(8),
  },
};

export default styles;
