import {StyleSheet} from 'react-native';
import {scale, scaleHeight} from '../../../../../utils/Helpers';
import Colors from '../../../../../theme/Colors';

const styles = StyleSheet.create({
  transactionDetailsContainer: {
    borderBottomWidth: scale(1),
    borderColor: Colors.gray[50],
    borderRadius: scaleHeight(8),
    marginVertical: scaleHeight(16),
  },
  detailRow: {
    marginBottom: scaleHeight(8),
  },
  detailItem: {
    marginBottom: scaleHeight(16),
    borderBottomWidth: scaleHeight(1),
    borderColor: Colors.gray[50],
    paddingVertical: scaleHeight(12),
  },
  amountDetailsContainer: {
    backgroundColor: Colors.primary[50],
    padding: scaleHeight(16),
    borderRadius: scaleHeight(8),
    marginBottom: scaleHeight(16),
  },
  amountRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: scaleHeight(8),
  },
  pinPadContainer: {
    marginVertical: scaleHeight(60),
    justifyContent: 'center',
    alignItems: 'center',
    gap: scaleHeight(16),
  },
});

export default styles;