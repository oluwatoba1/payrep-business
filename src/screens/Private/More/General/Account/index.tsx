import {useCallback, useState} from 'react';
import {
  Image,
  Pressable,
  Text,
  View,
  ScrollView,
  BackHandler,
} from 'react-native';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {StackScreenProps} from '@react-navigation/stack';
import {
  CompositeScreenProps,
  useFocusEffect,
  useNavigation,
} from '@react-navigation/native';

import {MainLayout, Row} from '@components/Layout';
import {AccountCard} from '@components/Cards';
import {styles} from './styles';
import {Typography} from '@components/Forms';
import {
  BottomTabParamList,
  MoreStackParamList,
  PrivateNavigatorParamList,
} from '@navigation/types';
import IconImages from '@assets/images/appIcons';
import {useAppSelector} from '@store/hooks';

type AccountProps = CompositeScreenProps<
  StackScreenProps<MoreStackParamList, 'Account'>,
  StackScreenProps<PrivateNavigatorParamList, 'BottomTabs'>
>;

export default function Account({navigation: {navigate}}: AccountProps) {
  const customer = useAppSelector(state => state.customer.customer);
  const [selectedTab, setSelectedTab] = useState<string>('Basic Information');

  const {reset} = useNavigation<BottomTabNavigationProp<BottomTabParamList>>();

  const AccountItems = ['Basic Information'];

  const personalInfo = {
    firstName: customer?.first_name || '-',
    middleName: customer?.other_name || '-',
    lastName: customer?.surname || '-',
    dateOfBirth: customer?.dob || '-',
    emailAddress: customer?.email || '-',
    phoneNumber: customer?.mobile_number || '-',
    bvn: customer?.kyc?.bvn || '-',
    nin: customer?.kyc?.nin || '-',
  };

  const addressInfo = {
    homeAddress: customer?.residential_address || '-',
    state: customer?.state__name || '-',
    lga: customer?.lga__name || '-',
    country: customer?.nationality || '-',
  };

  const nextOfKinInfo = {
    fullName: customer?.next_of_kin__name || '-',
    emailAddress: customer?.next_of_kin__name || '-',
    phoneNumber: customer?.next_of_kin__mobile_phone || '-',
    address: customer?.next_of_kin__address || '-',
    relationship: customer?.next_of_kin__relationship || '-',
  };

  const settlementBank = {
    accountName: 'Musa Abdullahi Omeiza',
    accountNumber: '20234545656',
    bank: 'Gurus bank plc',
  };

  const handleTabPress = (tab: string) => {
    setSelectedTab(tab);
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
    return true;
  };

  useFocusEffect(
    useCallback(() => {
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        navigateToHome,
      );

      return () => backHandler.remove(); // Cleanup
    }, []),
  );

  return (
    <MainLayout backAction={navigateToHome} rightTitle="My Profile">
      <View style={styles.profileContainerStyle}>
        <Row justifyContent="center">
          <Image
            style={styles.profileImageStyle}
            source={
              customer?.image
                ? {uri: customer?.image}
                : IconImages.users.careUser
            }
          />
        </Row>
        <View style={styles.tabContainer}>
          {AccountItems.map(item => (
            <Pressable
              key={item}
              onPress={() => handleTabPress(item)}
              style={[
                styles.tabItem,
                selectedTab === item ? styles.activeTab : styles.inactiveTab,
              ]}>
              <View style={styles.tabIconContainer}>
                <Typography
                  style={styles.tabIcon}
                  title={`${AccountItems.indexOf(item) + 1}`}
                />
              </View>
              <Text style={styles.tabText}>{item}</Text>
            </Pressable>
          ))}
        </View>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}>
          {selectedTab === 'Basic Information' && (
            <View>
              <AccountCard accountInfo={personalInfo} title="Personal Info" />
              <AccountCard accountInfo={addressInfo} title="Address" />
              <AccountCard
                accountInfo={personalInfo}
                title="Business Information"
              />
              <AccountCard
                accountInfo={nextOfKinInfo}
                title="Next of Kin Details"
              />
            </View>
          )}
          {selectedTab === 'Settlement Bank' && (
            <AccountCard accountInfo={settlementBank} title="Settlement Bank" />
          )}
        </ScrollView>
      </View>
    </MainLayout>
  );
}
