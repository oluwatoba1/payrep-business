import { ReactNode, useState, memo, useMemo, useCallback } from "react";
import {
	View,
	TextInput as RNTextInput,
	TextInputProps,
	Image,
	Pressable,
	ViewStyle,
} from "react-native";
import { Typography } from "@components/Forms";
import styles from "./styles";
import ComponentImages from "@assets/images/components";
import { Row } from "@components/Layout";
import Colors from "@theme/Colors";
import Pad from "@components/Pad";

interface RNTextInputProps extends TextInputProps {
	label: string;
	type?: "text" | "phone" | "password";
	leftNode?: ReactNode;
	rightNode?: ReactNode;
	leftNodeAction?: () => void;
	rightNodeAction?: () => void;
	error?: string;
	customTextInputStyle?: ViewStyle;
	customInputContainerStyle?: ViewStyle;
	/**
	 * If true, only digits will be allowed (in addition to phone type).
	 * Useful for amounts / OTP etc.
	 */
	numericOnly?: boolean;
}

const TextInput = memo(function TextInput({
	label,
	type = "text",
	leftNode,
	rightNode,
	leftNodeAction,
	rightNodeAction,
	error,
	placeholder,
	customTextInputStyle = {},
	customInputContainerStyle = {},
	numericOnly,
	...props
}: RNTextInputProps) {
	const [passwordVisible, setPasswordVisible] = useState(type !== "password");

	// Left node
	const leftElement = useMemo(() => {
		if (leftNode) return leftNode;

		if (type === "phone") {
			return (
				<Pressable onPress={leftNodeAction}>
					<Row justifyContent='flex-start' gap={8}>
						<Image
							source={ComponentImages.textInput.flag}
							style={styles.flagIcon}
						/>
						<Typography title='+234' type='body-sr' color='#9DA1A8' />
					</Row>
				</Pressable>
			);
		}
		return null;
	}, [leftNode, type, leftNodeAction]);

	// Right node (password eye icon, etc.)
	const rightElement = useMemo(() => {
		if (rightNode) return rightNode;

		if (type === "password") {
			return (
				<Pressable
					hitSlop={10}
					onPress={() =>
						rightNodeAction
							? rightNodeAction()
							: setPasswordVisible((prev) => !prev)
					}
				>
					<Image
						source={
							passwordVisible
								? ComponentImages.textInput.eyeLiner
								: ComponentImages.textInput.offEyeLiner
						}
					/>
				</Pressable>
			);
		}
		return null;
	}, [rightNode, type, passwordVisible, rightNodeAction]);

	// Only use key hack for passwords (avoid focus loss on normal inputs)
	const inputKey =
		type === "password" ? (passwordVisible ? "visible" : "hidden") : undefined;

	// Resolve keyboard type so numeric inputs feel more native & responsive
	const resolvedKeyboardType =
		type === "phone"
			? "phone-pad"
			: props.keyboardType ?? (numericOnly ? "number-pad" : "default");

	// Centralized change handler – super cheap, and we keep digits-only for phone / numeric
	const handleChangeText = useCallback(
		(text: string) => {
			let next = text;

			// For phone / numeric inputs, strip non-digits.
			// This is very cheap and keeps the field "dumb" and fast.
			if (type === "phone" || numericOnly) {
				next = text.replace(/[^\d]/g, "");
			}

			if (props.onChangeText) {
				props.onChangeText(next);
			}
		},
		[props.onChangeText, type, numericOnly]
	);

	return (
		<View style={styles.inputContainer}>
			{label ? <Typography title={label} type='label-sb' /> : null}
			<Pad size={4} />

			<View style={[styles.textInputContainer, customInputContainerStyle]}>
				{/* Left Node */}
				{leftElement && (
					<View style={styles.leftNodeContainer}>{leftElement}</View>
				)}

				<RNTextInput
					key={inputKey}
					style={[styles.textInput, customTextInputStyle]}
					cursorColor={Colors.black}
					placeholder={placeholder || label}
					placeholderTextColor={Colors.custom.textInputPlaceholderColor}
					secureTextEntry={type === "password" && !passwordVisible}
					// Spread props first so we can override critical perf-related ones below
					{...props}
					keyboardType={resolvedKeyboardType}
					autoCapitalize='none'
					autoCorrect={false}
					importantForAutofill='no'
					onChangeText={handleChangeText}
				/>

				{/* Right Node */}
				{rightElement && (
					<View style={styles.rightNodeContainer}>{rightElement}</View>
				)}
			</View>

			{/* Error Message */}
			{error && (
				<View>
					<Pad size={4} />
					<Typography title={error} color={Colors.danger.base} type='label-r' />
				</View>
			)}
		</View>
	);
});

export default TextInput;
