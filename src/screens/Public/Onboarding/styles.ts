import {StatusBar, StyleSheet} from 'react-native';
import {scale, scaleHeight} from '@utils/Helpers';
import Colors from '@theme/Colors';
import {MAIN_LAYOUT_HORIZONTAL_PADDING} from '@utils/Constants';

const styles = StyleSheet.create({
  onboardingContainer: {
    flex: 1,
  },
  onboardingHeaderContainer: {
    paddingHorizontal: scale(MAIN_LAYOUT_HORIZONTAL_PADDING),
    marginTop: (StatusBar.currentHeight || scaleHeight(30)) + scaleHeight(10),
  },
  circularContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerCircularContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: scale(50),
  },
  onboardingLogoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: scale(20),
  },
  onboardingLogo: {
    width: scale(72),
    height: scale(72),
  },
  onboardingText: {
    color: Colors.primary[700],
    fontSize: scale(14),
  },
  circularImage: {
    width: scale(270),
    height: scale(270),
  },
});

export default styles;
