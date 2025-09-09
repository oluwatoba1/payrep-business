import {StyleSheet} from 'react-native';

import {moderateScale, scale, scaleHeight} from '@utils/Helpers';
import Colors from '@theme/Colors';

export const styles = StyleSheet.create({
  doubleUserIcon: {
    width: scale(16),
    height: scaleHeight(16),
  },
  doubleUserTeamContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(4),
    alignSelf: 'flex-end',
    marginBottom: scaleHeight(-10),
  },
  shimmerDropdown: {
    borderRadius: moderateScale(8),
    height: scaleHeight(60),
    width: '100%',
    marginBottom: scaleHeight(10),
  },
  shimmerBeneficiary: {
    borderRadius: moderateScale(8),
    height: scaleHeight(100),
    width: '100%',
  },
  chargesContainer: {
    backgroundColor: Colors.primary[50],
    padding: scaleHeight(12),
    borderRadius: moderateScale(8),
    marginTop: scaleHeight(8),
    marginBottom: scaleHeight(16),
  },
  chargeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: scaleHeight(4),
  },
});
