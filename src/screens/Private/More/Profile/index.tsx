import {BackHandler, Image, ScrollView, View} from 'react-native';
import ComponentImages from '../../../../../assets/images/components';
import {MainLayout} from '../../../../components/Layout';
import {styles} from './styles';
import {SettingsOverviewCard} from '../../../../components/Cards';
import {Button, Typography} from '../../../../components/Forms';
import {useCallback, useState} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {
  BottomTabParamList,
  MoreStackParamList,
} from '../../../../navigation/types';
import {useAppDispatch} from '@store/hooks';
import {setCredentials} from '@store/slices/authSlice';
import {ModalWrapper} from '@components/Modal';
import Pad from '@components/Pad';
import {BOTTOM_TAB_CONTAINER_HEIGHT} from '@utils/Constants';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';

type ProfileScreenProps = StackScreenProps<MoreStackParamList, 'Profile'>;

export default function ProfileScreen({
  navigation: {navigate, goBack},
}: ProfileScreenProps) {
  const {reset} = useNavigation<BottomTabNavigationProp<BottomTabParamList>>();

  const dispatch = useAppDispatch();
  const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false);
  const [isSavingsToggle, setIsSavingsToggle] = useState<boolean>(false);
  const handleSavingsToggle = () => {
    setIsSavingsToggle(prev => !prev);
  };
  const profileData = [
    {
      id: '1',
      title: 'My Profile',
      description: 'Basic information',
      profileIcon: ComponentImages.ProfileIcons.UserFillIcon,
      rightIcon: ComponentImages.ProfileIcons.ArrowRightIcon,
      navigate: () => navigate('Account'),
      showToggle: false,
      isToggle: false,
    },
    // {
    //   id: '2',
    //   title: 'Bank Cards',
    //   description: 'View cards, Add Cards',
    //   profileIcon: ComponentImages.ProfileIcons.BankIcon,
    //   rightIcon: ComponentImages.ProfileIcons.ArrowRightIcon,
    //   navigate: () => navigate('ListBankCardScreen'),
    //   showToggle: false,
    //   isToggle: false,
    // },
    {
      id: '3',
      title: 'Account Limits',
      description: 'Know your tier, Upgrade your tier',
      profileIcon: ComponentImages.ProfileIcons.PieChartIcon,
      rightIcon: ComponentImages.ProfileIcons.ArrowRightIcon,
      navigate: () => navigate('AccountTiers'),
      showToggle: false,
      isToggle: false,
    },
    // {
    //   id: '4',
    //   title: 'Terminals',
    //   description: 'Manage your terminals efficiently',
    //   profileIcon: ComponentImages.ProfileIcons.TerminalsIcon,
    //   rightIcon: ComponentImages.ProfileIcons.ArrowRightIcon,
    //   navigate: () => navigate('TerminalsScreen'),
    //   showToggle: false,
    //   isToggle: false,
    // },
    {
      id: '5',
      title: 'Security Settings',
      description: 'Password, Reset PIN, Enable biometrics',
      profileIcon: ComponentImages.ProfileIcons.PadlockIcon,
      rightIcon: ComponentImages.ProfileIcons.ArrowRightIcon,
      navigate: () => navigate('SecuritySettings'),
      showToggle: false,
      isToggle: false,
    },
  ];

  const accountManagement = [
    // {
    //   id: '1',
    //   title: 'Network',
    //   description: 'Check network stability',
    //   profileIcon: ComponentImages.ProfileIcons.InformationFillIcon,
    //   rightIcon: ComponentImages.ProfileIcons.ArrowRightIcon,
    //   navigate: () => navigate('NetworkHomeScreen'),
    //   showToggle: false,
    //   isToggle: false,
    // },
    // {
    //   id: '2',
    //   title: 'Savings',
    //   description: 'Enable or disable savings interest',
    //   profileIcon: ComponentImages.ProfileIcons.SavingsIcon,
    //   rightIcon: ComponentImages.ProfileIcons.ArrowRightIcon,
    //   navigate: () => navigate('SupportScreen'),
    //   isToggle: isSavingsToggle,
    //   showToggle: true,
    //   toggleSwitch: handleSavingsToggle,
    // },
    // {
    //   id: '3',
    //   title: 'Dispute',
    //   description: 'Manage your disputes',
    //   profileIcon: ComponentImages.ProfileIcons.DisputesIcon,
    //   rightIcon: ComponentImages.ProfileIcons.ArrowRightIcon,
    //   navigate: () => navigate('ListDisputesScreen'),
    // },
    {
      id: '4',
      title: 'Add Account',
      description: 'Add a secondary account',
      profileIcon: ComponentImages.ProfileIcons.AddAccountIcon,
      rightIcon: ComponentImages.ProfileIcons.ArrowRightIcon,
      navigate: () => navigate('AddAccount'),
    },
    // {
    //   id: '5',
    //   title: 'Notification Prefences',
    //   description: 'Turn on notifications',
    //   profileIcon: ComponentImages.ProfileIcons.NotificationIcon,
    //   rightIcon: ComponentImages.ProfileIcons.ArrowRightIcon,
    //   navigate: () => navigate('NotificationScreen'),
    // },
    {
      id: '6',
      title: 'Deactivate Account',
      description: 'Close your account',
      profileIcon: ComponentImages.ProfileIcons.DeleteBinIcon,
      navigate: () => navigate('DeactivateAccount'),
    },

    {
      id: '7',
      title: 'Logout',
      profileIcon: ComponentImages.ProfileIcons.LogoutIcon,
      onPress: () => setIsLogoutModalVisible(true),
      navigate: () => {},
    },
  ];

  const handleCloseModal = () => {
    setIsLogoutModalVisible(false);
  };

  const navigateToHome = () => {
    reset({
      index: 0,
      routes: [
        {
          name: 'Home',
          state: {
            index: 0,
            routes: [{name: 'Dashboard'}],
          },
        },
      ],
    });
  };

  useFocusEffect(
    useCallback(() => {
      const backAction = () => {
        navigateToHome();
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
      backAction={navigateToHome}
      keyboardAvoidingType="scroll-view"
      rightTitle="More">
      <SettingsOverviewCard data={profileData} cardTitle="General" />
      <SettingsOverviewCard
        data={accountManagement}
        cardTitle="Account Management"
      />

      <ModalWrapper
        visible={isLogoutModalVisible}
        onClose={() => setIsLogoutModalVisible(false)}>
        <View style={styles.modalContainer}>
          <Typography title="Logout" />
          <Typography
            title="Are you sure you want to Log out of your account? "
            type="body-r"
          />
          <View style={styles.modalButtonContainer}>
            <Button
              title="Cancel"
              containerStyle={styles.cancelButton}
              onPress={handleCloseModal}
            />
            <Button
              onPress={() =>
                dispatch(setCredentials({token: null, user_id: null}))
              }
              title="Logout"
              containerStyle={styles.logoutButton}
            />
          </View>
        </View>
      </ModalWrapper>

      <Pad size={BOTTOM_TAB_CONTAINER_HEIGHT + 40} />
    </MainLayout>
  );
}
