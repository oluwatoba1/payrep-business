import { StackScreenProps } from "@react-navigation/stack";
import { Image, View } from "react-native";

import { Button, IconButton, Typography } from "@components/Forms";
import { MainLayout, Row } from "@components/Layout";
import { KidashiStackParamList } from "@navigation/types";
import styles from "./styles";
import ScreenImages from "@assets/images/screens";
import Pad from "@components/Pad";
import Tab from "@components/Miscellaneous/Tab";
import { useState } from "react";
import Guarantors from "./Guarantors";

type ReviewDetailsProps = StackScreenProps<
	KidashiStackParamList,
	"ReviewDetails"
>;

export default function ReviewDetails({
	navigation: { navigate, goBack },
}: ReviewDetailsProps) {
	const [activeTab, setActiveTab] = useState<string>("Guarantors");
	const [guarantors, setGuarantors] = useState<IGuarantorDetails[]>([
		{
			firstName: "Zainab",
			lastName: "Abubakar",
			gender: "Female",
			dateOfBirth: "14/03/1958",
			nin: "12345678901",
			state: "Kaduna",
			lga: "Zaria",
			email: "zeemama@gmail.com",
			phone: "+2349012345678",
		},
		{
			firstName: "Amina",
			lastName: "Abubakar",
			gender: "Female",
			dateOfBirth: "14/03/ 1963",
			nin: "23456789012",
			state: "Kaduna",
			lga: "Zaria",
			email: "aminaabubakar@gmail.com",
			phone: "+2348155443210",
		},
	]);

	return (
		<MainLayout rightTitle='Review and Send' backAction={goBack}>
			<View style={styles.vendorPlaceholderContainer}>
				<Image
					source={ScreenImages.kidashiReviewDetails.userPlaceholder}
					style={styles.vendorPlaceholderImage}
				/>
			</View>

			<Pad size={8} />

			<Typography title='Mama Bintu’s Kitchen' type='subheading-sb' />
			<Typography title='Food & Drinks' type='label-r' />
			<Typography title='Local Restaurant / Catering' type='label-r' />

			<Pad size={8} />

			<IconButton
				containerStyle={styles.editContainer}
				onPress={() => navigate("VendorInformation")}
			>
				<Row alignItems='center' justifyContent='flex-start' gap={8}>
					<Image
						source={ScreenImages.kidashiReviewDetails.editIcon}
						style={styles.editIcon}
					/>
					<Typography title='Edit' type='label-sb' />
				</Row>
			</IconButton>

			<Pad size={24} />

			<Tab
				items={["Guarantors", "About my business"]}
				onTap={setActiveTab}
				value={activeTab}
			/>

			<Pad size={24} />

			{activeTab === "Guarantors" ? (
				<Guarantors
					guarantors={guarantors}
					onEdit={() => navigate("GuarantorDetails")}
				/>
			) : null}

			<Pad size={40} />

			<Button
				title='Submit for Review'
				onPress={() => navigate("OnboardingSuccess")}
			/>
		</MainLayout>
	);
}
