import {StyleSheet} from 'react-native';
import Colors from '../../../theme/Colors';

export const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    position: 'relative',
    flex: 1,
  },
  cardContainer: {
    backgroundColor: Colors.cardColor.blue[100],
    padding: 16,
    borderRadius: 10,
  },
  contentContainer: {
    gap: 48,
  },
  textWhite: {
    color: 'white',
  },
  savingsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  savingsAmountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  icon: {
    width: 30,
    height: 30,
  },
  withdrawButton: {
    backgroundColor: '#00387A',
    borderRadius: 40,
    paddingVertical: 4,
    paddingHorizontal: 16,
    gap: 4,
  },
  progressBarContainer: {
    width: 200,
  },
  progressBar: {
    backgroundColor: '#CCE3FF',
  },
  progressBarBackground: {
    backgroundColor: '#00387A',
  },
  moneyImage: {
    width: 80,
    height: 80,
    position: 'absolute',
    right: 0,
    bottom: 12,
  },
});
