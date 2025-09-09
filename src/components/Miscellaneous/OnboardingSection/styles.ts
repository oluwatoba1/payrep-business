import {StyleSheet} from 'react-native';
import {width} from '../../../utils/Constants';
import Colors from '../../../theme/Colors';
import {moderateScale, scale, scaleHeight} from '../../../utils/Helpers';

const styles = StyleSheet.create({
  onboardingSectionContainerStyle: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    width,
    backgroundColor: 'transparent',
  },
  onboardingAvatarContainerStyle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  onboardingAvatarStyle: {
    width: scale(273),
    height: scaleHeight(303),
    resizeMode: 'contain',
    transform: [{translateY: scaleHeight(60)}],
  },
  onboardingContentContainerStyle: {
    borderTopLeftRadius: moderateScale(32),
    borderTopRightRadius: moderateScale(32),
    backgroundColor: Colors.white,
    paddingHorizontal: scale(24),
  },
  OnboardingTextHeaderStyle: {
    color: Colors.primary[700],
    fontSize: scale(24),
  },
  onboardingTextBodyStyle: {
    color: Colors.primary[700],
    fontSize: moderateScale(16),
    lineHeight: moderateScale(23),
  },
  onboardingButtonContainerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  onboardingProgressCircleStyle: {
    width: scaleHeight(56),
    height: scaleHeight(56),
  },
});

export default styles;
