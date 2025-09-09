import {StatusBar, StyleSheet} from 'react-native';
import {moderateScale, scale, scaleHeight} from '@utils/Helpers';
import {MAIN_LAYOUT_HORIZONTAL_PADDING, width} from '@utils/Constants';
import Colors from '@theme/Colors';

const styles = StyleSheet.create({
  container: {
    width: width - scale(2 * MAIN_LAYOUT_HORIZONTAL_PADDING),
  },
  main: {
    height: 'auto',
  },
  profilePicture: {
    height: scaleHeight(40),
    width: scaleHeight(40),
    resizeMode: 'cover',
    borderRadius: scaleHeight(40),
  },
  headerArea: {
    marginTop: scaleHeight((StatusBar.currentHeight || 20) + 5),
  },
  notificationArea: {
    width: 32,
    height: 32,
    backgroundColor: Colors.gray['200'],
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationIcon: {
    width: scale(16),
    height: scale(16),
  },
  profileArea: {
    flexDirection: 'row',
    gap: 8,
  },
  profileText: {
    alignSelf: 'flex-end',
  },
  notificationIndicator: {
    position: 'absolute',
    top: scaleHeight(-2),
    right: scale(-2),
    width: scale(8),
    height: scaleHeight(8),
    borderRadius: moderateScale(5),
    backgroundColor: Colors.danger.base,
  },
});

export default styles;
