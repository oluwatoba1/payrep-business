import Colors from '@theme/Colors';
import {scaleHeight} from '@utils/Helpers';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  optionContainer: {
    textTransform: 'uppercase',
    paddingVertical: scaleHeight(10),
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray['100'],
  },
});

export default styles;
