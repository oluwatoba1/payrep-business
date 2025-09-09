import {useCallback, useEffect, useState} from 'react';
import {BackHandler, View} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {useFocusEffect, useNavigation} from '@react-navigation/native';

import {MainLayout} from '@components/Layout';
import styles from './styles';
import {Typography} from '@components/Forms';
import {CustomTabs, Statement, Transactions} from '@components/Miscellaneous';
import Colors from '@theme/Colors';
import Pad from '@components/Pad';
import {AccountDetailsCard} from '@components/Cards';
import {useGetTransactionsMutation} from '@store/apis/accountApi';
import {setTransactions} from '@store/slices/transactionSlice';
import useToast from '@hooks/useToast';
import {useAppDispatch, useAppSelector} from '@store/hooks';
import {DEFAULT_ERROR_MESSAGE} from '@utils/Constants';
import {BottomTabParamList, TransactionStackParamList} from '@navigation/types';
import {addCommas, formatDateForFilter} from '@utils/Helpers';
import {AccountsModal} from '@components/Modal';
import {
  setSelectedAccount,
  setSelectedTransaction,
} from '@store/slices/accountSlice';
import useStatementFormValidation from './validator';
import {useGenerateStatementMutation} from '@store/apis/reportApi';

type TransactionHistoryProps = StackScreenProps<
  TransactionStackParamList,
  'TransactionHistory'
>;

export default function TransactionHistory({
  navigation,
}: TransactionHistoryProps) {
  const dispatch = useAppDispatch();
  const {showToast} = useToast();

  const accounts = useAppSelector(state => state.account.accounts);
  const selectedAccount = useAppSelector(
    state => state.account.selectedAccount,
  );
  const transactionsData =
    useAppSelector(state => state.transactions.transactions) || [];
  const email = useAppSelector(state => state.customer.customer?.email) || '';

  // API
  const [generateStatement, {isLoading}] = useGenerateStatementMutation();
  const [getTransactions, {isLoading: isLoadingTransactions}] =
    useGetTransactionsMutation();

  // VALIDATION
  const {formData, formErrors, validateForm, onChange} =
    useStatementFormValidation(email);

  // STATES
  const [showAccountsModal, setShowAccountsModal] = useState(false);
  const [filters, setFilters] = useState<{
    startDate?: string;
    endDate?: string;
  }>({});

  const {reset} = useNavigation<BottomTabNavigationProp<BottomTabParamList>>();

  const handleFilterChange = (newFilters: Record<string, any>) => {
    setFilters(prev => {
      const updatedFilters = {...prev, ...newFilters};

      const {startDate, endDate, ...restFilters} = updatedFilters;
      const start_date = formatDateForFilter(
        startDate ? new Date(startDate) : undefined,
      );
      const end_date = formatDateForFilter(
        endDate ? new Date(endDate) : undefined,
      );

      if (selectedAccount) {
        fetchTransactions({
          account: selectedAccount.id,
          start_date,
          end_date,
          ...restFilters,
        });
      }

      return updatedFilters;
    });
  };

  const fetchTransactions = async (params: ITransactionQueryParams) => {
    try {
      const {status, message, data} = await getTransactions(params).unwrap();

      if (status) {
        // TODO: REMOVE DISPATCH, TRANSACTIONS CAN BE ACCESSED IN THE SCREEN STATE
        dispatch(setTransactions(data));
      } else {
        showToast('danger', message);
      }
    } catch (error: ErrorResponse | any) {
      showToast(
        'danger',
        error.data?.message || error.message || DEFAULT_ERROR_MESSAGE,
      );
    }
  };

  const navigateToHome = () => {
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
    return true;
  };

  const handleReceipt = (transaction: ITransaction) => {
    dispatch(setSelectedTransaction(transaction));

    navigation.navigate('TransactionReceipt');
  };

  const statementGeneration = async () => {
    try {
      const {status, message} = await generateStatement({
        name: formData.name,
        account: formData.account,
        start_date: formData.startDate,
        end_date: formData.endDate,
        email: formData.email,
        format: formData.format,
        signed: formData.signed,
      }).unwrap();

      showToast(status ? 'success' : 'danger', message);
    } catch (error: ErrorResponse | any) {
      showToast(
        'danger',
        error.data?.message || error.message || DEFAULT_ERROR_MESSAGE,
      );
    }
  };

  useEffect(() => {
    if (selectedAccount) {
      onChange('account', selectedAccount.id);
      fetchTransactions({
        count: 100,
        account: selectedAccount.id,
      });
    }
  }, [selectedAccount]);

  const tabs = [
    {
      title: 'History',
      component: Transactions,
      props: {
        transactions: transactionsData,
        onItemPress: (transaction: ITransaction) => handleReceipt(transaction),
      },
    },
    {
      title: 'Statement',
      component: Statement,
      props: {
        formData,
        formErrors,
        onChange,
        action: () => validateForm(statementGeneration),
      },
    },
  ];

  useFocusEffect(
    useCallback(() => {
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        navigateToHome,
      );

      return () => backHandler.remove(); // Cleanup
    }, []),
  );

  return (
    <MainLayout
      backAction={navigateToHome}
      backgroundColor={Colors.appBackground}
      isLoading={isLoadingTransactions || isLoading}>
      <AccountsModal
        showModal={showAccountsModal}
        onClose={() => setShowAccountsModal(false)}
        onAccountSelect={account => dispatch(setSelectedAccount(account))}
        accounts={accounts}
      />
      <View style={styles.container}>
        <Typography title="Transactions" type="heading5-sb" />
        <Pad size={13} />
        <AccountDetailsCard
          accountNumber={selectedAccount?.account_number || '---'}
          accountName={selectedAccount?.account_name || '---'}
          walletBalance={addCommas(selectedAccount?.balance || '0.00')}
          showDetails={true}
          showAccountModalOnPress={() => setShowAccountsModal(true)}
        />
        <Pad />
        <CustomTabs
          tabs={tabs}
          screen="transactions"
          onFilterHandle={handleFilterChange}
        />
      </View>
    </MainLayout>
  );
}
