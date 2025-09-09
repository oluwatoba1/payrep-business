import {View, Image, Text, ImageSourcePropType, Pressable} from 'react-native';
import styles from './styles';
import Pad from '../../Pad';
import ThreeDotProgress from '../ProgressDots';

interface IOnboardingData {
  title: string;
  description: string;
  backgroundImage: ImageSourcePropType;
  progressImage: ImageSourcePropType;
}

interface OnboardingSectionProps {
  onboardingData: IOnboardingData[];
  index: number;
  onClickProgress: (index: number) => void;
  onNextProgress: () => void;
}
export default function OnboardingSection({
  onboardingData,
  index,
  onClickProgress,
  onNextProgress,
}: OnboardingSectionProps) {
  return (
    <View style={styles.onboardingSectionContainerStyle}>
      <View style={styles.onboardingAvatarContainerStyle}>
        <Image
          source={onboardingData[index].backgroundImage}
          style={styles.onboardingAvatarStyle}
        />
      </View>
      <View style={styles.onboardingContentContainerStyle}>
        <Pad size={40} />

        <Text style={styles.OnboardingTextHeaderStyle}>
          {onboardingData[index].title}
        </Text>

        <Pad size={16} />

        <Text style={styles.onboardingTextBodyStyle}>
          {onboardingData[index].description}
        </Text>

        <Pad size={63} />
        <View style={styles.onboardingButtonContainerStyle}>
          <View>
            <ThreeDotProgress
              activeDotIndex={index}
              onDotPress={onClickProgress}
            />
          </View>
          <Pressable onPress={onNextProgress}>
            <Image
              source={onboardingData[index].progressImage}
              style={styles.onboardingProgressCircleStyle}
            />
          </Pressable>
        </View>
        <Pad size={93} />
      </View>
    </View>
  );
}
