import { Row } from "@components/Layout";
import { Image, Pressable, View } from "react-native";
import styles from "./styles";
import { Typography } from "@components/Forms";
import ScreenImages from "@assets/images/screens";
import Divider from "@components/Miscellaneous/Divider";
import { formatCurrency, scale, scaleHeight } from "@utils/Helpers";
import Colors from "@theme/Colors";

interface CardProps {
	title: string;
	value: number;
	backgroundColor: string;
	titleColor: string;
	descriptionColor: string;
	onPress?: () => void;
	isOutstanding?: boolean;
}

const OutstandingCard = () => {
	const isNegative = true;
	return (
		<Pressable
			onPress={() => {}}
			style={[
				styles.card,
				{
					backgroundColor: isNegative
						? Colors.danger["100"]
						: Colors.success["100"],
				},
			]}
		>
			<Typography
				title='Outstanding'
				type='label-sb'
				color={isNegative ? Colors.danger["400"] : Colors.success["400"]}
			/>

			<Typography
				title={formatCurrency(10)}
				type='body-sb'
				color={Colors.black}
			/>
		</Pressable>
	);
};

const AssetsCard = ({ navigate }: { navigate: (screen: string) => void }) => {
	const isOngoing = true;
	return (
		<Pressable
			onPress={() => {
				navigate("Assets");
			}}
			style={[styles.card, { backgroundColor: Colors.neutral["50"] }]}
		>
			<Typography
				title='Assets'
				type='label-sb'
				color={Colors.neutral["400"]}
			/>
			<Row>
				<Row gap={scale(4)}>
					<View style={styles.dot} />
					<Typography
						title={isOngoing ? "2 Ongoing" : "0"}
						type='body-sb'
						color={Colors.black}
					/>
				</Row>

				<Image
					style={styles.chevronRightIcon}
					source={ScreenImages.kidashiMemberDetails.chevronRightIcon}
				/>
			</Row>
		</Pressable>
	);
};

const MemberDetailsCard = ({
	navigate,
	memberDetails,
}: {
	navigate: (screen: string) => void;
	memberDetails: IWomanDetails | null;
}) => {
	return (
		<View>
			<Divider gapY={scaleHeight(10)} gapX={scale(-10)} />
			<Row containerStyle={styles.cardContainer}>
				<AssetsCard navigate={navigate} />
				<OutstandingCard />
			</Row>
			<Divider gapY={scaleHeight(10)} gapX={scale(-10)} />
		</View>
	);
};

export default MemberDetailsCard;
