import { Image, ImageSourcePropType, View } from "react-native";

import styles from "./styles";
import Pad from "@components/Pad";
import { Typography } from "@components/Forms";
import Colors from "@theme/Colors";

export interface KidashiDashboardEmptyStateProps {
	icon: ImageSourcePropType;
	title: string;
	description: string;
}

export default function KidashiDashboardEmptyState({
	icon,
	title,
	description,
}: KidashiDashboardEmptyStateProps) {
	return (
		<View style={styles.emptyStateContainer}>
			<View style={styles.iconContainer}>
				<Image source={icon} style={styles.icon} />
			</View>

			<Pad size={16} />

			<Typography
				title={title}
				type='body-sb'
				color={Colors.neutral["700"]}
				style={{ textAlign: "center" }}
			/>

			<Pad size={8} />

			<Typography
				title={description}
				type='label-r'
				color={Colors.neutral["400"]}
				style={{ textAlign: "center" }}
			/>
		</View>
	);
}
