import {StyleSheet} from 'react-native';
import {moderateScale, scale, scaleHeight} from '../../../utils/Helpers';
import Colors from '../../../theme/Colors';

export const styles = StyleSheet.create({
  tooltip: {
    position: 'absolute',
    zIndex: moderateScale(1000),
    backgroundColor: Colors.gray[900],
    borderRadius: moderateScale(8),
    padding: scaleHeight(16),
    marginHorizontal: scale(16),
  },
  tooltipArrow: {
    position: 'absolute',
    top: scaleHeight(-10),
    left: scale(20),
    width: scale(0),
    height: scaleHeight(0),
    borderLeftWidth: moderateScale(7),
    borderRightWidth: moderateScale(7),
    borderBottomWidth: moderateScale(12),
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: Colors.gray[900],
  },
  tooltipContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    color: Colors.white,
  },
  closeButton: {
    marginLeft: scale(10),
    padding: scaleHeight(5),
  },
  closeText: {
    color: Colors.white,
    fontSize: moderateScale(16),
  },
});
