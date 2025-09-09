import {StyleSheet} from 'react-native';
import Colors from '../../../theme/Colors';
import {scale} from '../../../utils/Helpers';

const styles = StyleSheet.create({
  cardContainer: {
    zIndex: 10,
    width: scale(375),
    height: scale(344),
    backgroundColor: Colors.white,
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    justifyContent: 'flex-start',
    position: 'relative',
  },
  cardImage: {
    width: 238,
    height: 232,
    alignSelf: 'center',
    position: 'absolute',
    top: -220,
    paddingBottom: 200,
  },
});

export default styles;
