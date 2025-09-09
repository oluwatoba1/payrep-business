import {StyleSheet} from 'react-native';
import {
  MAIN_LAYOUT_HORIZONTAL_PADDING,
  width,
} from '../../../../../utils/Constants';
import {scale, scaleHeight} from '../../../../../utils/Helpers';
import Colors from '../../../../../theme/Colors';

export const styles = StyleSheet.create({
  profileContainerStyle: {
    flex: 1,
    width: width - 2 * MAIN_LAYOUT_HORIZONTAL_PADDING,
  },
  profileImageStyle: {
    width: scaleHeight(80),
    height: scaleHeight(80),
    borderRadius: scaleHeight(80),
    borderWidth: 1,
    resizeMode: 'contain',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
  },
  tabItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: 'black',
  },
  inactiveTab: {
    opacity: 0.5,
  },
  tabIconContainer: {
    // padding: 9,
    width: scale(24),
    height: scaleHeight(24),
    backgroundColor: Colors.gray[400],
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabIcon: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  tabText: {
    color: 'black',
    fontWeight: 'bold',
    marginLeft: 10,
  },
  scrollContainer: {
    paddingVertical: 20,
  },
});
