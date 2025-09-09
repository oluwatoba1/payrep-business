import {useEffect, useState} from 'react';
import {View} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';

// Local
import {MainLayout} from '@components/Layout';
import {Button, HybridTypography, Typography} from '@components/Forms';
import {PublicNavigatorParamList} from '@navigation/types';
import PinPad from '@components/Forms/PinPad';
import {useAppSelector} from '@store/hooks';
import {mainRegisterStyles} from '../styles';
import {formatCountdown} from '@utils/Helpers';
import Pad from '@components/Pad';
import {DEFAULT_ERROR_MESSAGE, RESEND_COUNTDOWN} from '@utils/Constants';
import useToast from '@hooks/useToast';
import useVerifyMobileValidation from './validator';
import {useRegisterEmailMutation} from '@store/apis/authApi';

type EmailVerificationProps = StackScreenProps<
  PublicNavigatorParamList,
  'EmailVerification'
>;

export default function EmailVerification({
  navigation: {navigate, goBack},
}: EmailVerificationProps) {
  const {showToast} = useToast();
  const {
    formErrors,
    formData: {otp},
    validateForm,
    setOtp,
  } = useVerifyMobileValidation();
  const [registerEmail, {isLoading}] = useRegisterEmailMutation();

  const {mobileNumber, email} = useAppSelector(
    state => state.auth.registration,
  );
  const [countdown, setCountdown] = useState<number>(RESEND_COUNTDOWN);
  const [loadingTitle, setLoadingTitle] = useState<string>('');

  const submit = async () => {
    setLoadingTitle('Verifying OTP');
    try {
      const {status} = await registerEmail({
        email,
        mobile_number: mobileNumber,
        otp,
      }).unwrap();
      if (status) {
        navigate('CreatePassword');
      }
    } catch (error: any) {
      showToast(
        'danger',
        error.data?.message || error.message || DEFAULT_ERROR_MESSAGE,
      );
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (countdown > 0) {
        setCountdown(countdown - 1);
      } else {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [countdown]);

  return (
    <MainLayout
      backAction={goBack}
      isLoading={isLoading}
      loadingTitle={loadingTitle}>
      <View style={mainRegisterStyles.mainContainer}>
        <Typography title="Verify Email Address" type="heading4-sb" />

        <Pad size={16} />

        <HybridTypography
          textTray={[
            {text: 'We sent an OTP to ', bold: false},
            {text: email || 'your email address', bold: true},
          ]}
        />

        <Pad size={16} />

        <PinPad
          pin={otp}
          onInput={setOtp}
          codeLength={6}
          secure={false}
          error={formErrors.otp}
        />

        <Pad size={30} />

        <Typography
          title={
            countdown === 0
              ? 'Resend'
              : `Resend code in ${formatCountdown(countdown)}`
          }
          type="body-sb"
          onPress={() => countdown === 0 && {}}
        />

        <Pad size={176} />

        <Button title="Continue" onPress={() => validateForm(submit)} />
      </View>
    </MainLayout>
  );
}
