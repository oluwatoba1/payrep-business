import {StackScreenProps} from '@react-navigation/stack';

import {MainLayout} from '@components/Layout';
import {Button, TextInput, Typography} from '@components/Forms';
import {MoreStackParamList} from '@navigation/types';
import Pad from '@components/Pad';
import useChangePinValidation from './validator';
import {usePinChangeMutation} from '@store/apis/authApi';
import {useAppDispatch, useAppSelector} from '@store/hooks';
import useToast from '@hooks/useToast';
import {setCredentials} from '@store/slices/authSlice';
import {DEFAULT_ERROR_MESSAGE} from '@utils/Constants';

type ChangePinProps = StackScreenProps<MoreStackParamList, 'ChangePin'>;

export default function ChangePin({
  navigation: {navigate, goBack},
}: ChangePinProps) {
  const dispatch = useAppDispatch();
  const {showToast} = useToast();

  const customerId = useAppSelector(state => state.auth.customer?.id) || '';

  const {
    formData: {currentPin, newPin},
    formErrors,
    validateForm,
    setCurrentPin,
    setNewPin,
  } = useChangePinValidation();
  const [pinChange, {isLoading}] = usePinChangeMutation();

  const submit = async () => {
    try {
      const {status, message} = await pinChange({
        customer_id: customerId,
        current_pin: currentPin,
        new_pin: newPin,
      }).unwrap();
      if (status) {
        goBack();
        return;
      }

      showToast('danger', message);
    } catch (error: any) {
      showToast(
        'danger',
        error.data?.message || error.message || DEFAULT_ERROR_MESSAGE,
      );
    }
  };

  return (
    <MainLayout backAction={goBack} isLoading={isLoading}>
      <Typography title="Change Pin" type="heading4-sb" />
      <Typography title="Pin must be 4 digits long" type="subheading" />

      <TextInput
        type="password"
        label="Current Pin"
        value={currentPin}
        onChangeText={setCurrentPin}
        error={formErrors.currentPin}
        keyboardType="numeric"
        maxLength={4}
      />

      <TextInput
        type="password"
        label="New Pin"
        value={newPin}
        onChangeText={setNewPin}
        error={formErrors.newPin}
        keyboardType="numeric"
        maxLength={4}
      />

      <Pad size={30} />

      <Button title="Update Pin" onPress={() => validateForm(submit)} />
    </MainLayout>
  );
}
