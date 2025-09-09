import {StyleSheet} from 'react-native';
import {
  BOTTOM_TAB_CONTAINER_HEIGHT,
  MAIN_LAYOUT_HORIZONTAL_PADDING,
  height,
  width,
} from '@utils/Constants';
import {scale, scaleHeight} from '@utils/Helpers';
import Colors from '@theme/Colors';

export const mainWalletStyles = StyleSheet.create({
  container: {
    width: width - scale(2 * MAIN_LAYOUT_HORIZONTAL_PADDING),
    height: height - scale(2 * MAIN_LAYOUT_HORIZONTAL_PADDING),
  },
  buttonContainer: {
    bottom: scaleHeight(BOTTOM_TAB_CONTAINER_HEIGHT),
    marginHorizontal: scale(1),
    position: 'absolute',
    left: 0,
    right: 0,
  },
  btn: {
    position: 'absolute',
    bottom: scaleHeight(BOTTOM_TAB_CONTAINER_HEIGHT * 1.2),
    alignSelf: 'center',
    width: '100%',
    flex: 0.5,
  },
  doubleUserIcon: {
    width: scale(16),
    height: scaleHeight(16),
  },
  doubleUserTeamContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(4),
  },
  cardContainer: {
    marginTop: scaleHeight(16),
  },
  beneficiaryCardContainer: {
    position: 'relative',
    gap: 8,
  },
  validate: {
    position: 'absolute',
    top: scaleHeight(30),
    right: scale(20),
    backgroundColor: Colors.primary[200],
    borderRadius: 100,
    padding: scaleHeight(2),
  },
  inputGroup: {
    // gap: 24
    gap: 24,
  },
  rechargeAmountContainer: {
    width: '100%',
    borderStyle: 'dashed',
    borderColor: Colors.primary['base'],
    padding: 8,
    borderWidth: 1,
    borderRadius: 200,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: scaleHeight(24),
  },
  rechargeAmount: {
    padding: 8,
    backgroundColor: Colors.gray[100],
    borderRadius: 100,
  },
});
