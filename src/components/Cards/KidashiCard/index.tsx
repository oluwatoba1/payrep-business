import { Image, Pressable, View } from "react-native";

import ComponentImages from "@assets/images/components";
import styles from "./styles";
import Pad from "@components/Pad";
import { Typography } from "@components/Forms";
import { Row } from "@components/Layout";
import Colors from "@theme/Colors";
import { useAppSelector } from "@store/hooks";

interface KidashiCardProps {
	onProceed: () => void;
}

export default function KidashiCard({ onProceed }: KidashiCardProps) {
	const vendor_id = useAppSelector((state) => state.kidashi.vendor_id);
	console.log("Vendor ID in KidashiCard:", vendor_id);

	return (
		<Pressable onPress={onProceed} style={styles.container}>
			<Image
				source={ComponentImages.kidashiCard.headerImage}
				style={styles.headerImage}
			/>
			<Pad size={16} />

			<Typography title='Sell More, Get Paid Instantly' type='subheading-b' />

			<Pad size={4} />

			<Typography
				title='Join our Asset Finance program and give grassroots women the chance to buy on credit—while you receive your money'
				type='label-r'
			/>

			<Pad size={16} />

			<Row justifyContent='flex-start' alignItems='center' gap={8}>
				<Typography
					title={vendor_id ? 'Continue' : 'Get Started'}
					type='body-b'
					color={Colors.primary["600"]}
				/>
				<Image
					source={ComponentImages.kidashiCard.arrowRight}
					style={styles.arrowRight}
				/>
			</Row>
		</Pressable>
	);
}
