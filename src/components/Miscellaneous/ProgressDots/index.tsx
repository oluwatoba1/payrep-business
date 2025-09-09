import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import styles from './styles';

interface ThreeDotProgressProps {
  activeDotIndex: number;
  onDotPress: (index: number) => void;
}

export default function ThreeDotProgress({
  activeDotIndex,
  onDotPress,
}: ThreeDotProgressProps) {
  const dots = [0, 1, 2];

  return (
    <View style={styles.container}>
      {dots.map(dotIndex => (
        <TouchableOpacity
          key={dotIndex}
          style={[styles.dot, activeDotIndex === dotIndex && styles.activeDot]}
          onPress={() => onDotPress(dotIndex)}
        />
      ))}
    </View>
  );
}
