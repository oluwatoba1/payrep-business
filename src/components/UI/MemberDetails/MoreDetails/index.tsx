import { View, Text, Image } from "react-native";
import React from "react";
import { Row } from "@components/Layout";
import { Typography } from "@components/Forms";
import Divider from "@components/Miscellaneous/Divider";
import { scaleHeight } from "@utils/Helpers";
import { ScrollView } from "react-native-gesture-handler";
import ScreenImages from "@assets/images/screens";
import { styles } from "./style";
import Colors from "@theme/Colors";
import Pad from "@components/Pad";

interface NameContainerProps {
	name: string;
	gender: string;
}
const NameContainer = ({ name, gender }: NameContainerProps) => {
	return (
		<View style={styles.nameContainer}>
			<Image
				source={ScreenImages.kidashiMemberDetails.userPlaceholder}
				style={styles.nameImage}
			/>
			<View>
				<Typography title={name} type='heading5-sb' style={styles.nameText} />
				<Typography title={gender} type='body-r' />
			</View>
		</View>
	);
};

const MoreDetails = () => {
	const data = [
		{ label: "Email", value: "m****@example.com" },
		{
			label: "Phone",
			value: "080********",
		},
		{ label: "NIN", value: "12***8901" },
		{ label: "Date of Birth", value: "**/**/**78" },
		{ label: "State", value: "Lagos" },
		{ label: "LGA", value: "Lagos" },
	];

	return (
		<ScrollView style={{ flex: 1 }}>
			{/* Upper section */}
			{data.map((item) => (
				<View key={item.label}>
					<Row>
						<Typography title={item.label} type='body-r' />
						<Typography title={item.value} type='body-r' />
					</Row>
					<Divider gapY={scaleHeight(10)} />
				</View>
			))}
			<Pad size={16} />

			{/* Next of Kin */}
			<Typography title='Next of Kin' type='heading-sb' />
			<Pad size={16} />
			<View style={styles.nextOfKinContainer}>
				<NameContainer name='Aminat Abubakar' gender='Female' />
				<View style={styles.nextOfKinItem}>
					{data.map((item) => (
						<View key={item.label}>
							<Row>
								<Typography title={item.label} type='body-r' />
								<Typography title={item.value} type='body-r' />
							</Row>
							<Divider gapY={scaleHeight(10)} dividerColor={Colors.white} />
						</View>
					))}
				</View>
			</View>
			<Pad size={16} />
			<View style={styles.nextOfKinContainer}>
				<NameContainer name='Zainab Abubakar' gender='Female' />
				<View style={styles.nextOfKinItem}>
					{data.map((item) => (
						<View key={item.label}>
							<Row>
								<Typography title={item.label} type='body-r' />
								<Typography title={item.value} type='body-r' />
							</Row>
							<Divider gapY={scaleHeight(10)} dividerColor={Colors.white} />
						</View>
					))}
				</View>
			</View>
		</ScrollView>
	);
};

export default MoreDetails;
