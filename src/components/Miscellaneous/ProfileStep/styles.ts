import {StyleSheet} from 'react-native';
import {moderateScale, scale, scaleHeight} from '@utils/Helpers';
import Colors from '@theme/Colors';
import {MAIN_LAYOUT_HORIZONTAL_PADDING, width} from '@utils/Constants';

const styles = StyleSheet.create({
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: scaleHeight(12),
    width: width - 2 * MAIN_LAYOUT_HORIZONTAL_PADDING,
  },
  iconAndLineContainer: {
    alignItems: 'center',
    marginRight: scale(16),
  },
  dottedLineContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  dottedLine: {
    width: scale(37),
    borderStyle: 'dotted',
    borderWidth: 1,
    borderRadius: moderateScale(1),
    borderColor: Colors.success[400],
    transform: [{rotate: '-90deg'}],
    marginTop: scaleHeight(20),
  },
  stepNumber: {
    fontSize: moderateScale(18),
    color: Colors.gray[100],
  },

  successContainer: {
    borderWidth: scale(1),
    borderRadius: moderateScale(100),
    width: scale(32),
    height: scaleHeight(32),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.success['100'],
    borderColor: Colors.success['100'],
  },
  numberContainer: {
    borderWidth: 1,
    borderRadius: moderateScale(100),
    width: scaleHeight(32),
    height: scaleHeight(32),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.gray['1000'],
    borderColor: Colors.gray['1000'],
  },
  titleContainer: {
    width: '74%',
  },
  textContainer: {
    flex: 1,
    paddingBottom: scaleHeight(14),
    justifyContent: 'center', // Ensures title and description are vertically centered
  },
  title: {
    fontSize: moderateScale(16),
    fontWeight: '600',
  },
  description: {
    fontSize: moderateScale(14),
    color: '#888888',
  },
  arrowIcon: {
    fontSize: moderateScale(24),
    color: Colors.gray.base,
    marginLeft: scale(8),
  },
  icon: {
    width: scaleHeight(24),
    height: scaleHeight(24),
  },
  rightIcon: {
    width: scaleHeight(16),
    height: scaleHeight(16),
  },
});

export default styles;
