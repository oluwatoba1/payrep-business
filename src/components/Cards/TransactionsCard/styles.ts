import {StyleSheet} from 'react-native';
import {PNR, PNSB} from '../../../theme/Fonts';
import {scale, scaleHeight} from '../../../utils/Helpers';
import Colors from '../../../theme/Colors';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    gap: scale(12),
  },
  header: {
    alignItems: 'flex-start',
  },
  LR: {
    //label regular
    fontFamily: PNR,
    fontSize: scale(12),
    lineHeight: scale(18),
    letterSpacing: scale(0.12),
  },
  transactionsContainer: {
    gap: scale(8),
    width: '100%',
    // paddingVertical: scaleHeight(4)
  },
  emptyTransactionsContainer: {
    marginTop: scale(32),
    alignItems: 'center',
  },
  emptyBox: {
    width: scale(64),
    height: scale(64),
  },
  emptyTx: {
    color: Colors.gray[400],
    textAlign: 'center',
  },
  transaction: {
    gap: scale(10),
    alignItems: 'flex-start',
    paddingBottom: scaleHeight(2)
  },
  viewMore: {
    width: '100%',
    justifyContent: 'flex-end',
    gap: scale(203),
    flexDirection: 'row',
  },
  transactionCardContainer: {
    height: scale(80),
    width: scale(343),
    padding: scale(12),
    borderWidth: scale(0.2),
    borderColor: Colors.gray[300],
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: scale(8),
    backgroundColor: Colors.white,
    flexDirection: 'row',
  },
  transactionDetailsL: {
    alignItems: 'center',
    gap: scale(16),
    flexDirection: 'row',
    marginVertical: scale(4),
  },
  transactionDetails: {
    alignItems: 'flex-start',
    gap: scale(4),
    width: scale(167),
  },
  transactionDetailsR: {
    alignItems: 'flex-end',
    gap: scale(4),
  },
  viewMoreText: {
    color: Colors.gray[700],
    textAlign: 'right',
  },
  success: {
    width: scale(48),
    height: scale(48),
    padding: scale(12),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scale(32),
    backgroundColor: 'rgba(2, 171, 117, 0.15)',
  },
  pending: {
    width: scale(48),
    height: scale(48),
    padding: scale(12),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scale(32),
    backgroundColor: 'rgba(245, 158, 11, 0.15)',
  },
  error: {
    width: scale(48),
    height: scale(48),
    padding: scale(12),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scale(32),
    backgroundColor: 'rgba(239, 68, 68, 0.15)',
  },
  icon: {
    width: scale(24),
    height: scale(24),
    flexShrink: 0,
  },
  transactionDate: {
    color: Colors.gray['base'],
    fontFamily: PNR,
    fontSize: scale(10),
    
    lineHeight: scale(15),
    letterSpacing: scale(0.1),
  },
  amount: {
    color: Colors.gray[700],
  },
  failedStatus: {
    color: Colors.danger['base'],
    textTransform: 'capitalize',
  },
  successStatus: {
    color: Colors.success['base'],
    textTransform: 'capitalize',
  },
  pendingStatus: {
    color: Colors.primary['base'],
    textTransform: 'capitalize',
  },
  arrowIcon:{
    width: scale(24),
    height: scaleHeight(24)
  },
  more:{
    flexDirection: 'row',
    alignItems:'center',
    gap: scale(4)
  }
});

export default styles;
