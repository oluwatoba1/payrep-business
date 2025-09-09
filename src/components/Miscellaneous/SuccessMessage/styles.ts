import {StyleSheet} from 'react-native';
import {moderateScale, scale, scaleHeight} from '@utils/Helpers';
import Colors from '@theme/Colors';
import {
  BOTTOM_TAB_CONTAINER_HEIGHT,
  MAIN_LAYOUT_HORIZONTAL_PADDING,
  width,
} from '@utils/Constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  content: {
    gap: moderateScale(8),
    justifyContent: 'center',
    alignItems: 'center',
    width: scale(282),
  },

  doneButton: {
    width: width - scale(MAIN_LAYOUT_HORIZONTAL_PADDING * 2),
  },
  image: {
    width: scale(100),
    height: scaleHeight(100),
  },
  text: {
    fontSize: moderateScale(16),
    textAlign: 'center',
  },
  receipt: {
    borderBottomColor: Colors.primary.base,
    borderBottomWidth: scale(1.5),
    marginTop: scaleHeight(12),
  },
  cardsContainer: {
    marginTop: scaleHeight(72),
    gap: moderateScale(20),
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
  iconActive: {
    tintColor: Colors.primary.base,
  },
  textActive: {
    color: Colors.gray[50],
  },
  textDisabled: {
    color: Colors.gray[100],
  },
});
