import React, {ReactNode, useState, useEffect} from 'react';
import {Animated, PanResponder, ViewStyle} from 'react-native';

interface SwipeableViewProps {
  children: ReactNode;
  direction: 'right' | 'down';
  autoHide?: boolean;
  duration?: number;
  callback?: () => void;
  styles?: ViewStyle;
}

export default function SwipeableView({
  children,
  direction,
  autoHide = false,
  duration = 1000,
  callback,
  styles = {},
}: SwipeableViewProps) {
  const [animatedValue] = useState(new Animated.Value(0));
  const [showSwipeableView, setShowSwipeableView] = useState(true);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (_, gestureState) => {
      const {dx, dy} = gestureState;
      animatedValue.setValue(direction === 'right' ? dx : dy > 0 ? dy : 0);
    },
    onPanResponderRelease: (_, gestureState) => {
      const {dx, dy} = gestureState;
      if (dx > 100 || dy > 100) {
        Animated.timing(animatedValue, {
          toValue: 600,
          duration: 500,
          useNativeDriver: false,
        }).start(() => [callback && callback(), setShowSwipeableView(false)]);
      } else {
        Animated.spring(animatedValue, {
          toValue: 0,
          friction: 5,
          useNativeDriver: false,
        }).start();
      }
    },
  });

  const animatedStyle = {
    ...styles,
    flex: 1,
    transform: [
      direction === 'right'
        ? {translateX: animatedValue}
        : {translateY: animatedValue},
    ],
  };

  useEffect(() => {
    if (autoHide) {
      const timeout = setTimeout(() => {
        Animated.timing(animatedValue, {
          toValue: 600,
          duration: 500,
          useNativeDriver: false,
        }).start(() => setShowSwipeableView(false));
      }, duration);
      return () => clearTimeout(timeout);
    }
    // eslint-disable-next-line
  }, []);
  return showSwipeableView ? (
    <Animated.View {...panResponder.panHandlers} style={animatedStyle}>
      {children}
    </Animated.View>
  ) : null;
}
