import { Row } from "@components/Layout";
import { View } from "react-native";
import styles from "./styles";
import { Typography } from "@components/Forms";

interface CardProps {
	title: string;
	value: string;
	backgroundColor: string;
	titleColor: string;
	descriptionColor: string;
}

export interface KidashiHomeCardProps {
	items: CardProps[];
}

const Card = ({
	title,
	value,
	backgroundColor,
	titleColor,
	descriptionColor,
}: CardProps) => (
	<View style={[styles.card, { backgroundColor }]}>
		<Typography title={title} type='label-sb' color={titleColor} />
		<Typography title={value} type="body-sb" color={descriptionColor} />
	</View>
);

export default function KidashiHomeCard({ items }: KidashiHomeCardProps) {
	return (
		<Row containerStyle={styles.cardContainer}>
			{items.map((item, i) => (
				<Card key={i} {...item} />
			))}
		</Row>
	);
}
