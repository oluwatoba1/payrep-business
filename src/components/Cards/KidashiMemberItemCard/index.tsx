import { Image, Pressable, View } from "react-native";

import { Row } from "@components/Layout";
import { Checkbox, Typography } from "@components/Forms";
import ComponentImages from "@assets/images/components";
import Colors from "@theme/Colors";
import styles from "./styles";
import { ReactNode } from "react";

interface KidashiMemberItemCardProps {
	title: string;
	subtitle: string;
	isSelected?: boolean;
	onSelect: () => void;
	rightNode?: ReactNode;
}

export default function KidashiMemberItemCard({
	title,
	subtitle,
	isSelected=false,
	onSelect,
	rightNode,
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
				{rightNode ? (
					rightNode
				) : (
					<Checkbox value={isSelected} onPress={onSelect} />
				)}
			</Row>
		</Pressable>
	);
}
