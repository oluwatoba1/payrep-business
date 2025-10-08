import {StackScreenProps} from '@react-navigation/stack';

import {MainLayout} from '@components/Layout';
import {Button, TextInput, Typography} from '@components/Forms';
import {MoreStackParamList} from '@navigation/types';
import Pad from '@components/Pad';
import useChangePinValidation from './validator';
import {useResetPinMutation} from '@store/apis/authApi';
import {useAppSelector} from '@store/hooks';
import useToast from '@hooks/useToast';
import {DEFAULT_ERROR_MESSAGE} from '@utils/Constants';

type ChangePinProps = StackScreenProps<MoreStackParamList, 'NewPin'>;

export default function ChangePin({
  navigation: {navigate, goBack},
  route,
}: ChangePinProps) {
  const {showToast} = useToast();

  const customerId = useAppSelector(state => state.auth.customer?.id) || '';

  const {
    formData: {newPin},
    formErrors,
    validateForm,
    setNewPin,
  } = useChangePinValidation();
  const [resetPin, {isLoading}] = useResetPinMutation();

  const submit = async () => {
    try {
      const {status, message} = await resetPin({
        customer_id: customerId,
        verification_id: route.params.verification_id,
        new_pin: newPin,
      }).unwrap();
      if (status) {
        navigate('SecuritySettings');
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
      <Typography title="Reset Pin" type="heading4-sb" />
      <Typography title="Pin must be 4 digits long" type="subheading" />

      <TextInput
        type="password"
        label="New Pin"
        value={newPin}
        onChangeText={setNewPin}
        error={formErrors.newPin}
        maxLength={4}
      />

      <Pad size={30} />

      <Button title="Update Pin" onPress={() => validateForm(submit)} />
    </MainLayout>
  );
}
