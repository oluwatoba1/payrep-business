import React, {useCallback, useState} from 'react';
import {BackHandler} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';
import {
  BottomTabNavigationProp,
} from '@react-navigation/bottom-tabs';

import {
  BottomTabParamList,
  TransferStackParamList,
} from '@navigation/types';
import {SuccessMessage} from '@components/Miscellaneous';
import AddBeneficiaryModal from '@components/Modal/AddBeneficiaryModal';
import {useAppSelector} from '@store/hooks';
import {MainLayout} from '@components/Layout';
import {useAddCustomerBeneficiaryMutation} from '@store/apis/transferApi';
import useToast from '@hooks/useToast';
import {DEFAULT_ERROR_MESSAGE} from '@utils/Constants';

type TransactionSuccessProps = StackScreenProps<TransferStackParamList, 'TransactionSuccess'>;

export default function TransactionSuccess({
  navigation: {navigate},
}: TransactionSuccessProps) {
  const {reset} = useNavigation<BottomTabNavigationProp<BottomTabParamList>>();

  const transferDetails = useAppSelector(
    state => state.transfer.transferDetails,
  );
  const customerId = useAppSelector(state => state.customer.customer?.id);
  const destinationAccount = transferDetails?.destinationAccount;

  const {showToast} = useToast();

  const [addCustomerBeneficiary] = useAddCustomerBeneficiaryMutation();

  const [beneficiaryShowModal, setBeneficiaryShowModal] = useState(false);

  const handleViewReceipt = () => {
    navigate('TransactionReceipt');
  };

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
    return true;
  };

  const handleAddBeneficiary = async (beneficiaryName: string) => {
    try {
      const result = await addCustomerBeneficiary({
        name: beneficiaryName || destinationAccount?.accountName,
        customer_id: customerId,
        account_number: destinationAccount?.accountNumber,
        bank_code: destinationAccount?.bankCode,
        bank_name: destinationAccount?.bankName,
        service_code: transferDetails?.service,
      }).unwrap();

      if (result && result.status) {
        showToast('success', result.message);
      } else {
        showToast('danger', result.message);
      }
      return result;
    } catch (error: any) {
      showToast(
        'danger',
        error.data?.message || error.message || DEFAULT_ERROR_MESSAGE,
      );
      return {status: false, message: DEFAULT_ERROR_MESSAGE};
    }
  };

  useFocusEffect(
    useCallback(() => {
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        handleNavigation,
      );

      return () => backHandler.remove(); // Cleanup
    }, []),
  );

  return (
    <MainLayout showHeader={false}>
      <AddBeneficiaryModal
        showModal={beneficiaryShowModal}
        onClose={() => setBeneficiaryShowModal(false)}
        onAddBeneficiary={handleAddBeneficiary}
        destinationAccount={destinationAccount}
      />
      <SuccessMessage
        onBeneficiaryBtnPress={() => setBeneficiaryShowModal(prev => !prev)}
        showActionCards={true}
        title="Success!"
        subTitle="Transfer successful"
        onButtonPress={handleNavigation}
        showReceiptButton
        onReceiptPress={handleViewReceipt}
      />
    </MainLayout>
  );
}
