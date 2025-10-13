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

const OutstandingCard = ({ outstanding }: { outstanding: string }) => {
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
				title={formatCurrency(Number(outstanding || 0))}
				type='body-sb'
				color={Colors.black}
			/>
		</Pressable>
	);
};

const AssetsCard = ({
	onAssetPress,
	ongoingAssetCount,
}: {
	onAssetPress: () => void;
	ongoingAssetCount: number;
}) => {
	const isOngoing = ongoingAssetCount > 0;
	return (
		<Pressable
			onPress={() => {
				onAssetPress();
			}}
			style={[styles.card, { backgroundColor: Colors.neutral["50"] }]}
			// disabled={!isOngoing}
		>
			<Typography
				title='Assets'
				type='label-sb'
				color={Colors.neutral["400"]}
			/>
			<Row>
				<Row gap={scale(4)}>
					{isOngoing && <View style={styles.dot} />}
					<Typography
						title={isOngoing ? `${ongoingAssetCount} Ongoing` : "0"}
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
	onAssetPress,
	memberDetails,
}: {
	memberDetails: IWomanDetails | null;
	onAssetPress: () => void;
}) => {
	// console.log(memberDetails);
	return (
		<View>
			<Divider gapY={scaleHeight(10)} gapX={scale(-10)} />
			<Row containerStyle={styles.cardContainer}>
				<AssetsCard
					onAssetPress={onAssetPress}
					ongoingAssetCount={memberDetails?.ongoing_asset_count || 0}
				/>
				<OutstandingCard
					outstanding={memberDetails?.loan_summary?.total_outstanding || "0"}
				/>
			</Row>
			<Divider gapY={scaleHeight(10)} gapX={scale(-10)} />
		</View>
	);
};

export default MemberDetailsCard;
