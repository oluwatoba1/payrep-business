import React from 'react';
import { Animated, StyleSheet, TouchableOpacity } from 'react-native';
import { Typography } from '../../Forms';


type Props = {
    topAnimation: Animated.Value;
    openHeight: number;
    closeHeight: number;
    close: () => void;
};

const BackDrop = ({ topAnimation, openHeight, closeHeight, close }: Props) => {
    // Ensure inputRange is monotonically increasing
    const inputRange = [Math.min(closeHeight, openHeight), Math.max(closeHeight, openHeight)];;
    const outputRange = [0, 0.5];

    // Create animated opacity value based on the topAnimation value
    const opacity = topAnimation.interpolate({
        inputRange,
        outputRange,
        extrapolate: 'clamp', // Ensures opacity stays within the specified range
    });

    // Create animated style object
    const backDropAnimation = {
        opacity,
    };

    return (
        <TouchableOpacity onPress={close} style={styles.overlay}>
            <Animated.View style={[styles.container, backDropAnimation]}>
                <Typography title="BackDrop" />
            </Animated.View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'transparent', 
    },
    container: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'black',
    },
});

export default BackDrop;
