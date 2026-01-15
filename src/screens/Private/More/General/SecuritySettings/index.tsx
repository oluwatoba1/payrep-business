import {useCallback, useState} from 'react';
import {BackHandler, View} from 'react-native';

import {Typography} from '@components/Forms';
import {MainLayout} from '@components/Layout';
import {SettingsOverviewCard} from '@components/Cards';
import ComponentImages from '@assets/images/components';
import IconImages from '@assets/images/appIcons';
import {styles} from './styles';
import {StackScreenProps} from '@react-navigation/stack';
import {MoreStackParamList} from '@navigation/types';
import {useAppDispatch, useAppSelector} from '@store/hooks';
import {useRegisterBiometricsMutation} from '@store/apis/authApi';
import ReactNativeBiometrics from 'react-native-biometrics';
import {persistAppState} from '@utils/Helpers';
import {updateAppstate} from '@store/slices/appSlice';
import useToast from '@hooks/useToast';
import {useFocusEffect} from '@react-navigation/native';

type SecuritySettingsProps = StackScreenProps<
  MoreStackParamList,
  'SecuritySettings'
>;

export default function SecuritySettings({
  navigation: {navigate},
}: SecuritySettingsProps) {
  const dispatch = useAppDispatch();
  const {showToast} = useToast();

  const appState = useAppSelector(state => state.app?.appState);
  const [registerBiometrics] = useRegisterBiometricsMutation();

  const [isToggleSecurity, setIsToggleSecurity] = useState<boolean>(false);

  const handleRegisterBiometrics = async (enableBiometrics: boolean) => {
    const rnBiometrics = new ReactNativeBiometrics();

    const {keysExist} = await rnBiometrics.biometricKeysExist();

    if (!keysExist) {
      const {publicKey} = await rnBiometrics.createKeys();

      try {
        const {status, message} = await registerBiometrics({
          username: appState?.customer?.username || '',
          public_key: publicKey,
        }).unwrap();
        if (status) {
          persistAppState({
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
    } else {
      persistAppState({
        enableBiometrics: !enableBiometrics,
      });
      dispatch(
        updateAppstate({
          enableBiometrics: !enableBiometrics,
        }),
      );
    }
  };

  const accountManagement = [
    {
      id: '1',
      title: 'Change Password',
      profileIcon: ComponentImages.ProfileIcons.PadlockIcon,
      rightIcon: ComponentImages.ProfileIcons.ArrowRightIcon,
      navigate: () => navigate('ChangePassword'),
      showToggle: false,
      isToggle: false,
    },
    {
      id: '2',
      title: 'Change Pin',
      profileIcon: ComponentImages.ProfileIcons.NotificationIcon,
      rightIcon: ComponentImages.ProfileIcons.ArrowRightIcon,
      navigate: () => navigate('ChangePin'),
      showToggle: false,
      isToggle: false,
    },
    {
      id: '3',
      title: 'Reset Pin',
      profileIcon: ComponentImages.ProfileIcons.NotificationIcon,
      rightIcon: ComponentImages.ProfileIcons.ArrowRightIcon,
      navigate: () => navigate('OtpVerification'),
      showToggle: false,
      isToggle: false,
    },
    {
      id: '4',
      title: 'Enable Biometrics',
      profileIcon: IconImages.icon.biometrics,
      navigate: () => {},
      isToggle: true,
      showToggle: !!appState?.enableBiometrics,
      toggleSwitch: () =>
        handleRegisterBiometrics(!!appState?.enableBiometrics),
    },
  ];

  const backAction = () => {
    navigate('Profile');
    return true; // Prevent default behavior
  };

  useFocusEffect(
    useCallback(() => {
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
      );

      return () => backHandler.remove(); // Cleanup
    }, []),
  );

  return (
    <MainLayout backAction={backAction}>
      <View>
        <Typography title="Security Settings" type="heading4-sb" />
        <View>
          <SettingsOverviewCard
            data={accountManagement}
            customProfileContainerStyle={styles.profileContainer}
            customCardStyle={styles.cardContainer}
          />
        </View>
      </View>
    </MainLayout>
  );
}
