import {StackScreenProps} from '@react-navigation/stack';
import {CompositeScreenProps, useNavigation} from '@react-navigation/native';
import {
  BottomTabNavigationProp,
  BottomTabScreenProps,
} from '@react-navigation/bottom-tabs';

import {MainLayout} from '@components/Layout';
import {BillsStackParamList, BottomTabParamList} from '@navigation/types';
import {useAppDispatch, useAppSelector} from '@store/hooks';
import {Receipt} from '@components/Miscellaneous';
import {setPurchaseRequest} from '@store/slices/billSlice';

type BillReceiptProps = CompositeScreenProps<
  StackScreenProps<BillsStackParamList, 'BillReceipt'>,
  BottomTabScreenProps<BottomTabParamList, 'Home'>
>;

export default function BillReceipt({}: BillReceiptProps) {
  const dispatch = useAppDispatch();
  const selectedTransaction = useAppSelector(
    state => state.account.selectedTransaction,
  );

  const {reset} = useNavigation<BottomTabNavigationProp<BottomTabParamList>>();

  const handleNavigateToHome = () => {
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

    dispatch(setPurchaseRequest({}));
  };

  return (
    <MainLayout backAction={handleNavigateToHome} showHeader={false}>
      <Receipt
        selectedTransaction={selectedTransaction}
        homeAction={handleNavigateToHome}
      />
    </MainLayout>
  );
}
