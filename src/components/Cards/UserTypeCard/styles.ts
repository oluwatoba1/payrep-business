import {StyleSheet} from 'react-native';

// Local
import {MAIN_LAYOUT_HORIZONTAL_PADDING, baseDP, width} from '@utils/Constants';
import {moderateScale, scale, scaleHeight} from '@utils/Helpers';
import Colors from '@theme/Colors';

const styles = StyleSheet.create({
  container: {
    marginBottom: scaleHeight(15),
  },
  userTypeCardContainer: {
    paddingHorizontal: scale(baseDP * 1.6),
    paddingVertical: scaleHeight(baseDP * 2.4),
    borderRadius: moderateScale(baseDP * 0.8),
    alignItems: 'center',
    backgroundColor: Colors.gray[1000],
    width: width - 2 * scale(MAIN_LAYOUT_HORIZONTAL_PADDING) - 1.6 * baseDP,
  },
  userTypeCardIcon: {
    width: scale(48),
    height: scale(48),
    resizeMode: 'contain',
  },
  userTypeCardTextContainer: {
    alignItems: 'flex-start',
    width: '75%',
  },
});

export default styles;
