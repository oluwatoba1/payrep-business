import ComponentImages from "@assets/images/components";
import { Typography } from "@components/Forms";
import { Row } from "@components/Layout";
import { Image, View } from "react-native";
import styles from "./styles";
import Colors from "@theme/Colors";

export interface ITrustCircleItem {
	name: string;
	membersCount: number;
	totalAmount: string;
}

interface TrustCircleItem {
	item: ITrustCircleItem;
	isLastItem: boolean;
}

export default function TrustCircleItem({ item, isLastItem }: TrustCircleItem) {
	return (
		<Row
			alignItems='center'
			justifyContent='space-between'
			containerStyle={{
				...styles.container,
				...(isLastItem && { borderBottomWidth: 0 }),
			}}
		>
			<Row
				gap={6}
				alignItems='center'
				justifyContent='flex-start'
				containerStyle={{ width: "55%" }}
			>
				<Row containerStyle={styles.iconContainer} justifyContent='center'>
					<Image
						source={ComponentImages.kidashiBottomNavigator.trustCircles}
						style={styles.icon}
					/>
				</Row>
				<View>
					<Typography
						title={item.name}
						type='body-sb'
						color={Colors.neutral["600"]}
						numberOfLines={1}
					/>
					<Typography
						title={`${item.membersCount} members`}
						type='label-sb'
						color={Colors.neutral["400"]}
					/>
				</View>
			</Row>
			<Typography
				title={`+ ${item.totalAmount}`}
				type='body-sb'
				color={Colors.success["600"]}
			/>
		</Row>
	);
}
