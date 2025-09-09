import {StyleSheet} from 'react-native';
import {scale, scaleHeight} from '@utils/Helpers';
import Colors from '@theme/Colors';

const styles = StyleSheet.create({
  statusContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '80%',
  },
  image: {
    width: scale(100),
    height: scaleHeight(100),
  },
  receipt: {
    borderBottomColor: Colors.primary.base,
    borderBottomWidth: scale(1.5),
    marginTop: scaleHeight(12),
  },
  iconActive: {
    tintColor: Colors.primary.base,
  },
  textActive: {
    color: Colors.gray[50],
  },
  textDisabled: {
    color: Colors.gray[100],
  },
});

export default styles;
