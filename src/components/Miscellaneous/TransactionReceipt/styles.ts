import {StatusBar, StyleSheet} from 'react-native';
import {moderateScale, scale, scaleHeight} from '../../../utils/Helpers';
import {
  BOTTOM_TAB_CONTAINER_HEIGHT,
  MAIN_LAYOUT_HORIZONTAL_PADDING,
  height,
  width,
} from '../../../utils/Constants';
import Colors from '../../../theme/Colors';

const styles = StyleSheet.create({
  scrollViewContainer: {
    height: height - BOTTOM_TAB_CONTAINER_HEIGHT,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: scale(300),
    padding: scale(20),
    borderRadius: moderateScale(10),
    backgroundColor: Colors.white,
    alignItems: 'center',
  },
  modalButton: {
    marginTop: scaleHeight(20),
    width: scale(100),
  },
  container: {
    width: width - scale(2 * MAIN_LAYOUT_HORIZONTAL_PADDING),
    height: height - scale(2 * MAIN_LAYOUT_HORIZONTAL_PADDING),
    justifyContent: 'center',
    alignItems: 'center',
  },
  backgroundLogo: {
    width: scale(208),
    height: scaleHeight(208),
    opacity: 0.05,
  },
  backgroundLogoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{translateX: -scale(104)}, {translateY: -scaleHeight(104)}],
  },

  receiptContainer: {
    paddingTop: (StatusBar.currentHeight || 20) + 5,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',

    borderTopLeftRadius: moderateScale(16),
    borderTopRightRadius: moderateScale(16),
    backgroundColor: Colors.white,
    shadowColor: 'rgba(91, 71, 71, 0.12)',
  },
  receiptLogo: {
    width: scaleHeight(70),
    height: scaleHeight(70),
    resizeMode: 'contain',
  },
  receiptHeader: {
    alignItems: 'center',
    gap: scaleHeight(4),
  },
  topDetailsContainer: {
    alignItems: 'center',
    gap: scaleHeight(24),
  },
  checkmarkIcon: {
    height: scaleHeight(24),
    width: scale(28.16),
  },
  bottomDetailsContainer: {
    alignItems: 'center',
    gap: scaleHeight(8),
    width: scale(311),
    justifyContent: 'center',
  },
  details: {
    paddingVertical: scale(16),

    width: '100%',
    borderBottomWidth: 0.3,
    borderBottomColor: Colors.gray[200],
  },
  detailsContainer: {
    paddingHorizontal: scale(16),
    gap: scaleHeight(24),
  },
  buttons: {
    gap: scaleHeight(16),
    left: 0,
    right: 0,
    position: 'absolute',
    bottom: scaleHeight(BOTTOM_TAB_CONTAINER_HEIGHT * 1.3),
    flexDirection: 'row',
    justifyContent: 'space-around',
    flex: 1,
    width: '100%',
  },
  button: {
    width: (width - scale(2 * MAIN_LAYOUT_HORIZONTAL_PADDING) - scale(20)) / 2,
  },

  doneButton: {
    backgroundColor: 'transparent',
    borderWidth: 1,
  },
  amountContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
