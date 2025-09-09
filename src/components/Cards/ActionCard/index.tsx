import {Image, Pressable, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {Typography} from '@components/Forms';
import Colors from '@theme/Colors';
import styles from './styles';

interface ActionCardProps {
  title: string;
  icon: any;
  onPress: () => void;
  disabled?: boolean;
}

export default function ActionCard({
  title,
  icon,
  onPress,
  disabled = false,
}: ActionCardProps) {
  return (
    <Pressable style={styles.cardWrapper} onPress={onPress} disabled={disabled}>
      <LinearGradient
        colors={
          disabled
            ? [Colors.gray[100], Colors.gray[400]]
            : [Colors.primary[50], Colors.primary[100]]
        }
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={[styles.card, disabled && styles.cardDisabled]}>
        <View style={styles.iconContainer}>
          <Image source={icon} style={styles.icon} resizeMode="contain" />
        </View>
        <Typography title={title} type="body-sb" style={styles.text} />
      </LinearGradient>
    </Pressable>
  );
}
