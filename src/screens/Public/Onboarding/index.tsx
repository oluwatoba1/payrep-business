import React, { useState } from 'react';
import { View, Text, Image, Pressable } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';

// Local
import { AuthLayout } from '@components/Layout';
import IconImages from '@assets/images/appIcons';
import styles from './styles';
import { PublicNavigatorParamList } from '@navigation/types';
import { OnboardingSection } from '@components/Miscellaneous';
import { ONBOARDING_DATA } from '@utils/Constants';
import { persistAppState } from '@utils/Helpers';

type OnboardingProps = StackScreenProps<PublicNavigatorParamList, 'Onboarding'>;

export default function Onboarding({ navigation: { navigate } }: OnboardingProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleClickProgress = (index: number) => {
    setActiveIndex(index);
  };

  const skip = async () => {
    await persistAppState({ onboarded: true })
    navigate('Landing');
  };

  const handleNextProgress = () => {
    activeIndex === 2
      ? skip()
      : setActiveIndex((activeIndex + 1) % ONBOARDING_DATA.length);
  };

  return (
    <AuthLayout>
      <View style={styles.onboardingContainer}>
        <View style={styles.onboardingHeaderContainer}>
          <View style={styles.onboardingLogoContainer}>
            <Image
              style={styles.onboardingLogo}
              source={IconImages.logo.payrepLogo}
              alt="payrep-logo"
            />
            <Pressable onPress={skip}>
              <Text style={styles.onboardingText}>Skip</Text>
            </Pressable>
          </View>
        </View>
        <OnboardingSection
          onboardingData={ONBOARDING_DATA}
          index={activeIndex}
          onClickProgress={handleClickProgress}
          onNextProgress={handleNextProgress}
        />
      </View>
    </AuthLayout>
  );
}
