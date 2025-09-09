import { Image, Pressable, View } from 'react-native';
import styles from './styles';
import ComponentImages from '../../../../assets/images/components';
import { IconButton, Typography } from '../../Forms';
import { scaleHeight } from '@utils/Helpers';

interface HeaderProps {
  backAction?: () => void;
  rightTitle?: string;
  rightAction?: () => void;
}

export default function Header({
  backAction = () => { },
  rightTitle,
  rightAction,
}: HeaderProps) {
  return (
    <View style={styles.headerContainer}>
      <IconButton
        onPress={backAction}
        containerStyle={{ paddingVertical: scaleHeight(10) }}>
        <Image
          source={ComponentImages.header.backIcon}
          style={styles.backIcon}
        />
      </IconButton>
      {rightTitle && (
        <Typography onPress={rightAction} title={rightTitle} type="body-sb" />
      )}
    </View>
  );
}
