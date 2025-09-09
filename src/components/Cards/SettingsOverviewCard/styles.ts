import {Platform, StyleSheet} from 'react-native';
import Colors from '../../../theme/Colors';

import {MAIN_LAYOUT_HORIZONTAL_PADDING, width} from '../../../utils/Constants';
import {moderateScale, scale, scaleHeight} from '../../../utils/Helpers';

export const styles = StyleSheet.create({
  container: {
    marginVertical: scaleHeight(24),
    width: width - scale(2 * MAIN_LAYOUT_HORIZONTAL_PADDING),
  },
  profileContainer: {
    backgroundColor: Colors.white,
    padding: scaleHeight(16),
    borderRadius: moderateScale(12),
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    borderWidth: Platform.OS === 'android' ? 1 : 0,
  },
  list: {
    backgroundColor: Colors.white,
    borderRadius: scaleHeight(12),
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: width - 2 * scale(MAIN_LAYOUT_HORIZONTAL_PADDING),
    padding: scaleHeight(16),
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray[300],
  },
  labelContainer: {
    width: '60%',
  },
  lastCard: {
    borderBottomWidth: 0,
  },
  icon: {
    width: scale(24),
    height: scaleHeight(24),
    marginRight: scale(16),
  },
  textContainer: {
    flex: 1,
  },
  subText: {
    fontSize: moderateScale(12),
    marginTop: scaleHeight(4),
  },
});
