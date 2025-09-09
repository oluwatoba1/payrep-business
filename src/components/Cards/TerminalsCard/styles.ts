import {StyleSheet} from 'react-native';
import {scale, scaleHeight} from '../../../utils/Helpers';
import Colors from '../../../theme/Colors';
import {PNR} from '../../../theme/Fonts';
import {BOTTOM_TAB_CONTAINER_HEIGHT} from '../../../utils/Constants';

const styles = StyleSheet.create({
  terminal: {
    gap: scale(10),
    alignItems: 'flex-start',
    paddingBottom: scaleHeight(BOTTOM_TAB_CONTAINER_HEIGHT * 1.6),
  },
  emptyContainer: {
    marginTop: scale(32),
    alignItems: 'center',
  },
  emptyBox: {
    width: scale(64),
    height: scale(64),
  },
  transactionsDetailsContatiner: {
    gap: 23,
    margin: 0,
    width: 'auto',
  },
  transactionsDetails: {
    gap: 8,
    alignSelf: 'flex-start',
  },
  lastTransactionDate: {
    borderWidth: 0.3,
    alignSelf: 'center',
    paddingHorizontal: scale(12),
    paddingVertical: scaleHeight(8),
    borderRadius: 3,
  },
  terminalContainerStyle: {
    minWidth: '100%',
    height: 'auto',
  },
  badge: {
    maxWidth: 'auto',
    height: 'auto',
    paddingHorizontal: scale(12),
    paddingVertical: scale(2),
    borderRadius: 100,
    alignSelf: 'flex-start',
  },
  terminalContainerStyle1: {
    backgroundColor: 'rgba(237, 237, 227, 1)',
  },
  badge1: {
    backgroundColor: 'rgba(121, 121, 78, 1)',
  },
  terminalContainerStyle2: {
    backgroundColor: 'rgba(225, 241, 232, 1)',
  },
  badge2: {
    backgroundColor: 'rgba(63, 136, 95, 1)',
  },
  terminalContainerStyle3: {
    backgroundColor: 'rgba(232, 225, 241, 1)',
  },
  badge3: {
    backgroundColor: 'rgba(63, 136, 95, 1)',
  },
  terminalContainerStyle4: {
    backgroundColor: 'rgba(241, 232, 225, 1)',
  },
  badge4: {
    backgroundColor: 'rgba(136, 95, 63, 1)',
  },
  terminalContainerStyle5: {
    backgroundColor: 'rgba(225, 236, 241, 1)',
  },
  badge5: {
    backgroundColor: 'rgba(63, 113, 136, 1)',
  },
});

export default styles;
