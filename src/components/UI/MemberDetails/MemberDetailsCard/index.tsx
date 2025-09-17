import { Row } from "@components/Layout";
import { Image, Pressable, View } from "react-native";
import styles from "./styles";
import { Typography } from "@components/Forms";
import ScreenImages from "@assets/images/screens";
import Divider from "@components/Miscellaneous/Divider";
import { scale, scaleHeight } from "@utils/Helpers";

interface CardProps {
	title: string;
	value: string;
	backgroundColor: string;
	titleColor: string;
	descriptionColor: string;
	onPress?: () => void;
}

export interface MemberDetailsCardProps {
	items: CardProps[];
}

const Card = ({
	title,
	value,
	backgroundColor,
	titleColor,
	descriptionColor,
	onPress,
}: CardProps) => (
	<Pressable onPress={onPress} style={[styles.card, { backgroundColor }]}>
		<Typography title={title} type='label-sb' color={titleColor} />
		<View style={styles.valueContainer}>
			<Typography title={value} type='body-sb' color={descriptionColor} />
			{onPress && (
				<Image
					style={styles.chevronRightIcon}
					source={ScreenImages.kidashiMemberDetails.chevronRightIcon}
				/>
			)}
		</View>
	</Pressable>
);

const MemberDetailsCard = ({ items }: MemberDetailsCardProps) => {
	return (
		<View>
			<Divider gapY={scaleHeight(10)} gapX={scale(-10)} />
			<Row containerStyle={styles.cardContainer}>
				{items.map((item, i) => (
					<Card key={i} {...item} />
				))}
			</Row>
			<Divider gapY={scaleHeight(10)} gapX={scale(-10)} />
		</View>
	);
};

export default MemberDetailsCard;
