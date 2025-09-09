import {StyleProp, Text, TextStyle} from 'react-native';
import Colors from '../../../theme/Colors';

interface HeaderProps {
  title: string;
  color: string;
  textStyle?: StyleProp<TextStyle>;
}

export default function Header({
  title,
  color = Colors.black,
  textStyle,
}: HeaderProps) {
  return <Text style={[textStyle]}>{title}</Text>;
}
