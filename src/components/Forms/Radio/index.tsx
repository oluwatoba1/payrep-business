import React, {useRef, useEffect} from 'react';
import {
  Animated,
  Image,
  TouchableOpacity,
  View,
  ViewStyle,
  TextStyle,
  Pressable,
} from 'react-native';
import Typography from '../Typography';
import IconImages from '../../../../assets/images/appIcons';
import {styles} from './styles';
import {Row} from '@components/Layout';

interface RadioProps {
  label: string;
  value: boolean;
  onPress: () => void;
  containerStyle?: ViewStyle;
}

export default function Radio({
  label,
  value,
  onPress,
  containerStyle = {},
}: RadioProps) {
  return (
    <Row alignItems="center" gap={5} containerStyle={containerStyle}>
      <Pressable onPress={onPress} style={styles.container}>
        {value ? <View style={styles.radio} /> : <View />}
      </Pressable>
      <Typography title={label} type="body-sr" />
    </Row>
  );
}
