import {StyleSheet} from 'react-native';
import {scale, scaleHeight} from '../../../../../utils/Helpers';

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
});
