import {StackScreenProps} from '@react-navigation/stack';
import DeviceInfo from 'react-native-device-info';

import {Button, TextInput, Typography} from '@components/Forms';
import {MainLayout} from '@components/Layout';
import Pad from '@components/Pad';
import {BillsStackParamList} from '@navigation/types';
import useAirtimeFormValidation from './validator';
import {useAppDispatch, useAppSelector} from '@store/hooks';
import {removeCommas} from '@utils/Helpers';
import {setPurchaseRequest} from '@store/slices/billSlice';

type AirtimeFormProps = StackScreenProps<BillsStackParamList, 'AirtimeForm'>;

export default function AirtimeForm({
  navigation: {navigate, goBack},
}: AirtimeFormProps) {
  const dispatch = useAppDispatch();
  const {formData, formErrors, validateForm, setMobileNumber, setAmount} =
    useAirtimeFormValidation();
  const account = useAppSelector(state => state.account.selectedAccount);
  const vasCategoryService = useAppSelector(
    state => state.service.vasCategoryService,
  );

  const proceed = async () => {
    dispatch(
      setPurchaseRequest({
        customer_account_number: account?.account_number || '',
        mobile_number: formData.mobileNumber,
        service_code: vasCategoryService?.code || '',
        amount: Number(removeCommas(formData.amount)),
        device_id: DeviceInfo.getDeviceId(),
      }),
    );
    navigate('ConfirmBills');
  };

  return (
    <MainLayout
      backAction={goBack}
      rightTitle="Airtime"
      keyboardAvoidingType="scroll-view">
      <Typography
        title={vasCategoryService?.description || 'Purchase units'}
        type="body-r"
      />

      <Pad size={20} />

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
