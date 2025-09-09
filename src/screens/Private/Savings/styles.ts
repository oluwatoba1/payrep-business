import {StyleSheet} from 'react-native';
import {
  BOTTOM_TAB_CONTAINER_HEIGHT,
  height,
  MAIN_LAYOUT_HORIZONTAL_PADDING,
  width,
} from '@utils/Constants';
import {moderateScale, scale, scaleHeight} from '@utils/Helpers';
import Colors from '@theme/Colors';

export const mainSavingsStyles = StyleSheet.create({
  container: {
    flex: 1,
    width: width - scale(2 * MAIN_LAYOUT_HORIZONTAL_PADDING),
    gap: scale(16),
  },
  buttonContainer: {
    bottom: scaleHeight(0),
    marginHorizontal: scale(1),
    position: 'absolute',
    left: 0,
    right: 0,
  },
  titleContainer: {
    gap: moderateScale(16),
  },
  card: {
    backgroundColor: Colors.gray[1000],
    paddingHorizontal: scale(16),
    paddingVertical: scaleHeight(24),
    borderRadius: moderateScale(10),
  },
  easySavingsCard: {
    backgroundColor: Colors.cardColor.brown[200],
  },
  easySavingsWithdraw: {
    backgroundColor: Colors.cardColor.brown[300],
  },
  automatedSavingsCard: {
    backgroundColor: Colors.cardColor.green[100],
  },
  automatedSavingsWithdraw: {
    backgroundColor: Colors.cardColor.green[200],
  },
  lockedSavingsCard: {
    backgroundColor: Colors.cardColor.purple[100],
  },
  lockedSavingsWithdraw: {
    backgroundColor: Colors.cardColor.purple[200],
  },
  icon: {
    width: scale(16),
    height: scaleHeight(16),
  },

  selectBankButton: {
    flexDirection: 'row',
    position: 'absolute',
    top: scaleHeight(25),
    right: scale(10),
    backgroundColor: Colors.primary[200],
    paddingVertical: scaleHeight(4),
    paddingHorizontal: scale(12),
    borderRadius: 16,
  },
  dropdownAndButtonContainer: {
    position: 'relative',
  },
  targetIcon: {
    width: scale(93),
    height: scaleHeight(80),
  },
});
