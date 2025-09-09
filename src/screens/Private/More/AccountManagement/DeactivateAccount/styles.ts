import {StyleSheet} from 'react-native';
import {scale, scaleHeight} from '../../../../../utils/Helpers';
import Colors from '../../../../../theme/Colors';

export const styles = StyleSheet.create({
  deactivateAccountButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: scaleHeight(10),
    paddingHorizontal: scale(16),
  },
  keepAccountButton: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    width: '50%',
  },
  deactivateAccountButton: {
    width: '50%',
  },
  deactivateItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: scale(16),
    gap: scaleHeight(10),
  },
  deactivateImageStyle: {
    width: scale(16),
    height: scale(16),
  },
});
