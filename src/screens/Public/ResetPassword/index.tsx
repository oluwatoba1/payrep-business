import {useRef, useState, useEffect} from 'react';
import {View, AppState, AppStateStatus, ActivityIndicator} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';

import {MainLayout, Row} from '@components/Layout';
import {Button, TextInput, Typography} from '@components/Forms';
import {PublicNavigatorParamList} from '@navigation/types';
import Pad from '@components/Pad';
import useToast from '@hooks/useToast';
import {
  usePasswordResetMutation,
  useVerifyMobileNumberMutation,
} from '@store/apis/authApi';
import styles from './styles';
import {DEFAULT_ERROR_MESSAGE, RESEND_COUNTDOWN} from '@utils/Constants';
import useResetPasswordValidation from './validator';
import {formatCountdown} from '@utils/Helpers';
import Colors from '@theme/Colors';

type ResetPasswordProps = StackScreenProps<
  PublicNavigatorParamList,
  'ResetPassword'
>;

export default function ResetPassword({
  navigation: {goBack, reset},
  route,
}: ResetPasswordProps) {
  const {showToast} = useToast();

  const [verifyMobileNumber, {isLoading: isResending}] =
    useVerifyMobileNumberMutation();
  const [resetPassword, {isLoading}] = usePasswordResetMutation();
  const username = route.params.username || '';

  const {
    formData: {otp, password},
    formErrors,
    validateForm,
    setOtp,
    setPassword,
  } = useResetPasswordValidation();

  const [countdown, setCountdown] = useState<number>(RESEND_COUNTDOWN);
  const [countdownEndTime, setCountdownEndTime] = useState<number>(
    Date.now() + RESEND_COUNTDOWN * 1000,
  );

  const appState = useRef(AppState.currentState);

  const proceedToReset = async () => {
    try {
      const {status, message} = await resetPassword({
        username,
        otp,
        password,
      }).unwrap();
      if (status) {
        reset({
          index: 0,
          routes: [
            {
              name: 'Login',
            },
          ],
        });
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

  const resend = async () => {
    setOtp('');
    try {
      const {status} = await verifyMobileNumber({
        mobile_number: `0${username}`,
      }).unwrap();
      if (status) {
        const endTime = Date.now() + RESEND_COUNTDOWN * 1000;
        setCountdownEndTime(endTime);
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
      const now = Date.now();
      const secondsLeft = Math.max(
        Math.floor((countdownEndTime - now) / 1000),
        0,
      );
      setCountdown(secondsLeft);
    }, 1000);

    return () => clearInterval(interval);
  }, [countdownEndTime]);

  useEffect(() => {
    const handleAppStateChange = (nextAppState: AppStateStatus) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === 'active'
      ) {
        const now = Date.now();
        const secondsLeft = Math.max(
          Math.floor((countdownEndTime - now) / 1000),
          0,
        );
        setCountdown(secondsLeft);
      }
      appState.current = nextAppState;
    };

    const subscription = AppState.addEventListener(
      'change',
      handleAppStateChange,
    );

    return () => {
      subscription.remove();
    };
  }, [countdownEndTime]);

  return (
    <MainLayout backAction={goBack} isLoading={isLoading}>
      <View style={styles.titleContainer}>
        <Typography title="Password Reset" type="heading4-sb" />
        <Typography
          title="Please enter the OTP you received and input a new password."
          type="body-r"
        />
      </View>
      <TextInput
        type="text"
        label="OTP"
        keyboardType="numeric"
        placeholder="Ex: 123456"
        maxLength={6}
        value={otp}
        onChangeText={setOtp}
        error={formErrors.otp}
      />

      <TextInput
        type="password"
        label="Password"
        value={password}
        onChangeText={setPassword}
        error={formErrors.password}
      />

      <Pad size={16} />

      <Row
        alignItems="flex-end"
        justifyContent={countdown === 0 ? 'flex-end' : 'space-between'}>
        {countdown ? (
          <Typography
            title={`Code to be resent in ${formatCountdown(countdown)}`}
            type="body-sb"
            color={Colors.black}
          />
        ) : (
          <Typography
            title="Resend"
            type="body-b"
            color={Colors.primary.base}
            onPress={resend}
          />
        )}
      </Row>

      {isResending ? (
        <ActivityIndicator size={16} color={Colors.black} />
      ) : null}

      <Pad size={40} />

      <Button title="Proceed" onPress={() => validateForm(proceedToReset)} />
    </MainLayout>
  );
}
