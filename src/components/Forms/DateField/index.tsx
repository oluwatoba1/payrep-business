import React, {useState} from 'react';
import {Pressable, View} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

import {styles} from './styles';
import Typography from '../Typography';
import Colors from '@theme/Colors';
import {PNR} from '@theme/Fonts';
import {moderateScale} from '@utils/Helpers';
import Pad from '@components/Pad';

interface CustomDatePickerProps {
  label: string;
  onDateChange: (date: string) => void;
  error?: string;
}

function formatDate(date: Date): string {
  return `${date.getFullYear()}-${(date.getMonth() + 1)
    .toString()
    .padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
}

export default function DateField({
  label,
  onDateChange,
  error = '',
}: CustomDatePickerProps) {
  const [date, setDate] = useState<Date | undefined>();
  const [show, setShow] = useState(false);

  const handleChange = (_: any, selectedDate?: Date) => {
    setShow(false);

    if (selectedDate) {
      setDate(selectedDate);
      onDateChange(formatDate(selectedDate));
    }
  };

  return (
    <View style={styles.container}>
      {label && (
        <Typography
          title={label}
          type="text"
          style={{fontFamily: PNR, fontSize: moderateScale(16)}}
        />
      )}
      <Pressable style={styles.dateContainer} onPress={() => setShow(true)}>
        <Typography
          title={date ? formatDate(date) : 'Select a date'}
          type="subheading"
          color={date ? Colors.black : Colors.custom.textInputPlaceholderColor}
        />
      </Pressable>

      {error ? (
        <View>
          <Pad size={5} />
          <Typography title={error} type="label-r" color={Colors.danger.base} />
        </View>
      ) : null}

      {show && (
        <DateTimePicker
          value={date || new Date()}
          mode="date"
          display="default"
          onChange={handleChange}
        />
      )}
    </View>
  );
}
