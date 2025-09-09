import React, { useEffect, useRef } from "react";
import { Animated, ImageStyle, Pressable, PressableProps, TextStyle, View, ViewStyle } from "react-native";
import IconImages from "../../../../assets/images/appIcons";
import Typography from "../Typography";
import styles, { getAnimatedViewStyles } from "./styles";


interface Option {
  value: string | number;
  title: string;
  width?: "auto" | number | string;  
}

interface ButtonTabProps extends PressableProps {
  options: Option[];
  selectedValue: string | number | undefined;
  onSelect: (value: string | number | undefined) => void;
  containerStyle?: ViewStyle;
  textStyle?: TextStyle;
  optionContainerStyle?: ViewStyle; 
}

export default function ButtonTab({
  options,
  selectedValue,
  onSelect,
  containerStyle,
  textStyle,
  optionContainerStyle,
  ...props
}: ButtonTabProps) {
  return (
    <View style={[styles.container, containerStyle]}>
      {options.map((option) => {
        const isChecked = option.value === selectedValue;
        const animatedScale = useRef(new Animated.Value(1)).current;
        const animatedOpacity = useRef(new Animated.Value(0)).current;

        useEffect(() => {
          Animated.timing(animatedOpacity, {
            toValue: isChecked ? 1 : 1,
            duration: 300,
            useNativeDriver: true,
          }).start();

          Animated.spring(animatedScale, {
            toValue: isChecked ? 1.1 : 1,
            friction: 5,
            useNativeDriver: true,
          }).start();
        }, [isChecked]);

        return (
          <Pressable
            key={option.value}
            style={[
              styles.optionContainer,
              { width: option.width || "auto" }, 
              optionContainerStyle,
            ]}
            onPress={() => onSelect(option.value)}
            {...props}
          >
            <Animated.View
              style={getAnimatedViewStyles(animatedScale)}
            >
              <Animated.Image
                style={[styles.image, { opacity: animatedOpacity } as ImageStyle]}
                source={
                  isChecked
                    ? IconImages.icon.radioChecked
                    : IconImages.icon.radioUnchecked
                }
              />
            </Animated.View>
            <Typography
              title={option.title}
              type="body-r"
            />
          </Pressable>
        );
      })}
    </View>
  );
}
