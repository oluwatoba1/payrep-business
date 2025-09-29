import { Row } from "@components/Layout";
import { View } from "react-native";

import styles from "./styles";
import { Typography } from "@components/Forms";
import Pad from "@components/Pad";
import { scaleHeight } from "@utils/Helpers";

interface AboutMyBusinessProps {
	businessDescription: string;
}

export default function AboutMyBusiness({
	businessDescription,
}: AboutMyBusinessProps) {
	return (
		<View style={{ height: scaleHeight(300) }}>
			<View style={styles.reviewCardContainer}>
				<Row containerStyle={styles.reviewCardHeader}>
					<Typography
						title='What I sell'
						type='subheading'
						style={styles.reviewPadding}
					/>
				</Row>

				<Pad size={8} />

				<Typography
					title={businessDescription}
					type='subheading-sb'
					style={styles.reviewPadding}
				/>
			</View>
		</View>
	);
}
