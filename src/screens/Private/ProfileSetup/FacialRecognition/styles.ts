import {StyleSheet} from 'react-native';
import Colors from '@theme/Colors';
import {scaleHeight} from '@utils/Helpers';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.gray['1000'],
    gap: scaleHeight(24),
    alignItems: 'center',
    paddingHorizontal: scaleHeight(16),
  },
  tipContainer: {
    flexDirection: 'row',
    // alignItems: 'center',
    alignItems: 'flex-start',
    marginBottom: scaleHeight(8),
    gap: scaleHeight(10),
    width: '100%',
  },
  flatListContent: {
    paddingVertical: scaleHeight(10),
  },
  cardContainer: {
    height: '50%',
  },
});
