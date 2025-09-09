import {StyleSheet} from 'react-native';
import Colors from '../../../../theme/Colors';
import {BOTTOM_TAB_CONTAINER_HEIGHT} from '../../../../utils/Constants';
import {moderateScale, scale, scaleHeight} from '../../../../utils/Helpers';

export const styles = StyleSheet.create({
  cardContainer: {
    padding: scaleHeight(16),
    shadowColor: Colors.black,
    shadowOffset: {width: scale(0), height: scaleHeight(2)},
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 2,
    marginVertical: scaleHeight(10),
    borderRadius: scaleHeight(8),
    backgroundColor: Colors.white,
    maxHeight: scaleHeight(500),
    borderWidth: 1,
  },
  cardContent: {
    gap: scaleHeight(16),
  },
  limitContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: scaleHeight(12),
    paddingRight: scale(16),
  },
  limitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'black',
    paddingVertical: scaleHeight(4),
    paddingHorizontal: scale(12),
    borderRadius: scaleHeight(4),
    width: '50%',
    justifyContent: 'center',
  },
  limitText: {
    color: Colors.white,
  },
  userCardContainer: {
    marginBottom: scaleHeight(24),
  },
});
