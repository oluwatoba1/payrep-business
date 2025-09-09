import { StackNavigationProp } from "@react-navigation/stack";
import { ScrollView } from "react-native";
import { mainWalletStyles } from "../mainWalletStyles";
import { WalletStackParamList } from "../../../../navigation/types";
import { MainLayout } from "../../../../components/Layout";
import Pad from "../../../../components/Pad";
import { Typography } from "../../../../components/Forms";
import { AccountDetailsCard, TransactionsCard } from "../../../../components/Cards";

type WalletHomeScreenNavigationProp = StackNavigationProp<WalletStackParamList, 'WalletHomeScreen'>;

interface ITransaction {
    id: string;
    type: string;
    source: string;
    destination: string;
    date: string;
    status: STATUSES;
    amount: string;
  }
  
  
interface WalletHomeScreenProps {
    navigation: WalletHomeScreenNavigationProp;
  }





export default function WalletHome ({navigation} : WalletHomeScreenProps) {

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
      id: '092310',
      type: 'debit',
      source: 'Musa',
      destination: 'Junaid',
      date: '18/05/2024',
      status: 'successful',
      amount: '35000',
    },
    {
      id: '092310',
      type: 'debit',
      source: 'Musa',
      destination: 'Junaid',
      date: '18/05/2024',
      status: 'successful',
      amount: '3500',
    },
    {
      id: '092010',
      type: 'debit',
      source: 'Musa',
      destination: 'Junaid',
      date: '18/05/2024',
      status: 'successful',
      amount: '6000',
    },
    
  ];
  const trimmedTransactions = transactionsData.slice(0, 5);
    const actions = ['01', '02', '03', '04'];
    const User = {
        id: '101',
        name: 'Muhammad',
        acctNumber: '2260173542',
        walletBalance: '570,000.96',
        earnings: {
          commission: 'N100,000',
          terminals: '50',
          bonus: 'N10,000',
        },
      };

      
    return (
        <MainLayout backAction={() => {}}>
            <ScrollView style={mainWalletStyles.container}>
                <Typography title="My Wallet" />
                <Pad size={24} />
                <AccountDetailsCard
                    acctNumber={User.acctNumber}
                    walletBalance={User.walletBalance}
                    actionIds={actions}
                />
                <Pad size={24} />
                <TransactionsCard headerTitle="Recent Transactions" transactions={trimmedTransactions} />
            </ScrollView>
        </MainLayout>
    )
}