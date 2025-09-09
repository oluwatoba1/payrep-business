import {Image, ImageBackground, View} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import LinearGradient from 'react-native-linear-gradient';

// Local
import {PublicNavigatorParamList} from '@navigation/types';
import {AuthLayout} from '@components/Layout';
import IconImages from '@assets/images/appIcons';
import {styles} from './styles';
import ComponentImages from '@assets/images/components';
import {Button} from '@components/Forms';

type LandingProps = StackScreenProps<
  PublicNavigatorParamList,
  'Landing'
>;

export default function Landing({
  navigation: {navigate},
}: LandingProps) {
  return (
    <AuthLayout>
      <ImageBackground
        source={ComponentImages.onboarding.cashImage}
        imageStyle={styles.imageBackgroundImageStyle}
        style={styles.imageBackgroundStyle}
      />
      <LinearGradient
        colors={['rgba(255, 249, 235, 0.30)', '#F7B800']}
        start={{x: 0.15, y: 0}}
        end={{x: 0.7, y: 0.6}}
        style={styles.linearGradient}>
        <View>
          <Image
            source={IconImages.logo.payrepBlackWithText}
            style={styles.payrepLogo}
            alt="Payrep-Logo"
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title="Create an Account"
            containerStyle={styles.signupButtonStyle}
            textStyle={styles.signupTextStyle}
            onPress={() => navigate("MobileNumber", {userType: "corporate"})}
          />
          <Button
            title="Login"
            containerStyle={styles.loginButtonStyle}
            onPress={() => navigate('Login')}
          />
        </View>
      </LinearGradient>
    </AuthLayout>
  );
}
