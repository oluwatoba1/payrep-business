import { ScrollView, View } from "react-native";

import Colors from "@theme/Colors";
import {
	Button,
	CustomSwitch,
	DateField,
	Dropdown,
	TextInput,
	Typography,
} from "@components/Forms";
import Pad from "@components/Pad";
import { Row } from "@components/Layout";
import { useState } from "react";
import { scaleHeight } from "@utils/Helpers";

interface IStatementForm {
	name: string;
	account: string;
	startDate: string;
	endDate: string;
	email: string;
	format: string;
	signed: boolean;
}

interface StatementFormErrors {
	name: string;
	account: string;
	startDate: string;
	endDate: string;
	email: string;
	format: string;
	signed: string;
}

interface StatementProps {
	formData: IStatementForm;
	onChange: (key: keyof IStatementForm, value: string | boolean) => void;
	formErrors: StatementFormErrors;
	action: () => void;
}

const formats = [
	{
		label: "Excel",
		value: "excel",
	},
	{
		label: "PDF",
		value: "pdf",
	},
];

export default function Statement({
	formData,
	onChange,
	formErrors,
	action,
}: StatementProps) {
	const [selectedFormat, setSelectedFormat] = useState<{
		label: string;
		value: string;
	}>({ label: "", value: "" });

	return (
		<View style={{ height: scaleHeight(400) }}>
			<ScrollView
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{ paddingBottom: scaleHeight(20) }}
			>
				<Pad />

				<TextInput
					label='Name '
					value={formData.name}
					onChangeText={(name) => onChange("name", name)}
					error={formErrors.name}
				/>

				<Pad size={40} />

				<DateField
					label=''
					date={formData.startDate}
					onDateChange={(date) => onChange("startDate", date)}
					error={formErrors.startDate}
				/>

				<Pad size={20} />

				<DateField
					label=''
					date={formData.endDate}
					onDateChange={(date) => onChange("endDate", date)}
					error={formErrors.endDate}
				/>

				<TextInput
					label='Email'
					value={formData.email}
					onChangeText={(email) => onChange("email", email)}
					error={formErrors.email}
				/>

				<Pad size={20} />

				<Dropdown
					label='Format'
					options={formats}
					selectedOption={selectedFormat}
					onSelect={(option) => {
						setSelectedFormat(option);
						onChange("format", option.value);
					}}
					error={formErrors.format}
				/>

				<Pad size={20} />

				<Row gap={10} justifyContent='flex-start'>
					<Typography
						title='Signed?'
						type='body-r'
						color={Colors.custom.textInputPlaceholderColor}
					/>
					<CustomSwitch
						value={formData.signed}
						onValueChange={() => onChange("signed", !formData.signed)}
					/>
				</Row>

				<Pad size={40} />

				<Button title='Generate statement' onPress={action} />
			</ScrollView>
		</View>
	);
}
