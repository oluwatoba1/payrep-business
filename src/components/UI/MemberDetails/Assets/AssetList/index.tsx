import { View, Image, Pressable, FlatList } from "react-native";
import React from "react";
import { TextInput, Typography } from "@components/Forms";
import ScreenImages from "@assets/images/screens";
import styles from "./styles";
import Divider from "@components/Miscellaneous/Divider";
import { formatDateTime, scale, scaleHeight } from "@utils/Helpers";
import { Row } from "@components/Layout";
import Colors from "@theme/Colors";
import ProgressBar from "@components/Forms/ProgressBar";
import Pad from "@components/Pad";
import { getStatusColor } from "./utll";

const TapReview = () => {
	return (
		<Pressable onPress={() => {}} style={styles.infoRedIconContainer}>
			<Image
				source={ScreenImages.kidashiMemberDetails.infoRedIcon}
				style={styles.infoRedIcon}
			/>
			<Typography
				title='Tap to Review and confirm'
				style={styles.infoRedIconText}
			/>
		</Pressable>
	);
};

const AssetCard = ({
	asset,
	navigation,
}: {
	asset: IAsset;
	navigation: any;
}) => {
	return (
		<Pressable
			onPress={() =>
				navigation.navigate("AssetDetails", {
					asset_id: asset.id,
				})
			}
		>
			<Row gap={scale(12)} alignItems='flex-start'>
				<View style={styles.packageIconContainer}>
					<Image
						source={ScreenImages.kidashiMemberDetails.packageIcon}
						style={styles.packageIcon}
					/>
				</View>

				<View style={styles.assetTitleContainer}>
					<Row>
						<Typography
							title={asset.name || "N/A"}
							style={styles.assetTitle}
							type='heading5-sb'
						/>
						<Row gap={scale(4)}>
							<Typography
								title={asset.status}
								type='body-sb'
								color={getStatusColor(asset.status)?.color}
								style={[
									styles.assetStatusContainer,
									{
										backgroundColor: getStatusColor(asset.status)
											?.backgroundColor,
									},
								]}
							/>
							<Image
								source={ScreenImages.kidashiMemberDetails.chevronRightIcon}
								style={styles.chevronRightIcon}
							/>
						</Row>
					</Row>
					<Pad size={scaleHeight(2)} />
					<Row justifyContent='flex-start' gap={scale(8)}>
						<Typography title={asset.product_code || ""} type='body-r' />
						<View style={styles.dot} />
						<Typography title={asset.value.toString()} type='body-r' />
					</Row>
					<Pad size={scaleHeight(2)} />
					<Row gap={scale(8)}>
						<ProgressBar
							progress={asset.metrics?.repayment_progress || 0}
							color={Colors.cardColor.brown["200"]}
						/>
						{/* {asset.status === "APPROVED" && <TapReview />} */}

						<Typography
							title={formatDateTime(asset.created_at).date || ""}
							type='body-r'
						/>
					</Row>
				</View>
			</Row>
			<Divider gapY={scaleHeight(16)} />
		</Pressable>
	);
};

const AssetList = ({
	status,
	assets,
	navigation,
}: {
	status?: string;
	assets: IAsset[];
	navigation: any;
}) => {
	return (
		<View style={{ flex: 1 }}>
			<TextInput
				label='Search'
				leftNode={
					<Image
						source={ScreenImages.kidashiMemberDetails.searchIcon}
						style={styles.searchIcon}
					/>
				}
			/>
			<Divider gapY={scaleHeight(16)} />
			<FlatList
				data={
					status === "REQUESTED"
						? assets.filter((item) => item.status === status)
						: assets
				}
				renderItem={({ item }) => (
					<AssetCard asset={item} navigation={navigation} />
				)}
				keyExtractor={(item) => item.id}
			/>
		</View>
	);
};

export default AssetList;
