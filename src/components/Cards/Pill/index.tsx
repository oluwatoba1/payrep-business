import React from 'react';
import {Pressable, TextStyle, ViewStyle} from 'react-native';

import {Typography} from '@components/Forms';
import Colors from '@theme/Colors';
import styles from './styles';

interface PillProps {
  containerStyle?: ViewStyle;
  textStyle?: TextStyle;
  text: string;
  onPress?: () => void;
}

export default function Pill({
  containerStyle,
  textStyle,
  text,
  onPress = () => {},
}: PillProps) {
  return (
    <Pressable onPress={onPress} style={[styles.pill, containerStyle]}>
      <Typography
        title={text}
        type="label-sb"
        color={Colors.white}
        style={textStyle}
        numberOfLines={1}
      />
    </Pressable>
  );
}
