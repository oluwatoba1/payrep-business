import { Row } from "@components/Layout";
import { View } from "react-native";

import styles from "./styles";
import { Typography } from "@components/Forms";
import Pad from "@components/Pad";

interface AboutMyBusinessProps {
	businessDetails: {
		businessDescription: string;
		state: string;
		lga: string;
		community: string;
	};
}

export default function AboutMyBusiness({
	businessDetails,
}: AboutMyBusinessProps) {
	return (
		<View>
			<View style={styles.reviewCardContainer}>
				<Row containerStyle={styles.reviewCardHeader}>
					<Typography title='What I sell' type='subheading' />
				</Row>

				<Pad size={8} />

				<Typography
					title={businessDetails.businessDescription}
					type='subheading-sb'
				/>
			</View>

			<Pad size={16} />

			<View style={styles.reviewCardContainer}>
				<Row alignItems='center' justifyContent='space-between'>
					<Typography title='State' type='subheading' />
					<Typography
						title={businessDetails.state}
						type='subheading-sb'
						style={{ textAlign: "right" }}
					/>
				</Row>
				<Row alignItems='center' justifyContent='space-between'>
					<Typography title='Local Government Area' type='subheading' />
					<Typography
						title={businessDetails.lga}
						type='subheading-sb'
						style={{ textAlign: "right" }}
					/>
				</Row>
				<Row alignItems='center' justifyContent='space-between'>
					<Typography title='Community' type='subheading' />
					<Typography
						title={businessDetails.community}
						type='subheading-sb'
						style={{ textAlign: "right" }}
					/>
				</Row>
			</View>
		</View>
	);
}
