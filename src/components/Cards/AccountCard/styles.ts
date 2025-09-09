import {StyleSheet} from 'react-native';
import Colors from '../../../theme/Colors';
import {moderateScale, scale, scaleHeight} from '../../../utils/Helpers';

export const styles = StyleSheet.create({
  accountCardContainer: {
    backgroundColor: Colors.white,
    padding: scaleHeight(12),
    borderRadius: 10,
    marginHorizontal: 16,
    marginBottom: scale(10),
    shadowColor: Colors.black,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 1,
    // borderWidth: 1

    // marginRight: 20
  },
  container: {
    backgroundColor: Colors.gray[1000]
  },
  cardTitle: {
    fontWeight: '700',
    marginBottom: 8,
  },
  accountDetailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 23,
  },
  accountDetailLabel: {
    fontWeight: '600',
    fontSize: moderateScale(12),
  },
  accountDetailValue: {
    color: Colors.gray['base'],
    fontWeight: '400',
  },
  changePhoneNumberTextColor:  {
    color: Colors.success.base
  },
  changePhoneNumberContainer: {
    alignItems:'flex-end'
  }
});
