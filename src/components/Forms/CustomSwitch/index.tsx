import React, { useEffect, useRef } from "react";
import { Animated, Pressable, Easing, ViewStyle } from "react-native";
import { styles } from "./styles";

interface CustomSwitchProps {
	value: boolean;
	onValueChange: (val: boolean) => void;
	visible?: boolean;
	disabled?: boolean;
	trackColorOn?: string;
	trackColorOff?: string;
	thumbColorOn?: string;
	thumbColorOff?: string;
	style?: ViewStyle;
}

const CustomSwitch: React.FC<CustomSwitchProps> = ({
	value,
	onValueChange,
	visible = true,
	disabled = false,
	trackColorOn = "#02AB75",
	trackColorOff = "#767577",
	thumbColorOn = "#FFFFFF",
	thumbColorOff = "#F4F3F4",
	style,
}) => {
	const opacity = useRef(new Animated.Value(visible ? 1 : 0)).current;
	const translateX = useRef(new Animated.Value(value ? 20 : 0)).current;

	// Fade in/out animation for visibility
	useEffect(() => {
		Animated.timing(opacity, {
			toValue: visible ? 1 : 0,
			duration: 250,
			useNativeDriver: true,
		}).start();
	}, [visible]);

	// Animate thumb movement on toggle
	useEffect(() => {
		Animated.timing(translateX, {
			toValue: value ? 20 : 0,
			duration: 200,
			easing: Easing.out(Easing.circle),
			useNativeDriver: true,
		}).start();
	}, [value]);

	const handlePress = () => {
		if (!disabled) onValueChange(!value);
	};

	return (
		<Animated.View style={[styles.wrapper, style, { opacity }]}>
			<Pressable
				onPress={handlePress}
				disabled={disabled}
				style={({ pressed }) => [
					styles.track,
					{
						backgroundColor: disabled
							? "#ccc"
							: value
							? trackColorOn
							: trackColorOff,
						opacity: pressed ? 0.8 : 1,
					},
				]}
			>
				<Animated.View
					style={[
						styles.thumb,
						{
							transform: [{ translateX }],
							backgroundColor: disabled
								? "#aaa"
								: value
								? thumbColorOn
								: thumbColorOff,
						},
					]}
				/>
			</Pressable>
		</Animated.View>
	);
};

export default CustomSwitch;
