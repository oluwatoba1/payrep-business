import React, {useCallback, useState} from 'react';
import {BackHandler, Image, View} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';

import {useAppDispatch, useAppSelector} from '@store/hooks';
import {MainLayout, Row} from '@components/Layout';

import {BillsStackParamList, BottomTabParamList} from '@navigation/types';
import {Button, Typography} from '@components/Forms';
import ComponentImages from '@assets/images/components';
import styles from './styles';
import {ActionCard} from '@components/Cards';
import {setSelectedTransaction} from '@store/slices/accountSlice';

import Pad from '@components/Pad';
import {useAddCustomerBeneficiaryMutation} from '@store/apis/transferApi';
import AddBeneficiaryModal from '@components/Modal/AddBeneficiaryModal';
import useToast from '@hooks/useToast';
import {DEFAULT_ERROR_MESSAGE} from '@utils/Constants';
import {setPurchaseRequest} from '@store/slices/billSlice';

type BillStatusProps = StackScreenProps<BillsStackParamList, 'BillSuccess'>;

export default function BillSuccess({navigation: {navigate}}: BillStatusProps) {
  const {reset} = useNavigation<BottomTabNavigationProp<BottomTabParamList>>();

  const {showToast} = useToast();
  const dispatch = useAppDispatch();
  const {purchaseResponse, purchaseRequest} = useAppSelector(
    state => state.bills,
  );
  const vasCategoryService = useAppSelector(
    state => state.service.vasCategoryService,
  );
  const customerId = useAppSelector(state => state.customer.customer?.id);
  const transactions = useAppSelector(state => state.account.transactions);

  const [addCustomerBeneficiary, {isLoading}] =
    useAddCustomerBeneficiaryMutation();

  const [beneficiaryShowModal, setBeneficiaryShowModal] = useState(false);

  const handleViewReceipt = () => {
    dispatch(
      setSelectedTransaction(
        transactions.find(
          transaction =>
            transaction.reference_number === purchaseResponse?.reference_number,
        ) ?? null,
      ),
    );
    navigate('BillReceipt');
  };

  const handleAddBeneficiary = async (beneficiaryName: string) => {
    try {
      const result = await addCustomerBeneficiary({
        name: beneficiaryName,
        customer_id: customerId,
        account_number:
          purchaseRequest.smartcard_number || purchaseRequest.meter_number,
        bank_code: '',
        bank_name: '',
        service_id: vasCategoryService?.id,
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
    } finally {
      setBeneficiaryShowModal(false);
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
    dispatch(setPurchaseRequest({}));
    return true;
  };

  useFocusEffect(
    useCallback(() => {
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        navigateToHome,
      );

      return () => backHandler.remove(); // Cleanup
    }, []),
  );

  const transaction =
    transactions.find(
      transaction =>
        transaction.reference_number === purchaseResponse?.reference_number,
    ) ?? null;

  return (
    <MainLayout showHeader={false} isLoading={isLoading}>
      <AddBeneficiaryModal
        showModal={beneficiaryShowModal}
        onClose={() => setBeneficiaryShowModal(false)}
        onAddBeneficiary={handleAddBeneficiary}
        destinationAccount={{
          accountName:
            purchaseRequest.meter_name || purchaseRequest.customer_name || '',
          accountNumber:
            purchaseRequest.meter_number ||
            purchaseRequest.smartcard_number ||
            '',
          bankName: '',
          bankCode: '',
        }}
      />
      <View style={styles.statusContainer}>
        <Image
          style={styles.image}
          source={ComponentImages.onboarding.successful}
        />

        <Pad size={20} />

        <Typography type="heading" title="Success!" />

        <Pad />

        {!!transaction?.token ? (
          <Typography selectable type="heading" title={transaction.token} />
        ) : null}

        <Pad />

        <Typography type="body-r" title="Purchase successful" />

        <Pad size={20} />

        <Row justifyContent="space-between" gap={20}>
          <ActionCard
            title="View Receipt"
            icon={ComponentImages.BeneficiaryCard.shareIcon}
            onPress={handleViewReceipt}
          />

          <ActionCard
            title="Add Beneficiary"
            icon={ComponentImages.userTypeCard.individual}
            onPress={() => setBeneficiaryShowModal(true)}
            disabled={false}
          />
        </Row>
      </View>

      <Button title="Done" onPress={navigateToHome} />
    </MainLayout>
  );
}
