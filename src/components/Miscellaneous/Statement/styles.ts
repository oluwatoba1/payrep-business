import {Dimensions, StyleSheet} from 'react-native';
import {PNR, PNSB} from '../../../theme/Fonts';
import {scale, scaleHeight} from '../../../utils/Helpers';
import Colors from '../../../theme/Colors';

const styles = StyleSheet.create({
  requestStatementContainer: {
    width: '100%',
    paddingHorizontal: scale(12),
    paddingVertical: scaleHeight(12),
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: scale(4),
    backgroundColor: Colors.primary[50],
    shadowColor: 'rgba(86, 86, 86, 0.12)',
    flexDirection: 'row',
    marginTop: scaleHeight(12)
  },
  downloadIcon: {
    width: scale(20),
    height: scaleHeight(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  requestStatement: {
    alignItems: 'center',
    gap: scale(4),
    flexDirection: 'row'
  },
  icon: {
    width: scale(24),
    height: scaleHeight(24),
    flexShrink: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
