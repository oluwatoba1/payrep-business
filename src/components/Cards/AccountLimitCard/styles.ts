import {StyleSheet} from 'react-native';
import {scale, scaleHeight} from '../../../utils/Helpers';
import Colors from '../../../theme/Colors';

const styles = StyleSheet.create({
  cardContainer: {
    padding: scaleHeight(16),
    marginTop: scaleHeight(24),
    backgroundColor: Colors.white,
    borderRadius: scaleHeight(8),
    shadowColor: Colors.gray[200],
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subheading: {
    marginBottom: scaleHeight(8),
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  copyIcon: {
    marginLeft: scale(8),
    width: scale(24),
    height: scaleHeight(24),
    tintColor: Colors.black,
  },
  marginTop16: {
    marginTop: scaleHeight(16),
  },
});

export default styles