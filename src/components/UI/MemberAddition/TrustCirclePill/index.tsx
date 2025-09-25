import { Image, ImageSourcePropType, View } from "react-native";

import ScreenImages from "@assets/images/screens";
import { Typography } from "@components/Forms";
import { Row } from "@components/Layout";
import Colors from "@theme/Colors";
import styles from "./styles";

interface TrustCirclePillProps {
	icon: ImageSourcePropType;
	title: string;
}

export default function TrustCirclePill({ icon, title }: TrustCirclePillProps) {
	return (
		<View style={{ flexDirection: "row" }}>
			<Row
				alignItems='center'
				justifyContent='flex-start'
				gap={8}
				containerStyle={styles.trustCircleCard}
			>
				<Image source={icon} style={styles.trustCircleIcon} />
				<Typography title={title} type='label-sb' color={Colors.neutral.base} />
			</Row>
		</View>
	);
}
