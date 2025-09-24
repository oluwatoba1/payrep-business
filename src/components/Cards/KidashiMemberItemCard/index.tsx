import { Image, Pressable, View } from "react-native";

import { Row } from "@components/Layout";
import { Checkbox, Typography } from "@components/Forms";
import ComponentImages from "@assets/images/components";
import Colors from "@theme/Colors";
import styles from "./styles";

interface KidashiMemberItemCardProps {
	id: string;
	title: string;
	subtitle: string;
	value: boolean;
	onSelect: () => void;
}

export default function KidashiMemberItemCard({
	id,
	title,
	subtitle,
	value,
	onSelect,
}: KidashiMemberItemCardProps) {
	return (
		<Pressable onPress={onSelect}>
			<Row
				alignItems='center'
				justifyContent='space-between'
				containerStyle={styles.cardContainer}
			>
				<Row alignItems='center' justifyContent='flex-start' gap={6}>
					<Image
						source={ComponentImages.kidashiMemberCard.memberIcon}
						style={styles.memberIcon}
					/>
					<View>
						<Typography
							title={title}
							type='body-sb'
							color={Colors.neutral["600"]}
						/>
						<Typography
							title={subtitle}
							type='label-sb'
							color={Colors.neutral["400"]}
						/>
					</View>
				</Row>
				<Checkbox value={value} onPress={() => {}} />
			</Row>
		</Pressable>
	);
}
