import {useState} from 'react';
import {View} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';

import {MainLayout} from '@components/Layout';
import {Button, Typography} from '@components/Forms';
import Pad from '@components/Pad';
import Colors from '@theme/Colors';
import PinPad from '@components/Forms/PinPad';
import {useAppDispatch, useAppSelector} from '@store/hooks';
import {useCashoutMutation} from '@store/apis/accountApi';
import useToast from '@hooks/useToast';
import {DEFAULT_ERROR_MESSAGE} from '@utils/Constants';
import {addCommas} from '@utils/Helpers';
import {HomeStackParamList} from '@navigation/types';
import styles from './styles';
import {setCashoutRequest} from '@store/slices/accountSlice';

type CashoutConfirmationProps = StackScreenProps<
  HomeStackParamList,
  'CashoutConfirmation'
>;

export default function CashoutConfirmation({
  navigation: {reset},
}: CashoutConfirmationProps) {
  const dispatch = useAppDispatch();
  const {showToast} = useToast();

  const [cashout, {isLoading}] = useCashoutMutation();
  const {selectedAccount, cashoutRequest} = useAppSelector(
    state => state.account,
  );

  const [pin, setPin] = useState<string>('');

  const proceed = async () => {
    try {
      const {status, message} = await cashout({
        ...cashoutRequest,
        pin,
      }).unwrap();

      if (status) {
        showToast('success', message);
        reset({
          index: 0,
          routes: [
            {
              name: 'Dashboard',
            },
          ],
        });
        dispatch(
          setCashoutRequest({
            account: '',
            amount: 0,
            type: 'commission',
          }),
        );
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

  return (
    <MainLayout isLoading={isLoading} backAction={() => null}>
      <View style={styles.container}>
        <Typography title="Transaction Confirmation" type="heading-sb" />
        <Pad size={16} />
        <View style={styles.detailsContainer}>
          <Typography
            title={cashoutRequest.type.toUpperCase()}
            type="label-r"
            color={Colors.gray['base']}
          />
          <Typography
            title={
              selectedAccount
                ? `${selectedAccount.account_name} - ${selectedAccount.account_number}`
                : ''
            }
            type="body-sb"
          />
        </View>
        <Pad size={16} />
        <View style={styles.amountContainer}>
          <View style={styles.withdrawalDetails}>
            <Typography title="Amount" type="label-r" />
            <Typography
              title={`₦${addCommas(cashoutRequest.amount, false)}`}
              type="label-sb"
            />
          </View>
        </View>
        <Pad size={100} />
        <View style={styles.pinArea}>
          <Typography title="Enter your Four Digit PIN " />
          <PinPad pin={pin} onInput={setPin} error="" />
        </View>
        <View style={styles.btn}>
          <Button title="Complete Transaction" onPress={proceed} />
        </View>
      </View>
    </MainLayout>
  );
}
