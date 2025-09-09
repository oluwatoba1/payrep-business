import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Keyboard,
  AppState,
  Platform,
} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';

import styles from './styles';
import Colors from '../../../theme/Colors';
import Pad from '../../Pad';

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
  pin = '',
  secure = false,
  onInput,
  onResendOtp,
  error = '',
  pinScale = 2,
}: PinPadProps) {
  const [pinArray, setPinArray] = useState<string[]>(
    Array(codeLength).fill(''),
  );
  const inputRefs = useRef<Array<TextInput | null>>([]);

  // ---- Helpers -------------------------------------------------------------

  const emit = (arr: string[]) => {
    const value = arr.join('').slice(0, codeLength);
    onInput(value);
  };

  const focusIndex = (i: number) => {
    if (i >= 0 && i < codeLength) {
      inputRefs.current[i]?.focus();
    } else {
      Keyboard.dismiss();
    }
  };

  // ---- Change handlers -----------------------------------------------------

  const handleChange = (text: string, index: number) => {
    // Accept digits only and spread across boxes (handles paste/OTP)
    const digits = (text || '').replace(/\D/g, '');
    if (!digits) return;

    const next = [...pinArray];
    let cursor = index;
    for (const ch of digits) {
      if (cursor >= codeLength) break;
      next[cursor] = ch;
      cursor += 1;
    }

    setPinArray(next);
    emit(next);

    // Move focus to the next empty box or the next index we just wrote
    const firstEmpty = next.findIndex(c => !c);
    if (firstEmpty !== -1 && firstEmpty > index) {
      focusIndex(firstEmpty);
    } else {
      focusIndex(cursor);
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key !== 'Backspace') return;

    const next = [...pinArray];

    if (next[index]) {
      // If current box has a value, clear it
      next[index] = '';
      setPinArray(next);
      emit(next);
      return;
    }

    // If current is empty, move to previous and clear it
    if (index > 0) {
      next[index - 1] = '';
      setPinArray(next);
      emit(next);
      focusIndex(index - 1);
    }
  };

  const handlePaste = async () => {
    // Read from clipboard
    if (Platform.OS === 'ios' && !(await Clipboard.hasString())) return;

    const text = await Clipboard.getString();
    const digits = text.replace(/\D/g, '').slice(0, codeLength);

    if (digits.length === 0) return;

    const arr = Array(codeLength)
      .fill('')
      .map((_, i) => digits[i] ?? '');

    setPinArray(arr);
    emit(arr);
    Keyboard.dismiss();
  };

  // ---- Autofill from clipboard without spamming iOS paste prompts ---------

  useEffect(() => {
    const sub = AppState.addEventListener('change', async state => {
      if (state !== 'active') return;

      // iOS: avoid paste permission spam by checking first
      if (Platform.OS === 'ios' && !(await Clipboard.hasString())) return;

      const text = await Clipboard.getString();
      const digits = text.replace(/\D/g, '').slice(0, codeLength);
      if (digits.length === codeLength) {
        const arr = digits.split('');
        setPinArray(arr);
        emit(arr);
        Keyboard.dismiss();
      }
    });
    return () => sub.remove();
  }, [codeLength]);

  // ---- Sync with external pin prop (partial & full) -----------------------

  useEffect(() => {
    if (pin == null) return;
    const digits = pin.replace(/\D/g, '').slice(0, codeLength);
    const arr = Array(codeLength)
      .fill('')
      .map((_, i) => digits[i] ?? '');
    setPinArray(arr);
  }, [pin, codeLength]);

  // ---- Render --------------------------------------------------------------

  return (
    <View>
      <View style={styles.pinPadContainer}>
        {Array.from({length: codeLength}).map((_, index) => {
          const value = pinArray[index]; // always the real digit
          return (
            <View
              key={index}
              style={styles.pinBoxContainer(
                index === pinArray.findIndex(p => !p),
                index + 1 === codeLength,
                codeLength,
                pinScale,
              )}>
              <TextInput
                ref={ref => (inputRefs.current[index] = ref)}
                value={value}
                onChangeText={text => handleChange(text, index)}
                onKeyPress={e => handleKeyPress(e, index)}
                keyboardType="number-pad"
                maxLength={1}
                style={styles.pinInput}
                autoFocus={index === 0}
                cursorColor={Colors.black}
                textContentType="oneTimeCode"
                autoComplete={Platform.select({
                  android: 'sms-otp',
                  ios: 'one-time-code',
                  default: 'one-time-code',
                })}
                secureTextEntry={secure}
                caretHidden
                returnKeyType="next"
                keyboardAppearance={
                  Platform.OS === 'ios' ? 'default' : undefined
                }
                importantForAutofill="yes"
                allowFontScaling={false}
                // 👇 Add this
                contextMenuHidden={false} // allow copy/paste menu
                onSelectionChange={async e => {
                  // Detect paste attempt on iOS (when user pastes more than one char)
                  const pastedText = await Clipboard.getString();
                  if (pastedText?.length > 1) {
                    handlePaste();
                  }
                }}
              />

              {/* If you prefer custom dots instead of secureTextEntry, overlay a Text here using opacity */}
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
    </View>
  );
}
