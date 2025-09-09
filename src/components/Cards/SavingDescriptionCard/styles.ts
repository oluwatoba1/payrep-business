import {Dimensions, StyleSheet} from 'react-native';
import {moderateScale, scale, scaleHeight} from '../../../utils/Helpers';
import Colors from '../../../theme/Colors';

const {width: screenWidth} = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  cardContainer: {
    padding: scaleHeight(16),
    borderRadius: moderateScale(8),
  },
  contentContainer: {
    gap: moderateScale(24),
  },
  textWhite: {
    color: Colors.white,
  },
  descriptionContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  descriptionWidth: {
    width: screenWidth * 0.6,
  },
  badgeContainer: {
    width: screenWidth * 0.5,
    paddingVertical: scale(6),
    paddingHorizontal: scale(12),
    borderRadius: moderateScale(20),
  },
  image: {
    width: 65,
    height: 64,
    position: 'absolute',
    right: 0,
  },
  imageTop: {
    top: 10,
  },
  imageBottom: {
    bottom: 10,
  },
});
