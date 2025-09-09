import React, {ReactNode} from 'react';
import {
  GestureResponderEvent,
  Pressable,
  TouchableOpacityProps,
  ViewStyle,
} from 'react-native';

interface IconButtonProps extends TouchableOpacityProps {
  children: ReactNode;
  onPress: (event: GestureResponderEvent) => void;
  containerStyle?: ViewStyle;
}

export default function IconButton({
  children,
  onPress = () => {},
  containerStyle = {},
}: IconButtonProps) {
  return (
    <Pressable style={containerStyle} onPress={onPress}>
      {children}
    </Pressable>
  );
}
