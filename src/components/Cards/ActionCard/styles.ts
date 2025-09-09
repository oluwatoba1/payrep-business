import {StyleSheet} from 'react-native';
import {moderateScale, scale, scaleHeight} from '@utils/Helpers';
import Colors from '@theme/Colors';

const styles = StyleSheet.create({
  text: {
    fontSize: moderateScale(16),
    textAlign: 'center',
  },
  cardWrapper: {
    width: '48%',
    borderRadius: moderateScale(16),
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 3},
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 8,
    overflow: 'hidden',
  },
  card: {
    padding: scaleHeight(16),
    height: scaleHeight(120),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: moderateScale(16),
    borderColor: Colors.primary[50], // Subtle border
    borderWidth: 0.2,
    backgroundColor: Colors.primary[50], // Fallback
  },
  cardDisabled: {
    opacity: 0.6,
  },
  iconContainer: {
    width: scale(48),
    height: scaleHeight(48),
    borderRadius: moderateScale(24),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: scaleHeight(12),
  },
  icon: {
    width: scale(44),
    height: scaleHeight(44),
  },
});

export default styles;
