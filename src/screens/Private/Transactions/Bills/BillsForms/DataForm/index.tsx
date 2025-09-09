import {useEffect, useState} from 'react';
import DeviceInfo from 'react-native-device-info';

import {Button, Dropdown, TextInput} from '@components/Forms';
import {MainLayout} from '@components/Layout';
import {BillsStackParamList} from '@navigation/types';
import {StackScreenProps} from '@react-navigation/stack';
import useDataFormValidation from './validator';
import {useAppDispatch, useAppSelector} from '@store/hooks';
import useToast from '@hooks/useToast';
import Pad from '@components/Pad';
import {useGetBundlesMutation} from '@store/apis/billsApi';
import {DEFAULT_ERROR_MESSAGE} from '@utils/Constants';
import {setPurchaseRequest} from '@store/slices/billSlice';
import {removeCommas} from '@utils/Helpers';

type DataFormProps = StackScreenProps<BillsStackParamList, 'DataForm'>;

export default function DataForm({
  navigation: {navigate, goBack},
}: DataFormProps) {
  const dispatch = useAppDispatch();
  const {showToast} = useToast();
  const account = useAppSelector(state => state.account.selectedAccount);
  const vasCategoryService = useAppSelector(
    state => state.service.vasCategoryService,
  );
  const {
    formData,
    formErrors,
    validateForm,
    setTariffClass,
    setMobileNumber,
    setAmount,
  } = useDataFormValidation();
  const [getBundles, {isLoading: isFetching}] = useGetBundlesMutation();

  const [bundles, setBundles] = useState<IBundle[]>([]);
  const [selectedBundle, setSelectedBundle] = useState<{
    label: string;
    value: string;
  }>();

  const fetchBundles = async () => {
    try {
      const {status, message, data} = await getBundles({
        customer_account_number: account?.account_number || '',
        service_code: vasCategoryService?.code || '',
      }).unwrap();

      if (status) {
        setBundles(data);
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

  const selectBundle = (option: {label: string; value: string}) => {
    const bundle = bundles.find(bundle => bundle.id === option.value);
    setSelectedBundle(option);
    setTariffClass(option.value);
    setAmount(bundle?.price || '');
  };

  const proceed = async () => {
    dispatch(
      setPurchaseRequest({
        customer_account_number: account?.account_number || '',
        mobile_number: formData.mobileNumber,
        tariff_class: formData.tariffClass,
        service_code: vasCategoryService?.code || '',
        amount: Number(removeCommas(formData.amount)),
        device_id: DeviceInfo.getDeviceId(),
      }),
    );
    navigate('ConfirmBills');
  };

  useEffect(() => {
    fetchBundles();
  }, []);

  return (
    <MainLayout
      backAction={goBack}
      rightTitle={vasCategoryService?.name || 'Data'}
      keyboardAvoidingType="scroll-view">
      <Dropdown
        label="Bundles"
        options={bundles.map(bundle => ({
          label: bundle.text,
          value: bundle.id,
        }))}
        selectedOption={selectedBundle}
        onSelect={selectBundle}
        isLoading={isFetching}
        error={formErrors.tariffClass}
      />

      <TextInput
        label="Mobile Number"
        type="text"
        placeholder="Mobile Number"
        keyboardType="numeric"
        error={formErrors.mobileNumber}
        value={formData.mobileNumber}
        onChangeText={setMobileNumber}
      />

      <TextInput
        label="Amount"
        type="text"
        placeholder="Enter Amount"
        keyboardType="numeric"
        error={formErrors.amount}
        value={formData.amount}
        onChangeText={setAmount}
      />

      <Pad size={40} />

      <Button title="PAY" onPress={() => validateForm(proceed)} />
    </MainLayout>
  );
}
