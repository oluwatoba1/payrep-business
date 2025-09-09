import {StyleSheet} from 'react-native';

// Local
import {scale, scaleHeight} from '@utils/Helpers';
import {HEADER_CONTAINER_HEIGHT} from '@utils/Constants';

const styles = StyleSheet.create({
  headerContainer: {
    height: scaleHeight(HEADER_CONTAINER_HEIGHT),
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: scaleHeight(10),
  },
  backIcon: {
    width: scale(24),
    height: scale(24),
    resizeMode: 'contain',
  },
  textButtonContainer: {
    paddingHorizontal: scale(26),
  },
});

export default styles;
