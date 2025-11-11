import {
  Pressable,
  Text,
  PressableProps,
  TextStyle,
  ViewStyle,
  StyleProp,
} from 'react-native';
import { lighten } from 'polished';

import { styles } from './styles';
import Colors from '../../../theme/Colors';

interface ButtonProps extends PressableProps {
  title: string;
  color?: string;
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: TextStyle;
}

export default function Button({
  title,
  color = Colors.primary?.base,
  containerStyle,
  textStyle = {},
  ...props
}: ButtonProps) {
  const backgroundColor = props.disabled ? lighten(0.4, color) : color;
  return (
    <Pressable
      {...props}
      style={[styles.buttonContainer(backgroundColor), containerStyle]}>
      <Text style={{ ...styles.buttonText, ...textStyle }}>{title}</Text>
    </Pressable>
  );
}
