import {BackHandler, Image, Pressable, View} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';

import ScreenImages from '@assets/images/screens';
import {MainLayout, Row} from '@components/Layout';
import {styles} from './styles';
import {Typography} from '@components/Forms';
import CustomCard from '@components/Cards/CustomCard';
import {BottomTabParamList} from '@navigation/types';
import {useCallback} from 'react';
import Pad from '@components/Pad';

export default function SupportScreen() {
  const {reset} = useNavigation<BottomTabNavigationProp<BottomTabParamList>>();

  const IMAGES = [
    ScreenImages.profileScreen.instaIcon,
    ScreenImages.profileScreen.twitterIcon,
    ScreenImages.profileScreen.facebookIcon,
    ScreenImages.profileScreen.linkedInIcon,
    ScreenImages.profileScreen.youtubeIcon,
  ];

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
    <MainLayout backAction={navigateToHome}>
      <View style={styles.supportSection}>
        <Typography title="Support" />
        <Typography
          title="We are available 24/7. Contact us via our different communication channels."
          type="subheading"
        />
      </View>

      <CustomCard
        visible={true}
        customContainerStyle={{
          height: 262,
          backgroundColor: '#E9EBEC',
          flex: 0.5,
          paddingVertical: 32,
          paddingHorizontal: 16,
        }}>
        <View style={styles.supportSection}>
          <Row justifyContent="flex-start" gap={15}>
            <Image
              source={ScreenImages.profileScreen.mailLineIcon}
              style={styles.icon}
            />
            <View>
              <Typography title="Send us an email to " type="body-sb" />
              <Typography title="Payrepsupport@gmail.com" type="body-sb" />
            </View>
          </Row>
          <Row justifyContent="flex-start" gap={15}>
            <Image
              source={ScreenImages.profileScreen.phoneLineIcon}
              style={styles.icon}
            />
            <View style={{width: '85%'}}>
              <Typography
                title="Reach our customer representative on"
                type="body-sb"
              />

              <Typography
                title="+2348190457823 or start a chat on whatsapp +2348067345123"
                type="body-sb"
              />
            </View>
          </Row>
        </View>

        <Pad size={16} />

        <Typography
          title="Connect with us on our Social Media Platform"
          type="body-r"
          style={{textAlign: 'center'}}
        />

        <Pad />

        <Row alignItems="center" justifyContent="center" gap={20}>
          {IMAGES.map((image, index) => (
            <Pressable key={index}>
              <Image source={image} style={styles.socialMediaIcon} />
            </Pressable>
          ))}
        </Row>
      </CustomCard>
    </MainLayout>
  );
}
