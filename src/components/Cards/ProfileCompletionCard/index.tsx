import {View} from 'react-native';

import {Typography} from '../../Forms';
import CustomCard from '../CustomCard';
import {styles} from './styles';
import {HorizontalProgressBar} from '@components/Miscellaneous';

interface ProfileCompletionCardProps {
  title: string;
  body: string;
  progress: number;
  handleNavigation: () => void;
}

export default function ProfileCompletionCard({
  title,
  body,
  progress,
  handleNavigation,
}: ProfileCompletionCardProps) {
  return (
    <CustomCard
      visible={true}
      customContainerStyle={styles.ProfileCompletionCardContainer}
      onPress={handleNavigation}>
      <View style={styles.itemContainer}>
        <View style={styles.textContainer}>
          <Typography
            type="subheading-sb"
            title={title}
            style={styles.textColor}
          />
          <Typography type="label-r" title={body} style={styles.textColor} />
        </View>

        <HorizontalProgressBar
          progress={progress}
          text={`${progress}% complete profile`}
          textStyle={styles.textColor1}
        />
      </View>
    </CustomCard>
  );
}
