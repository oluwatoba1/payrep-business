import {StyleSheet} from 'react-native';
import {moderateScale, scale, scaleHeight} from '../../../utils/Helpers';
import Colors from '../../../theme/Colors';
import {MAIN_LAYOUT_HORIZONTAL_PADDING, width} from '@utils/Constants';

export const styles = StyleSheet.create({
  cardContainer: {
    maxHeight: scaleHeight(214),
    justifyContent: 'center',
    position: 'relative',
    marginTop: scaleHeight(20),
  },
  cardImage: {
    width: width - 2 * scale(MAIN_LAYOUT_HORIZONTAL_PADDING),
    height: '100%',
    borderRadius: moderateScale(10),
  },
  cardDetailsContainer: {
    width: '100%',
    padding: scaleHeight(10),
  },
  cardTitle: {
    color: Colors.white,
  },
  cardNumber: {
    color: Colors.white,
  },
  cardName: {
    color: Colors.white,
  },
  cardLogo: {
    width: scale(81),
    height: scaleHeight(32),
    resizeMode: 'contain',
  },
  overLay: {
    position: 'absolute',
    top: scaleHeight(0),
    left: 0,
    width: '100%',
    height: '100%',
    borderRadius: 10,
    zIndex: 1,
    opacity: 0.9,
  },
  detailRow: {
    flexDirection: 'row',
    gap: scaleHeight(4),
    marginVertical: scaleHeight(4),
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: scaleHeight(10),
  },
  cardBody: {
    marginBottom: scaleHeight(10),
  },
  modalOverlay: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  menu: {
    position: 'absolute',
    top: 10,
    right: 10,

    backgroundColor: Colors.success[900],
    borderRadius: moderateScale(4),
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowOffset: {width: 0, height: 2},
    minHeight: scaleHeight(80),
    maxHeight: scaleHeight(180),
    width: scale(100),
    padding: scaleHeight(10),
    zIndex: 100,
  },
});
