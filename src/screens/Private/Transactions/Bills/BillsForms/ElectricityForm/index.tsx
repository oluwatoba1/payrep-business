import {useEffect, useState} from 'react';
import {StackScreenProps} from '@react-navigation/stack';

import {Button, TextInput, Typography} from '@components/Forms';
import {MainLayout} from '@components/Layout';
import Pad from '@components/Pad';
import {BillsStackParamList} from '@navigation/types';
import useElectricityFormValidation from './validator';
import {BeneficiaryCard} from '@components/Cards';
import {useAppDispatch, useAppSelector} from '@store/hooks';
import {useMeterEnquiryMutation} from '@store/apis/billsApi';
import useToast from '@hooks/useToast';
import {DEFAULT_ERROR_MESSAGE} from '@utils/Constants';
import DeviceInfo from 'react-native-device-info';
import {Image, Pressable, View} from 'react-native';
import {setPurchaseRequest} from '@store/slices/billSlice';
import {removeCommas} from '@utils/Helpers';
import {useFetchCustomerBeneficiariesMutation} from '@store/apis/transferApi';
import TransferBeneficiaryModal, {
  IBeneficiaryOption,
} from '@components/Modal/TransferBeneficiaryModal';
import ComponentImages from '@assets/images/components';
import {styles} from './styles';

type ElectricityFormProps = StackScreenProps<
  BillsStackParamList,
  'ElectricityForm'
>;

export default function ElectricityForm({
  navigation: {navigate, goBack},
}: ElectricityFormProps) {
  const dispatch = useAppDispatch();
  const {showToast} = useToast();
  const {
    formData,
    formErrors,
    validateForm,
    setMeterNumber,
    setAmount,
    setNarration,
  } = useElectricityFormValidation();
  const account = useAppSelector(state => state.account.selectedAccount);
  const vasCategoryService = useAppSelector(
    state => state.service.vasCategoryService,
  );
  const customerId = useAppSelector(state => state.customer.customer?.id);

  const [meterEnquiry, {isLoading: isEnquiring}] = useMeterEnquiryMutation();
  const [fetchCustomerBeneficiaries, {isLoading: isLoadingBeneficiaries}] =
    useFetchCustomerBeneficiariesMutation();

  const [customerDetails, setCustomerDetails] =
    useState<IMeterEnquiryResponse | null>(null);
  const [showCard, setShowCard] = useState<boolean>(false);
  const [beneficiaries, setBeneficiaries] = useState<IBeneficiaryOption[]>([]);
  const [showBeneficiaryModal, setShowBeneficiaryModal] =
    useState<boolean>(false);

  const makeEnquiry = async () => {
    setShowCard(false);
    try {
      const {status, message, data} = await meterEnquiry({
        customer_account_number: account?.account_number || '',
        meter_number: formData.meterNumber,
        service_code: vasCategoryService?.code || '',
      }).unwrap();

      if (status) {
        setShowCard(true);
        setCustomerDetails(data);
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

  const fetchBeneficiaries = async () => {
    try {
      const {status, data, message} = await fetchCustomerBeneficiaries({
        customer_id: customerId,
        service_code: vasCategoryService?.code,
      }).unwrap();

      if (status) {
        setBeneficiaries(data || []);
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

  const proceed = async () => {
    dispatch(
      setPurchaseRequest({
        customer_account_number: account?.account_number || '',
        meter_number: formData.meterNumber,
        meter_name: customerDetails?.name || '',
        service_code: vasCategoryService?.code || '',
        amount: Number(removeCommas(formData.amount)),
        fi: customerDetails?.fi || '',
        remarks: formData.narration || '',
        device_id: DeviceInfo.getDeviceId(),
        address: customerDetails?.address || '',
        debt: customerDetails?.debt || 0,
      }),
    );
    navigate('ConfirmBills');
  };

  useEffect(() => {
    fetchBeneficiaries();
  }, []);

  useEffect(() => {
    if (formData.meterNumber.length === 11) {
      makeEnquiry();
    }
  }, [formData.meterNumber]);

  return (
    <MainLayout
      backAction={goBack}
      rightTitle="Electricity"
      isLoading={isEnquiring}
      keyboardAvoidingType="scroll-view">
      <TransferBeneficiaryModal
        showModal={showBeneficiaryModal}
        onClose={() => setShowBeneficiaryModal(false)}
        onSelect={option => [
          setMeterNumber(option.account_number),
          setShowBeneficiaryModal(false),
        ]}
        options={beneficiaries}
      />
      <Typography
        title={vasCategoryService?.description || 'Purchase units'}
        type="body-r"
      />

      <Pad size={20} />

      <Pressable
        style={styles.doubleUserTeamContainer}
        onPress={() => setShowBeneficiaryModal(true)}>
        <Image
          style={styles.doubleUserIcon}
          source={ComponentImages.Wallet.teamLine}
        />
        <Typography title="Select Beneficiary" type="body-sb" />
      </Pressable>

      <Pad />

      <TextInput
        label="Meter Number"
        type="text"
        placeholder="Meter Number"
        keyboardType="numeric"
        error={formErrors.meterNumber}
        value={formData.meterNumber}
        onChangeText={setMeterNumber}
      />

      {showCard && customerDetails ? (
        <View>
          <Pad />
          <BeneficiaryCard
            accountName={customerDetails.name}
            accountNumber={formData.meterNumber}
            bankName=""
            showCard={showCard}
            onClose={() => setShowCard(false)}
          />
        </View>
      ) : null}

      <TextInput
        label="Amount"
        type="text"
        placeholder="Enter Amount"
        keyboardType="numeric"
        error={formErrors.amount}
        value={formData.amount}
        onChangeText={setAmount}
      />

      <TextInput
        label="Narration"
        type="text"
        placeholder="Enter narration"
        error={formErrors.narration}
        value={formData.narration}
        onChangeText={setNarration}
      />

      <Pad size={40} />

      <Button
        title="PAY"
        disabled={!customerDetails?.name}
        onPress={() => validateForm(proceed)}
      />
    </MainLayout>
  );
}
