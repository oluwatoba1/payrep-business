import {View} from 'react-native';
import {MainLayout} from '../../../../components/Layout';
import {mainSavingsStyles} from '../styles';
import {Typography} from '../../../../components/Forms';
import SavingsCard from '../../../../components/Cards/SavingsCard';
import {SavingsStackParamList} from '../../../../navigation/types';
import {StackScreenProps} from '@react-navigation/stack';
import {Transactions} from '@components/Miscellaneous';

type SavingsScreenProps = StackScreenProps<SavingsStackParamList>;

interface ITransaction {
  id: string;
  type: string;
  source: string;
  destination: string;
  date: string;
  status: STATUSES;
  amount: string;
}
const transactionsData: ITransaction[] = [
  {
    id: '092320',
    type: 'credit',
    source: 'Temitope Lawal',
    destination: 'Oluwatoba Fola',
    date: '18/12/2023',
    status: 'pending',
    amount: '350000',
  },
  {
    id: '092310',
    type: 'debit',
    source: 'Musa',
    destination: 'Junaid',
    date: '18/05/2024',
    status: 'successful',
    amount: '35000',
  },
  {
    id: '092350',
    type: 'debit',
    source: 'Musa',
    destination: 'Junaid',
    date: '18/05/2024',
    status: 'failed',
    amount: '700000',
  },
  {
    id: '092360',
    type: 'debit',
    source: 'Musa',
    destination: 'Junaid',
    date: '18/05/2024',
    status: 'successful',
    amount: '59000',
  },
  {
    id: '092315',
    type: 'debit',
    source: 'Musa',
    destination: 'Junaid',
    date: '18/05/2024',
    status: 'pending',
    amount: '5000',
  },
  {
    id: '092318',
    type: 'debit',
    source: 'Musa',
    destination: 'Junaid',
    date: '18/05/2024',
    status: 'failed',
    amount: '35000',
  },
  {
    id: '092316',
    type: 'debit',
    source: 'Musa',
    destination: 'Junaid',
    date: '18/05/2024',
    status: 'successful',
    amount: '35000',
  },
  {
    id: '092314',
    type: 'debit',
    source: 'Musa',
    destination: 'Junaid',
    date: '18/05/2024',
    status: 'pending',
    amount: '35000',
  },
  {
    id: '092313',
    type: 'debit',
    source: 'Musa',
    destination: 'Junaid',
    date: '18/05/2024',
    status: 'failed',
    amount: '35000',
  },
  {
    id: '092312',
    type: 'debit',
    source: 'Musa',
    destination: 'Junaid',
    date: '18/05/2024',
    status: 'failed',
    amount: '35000',
  },
];

export default function TotalSavings({
  navigation: {navigate, goBack},
}: SavingsScreenProps) {
  const handleNavigateWithdrawList = () => {
    navigate('WithdrawSavingsListsScreen');
  };

  const handleReceiptNavigate = () => {
    navigate('SavingsReceiptScreen', {
      id: '012883778272993939393930090',
      type: 'credit',
      source: 'SourceAccount',
      destination: 'DestinationAccount',
      date: '18/12/2023',
      status: 'successful',
      amount: '22000',
    });
  };

  return (
    <MainLayout backAction={() => goBack()}>
      <View style={[mainSavingsStyles.container, {flexGrow: 1}]}>
        <View style={mainSavingsStyles.titleContainer}>
          <Typography title="Total Savings 🎉" type="heading4-sb" />
          <Typography
            title="Kick off your savings journey and tailor them to match your goals and preferences."
            type="body-r"
          />
        </View>
        <View style={{flex: 0.3}}>
          <SavingsCard
            totalSavings="N489,000"
            onWithdraw={handleNavigateWithdrawList}
            showWithdrawButton={true}
            showProgressBar={false}
            showImage={false}
            cardTitle="Total Savings"
          />
        </View>
        <View style={{flex: 1}}>
          <Transactions
            transactions={transactionsData}
            title="Transaction History"
            onItemPress={handleReceiptNavigate}
          />
        </View>
      </View>
    </MainLayout>
  );
}
