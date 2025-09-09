import {StackScreenProps} from '@react-navigation/stack';

import {MainLayout} from '@components/Layout';
import {Button, TextInput, Typography} from '@components/Forms';
import {MoreStackParamList} from '@navigation/types';
import Pad from '@components/Pad';
import useChangePasswordValidation from './validator';
import {usePasswordChangeMutation} from '@store/apis/authApi';
import {useAppDispatch, useAppSelector} from '@store/hooks';
import useToast from '@hooks/useToast';
import {setCredentials} from '@store/slices/authSlice';
import {DEFAULT_ERROR_MESSAGE} from '@utils/Constants';

type ChangePasswordProps = StackScreenProps<
  MoreStackParamList,
  'ChangePassword'
>;

export default function ChangePassword({
  navigation: {navigate, goBack},
}: ChangePasswordProps) {
  const dispatch = useAppDispatch();
  const {showToast} = useToast();

  const username = useAppSelector(state => state.auth.customer?.username) || '';

  const {
    formData: {currentPassword, newPassword},
    formErrors,
    validateForm,
    setCurrentPassword,
    setNewPassword,
  } = useChangePasswordValidation();
  const [passwordChange, {isLoading}] = usePasswordChangeMutation();

  const submit = async () => {
    try {
      const {status, message} = await passwordChange({
        username,
        current_password: currentPassword,
        new_password: newPassword,
      }).unwrap();
      if (status) {
        dispatch(
          setCredentials({
            token: null,
            user_id: null,
          }),
        );
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
      <Typography title="Change Password" type="heading4-sb" />
      <Typography
        title="Password must be at least 8 characters long and must contain at least an uppercase letter, a number & a symbol."
        type="subheading"
      />

      <TextInput
        type="password"
        label="Current Password"
        value={currentPassword}
        onChangeText={setCurrentPassword}
        error={formErrors.currentPassword}
      />

      <TextInput
        type="password"
        label="New Password"
        value={newPassword}
        onChangeText={setNewPassword}
        error={formErrors.newPassword}
      />

      <Pad size={30} />

      <Button title="Update Password" onPress={() => validateForm(submit)} />
    </MainLayout>
  );
}
