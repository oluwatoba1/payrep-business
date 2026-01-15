import {useCallback, useEffect, useState} from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  BackHandler,
  Alert,
  Platform,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {StackScreenProps} from '@react-navigation/stack';
import DeviceInfo from 'react-native-device-info';
import ReactNativeBiometrics, {BiometryTypes} from 'react-native-biometrics';

// Local
import styles from './styles';
import IconImages from '@assets/images/appIcons';
import {
  Button,
  Typography,
  TextInput,
  HybridTypography,
} from '@components/Forms';
import {AuthLayout, Row} from '@components/Layout';
import {PublicNavigatorParamList} from '@navigation/types';
import {useAppDispatch, useAppSelector} from '@store/hooks';
import {setCustomer, setCredentials} from '@store/slices/authSlice';
import useToast from '@hooks/useToast';
import {useLoginMutation, useVerifyDeviceMutation} from '@store/apis/authApi';
import {CUSTOMER_TYPE, DEFAULT_ERROR_MESSAGE} from '@utils/Constants';
import useLoginValidation from './validator';
import {persistAppState} from '@utils/Helpers';
import {updateAppstate} from '@store/slices/appSlice';
import {useRegisterBiometricsMutation} from '../../../store/apis/authApi';
import {EnableBiometricsModal, NewDeviceDetectedModal} from '@components/Modal';
import {PNB} from '@theme/Fonts';
import Colors from '@theme/Colors';
import Pad from '@components/Pad';

type LoginProps = StackScreenProps<PublicNavigatorParamList, 'Login'>;

export default function Login({navigation: {navigate}}: LoginProps) {
  const dispatch = useAppDispatch();
  const appState = useAppSelector(state => state.app.appState);
  const {showToast} = useToast();

  const {
    formErrors,
    formData: {username, password},
    validateForm,
    setUsername,
    setPassword,
  } = useLoginValidation();
  const [login, {isLoading}] = useLoginMutation();
  const [registerBiometrics] = useRegisterBiometricsMutation();
  const [verifyDevice] = useVerifyDeviceMutation();

  const customer = appState?.customer;

  const [biometryType, setBiometryType] = useState<string | null>(null);
  const [showRegisterDeviceModal, setShowRegisterDeviceModal] =
    useState<boolean>(false);
  const [biometricAvailable, setIsBiometricAvailable] =
    useState<boolean>(false);
  const [notYou, setNotYou] = useState<boolean>(!customer?.username);
  const [showBiometricsModal, setShowBiometricsModal] =
    useState<boolean>(false);
  const [token, setToken] = useState<string>('');
  const [loginType, setLoginType] = useState<'password' | 'biometrics'>(
    'password',
  );
  const [customerType, setCustomerType] = useState<string | null>(null);

  const prepUserDetails = async ({
    status,
    message,
    data,
  }: AuthResponse<LoginResponse>) => {
    if (status && data) {
      setToken(data.token);
      dispatch(
        setCustomer({
          ...data.customer,
          username: !!username ? username : customer?.username,
        }),
      );

      // Show biometric modal if user has never logged in, or
      // Set token to navigate to dashbord or profile setup
      !appState?.hasEverLoggedIn
        ? setShowBiometricsModal(true)
        : dispatch(setCredentials({token: data.token, user_id: null}));

      // persist customer details
      await persistAppState({
        customer: {
          ...data.customer,
          username: !!username ? username : customer?.username,
        },
        hasEverLoggedIn: true,
      });
      return;
    }

    showToast('danger', message);
  };

  const handleLogin = async (
    loginType: 'password' | 'biometrics',
    signature?: string,
    payload?: string,
  ) => {
    setLoginType(loginType);

    try {
      const {status, message, data} = await login({
        username: !!username ? username : customer?.username || '',
        password,
        device_id: await DeviceInfo.getUniqueId(),
        login_type: loginType,
        signature,
        signature_payload: payload,
        customer_type: CUSTOMER_TYPE,
      }).unwrap();

      if (data?.is_new_device) {
        setCustomerType(data.customer.type);
        setShowRegisterDeviceModal(true);
        return;
      }

      await prepUserDetails({status, message, data});
    } catch (error: ErrorResponse | any) {
      showToast(
        'danger',
        error.data?.message || error.message || DEFAULT_ERROR_MESSAGE,
        6000,
      );
    }
  };

  const handleRegisterBiometrics = async (enableBiometrics: boolean) => {
    const rnBiometrics = new ReactNativeBiometrics();

    try {
      // Check if biometric keys already exist
      const {keysExist} = await rnBiometrics.biometricKeysExist();

      if (keysExist) {
        await rnBiometrics.deleteKeys();
      }

      // Register new biometrics if no keys exist or user confirms overwrite
      await registerNewBiometrics(enableBiometrics);
    } catch (error) {
      showToast('danger', 'Biometrics setup error');
    }
  };

  const registerNewBiometrics = async (enableBiometrics: boolean) => {
    const rnBiometrics = new ReactNativeBiometrics();

    const {publicKey} = await rnBiometrics.createKeys();

    try {
      const {status, message} = await registerBiometrics({
        username,
        public_key: publicKey,
        customer_type: CUSTOMER_TYPE,
      }).unwrap();

      if (status) {
        await persistAppState({
          enableBiometrics,
        });

        dispatch(
          updateAppstate({
            enableBiometrics,
          }),
        );
        return;
      }
      showToast('danger', message);
    } catch (error) {
      showToast('danger', 'Biometrics setup error');
    }
  };

  const handleBiometricLogin = async () => {
    const rnBiometrics = new ReactNativeBiometrics();

    try {
      if (Platform.OS === 'ios' && biometryType !== BiometryTypes.FaceID) {
        return;
      }

      const payload = `Login attempt for user ${
        customer?.username || username
      } at ${new Date().toISOString()}`;

      const promptMessage = 'Login with Biometrics';

      const {success, signature} = await rnBiometrics.createSignature({
        promptMessage,
        payload,
        // cancelButtonText is Android-only; harmless on iOS
        cancelButtonText: 'Cancel',
      });

      success && signature && handleLogin('biometrics', signature, payload);
    } catch (error) {
      showToast('danger', 'An error occurred during biometric login');
    }
  };

  const sendOtp = async () => {
    try {
      const {status} = await verifyDevice({
        mobile_number: `0${username}`,
        customer_type: CUSTOMER_TYPE,
      }).unwrap();
      if (status) {
        navigate('RegisterNewDevice', {username, customerType: CUSTOMER_TYPE});
      }
    } catch (error: any) {
      showToast(
        'danger',
        error.data?.message || error.message || DEFAULT_ERROR_MESSAGE,
      );
    } finally {
      setShowRegisterDeviceModal(false);
    }
  };

  const displayName = (): string => {
    if (customer?.type === CUSTOMER_TYPE) {
      return `${customer?.first_name || 'User'}`;
    }
    return customer?.business_name
      ? customer?.business_name.substring(0, 10) + '...'
      : 'User';
  };

  // Check for biometric sensor availability
  useEffect(() => {
    const checkBiometricSensor = async () => {
      const rnBiometrics = new ReactNativeBiometrics();
      const {available, biometryType} = await rnBiometrics.isSensorAvailable();

      setBiometryType(biometryType || null);

      // Check for both Face ID and Fingerprint availability
      const enabledBySetting = !!appState?.enableBiometrics;
      const iosFaceIdAvailable =
        Platform.OS === 'ios' &&
        available &&
        biometryType === BiometryTypes.FaceID;

      const iosFingerprintAvailable =
        Platform.OS === 'ios' &&
        available &&
        biometryType === BiometryTypes.TouchID;

      const androidBiometricsAvailable = Platform.OS === 'android' && available;

      setIsBiometricAvailable(
        enabledBySetting &&
          (iosFaceIdAvailable ||
            iosFingerprintAvailable ||
            androidBiometricsAvailable),
      );

      if (enabledBySetting) {
        if (iosFaceIdAvailable || iosFingerprintAvailable) {
          setBiometryType(
            iosFaceIdAvailable ? BiometryTypes.FaceID : BiometryTypes.TouchID,
          );
        } else if (androidBiometricsAvailable) {
          setBiometryType(BiometryTypes.Biometrics);
        }

        await handleBiometricLogin();
      }
    };

    checkBiometricSensor();
  }, [appState?.enableBiometrics]);

  useEffect(() => {
    setUsername(customer?.username || '');
  }, []);

  useFocusEffect(
    useCallback(() => {
      const backAction = () => {
        Alert.alert('Hold on!', 'Are you sure you want to exit the app?.', [
          {text: 'Cancel', onPress: () => null, style: 'cancel'},
          {text: 'YES', onPress: () => BackHandler.exitApp()},
        ]);
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
    <AuthLayout isLoading={isLoading}>
      <EnableBiometricsModal
        showModal={showBiometricsModal}
        onClose={() => [
          setShowBiometricsModal(false),
          dispatch(setCredentials({token, user_id: null})),
        ]}
        onProceed={() => handleRegisterBiometrics(true)}
      />
      <NewDeviceDetectedModal
        showModal={showRegisterDeviceModal}
        onClose={() => setShowRegisterDeviceModal(false)}
        onProceed={sendOtp}
      />

      <Row justifyContent="center" containerStyle={styles.logoContainer}>
        <Image
          source={IconImages.logo.payrepBlackWithText}
          style={styles.logo}></Image>
      </Row>

      <View style={styles.overlay}>
        <View>
          <Row containerStyle={styles.overlayHeader}>
            <Typography
              type="heading5-sb"
              title={
                !notYou
                  ? `Welcome back, ${displayName()}`
                  : 'Login with your username and password'
              }
            />

            {!notYou ? (
              <Typography
                title="Not you?"
                type="subheading-sb"
                style={{fontFamily: PNB}}
                color={Colors.primary.base}
                onPress={() => [setNotYou(true), setUsername('')]}
              />
            ) : null}
          </Row>
          {notYou ? (
            <TextInput
              type="phone"
              label="Username"
              keyboardType="numeric"
              placeholder="Ex: 8123456789"
              maxLength={10}
              value={username}
              onChangeText={setUsername}
              error={formErrors.username}
            />
          ) : null}
          <TextInput
            type="password"
            label="Password"
            placeholder="Enter password"
            value={password}
            onChangeText={setPassword}
            error={formErrors.password}
          />

          <Pad />

          <Typography
            title="Forgot Password?"
            type="label-sb"
            color={Colors.primary.base}
            onPress={() => navigate('ForgotPassword')}
          />

          <Pad size={20} />

          <Button
            title="Login"
            onPress={() =>
              validateForm(() => handleLogin('password'))
            }></Button>

          <Pad size={16} />

          <HybridTypography
            textTray={[
              {
                text: "Don't have an account? ",
                bold: false,
                action: () => {},
              },
              {
                text: 'Create an Account',
                bold: true,
                action: () =>
                  navigate('MobileNumber', {userType: CUSTOMER_TYPE}),
              },
            ]}
            textStyle={{textAlign: 'center'}}
          />

          <Pad size={16} />

          {biometricAvailable ? (
            <TouchableOpacity
              style={styles.biometricsContainer}
              onPress={handleBiometricLogin}>
              <Image
                source={
                  Platform.OS === 'ios' && biometryType === BiometryTypes.FaceID
                    ? IconImages.icon.faceScan
                    : IconImages.icon.biometrics
                }
                style={styles.biometricsIcon}
              />
            </TouchableOpacity>
          ) : null}
          <Row justifyContent="center" gap={4}>
            <Image
              source={IconImages.logo.cbnIcon}
              style={styles.biometricsIcon}
            />
            <Typography title="LICENSED BY CBN" type="label-sb" />
          </Row>
        </View>

        <Typography
          title={`v${DeviceInfo.getVersion()}`}
          type="body-b"
          style={{textAlign: 'center'}}
        />
      </View>
    </AuthLayout>
  );
}
