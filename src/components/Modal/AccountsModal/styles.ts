import Colors from '@theme/Colors';
import {moderateScale, scale, scaleHeight} from '@utils/Helpers';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  itemContainer: {
    paddingVertical: scaleHeight(15),
    paddingHorizontal: scale(20),
    backgroundColor: Colors.white,
    borderRadius: moderateScale(5),
    marginVertical: scaleHeight(5),
    shadowColor: Colors.black,
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.1,
    shadowRadius: moderateScale(5),
    elevation: 5,
    borderBottomColor: Colors.gray['100'],
    width: '95%',
    alignSelf: 'center',
  },
  accountDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: scaleHeight(5),
  },
  accountClassBadge: {
    paddingVertical: scaleHeight(2),
    paddingHorizontal: scale(10),
    borderRadius: moderateScale(15),
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
