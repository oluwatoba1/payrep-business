import React from 'react';
import { Switch, View } from 'react-native';
import { styles } from './styles';

interface CustomSwitchProps {
  value: boolean;
  onValueChange: (value: boolean) => void;
  thumbColorOn?: string;
  thumbColorOff?: string;
  trackColorOn?: string;
  trackColorOff?: string;
}

export default function CustomSwitch({
  value,
  onValueChange,
  thumbColorOn = '#FFFFFF',
  thumbColorOff = '#F4F3F4',
  trackColorOn = '#02AB75',
  trackColorOff = '#767577',
}: CustomSwitchProps){
  return (
    <Switch
      value={value}
      onValueChange={onValueChange}
      thumbColor={value ? thumbColorOn : thumbColorOff}
      trackColor={{false: trackColorOff, true: trackColorOn}}
      style={styles.switch}
    />
  );
};
