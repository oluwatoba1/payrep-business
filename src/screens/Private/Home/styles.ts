import {StyleSheet} from 'react-native';
import {scale, scaleHeight} from '../../../utils/Helpers';
import Colors from '../../../theme/Colors';
import {
  BOTTOM_TAB_CONTAINER_HEIGHT,
  height,
  MAIN_LAYOUT_HORIZONTAL_PADDING,
  width,
} from '../../../utils/Constants';

export const mainHomeStyles = StyleSheet.create({
  container: {
    width: width - scale(2 * MAIN_LAYOUT_HORIZONTAL_PADDING),
    height: height - scale(2 * MAIN_LAYOUT_HORIZONTAL_PADDING),
  },
  buttonContainer: {
    bottom: scaleHeight(BOTTOM_TAB_CONTAINER_HEIGHT * -2),
    position: 'absolute',
    left: 0,
    right: 0,
  },
  btn: {
    position: 'absolute',
    bottom: scaleHeight(BOTTOM_TAB_CONTAINER_HEIGHT * 1.2),
    // justifyContent: 'flex-end',
    alignSelf: 'center',
    width: '100%',
    flex: 0.5,
  },
  doubleUserIcon: {
    width: scale(16),
    height: scaleHeight(16),
  },
  doubleUserTeamContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(4),
    alignSelf: 'flex-end',
    marginBottom: scaleHeight(-10),
  },
  cardContainer: {
    marginTop: scaleHeight(16),
    marginBottom: scaleHeight(24),
  },
  beneficiaryCardContainer: {
    position: 'relative',
    gap: 8,
  },
  validate: {
    position: 'absolute',
    top: scaleHeight(30),
    right: scale(20),
    backgroundColor: Colors.primary[200],
    borderRadius: 100,
    padding: scaleHeight(2),
  },
  inputGroup: {
    gap: 24,
  },
  titleContainer: {
    marginVertical: scaleHeight(16),
  },
});
