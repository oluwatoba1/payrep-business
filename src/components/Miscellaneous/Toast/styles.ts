import {ViewStyle, ImageStyle, TextStyle} from 'react-native';
import {moderateScale, scale, scaleHeight} from '@utils/Helpers';
import {MAIN_LAYOUT_HORIZONTAL_PADDING, width} from '@utils/Constants';
import Colors from '@theme/Colors';
import {PNB} from '@theme/Fonts';
interface ToastContainerStyle {
  (bgColor: string): ViewStyle;
}

interface ToastTextStyle {
  (color: string): TextStyle;
}

type ToastStyle = {
  container: ViewStyle;
  toastContainer: ToastContainerStyle;
  toastIcon: ImageStyle;
  toastText: ToastTextStyle;
};

const styles: ToastStyle = {
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    opacity: 1,
    marginTop: scaleHeight(30),
    paddingHorizontal: scale(20),
    width,
  },
  toastContainer: (backgroundColor: string) => ({
    width: width - scale(MAIN_LAYOUT_HORIZONTAL_PADDING * 2),
    backgroundColor,
    borderRadius: moderateScale(6),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    alignSelf: 'flex-end',
    paddingVertical: scaleHeight(18),
    paddingHorizontal: scale(16),
    elevation: 3,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    marginBottom: scaleHeight(20),
  }),
  toastIcon: {
    height: scaleHeight(18),
    width: scaleHeight(18),
    resizeMode: 'contain',
    marginRight: scale(10),
  },
  toastText: (color: string) => ({
    width: '85%',
    fontSize: moderateScale(14),
    fontFamily: PNB,
    color,
  }),
};

export default styles;
