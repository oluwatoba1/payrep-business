import {ScrollView, View} from 'react-native';
import {MainLayout} from '../../../../../../components/Layout';
import {Typography} from '../../../../../../components/Forms';
import {generalStyles} from '../../../styles';
import ComponentImages from '../../../../../../../assets/images/components';
import {SettingsOverviewCard} from '../../../../../../components/Cards';
import {styles} from './styles';
import ScreenImages from '../../../../../../../assets/images/screens';

export default function NetworkHome() {
  const profileData = [
    {
      id: '1',
      title: 'Bank Transfer',
      profileIcon: ScreenImages.MoreScreen.piggybank,
      rightIcon: ScreenImages.MoreScreen.arrowRightIcon,
      screen: 'BankTransferNetworkScreen',
      showToggle: false,
      isToggle: false,
    },
    {
      id: '2',
      title: 'Card Payment',
      profileIcon: ScreenImages.MoreScreen.bankCard,
      rightIcon: ScreenImages.MoreScreen.arrowRightIcon,
      screen: 'CardPaymentNetworkScreen',
      showToggle: false,
      isToggle: false,
    },
    {
      id: '3',
      title: 'Airtime/Data',
      profileIcon: ScreenImages.MoreScreen.phone,
      rightIcon: ScreenImages.MoreScreen.arrowRightIcon,
      screen: 'AirtimeDataNetworkScreen',
      showToggle: false,
      isToggle: false,
    },
    {
      id: '4',
      title: 'Bills Payment',
      profileIcon: ScreenImages.MoreScreen.paperMoney,
      rightIcon: ScreenImages.MoreScreen.arrowRightIcon,
      screen: 'BillsPaymentNetworkScreen',
      showToggle: false,
      isToggle: false,
      breakAfter: true,
    },
  ];

  return (
    <MainLayout backAction={() => {}}>
      <View style={generalStyles.container}>
        <View style={generalStyles.titleContainer}>
          <Typography title="Network" type="heading4-sb" />
          <Typography
            title="Get real time network updates to ensure seamless transactions and smooth operations."
            type="body-r"
          />
        </View>
        <ScrollView
          // contentContainerStyle={styles.scrollViewContent}
          showsHorizontalScrollIndicator={false}>
          <SettingsOverviewCard
            customProfileContainerStyle={styles.profileContainer}
            customCardStyle={styles.cardContainer}
            data={profileData}
          />
        </ScrollView>
      </View>
    </MainLayout>
  );
}
