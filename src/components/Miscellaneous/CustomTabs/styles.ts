import {StyleSheet} from 'react-native';
import {scale, scaleHeight} from '../../../utils/Helpers';
import Colors from '../../../theme/Colors';
import {width, MAIN_LAYOUT_HORIZONTAL_PADDING} from '../../../utils/Constants';

const styles = StyleSheet.create({
  container: {
    width: width - scale(2 * MAIN_LAYOUT_HORIZONTAL_PADDING),
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.gray[50],
    padding: scaleHeight(4),
    borderRadius: scaleHeight(24),
    gap: scaleHeight(4),
    flex: 1,
  },
  tab: {
    // flex: 1,
    paddingVertical: scaleHeight(6),
    paddingHorizontal: scale(12),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: scaleHeight(24),
    width: 'auto',
    flex: 1,
  },
  activeTab: {
    backgroundColor: Colors.primary['base'],
  },
  tabText: {
    color: Colors.gray['base'],
  },
  activeTabText: {
    color: Colors.white,
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'flex-start',
    gap: scale(10),
  },
  filterContainer: {
    paddingHorizontal: scale(4),
    paddingVertical: scaleHeight(4),
    justifyContent: 'center',
    marginVertical: scaleHeight(8),
  },
  filterIcon: {
    width: scale(16),
    height: scaleHeight(16),
    justifyContent: 'center',
    alignItems: 'center',
  },
  filter: {
    flexDirection: 'row',
    gap: scale(4),
    alignItems: 'center',
  },
});

export default styles;
