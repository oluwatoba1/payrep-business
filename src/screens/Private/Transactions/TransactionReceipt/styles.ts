import {StyleSheet} from 'react-native';
import {moderateScale, scale, scaleHeight} from '../../../../utils/Helpers';
import {
  BOTTOM_TAB_CONTAINER_HEIGHT,
  MAIN_LAYOUT_HORIZONTAL_PADDING,
  height,
  width,
} from '../../../../utils/Constants';
import Colors from '../../../../theme/Colors';

const styles = StyleSheet.create({
  headerLogo: {
    height: scaleHeight(108),
    width: scale(108),
    alignSelf: 'center',
  },
  container: {
    width: width - scale(2 * MAIN_LAYOUT_HORIZONTAL_PADDING),
    height: height - scale(2 * MAIN_LAYOUT_HORIZONTAL_PADDING),
  },
  backgroundNameLogo: {
    width: scale(77),
    height: scaleHeight(77),
    position: 'absolute',
  },
  backgroundLogo: {
    width: scale(208),
    height: scaleHeight(208),
    opacity: 0.05,
    // top: 195,
  },
  background: {
    position: 'absolute',
    justifyContent: 'center',
    height: '100%',
  },
  receiptContainer: {
    paddingTop: scaleHeight(24),
    paddingBottom: scaleHeight(40),
    alignItems: 'center',
    gap: scaleHeight(24),
    borderTopLeftRadius: moderateScale(16),
    borderTopRightRadius: moderateScale(16),
    backgroundColor: Colors.white,
    shadowColor: 'rgba(86, 86, 86, 0.12)',
    // shadowOffset: '0px 3px 7px 0px',
    height: '100%',
  },
  receiptHeader: {
    alignItems: 'center',
    gap: scaleHeight(4),
  },
  topDetailsContainer: {
    alignItems: 'center',
    gap: scaleHeight(20),
  },
  checkmarkIcon: {
    height: scaleHeight(30),
    width: scale(37),
  },
  bottomDetailsContainer: {
    alignItems: 'center',
    gap: scaleHeight(8),
    width: scale(311),
  },
  details: {
    paddingVertical: scale(16),
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
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
  },
  button: {
    width: width / 2.5,
  },
});

export default styles;
