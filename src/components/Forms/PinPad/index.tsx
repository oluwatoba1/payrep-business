import React, { useRef, useState, useEffect } from "react";
import {
	View,
	TextInput,
	Text,
	TouchableOpacity,
	Keyboard,
	Platform,
} from "react-native";
import Clipboard from "@react-native-clipboard/clipboard";

import styles from "./styles";
import Colors from "../../../theme/Colors";
import Pad from "../../Pad";

interface PinPadProps {
	codeLength?: number;
	pin: string;
	secure?: boolean;
	onInput: (value: string) => void;
	onResendOtp?: () => void;
	error?: string;
	pinScale?: number;
}

export default function PinPad({
	codeLength = 4,
	pin = "",
	secure = false,
	onInput,
	onResendOtp,
	error = "",
	pinScale = 2,
}: PinPadProps) {
	const [pinArray, setPinArray] = useState<string[]>(
		Array(codeLength).fill("")
	);
	const inputRefs = useRef<Array<TextInput | null>>([]);

	// ---------- helpers ----------
	const emit = (arr: string[]) => {
		const value = arr.join("").slice(0, codeLength);
		onInput(value);
	};

	const focusIndex = (i: number) => {
		if (i >= 0 && i < codeLength) inputRefs.current[i]?.focus();
		else Keyboard.dismiss();
	};

	const setAndEmit = (arr: string[], nextFocus?: number) => {
		setPinArray(arr);
		emit(arr);
		if (typeof nextFocus === "number") focusIndex(nextFocus);
	};

	// ---------- change handlers ----------
	const handleChange = (text: string, index: number) => {
		const raw = text ?? "";
		const digits = raw.replace(/\D/g, "");

		// Delete path (some keyboards send "" instead of Backspace)
		if (digits.length === 0) {
			const next = [...pinArray];
			next[index] = "";
			// Move focus back if current became empty
			const target = index > 0 && !next[index] ? index - 1 : index;
			setAndEmit(next, target);
			return;
		}

		// Multi-char: paste or OS one-time-code autofill
		if (digits.length > 1) {
			// Only blast if it's EXACTLY the required length
			if (digits.length === codeLength) {
				const arr = Array(codeLength)
					.fill("")
					.map((_, i) => digits[i] ?? "");
				// Focus the last box so Backspace immediately clears from the end
				setAndEmit(arr, codeLength - 1);
			} else {
				// Don’t auto-fill if wrong length; just take first digit and advance
				const next = [...pinArray];
				next[index] = digits[0];
				setAndEmit(next, Math.min(index + 1, codeLength - 1));
			}
			return;
		}

		// Single digit typed
		const next = [...pinArray];
		next[index] = digits[0];
		// Go to first empty or next index
		const firstEmpty = next.findIndex((c) => !c);
		const nextFocus =
			firstEmpty !== -1 && firstEmpty > index
				? firstEmpty
				: Math.min(index + 1, codeLength - 1);
		setAndEmit(next, nextFocus);
	};

	const handleKeyPress = (e: any, index: number) => {
		if (e?.nativeEvent?.key !== "Backspace") return;

		const next = [...pinArray];

		if (next[index]) {
			// Clear current box
			next[index] = "";
			setAndEmit(next, index);
			return;
		}

		// If current empty, clear previous and move there
		if (index > 0) {
			next[index - 1] = "";
			setAndEmit(next, index - 1);
		}
	};

	// Optional helper if you add a visible "Paste" button
	const handleExplicitPaste = async () => {
		const text = await Clipboard.getString();
		const digits = (text || "").replace(/\D/g, "");
		if (digits.length !== codeLength) return;
		const arr = Array(codeLength)
			.fill("")
			.map((_, i) => digits[i] ?? "");
		setAndEmit(arr, codeLength - 1);
	};

	// Sync from external pin prop
	useEffect(() => {
		if (pin == null) return;
		const digits = pin.replace(/\D/g, "").slice(0, codeLength);
		const arr = Array(codeLength)
			.fill("")
			.map((_, i) => digits[i] ?? "");
		setPinArray(arr);
	}, [pin, codeLength]);

	// ---------- render ----------
	const firstEmptyIndex = pinArray.findIndex((p) => !p);

	return (
		<View>
			<View style={styles.pinPadContainer}>
				{Array.from({ length: codeLength }).map((_, index) => {
					const value = pinArray[index];
					return (
						<View
							key={index}
							style={styles.pinBoxContainer(
								index === firstEmptyIndex,
								index + 1 === codeLength,
								codeLength,
								pinScale
							)}
						>
							<TextInput
								ref={(ref) => (inputRefs.current[index] = ref)}
								value={value}
								onChangeText={(text) => handleChange(text, index)}
								onKeyPress={(e) => handleKeyPress(e, index)}
								keyboardType='number-pad'
								style={styles.pinInput}
								autoFocus={index === 0}
								cursorColor={Colors.black}
								textContentType='oneTimeCode'
								autoComplete={Platform.select({
									android: "sms-otp",
									ios: "one-time-code",
									default: "one-time-code",
								})}
								secureTextEntry={secure}
								caretHidden
								returnKeyType='next'
								keyboardAppearance={
									Platform.OS === "ios" ? "default" : undefined
								}
								importantForAutofill='yes'
								allowFontScaling={false}
								contextMenuHidden={false} // keep native paste menu
								// ❌ no onSelectionChange clipboard reads (prevents re-paste loops)
							/>
						</View>
					);
				})}
			</View>

			<Pad size={16} />
			{onResendOtp ? (
				<TouchableOpacity onPress={onResendOtp}>
					<Text style={styles.resendOtpText}>Resend OTP</Text>
				</TouchableOpacity>
			) : null}

			<Pad />
			{error ? <Text style={styles.error}>{error}</Text> : null}

			{/* Optional explicit paste button
      <TouchableOpacity onPress={handleExplicitPaste}>
        <Text>Paste code</Text>
      </TouchableOpacity>
      */}
		</View>
	);
}
