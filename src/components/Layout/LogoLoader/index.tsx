import {useEffect, useRef} from 'react';
import {Animated, Easing, Modal, View} from 'react-native';

import IconImages from '@assets/images/appIcons';
import Colors from '@theme/Colors';
import Pad from '@components/Pad';
import {Typography} from '@components/Forms';
import styles from './styles';

interface LoaderProps {
  title: string;
  isLoading: boolean;
}

export default function LogoLoader({title, isLoading}: LoaderProps) {
  const scaleValue = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (isLoading) {
      startAnimation();
    } else {
      stopAnimation();
    }
  }, [isLoading]);

  const startAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleValue, {
          toValue: 1.1,
          duration: 500,
          useNativeDriver: true,
          easing: Easing.ease,
        }),
        Animated.timing(scaleValue, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
          easing: Easing.ease,
        }),
      ]),
    ).start();
  };

  const stopAnimation = () => {
    scaleValue.stopAnimation();
    scaleValue.setValue(1);
  };

  return (
    <Modal transparent={true} animationType="fade" visible={isLoading}>
      <View style={styles.loaderPage}>
        <View style={styles.loaderContainer}>
          <Animated.Image
            source={IconImages.logo.payrepBrandLogo}
            style={[styles.logo, {transform: [{scale: scaleValue}]}]}
          />
          <Pad size={24} />
          <View style={styles.textContainer}>
            <Typography title={title} type="body-b" color={Colors.white} />
          </View>
        </View>
      </View>
    </Modal>
  );
}
