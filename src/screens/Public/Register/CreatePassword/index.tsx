import {useCallback, useState} from 'react';
import {BackHandler, View} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import DeviceInfo from 'react-native-device-info';

import {MainLayout} from '@components/Layout';
import {Button, TextInput, Typography} from '@components/Forms';
import {PublicNavigatorParamList} from '@navigation/types';
import {useAppSelector} from '@store/hooks';
import {mainRegisterStyles} from '../styles';
import {useRegisterPasswordMutation} from '@store/apis/authApi';
import useRegisterPasswordValidation from './validator';
import useToast from '@hooks/useToast';
import {CUSTOMER_TYPE, DEFAULT_ERROR_MESSAGE, DOMAIN} from '@utils/Constants';
import {useFocusEffect} from '@react-navigation/native';

type CreatePasswordProps = StackScreenProps<
  PublicNavigatorParamList,
  'CreatePassword'
>;

export default function CreatePassword({
  navigation: {navigate, goBack},
}: CreatePasswordProps) {
  const {showToast} = useToast();
  const {
    formErrors,
    formData: {password},
    validateForm,
    setPassword,
  } = useRegisterPasswordValidation();
  const [registerPassword, {isLoading}] = useRegisterPasswordMutation();

  const {mobileNumber, customer_id} = useAppSelector(
    state => state.auth.registration,
  );

  const [loadingTitle, setLoadingTitle] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');

  const submit = async () => {
    if (password !== confirmPassword) {
      showToast('danger', 'Passwords do not match');
      return;
    }
    setLoadingTitle('Creating Password');
    try {
      const {status} = await registerPassword({
        password,
        mobile_number: mobileNumber,
        device_id: await DeviceInfo.getUniqueId(),
        customer_id,
      }).unwrap();
      if (status) {
        navigate('SuccessMessage', {
          title: 'Success!',
          subTitle: 'Well done! You have successfully created your account.',
        });
      }
    } catch (error: any) {
      showToast(
        'danger',
        error.data?.message || error.message || DEFAULT_ERROR_MESSAGE,
      );
    }
  };

  useFocusEffect(
    useCallback(() => {
      const backAction = () => {
        navigate('Login');
        return true; // Prevent default behavior
      };

      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
      );

      return () => backHandler.remove(); // Cleanup
    }, []),
  );

  return (
    <MainLayout
      backAction={() => {}}
      isLoading={isLoading}
      loadingTitle={loadingTitle}>
      <View style={mainRegisterStyles.mainContainer}>
        <View style={mainRegisterStyles.titleContainer}>
          <Typography title="Create your Password" />
          <Typography
            title="Password must be at least 8 characters long and must contain at least an uppercase letter, a number & a symbol."
            type="subheading"
          />
        </View>

        <View style={mainRegisterStyles.textInputContainer}>
          <TextInput
            type="password"
            label="Password"
            value={password}
            onChangeText={setPassword}
            error={formErrors.password}
          />
          <TextInput
            type="password"
            label="Retype Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            error={formErrors.password}
          />
        </View>
        <Button title="Save Password" onPress={() => validateForm(submit)} />
      </View>
    </MainLayout>
  );
}
