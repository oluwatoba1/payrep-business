import {StyleSheet} from 'react-native';
import {scale, scaleHeight} from '../../../../utils/Helpers';
import {width} from '../../../../utils/Constants';
import {PNB, PNSB} from '../../../../theme/Fonts';
import Colors from '../../../../theme/Colors';

const styles = StyleSheet.create({
  container: {
    marginRight: scale(32),
  },
  header: {
    color: Colors.gray[700],
    fontFamily: PNSB,
    fontSize: scale(18),
    lineHeight: scale(23.4),
    letterSpacing: scale(-0.36),
  },
  walletBalanceContainer: {
    backgroundColor: Colors.gray[600],
    paddingVertical: scaleHeight(24),
    paddingHorizontal: scale(16),
    alignItems: 'center',
    borderRadius: scale(8),
    width: '100%',
  },
  walletBalanceTexts: {
    alignItems: 'center',
    gap: scaleHeight(8),
    alignSelf: 'stretch',
  },
  walletBalance: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(8),
  },
  viewIcon: {
    width: scale(24),
    height: scale(24),
    justifyContent: 'center',
    alignItems: 'center',
  },
  balance: {
    color: Colors.white,
    fontFamily: PNB,
    fontSize: scale(24),
    lineHeight: scale(31.2),
    letterSpacing: scale(-0.048),
  },
  nairaSign: {
    color: Colors.white,
    textAlign: 'center',
    fontFamily: PNB,
    fontSize: scale(32),
    lineHeight: scale(40),
    letterSpacing: scale(-0.64),
  },
  filterContainer: {
    paddingHorizontal: scale(4),
    paddingVertical: scaleHeight(4),
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginVertical: scaleHeight(8),
  },
  filterIcon: {
    width: scale(16),
    height: scaleHeight(16),
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabsContainer: {
    width: '100%',
    paddingHorizontal: scale(8),
    paddingVertical: scaleHeight(8),
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: scale(4),
    borderRadius: scale(32),
    backgroundColor: Colors.gray[50],
    flexDirection: 'row',
    marginVertical: scaleHeight(12),
  },
  tab: {
    paddingHorizontal: scale(12),
    paddingVertical: scaleHeight(4),
    justifyContent: 'center',
    alignItems: 'center',
    gap: scale(4),
    borderRadius: scale(24),
  },
  tabActive: {
    paddingHorizontal: scale(12),
    paddingVertical: scaleHeight(4),
    justifyContent: 'center',
    alignItems: 'center',
    gap: scale(4),
    borderRadius: scale(24),
    backgroundColor: 'rgba(254, 184, 0, 0.30)',
  },
  tabText: {},
});

export default styles;
