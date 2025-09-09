import {useCallback, useState} from 'react';
import {View} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';

import {MainLayout} from '@components/Layout';
import {Button, Typography} from '@components/Forms';
import {BillsStackParamList} from '@navigation/types';
import {useAppDispatch, useAppSelector} from '@store/hooks';
import PinInputModal from '@components/Modal/PinInputModal';
import RetryPinModal from '@components/Modal/RetryModal';
import {addCommas, formatValue, removeCommas} from '@utils/Helpers';
import useToast from '@hooks/useToast';
import {useBankTransferMutation} from '@store/apis/transferApi';
import {useGetTransactionsMutation} from '@store/apis/accountApi';
import {DEFAULT_ERROR_MESSAGE} from '@utils/Constants';
import {setTransactions} from '@store/slices/accountSlice';
import {setTransferResponse} from '@store/slices/transferSlice';
import styles from './styles';
import {
  useBillPurchaseMutation,
  useMeterPurchaseMutation,
} from '@store/apis/billsApi';
import {setPurchaseResponse} from '@store/slices/billSlice';
import DeviceInfo from 'react-native-device-info';

type ConfirmBillsProps = StackScreenProps<BillsStackParamList, 'ConfirmBills'>;

export default function ConfirmBills({
  navigation: {navigate},
}: ConfirmBillsProps) {
  const dispatch = useAppDispatch();
  const {showToast} = useToast();
  const selectedAccount = useAppSelector(
    state => state.account.selectedAccount,
  );
  const vasCategoryService = useAppSelector(
    state => state.service.vasCategoryService,
  );

  const purchaseRequest = useAppSelector(state => state.bills.purchaseRequest);

  const [getTransactions, {isLoading: isLoadingTransactions}] =
    useGetTransactionsMutation();
  const [billPurchase, {isLoading: isProcessingBill}] =
    useBillPurchaseMutation();

  // states
  const [pinModalVisible, setPinModalVisible] = useState<boolean>(false);
  const [isValidating, setIsValidating] = useState<boolean>(false);

  // handles
  const handlePinValidation = async (enteredPin: string): Promise<boolean> => {
    setIsValidating(true);

    try {
      const {status, message, data} = await billPurchase({
        ...purchaseRequest,
        pin: enteredPin,
      }).unwrap();

      if (status && data && data.txn_status === 'successful') {
        fetchTransactions(data);
        return true;
      } else {
        showToast('danger', message);
        return false;
      }
    } catch (error: ErrorResponse | any) {
      showToast(
        'danger',
        error.data?.message || error.message || DEFAULT_ERROR_MESSAGE,
      );
      return false;
    } finally {
      setPinModalVisible(false);
      setIsValidating(false);
    }
  };

  const fetchTransactions = async (purchaseResponse: IBillPurchaseResponse) => {
    try {
      const {status, message, data} = await getTransactions({
        count: 50,
        account: selectedAccount?.id || '',
      }).unwrap();

      if (status) {
        dispatch(setTransactions(data));
      } else {
        showToast('danger', message);
      }
    } catch (error: ErrorResponse | any) {
      showToast(
        'danger',
        error.data?.message || error.message || DEFAULT_ERROR_MESSAGE,
      );
    } finally {
      dispatch(setPurchaseResponse(purchaseResponse));
      navigate('BillSuccess');
    }
  };

  return (
    <MainLayout
      backAction={() => {}}
      keyboardAvoidingType="scroll-view"
      isLoading={isProcessingBill || isValidating || isLoadingTransactions}>
      <PinInputModal
        title="Enter your four digit PIN"
        showModal={pinModalVisible}
        onClose={() => setPinModalVisible(false)}
        onProceed={handlePinValidation}
        isLoadingPin={isValidating}
      />

      <View>
        <Typography title="Transaction Confirmation" />
      </View>
      <View style={styles.transactionDetailsContainer}>
        <Typography title="Recipient" type="label-r" />
        <Typography
          title={`${
            purchaseRequest.meter_number ||
            purchaseRequest.smartcard_number ||
            purchaseRequest.mobile_number
          }${
            !!purchaseRequest.customer_name || !!purchaseRequest.meter_name
              ? ` - ${
                  purchaseRequest.customer_name || purchaseRequest.meter_name
                }`
              : ''
          }`}
          type="body-sb"
        />
      </View>
      <View style={styles.detailItem}>
        <Typography title="Service" type="label-r" />
        <Typography title={`${vasCategoryService?.name}`} type="body-sb" />
      </View>
      <View style={styles.detailItem}>
        <Typography title="Narration" type="label-r" />
        <Typography title={`${purchaseRequest.remarks || ''}`} type="body-sb" />
      </View>
      <View style={styles.amountDetailsContainer}>
        <View style={styles.amountRow}>
          <Typography title="Amount" type="label-r" />
          <Typography
            title={`₦${addCommas(purchaseRequest.amount || 0)}`}
            type="label-sb"
          />
        </View>
        <View style={styles.amountRow}>
          <Typography title="Debt" type="label-r" />
          <Typography
            title={`₦${addCommas(purchaseRequest.debt || 0)}`}
            type="label-sb"
          />
        </View>
      </View>

      <Button title="Pay now" onPress={() => setPinModalVisible(true)} />
    </MainLayout>
  );
}
