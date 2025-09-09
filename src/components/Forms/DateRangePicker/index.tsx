"use client"

import type React from "react"
import { useState } from "react"
import { View, Pressable } from "react-native"
import DateTimePicker from "@react-native-community/datetimepicker"
import Typography from "../Typography"
import { styles } from "./styles"

interface DateRangePickerProps {
  onRangeChange: (range: { startDate?: Date; endDate?: Date }) => void
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({ onRangeChange }) => {
  const [startDate, setStartDate] = useState<Date | undefined>()
  const [endDate, setEndDate] = useState<Date | undefined>()
  const [showStartPicker, setShowStartPicker] = useState(false)
  const [showEndPicker, setShowEndPicker] = useState(false)
  const [selectingMode, setSelectingMode] = useState<"start" | "end" | null>(null)

  const formatDate = (date?: Date) => {
    if (!date) return ""
    return `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`
  }

  const handleDateChange = (event: any, selectedDate?: Date) => {
    if (selectingMode === "start") {
      setShowStartPicker(false);
      const newStart = selectedDate;
      if (newStart) {
        const shouldClearEnd = endDate && newStart > endDate;
        const updatedEnd = shouldClearEnd ? undefined : endDate;
        
        setStartDate(newStart);
        setEndDate(updatedEnd);
        onRangeChange({ 
          startDate: newStart, 
          endDate: updatedEnd 
        });
      }
    } else if (selectingMode === "end") {
      setShowEndPicker(false);
      if (selectedDate) {
        setEndDate(selectedDate);
        onRangeChange({ 
          startDate, 
          endDate: selectedDate 
        });
      }
    }
    setSelectingMode(null);
  };

  const openStartDatePicker = () => {
    setSelectingMode("start")
    setShowStartPicker(true)
  }

  const openEndDatePicker = () => {
    setSelectingMode("end")
    setShowEndPicker(true)
  }

  return (
    <View style={styles.container}>
      <Typography title="Date Range" type="subheading" style={styles.title} />

      <View style={styles.rangeContainer}>
        <Pressable style={[styles.dateButton, startDate ? styles.dateSelected : null]} onPress={openStartDatePicker}>
          <Typography
            title={startDate ? formatDate(startDate) : "Start Date"}
            type="subheading"
            style={startDate ? styles.dateTextSelected : styles.dateText}
          />
        </Pressable>

        <Typography title="to" type="body-r" style={styles.toText} />

        <Pressable
          style={[styles.dateButton, endDate ? styles.dateSelected : null, !startDate ? styles.disabled : null]}
          onPress={startDate ? openEndDatePicker : undefined}
        >
          <Typography
            title={endDate ? formatDate(endDate) : "End Date"}
            type="subheading"
            style={endDate ? styles.dateTextSelected : styles.dateText}
          />
        </Pressable>
      </View>

      {showStartPicker && (
        <DateTimePicker
          value={startDate || new Date()}
          mode="date"
          display="default"
          onChange={handleDateChange}
          maximumDate={endDate}
        />
      )}

      {showEndPicker && (
        <DateTimePicker
          value={endDate || new Date()}
          mode="date"
          display="default"
          onChange={handleDateChange}
          minimumDate={startDate}
        />
      )}
    </View>
  )
}


export default DateRangePicker

