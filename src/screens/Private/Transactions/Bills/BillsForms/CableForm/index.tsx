import {useEffect, useState} from 'react';
import {Image, Pressable, View} from 'react-native';
import DeviceInfo from 'react-native-device-info';

import {Button, Dropdown, TextInput, Typography} from '@components/Forms';
import {MainLayout} from '@components/Layout';
import {BillsStackParamList} from '@navigation/types';
import {StackScreenProps} from '@react-navigation/stack';
import useCableFormValidation from './validator';
import {useAppDispatch, useAppSelector} from '@store/hooks';
import useToast from '@hooks/useToast';
import Pad from '@components/Pad';
import {BeneficiaryCard} from '@components/Cards';
import {
  useGetBouquetsMutation,
  useSmartcardEnquiryMutation,
} from '@store/apis/billsApi';
import {DEFAULT_ERROR_MESSAGE} from '@utils/Constants';
import {setPurchaseRequest} from '@store/slices/billSlice';
import {removeCommas} from '@utils/Helpers';
import {useFetchCustomerBeneficiariesMutation} from '@store/apis/transferApi';
import TransferBeneficiaryModal, {
  IBeneficiaryOption,
} from '@components/Modal/TransferBeneficiaryModal';
import ComponentImages from '@assets/images/components';
import {styles} from './styles';

type CableFormProps = StackScreenProps<BillsStackParamList, 'CableForm'>;

export default function CableForm({
  navigation: {navigate, goBack},
}: CableFormProps) {
  const dispatch = useAppDispatch();
  const {showToast} = useToast();
  const account = useAppSelector(state => state.account.selectedAccount);
  const vasCategoryService = useAppSelector(
    state => state.service.vasCategoryService,
  );
  const customerId = useAppSelector(state => state.customer.customer?.id);

  const {
    formData,
    formErrors,
    validateForm,
    setBouquetId,
    setSmartcardNumber,
    setAmount,
    setNarration,
  } = useCableFormValidation();
  const [smartcardEnquiry, {isLoading: isEnquiring}] =
    useSmartcardEnquiryMutation();
  const [getBouquets, {isLoading: isFetching}] = useGetBouquetsMutation();
  const [fetchCustomerBeneficiaries, {isLoading: isLoadingBeneficiaries}] =
    useFetchCustomerBeneficiariesMutation();

  const [bouquets, setBouquets] = useState<IBouquet[]>([]);
  const [selectedBouquet, setSelectedBouquet] = useState<{
    label: string;
    value: string;
  }>();
  const [customerDetails, setCustomerDetails] =
    useState<ISmartcardEnquiryResponse | null>(null);
  const [showCard, setShowCard] = useState<boolean>(false);
  const [beneficiaries, setBeneficiaries] = useState<IBeneficiaryOption[]>([]);
  const [showBeneficiaryModal, setShowBeneficiaryModal] =
    useState<boolean>(false);

  const fetchBouquets = async () => {
    try {
      const {status, message, data} = await getBouquets({
        customer_account_number: account?.account_number || '',
        service_code: vasCategoryService?.code || '',
      }).unwrap();

      if (status) {
        setBouquets(data);
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

  const selectBouquet = (option: {label: string; value: string}) => {
    const bouquet = bouquets.find(bouquet => bouquet.id === option.value);
    setSelectedBouquet(option);
    setBouquetId(option.value);
    setAmount(bouquet?.price || '');
  };

  const makeEnquiry = async () => {
    setShowCard(false);
    try {
      const {status, message, data} = await smartcardEnquiry({
        customer_account_number: account?.account_number || '',
        smartcard_number: formData.smartcardNumber,
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
        smartcard_number: formData.smartcardNumber,
        customer_name: customerDetails?.name || '',
        bouquet_id: formData.bouquetId,
        service_code: vasCategoryService?.code || '',
        amount: Number(removeCommas(formData.amount)),
        fi: customerDetails?.fi || '',
        remarks: formData.narration || '',
        device_id: DeviceInfo.getDeviceId(),
      }),
    );
    navigate('ConfirmBills');
  };

  useEffect(() => {
    fetchBeneficiaries();
  }, []);

  useEffect(() => {
    if (formData.smartcardNumber.length === 10) {
      makeEnquiry();
    }
  }, [formData.smartcardNumber]);

  useEffect(() => {
    fetchBouquets();
  }, []);

  return (
    <MainLayout
      isLoading={isEnquiring}
      backAction={goBack}
      rightTitle={vasCategoryService?.name || 'Cable'}
      keyboardAvoidingType="scroll-view">
      <TransferBeneficiaryModal
        showModal={showBeneficiaryModal}
        onClose={() => setShowBeneficiaryModal(false)}
        onSelect={option => [
          setSmartcardNumber(option.account_number),
          setShowBeneficiaryModal(false),
        ]}
        options={beneficiaries}
      />

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

      <Dropdown
        label="Bouquets"
        options={bouquets.map(bouquet => ({
          label: bouquet.text,
          value: bouquet.id,
        }))}
        selectedOption={selectedBouquet}
        onSelect={selectBouquet}
        isLoading={isFetching}
        error={formErrors.bouquetId}
      />

      <TextInput
        label="Smartcard Number"
        type="text"
        placeholder="Smartcard Number"
        keyboardType="numeric"
        error={formErrors.smartcardNumber}
        value={formData.smartcardNumber}
        onChangeText={setSmartcardNumber}
      />

      {showCard && customerDetails ? (
        <View>
          <Pad />
          <BeneficiaryCard
            accountName={customerDetails.name}
            accountNumber={formData.smartcardNumber}
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
