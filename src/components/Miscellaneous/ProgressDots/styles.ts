import {StyleSheet} from 'react-native';
import {scale} from '@utils/Helpers';
import Colors from '@theme/Colors';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    width: scale(6),
    height: scale(6),
    borderRadius: 4,
    backgroundColor: Colors.gray['100'],
    marginHorizontal: 5,
  },
  activeDot: {
    width: 28,
    height: 6,
    backgroundColor: Colors.primary.base,
  },
});

export default styles;
