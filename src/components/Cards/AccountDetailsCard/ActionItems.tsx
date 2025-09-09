import {Image, Pressable, View} from 'react-native';
import {styles} from './styles';
import {Typography} from '@components/Forms';
import {IAction} from '.';

interface ActionItemProps {
  action: IAction;
  onNavigate: () => void;
}

export default function ActionItem({action, onNavigate}: ActionItemProps) {
  return (
    <View style={styles.actionsContainer}>
      <Pressable onPress={onNavigate}>
        <View style={styles.action}>
          <Image source={action.icon} style={styles.icon} />
        </View>
      </Pressable>
      <Typography title={action.title} type="body-r" style={styles.iconText} />
    </View>
  );
}
