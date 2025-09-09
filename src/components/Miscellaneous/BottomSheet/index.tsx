import React, {
  useCallback,
  useImperativeHandle,
  useRef,
  forwardRef,
} from 'react';
import {
  Animated,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import {Gesture, GestureDetector} from 'react-native-gesture-handler';
import {Typography} from '../../Forms';
import BackDrop from '../BackDrop';

interface BottomSheetProps {
  snapTo?: string;
}

const BottomSheet = forwardRef(({snapTo = ''}: BottomSheetProps, ref) => {
  const {height} = Dimensions.get('screen');
  const closeHeight = height;
  const percentage = parseFloat(snapTo?.replace('%', '')) / 100;
  const openHeight = height - height * percentage;

  const topAnimation = useRef(new Animated.Value(closeHeight)).current;
  const context = useRef(0);
  const topAnimationValue = useRef(closeHeight);

  topAnimation.addListener(({value}) => {
    topAnimationValue.current = value;
  });

  const expand = useCallback(() => {
    Animated.timing(topAnimation, {
      toValue: openHeight,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [openHeight, topAnimation]);

  // Use Animated.timing for smooth closing
  const close = useCallback(() => {
    Animated.timing(topAnimation, {
      toValue: closeHeight,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [closeHeight, topAnimation]);

  useImperativeHandle(
    ref,
    () => ({
      expand,
      close,
    }),
    [expand, close],
  );

  const pan = Gesture.Pan()
    .onBegin(() => {
      context.current = topAnimationValue.current;
    })
    .onUpdate(event => {
      const newValue = event.translationY + context.current;

      if (newValue < openHeight) {
        topAnimation.setValue(openHeight);
      } else if (newValue > closeHeight) {
        topAnimation.setValue(closeHeight);
      } else {
        topAnimation.setValue(newValue);
      }
    })
    .onEnd(() => {
      if (topAnimationValue.current > openHeight + 50) {
        Animated.spring(topAnimation, {
          toValue: closeHeight,
          damping: 20,
          stiffness: 200,
          useNativeDriver: false,
        }).start();
      } else {
        Animated.spring(topAnimation, {
          toValue: openHeight,
          damping: 20,
          stiffness: 200,
          useNativeDriver: false,
        }).start();
      }
    });

  const animatedStyle = {
    top: topAnimation,
  };

  return (
    <>
      <BackDrop
        topAnimation={topAnimation}
        closeHeight={closeHeight}
        openHeight={openHeight}
        close={close}
      />
      <GestureDetector gesture={pan}>
        <Animated.View style={[styles.container, animatedStyle]}>
          <View style={styles.lineContainer}>
            <View style={styles.line} />
          </View>
        </Animated.View>
      </GestureDetector>
    </>
  );
});

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'gray',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    width: '100%',
  },
  lineContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  line: {
    width: 50,
    height: 4,
    backgroundColor: 'black',
    borderRadius: 20,
  },
});

export default BottomSheet;
