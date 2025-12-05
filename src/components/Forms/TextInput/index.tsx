import { ReactNode, useState, memo } from "react";
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
	...props
}: RNTextInputProps) {
	const [passwordVisible, setPasswordVisible] = useState(
		!(type === "password")
	);

	/** ✅ Compute left element declaratively (no state mutation) */
	const renderLeftElement = () => {
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
	};

	/** ✅ Compute right element declaratively (no useEffect flicker) */
	const renderRightElement = () => {
		if (rightNode) return rightNode;

		if (type === "password") {
			return (
				<Pressable
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
	};

	const leftElement = renderLeftElement();
	const rightElement = renderRightElement();

	return (
		<View style={styles.inputContainer}>
			<Typography title={label} type='label-sb' />
			<Pad size={4} />

			<View style={[styles.textInputContainer, customInputContainerStyle]}>
				{/* Left Node — always keep space reserved */}
				<View
					style={[
						styles.leftNodeContainer,
						!leftElement ? { opacity: 0, width: 0 } : {},
					]}
				>
					{leftElement}
				</View>

				{/* Input — use key to force proper remount on secureTextEntry toggle */}
				<RNTextInput
					key={passwordVisible ? "visible" : "hidden"}
					style={[styles.textInput, customTextInputStyle]}
					cursorColor={Colors.black}
					placeholder={placeholder || label}
					placeholderTextColor={Colors.custom.textInputPlaceholderColor}
					secureTextEntry={type === "password" && !passwordVisible}
					{...props}
				/>

				{/* Right Node — always reserved space */}
				<View
					style={[
						styles.rightNodeContainer,
						!rightElement ? { opacity: 0, width: 0 } : {},
					]}
				>
					{rightElement}
				</View>
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
