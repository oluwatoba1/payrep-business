import {scale, scaleHeight} from '@utils/Helpers';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  buttonContainer: {
    paddingHorizontal: scale(10),
    paddingVertical: scaleHeight(30),
  },
});

export default styles;
