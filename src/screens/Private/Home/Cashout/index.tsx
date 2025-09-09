import {useCallback, useEffect, useState} from 'react';
import {View} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import {useFocusEffect} from '@react-navigation/native';

import {Button, TextInput, Typography} from '@components/Forms';
import {MainLayout} from '@components/Layout';
import Pad from '@components/Pad';
import {
  addCommas,
  moderateScale,
  removeCommas,
  scaleHeight,
} from '@utils/Helpers';
import Colors from '@theme/Colors';
import styles from './styles';
import {HomeStackParamList} from '@navigation/types';
import {useAppDispatch, useAppSelector} from '@store/hooks';
import useToast from '@hooks/useToast';
import {useGetAccountsMutation} from '@store/apis/accountApi';
import {
  setAccounts,
  setCashoutRequest,
  setSelectedAccount,
} from '@store/slices/accountSlice';
import {DEFAULT_ERROR_MESSAGE, shimmerDelay} from '@utils/Constants';
import AccountsModal from '@components/Modal/AccountsModal';
import {BonusBalanceCard, CommissionsBalanceCard} from '@components/Cards';
import useCashoutFormValidation from './validator';

type CashoutProps = StackScreenProps<HomeStackParamList, 'Cashout'>;

export default function Cashout({
  navigation: {navigate, goBack},
}: CashoutProps) {
  const dispatch = useAppDispatch();
  const {showToast} = useToast();

  const {formData, setAmount, validateForm} = useCashoutFormValidation();

  const customer = useAppSelector(state => state.customer.customer);
  const {selectedAccount, cashoutRequest} = useAppSelector(
    state => state.account,
  );
  const {accounts} = useAppSelector(state => state.account);
  const [getAccounts, {isLoading: isLoadingAccounts}] =
    useGetAccountsMutation();

  const [showAccountsModal, setShowAccountsModal] = useState<boolean>(false);

  const fetchAccounts = async () => {
    try {
      const {status, message, data} = await getAccounts({
        customer: customer?.id || '',
      }).unwrap();

      if (status) {
        dispatch(setAccounts(data));
        const primaryAccount =
          data.find(account => account.account_class === 'primary') || null;
        dispatch(setSelectedAccount(primaryAccount));
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
    selectedAccount;
  }, [selectedAccount]);

  const handleSetMaxAmount = () => {
    setAmount(selectedAccount?.commission || '');
  };
  const handleTransactionConfirmation = () => {
    const totalAmount = selectedAccount
      ? selectedAccount[cashoutRequest.type]
      : 0;
    if (formData.amount > totalAmount) {
      showToast('warning', 'Insufficient funds');
    }
    dispatch(
      setCashoutRequest({
        account: selectedAccount?.id || '',
        amount: Number(removeCommas(formData.amount)),
        type: cashoutRequest.type,
      }),
    );
    navigate('CashoutConfirmation');
  };

  const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

  useFocusEffect(
    useCallback(() => {
      customer?.id && fetchAccounts();
    }, [customer]),
  );

  return (
    <MainLayout backAction={goBack}>
      <AccountsModal
        showModal={showAccountsModal}
        onClose={() => setShowAccountsModal(false)}
        onAccountSelect={account => dispatch(setSelectedAccount(account))}
        accounts={accounts}
      />
      <View style={styles.container}>
        <Typography
          title={cashoutRequest.type.toUpperCase()}
          type="heading4-sb"
        />
        <Pad size={16} />
        <ShimmerPlaceholder
          visible={!isLoadingAccounts}
          delay={shimmerDelay}
          style={
            isLoadingAccounts
              ? {
                  borderRadius: moderateScale(8),
                  height: scaleHeight(150),
                  width: '100%',
                }
              : {}
          }>
          {cashoutRequest.type === 'commission' ? (
            <CommissionsBalanceCard
              ComissionsBalance={addCommas(
                selectedAccount?.commission || '0.00',
              )}
              showAccountModalOnPress={() => setShowAccountsModal(true)}
            />
          ) : (
            <BonusBalanceCard
              bonusBalance={addCommas(selectedAccount?.bonus || '0.00')}
              showAccountModalOnPress={() => setShowAccountsModal(true)}
            />
          )}
        </ShimmerPlaceholder>
        <Pad size={24} />

        <Typography
          title={`Withdraw ${cashoutRequest.type} to wallet`}
          type="body-sb"
          color={Colors.gray['base']}
        />

        <TextInput
          label="Enter Amount"
          leftNode="₦"
          value={formData.amount}
          onChangeText={setAmount}
        />
        <Pad />
        <Typography
          title={`Tap to withdraw total ${cashoutRequest.type}`}
          type="label-sb"
          onPress={handleSetMaxAmount}
        />

        <Pad size={50} />

        <Button
          title="Cashout"
          onPress={() => validateForm(handleTransactionConfirmation)}
        />
      </View>
    </MainLayout>
  );
}
