import {StatusBar, StyleSheet} from 'react-native';
import {scale, scaleHeight} from '../../../utils/Helpers';
import Colors from '../../../theme/Colors';
import {PNR, PNSB} from '../../../theme/Fonts';

const styles = StyleSheet.create({
  title: {
    fontSize: scale(12),
    color: Colors.gray['base'],
    lineHeight: scale(15),
    paddingRight: scale(8),
  },
  naira: {
    fontSize: scale(16),
    color: Colors.gray[600],
    fontFamily: PNSB,
    lineHeight: scale(23.2),
    paddingRight: scale(8),
  },
  viewIcon: {
    width: scale(16),
    height: scale(16),
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewIconHidden: {
    display: 'none',
  },
  container: {
    
  },
  badge: {
    backgroundColor: Colors.success['base'],
    borderRadius: scale(16),
    alignItems: 'center',
    justifyContent: 'center',
    gap: scale(4),
    width: 'auto',
    height: 'auto',
    paddingHorizontal: scale(8),
  },
  badgeText: {
    color: Colors.gray[600],
    fontSize: scale(10),
  },
  itemBonus: {
    backgroundColor: '#D6ECFF',
    padding: scale(16),
    width: scale(255),
    height: scaleHeight(148),
    alignItems: 'flex-start',
    marginRight: scale(12),
    borderRadius: scale(8),
    position: 'relative',
    overflow: 'hidden',

  },
  itemCommission: {
    backgroundColor: 'rgba(239, 68, 68, 0.10)',
    padding: scale(16),
    width: scale(255),
    height: scaleHeight(148),
    alignItems: 'flex-start',
    marginRight: scale(12),
    borderRadius: scale(8),
    position: 'relative',
    overflow: 'hidden',
  },
  details: {
    gap: scale(2),
    paddingBottom: scale(12),
  },
  balanceRow: {
    flexDirection: 'row',
    gap: scale(8),
    alignItems: 'center'
  },
  badgeVisible: {
    backgroundColor: Colors.success['base'],
    borderRadius: scale(16),
    alignItems: 'center',
    justifyContent: 'center',
    gap: scale(4),
    width: 'auto',
    height: 'auto',
    paddingHorizontal: scale(8),
  },
  badgeHidden: {
    display: 'none',
  },
  cashoutContainer: {
    flexDirection: 'row-reverse', 
    alignItems: 'flex-start', 
    width: '100%'
  },
  cashoutButton: {
    width: scale(85), 
    height: scale(29), 
    backgroundColor: Colors.black
  },
  images: {
    flexDirection: 'row-reverse',
    alignItems: 'flex-start',
    width: '100%',
    bottom: scale(16),
    zIndex: 0
  },
  icon: {
    // width: scale(72),
    height: scale(72),
    bottom: 16,
    right: 16
  },
  pillsContainer: {
    width: 'auto',
    height: 'auto',
    gap: scale(8),
    flexDirection: 'row',
    justifyContent: 'center'
  },
  pill: {
    height: scaleHeight(6),
    width: scale(12),
    backgroundColor: Colors.gray['200'],
    borderRadius: 4
  },
  activePill: {
    height: scaleHeight(6),
    width: scale(48),
    backgroundColor: Colors.black,
    borderRadius: 4
  },
  
});

export default styles;
