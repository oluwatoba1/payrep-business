import {TransactionReceipt} from '../../../../components';
import {StackNavigationProp} from '@react-navigation/stack';
import {SavingsStackParamList} from '../../../../navigation/types';
import {RouteProp} from '@react-navigation/native';
import {MainLayout} from '../../../../components/Layout';
import {View} from 'react-native';

type TransactionReceiptScreenNavigationProp =
  StackNavigationProp<SavingsStackParamList>;

type TransactionReceiptScreenRouteProp = RouteProp<
  SavingsStackParamList,
  'SavingsReceiptScreen'
>;

interface TransactionReceiptScreenProps {
  navigation: TransactionReceiptScreenNavigationProp;
  route: TransactionReceiptScreenRouteProp;
}

export default function SavingsReceipt({
  navigation: {navigate},
  route: {params},
}: TransactionReceiptScreenProps) {
  return (
    <MainLayout backAction={() => {}} showHeader={false}>
      <View />
    </MainLayout>
  );
}
