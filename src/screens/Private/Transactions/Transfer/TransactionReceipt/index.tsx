import {StackScreenProps} from '@react-navigation/stack';
import {CompositeScreenProps, useNavigation} from '@react-navigation/native';
import {
  BottomTabNavigationProp,
  BottomTabScreenProps,
} from '@react-navigation/bottom-tabs';

import {MainLayout} from '@components/Layout';
import {BottomTabParamList, TransferStackParamList} from '@navigation/types';
import {useAppSelector} from '@store/hooks';
import {Receipt} from '@components/Miscellaneous';

type TransactionReceiptProps = StackScreenProps<
  TransferStackParamList,
  'TransactionReceipt'
>;

export default function TransactionReceipt({
  navigation: {goBack},
}: TransactionReceiptProps) {
  const {reset} = useNavigation<BottomTabNavigationProp<BottomTabParamList>>();

  const selectedTransaction = useAppSelector(
    state => state.account.selectedTransaction,
  );

  const handleNavigation = () => {
    reset({
      index: 0,
      routes: [
        {
          name: 'Home',
          state: {
            index: 0,
            routes: [{name: 'Dashboard'}],
          },
        },
      ],
    });
  };

  return (
    <MainLayout showHeader={false}>
      <Receipt
        selectedTransaction={selectedTransaction}
        homeAction={() =>
          selectedTransaction?.txn_status ? handleNavigation() : goBack()
        }
      />
    </MainLayout>
  );
}
