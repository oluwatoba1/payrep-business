import {StyleSheet} from 'react-native';
import {scale, scaleHeight} from '@utils/Helpers';
import {
  BOTTOM_TAB_CONTAINER_HEIGHT,
  MAIN_LAYOUT_HORIZONTAL_PADDING,
  width,
} from '@utils/Constants';
import Colors from '@theme/Colors';

export const styles = StyleSheet.create({
  profileContainerStyle: {
    flex: 1,
    width: width - scale(2 * MAIN_LAYOUT_HORIZONTAL_PADDING),
  },
  profileImageStyle: {
    width: scale(88),
    height: scale(88),
    borderRadius: scale(60),
    borderWidth: 2,
  },
  userDetailStyles: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: scale(16),
  },
  scrollViewContent: {
    flexGrow: 1,
    paddingBottom: scaleHeight(BOTTOM_TAB_CONTAINER_HEIGHT + 16),
  },

  modalContainer: {
    borderRadius: scaleHeight(10),
    paddingTop: scaleHeight(24),
    paddingBottom: scaleHeight(37),
    gap: scaleHeight(16),
    paddingHorizontal: scale(16),
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: scaleHeight(16),
  },
  cancelButton: {
    borderWidth: 1,
    backgroundColor: Colors.white,
    width: '50%',
  },
  logoutButton: {
    width: '50%',
  },
});
