import {StyleSheet} from 'react-native';
import {scale} from '../../../utils/Helpers';
import Colors from '../../../theme/Colors';
import {PNR} from '../../../theme/Fonts';

const styles = StyleSheet.create({
  // success
  successBody: {
    width: scale(343),
    height: 'auto',
    padding: scale(16),
    justifyContent: 'space-between',
    borderRadius: scale(12),
    backgroundColor: Colors.success[50],
    shadowColor: 'rgba(50, 50, 50, 0.3)',
    flexDirection: 'row',
    gap: scale(16),
  },
  successText: {
    fontFamily: PNR,
    fontSize: scale(16),
    color: Colors.success['base'],
    lineHeight: scale(23.2),
    
  },
  // info
  infoBody: {
    width: scale(343),
    height: 'auto',
    padding: scale(16),
    justifyContent: 'space-between',
    borderRadius: scale(12),
    backgroundColor: Colors.primary[50],
    shadowColor: 'rgba(50, 50, 50, 0.3)',
    flexDirection: 'row',
    gap: scale(16),
  },
  infoText: {
    fontFamily: PNR,
    fontSize: scale(16),
    color: Colors.primary['base'],
    lineHeight: scale(23.2),
    
  },
  // error
  errorBody: {
    width: scale(343),
    height: 'auto',
    padding: scale(16),
    justifyContent: 'space-between',
    borderRadius: scale(12),
    backgroundColor: Colors.danger[50],
    shadowColor: 'rgba(50, 50, 50, 0.3)',
    flexDirection: 'row',
    gap: scale(16),
  },
  errorText: {
    fontFamily: PNR,
    fontSize: scale(16),
    color: Colors.danger['base'],
    lineHeight: scale(23.2),
    
  },
  container: {
    flexDirection: 'row',
    gap: scale(16),
    alignItems: 'center',
  },
  icon: {
    height: scale(20),
    width: scale(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  xicon: {
    height: scale(24),
    width: scale(24),
    alignSelf: 'stretch',
  },
});
export default styles;
