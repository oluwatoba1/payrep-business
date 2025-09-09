import {StackScreenProps} from '@react-navigation/stack';

import {Button, PinPad, Typography} from '@components/Forms';
import {MainLayout} from '@components/Layout';
import Pad from '@components/Pad';
import {PublicNavigatorParamList} from '@navigation/types';
import {useState} from 'react';
import {useRegisterDeviceMutation} from '@store/apis/authApi';
import useToast from '@hooks/useToast';
import DeviceInfo from 'react-native-device-info';
import {DEFAULT_ERROR_MESSAGE} from '@utils/Constants';

type RegisterNewDeviceProps = StackScreenProps<
  PublicNavigatorParamList,
  'RegisterNewDevice'
>;

export default function RegisterNewDevice({
  navigation: {navigate, goBack},
  route,
}: RegisterNewDeviceProps) {
  const {showToast} = useToast();
  const [registerDevice, {isLoading}] = useRegisterDeviceMutation();

  const [otp, setOtp] = useState<string>('');
  const [error, setError] = useState<string>('');

  const submit = async () => {
    if (!otp) {
      setError('Please input an OTP');
      return;
    }
    try {
      const {status, data, message} = await registerDevice({
        username: route.params.username || '',
        otp,
        device_id: DeviceInfo.getDeviceId(),
      }).unwrap();
      if (status && !data?.facial_recognition) {
        goBack();
        return;
      } else if (status && data?.facial_recognition) {
        navigate('FacialRecognition', {
          token: data.token,
          customer: data.customer,
        });
      } else {
        showToast('danger', message);
      }
    } catch (error: any) {
      showToast(
        'danger',
        error.data?.message || error.message || DEFAULT_ERROR_MESSAGE,
      );
    }
  };
  return (
    <MainLayout backAction={goBack} isLoading={isLoading}>
      <Typography title="Device Registration" type="heading" />
      <Pad />
      <Typography
        title="Please enter the OTP sent to your mobile number to register the new device"
        type="body-sb"
      />

      <Pad size={30} />

      <PinPad
        pin={otp}
        onInput={setOtp}
        codeLength={6}
        secure={false}
        error={error}
      />

      <Pad size={50} />

      <Button title="Register" onPress={submit} />
    </MainLayout>
  );
}
