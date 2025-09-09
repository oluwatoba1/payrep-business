import {useEffect, useState} from 'react';
import {Image, Pressable, View} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';

import {EarningsCard} from '@components/Cards';
import {Typography} from '@components/Forms';
import {MainLayout} from '@components/Layout';
import Pad from '@components/Pad';
import IconImages from '@assets/images/appIcons';
import {addCommas, scale} from '@utils/Helpers';
import Colors from '@theme/Colors';
import FilterModal from '@components/Modal/FilterModal';
import {HomeStackParamList} from '@navigation/types';
import styles from './styles';
import {useAppDispatch, useAppSelector} from '@store/hooks';
import {useGetTransactionsMutation} from '@store/apis/accountApi';
import useToast from '@hooks/useToast';
import {DEFAULT_ERROR_MESSAGE} from '@utils/Constants';
import {Transactions} from '@components/Miscellaneous';
import {setCashoutRequest} from '@store/slices/accountSlice';

interface IEarningsData {
  id: string;
  title: string;
  cardType: 'commission' | 'bonus';
  action: () => void;
}

type EarningsProps = StackScreenProps<HomeStackParamList, 'Earnings'>;

export default function Earnings({
  navigation: {navigate, goBack},
}: EarningsProps) {
  const dispatch = useAppDispatch();
  const {showToast} = useToast();

  const account = useAppSelector(state => state.account?.selectedAccount);
  const [getTransactions] = useGetTransactionsMutation();

  const [isFilterHidden, setIsFilterHidden] = useState(false);
  const [withdrawals, setWithdrawals] = useState<ITransaction[]>([]);

  const toggleFilterVisibility = () => {
    setIsFilterHidden(!isFilterHidden);
  };

  const User = {
    id: '',
    earnings: {
      commission: addCommas(account?.commission || 0),
      bonus: addCommas(account?.bonus || 0),
    },
  };

  const earningsData: IEarningsData[] = [
    {
      id: 'commission',
      title: 'Commission',
      cardType: 'commission',
      action: () => {
        dispatch(
          setCashoutRequest({
            account: account?.id || '',
            amount: 0,
            type: 'commission',
          }),
        );
        navigate('Cashout');
      },
    },
    {
      id: 'bonus',
      title: 'Bonus',
      cardType: 'bonus',
      action: () => {
        dispatch(
          setCashoutRequest({
            account: account?.id || '',
            amount: 0,
            type: 'bonus',
          }),
        );
        navigate('Cashout');
      },
    },
  ];

  const fetchTransactions = async () => {
    try {
      const {status, message, data} = await getTransactions({
        count: 50,
        account: account?.id || '',
        service_code: 'cash01',
      }).unwrap();

      if (status) {
        setWithdrawals(data);
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

  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <MainLayout backAction={goBack}>
      <FilterModal
        showModal={isFilterHidden}
        onClose={() => setIsFilterHidden(false)}
        title="Filter Transaction"
      />
      <View style={styles.container}>
        <Typography title="Earnings" />
        <Pad size={16} />
        <EarningsCard earnings={User.earnings} earningsData={earningsData} />
        <Pad size={24} />
        <View style={styles.filterArea}>
          <Typography title="My Withdrawals" type="subheading-sb" />

          <View style={styles.filterContainer}>
            <Pressable
              style={{
                flexDirection: 'row',
                gap: scale(4),
                alignItems: 'center',
              }}
              onPress={toggleFilterVisibility}>
              <Image
                source={IconImages.icon.filter}
                style={styles.filterIcon}
              />
              <Typography
                title="Filter"
                type="body-b"
                color={Colors.gray['600']}
              />
            </Pressable>
          </View>
        </View>
        <Pad size={12} />

        <Transactions transactions={withdrawals} />
      </View>
    </MainLayout>
  );
}
