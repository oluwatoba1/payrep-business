import React, { useEffect, useState } from "react";
import { Pressable, View } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

import { styles } from "./styles";
import Typography from "../Typography";
import Colors from "@theme/Colors";
import { PNR } from "@theme/Fonts";
import { moderateScale } from "@utils/Helpers";
import Pad from "@components/Pad";

interface CustomDatePickerProps {
	label: string;
	date: Date | string | undefined;
	onDateChange: (date: string) => void;
	error?: string;
	clearDateField?: boolean;
}

function formatDate(date: Date | undefined): string {
	if (!date) return "";
	return `${date.getFullYear()}-${(date.getMonth() + 1)
		.toString()
		.padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
}

export default function DateField({
	label,
	date,
	onDateChange,
	error = "",
	clearDateField = false,
}: CustomDatePickerProps) {
	const [show, setShow] = useState(false);
	const [internalDate, setInternalDate] = useState<Date | undefined>();

	const handleChange = (_: any, selectedDate?: Date) => {
		setShow(false);

		if (selectedDate) {
			selectedDate && onDateChange(formatDate(selectedDate));
		}
	};

	useEffect(() => {
		setInternalDate(date ? new Date(date) : undefined);
	}, [date]);

	return (
		<View style={styles.container}>
			{label && (
				<Typography
					title={label}
					type='text'
					style={{ fontFamily: PNR, fontSize: moderateScale(16) }}
				/>
			)}
			<Pressable style={styles.dateContainer} onPress={() => setShow(true)}>
				<Typography
					title={internalDate ? formatDate(internalDate) : "dd-mm-yyyy"}
					type='subheading'
					color={
						internalDate
							? Colors.black
							: Colors.custom.textInputPlaceholderColor
					}
				/>
			</Pressable>

			{error ? (
				<View>
					<Pad size={5} />
					<Typography title={error} type='label-r' color={Colors.danger.base} />
				</View>
			) : null}

			{show && (
				<DateTimePicker
					value={(date as Date) || new Date()}
					mode='date'
					display='default'
					onChange={handleChange}
				/>
			)}
		</View>
	);
}
