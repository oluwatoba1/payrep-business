import {useEffect} from 'react';
import {View, Image, ImageBackground} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';

// Local
import styles from './styles';
import IconImages from '@assets/images/appIcons';
import {PublicNavigatorParamList} from '@navigation/types';
import ScreenImages from '@assets/images/screens';
import {Typography} from '@components/Forms';
import {fetchAppState} from '@utils/Helpers';
import {useAppDispatch} from '@store/hooks';
import {updateAppstate} from '@store/slices/appSlice';

type SplashscreenProps = StackScreenProps<
  PublicNavigatorParamList,
  'Splashscreen'
>;

export default function Splashscreen({
  navigation: {navigate},
}: SplashscreenProps) {
  const dispatch = useAppDispatch();
  useEffect(() => {
    (async () => {
      const appState = await fetchAppState();
      dispatch(updateAppstate(appState));
      navigate(appState?.onboarded ? 'Login' : 'Onboarding');
    })();
  }, []);

  return (
    <ImageBackground
      source={ScreenImages.splashscreen.splashscreen}
      style={styles.splashContainer}>
      <View style={styles.cbnLogoContainer}>
        <Image
          source={IconImages.logo.cbnIcon}
          style={styles.cbnLogo}
          alt="cbn-logo"
        />
        <Typography
          title="LICENSED BY CBN"
          type="label-sb"
          style={{fontWeight: '700'}}
        />
      </View>
    </ImageBackground>
  );
}
