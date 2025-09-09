import React from 'react';
import { View, ScrollView, TouchableOpacity, ViewStyle } from 'react-native';
import { cardStyles } from './styles';

interface CustomCardProps {
  visible: boolean;
  children: React.ReactNode;
  onPress?: () => void; 
  backgroundColor?: string; 
  borderRadius?: number; 
  customContainerStyle?: ViewStyle[] | ViewStyle; 
  contentContainerStyle?: ViewStyle;
  activeOpacity?: number
}

export default function CustomCard({
  visible,
  children,
  onPress,
  customContainerStyle,
  contentContainerStyle,
  activeOpacity = 1
}: CustomCardProps) {
  if (!visible) return null;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[cardStyles.cardContainer, customContainerStyle]}
      activeOpacity={activeOpacity}
    >
      <ScrollView 
        style={cardStyles.cardContent} 
        contentContainerStyle={contentContainerStyle}
        showsVerticalScrollIndicator={false} 
      >
        {children}
      </ScrollView>
    </TouchableOpacity>
  );
}
