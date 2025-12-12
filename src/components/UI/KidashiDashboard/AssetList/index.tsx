import { View, Image, Pressable, FlatList, Text } from "react-native";
import React from "react";
import { TextInput, Typography } from "@components/Forms";
import ScreenImages from "@assets/images/screens";
import Divider from "@components/Miscellaneous/Divider";
import { formatDateTime, scale, scaleHeight } from "@utils/Helpers";
import { Row } from "@components/Layout";
import Colors from "@theme/Colors";
import ProgressBar from "@components/Forms/ProgressBar";
import Pad from "@components/Pad";
import styles from "./styles";
import { getStatusColor } from "./utils";

const KidashiAssetCard = ({
	asset,
	navigation,
	from,
}: {
	asset: IAsset;
	navigation: any;
	from: "KidashiDashboard" | "Assets" | "VendorAssets";
}) => {
	return (
		<Pressable
			onPress={() =>
				navigation.navigate("AssetDetails", {
					asset_id: asset.id,
					from,
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
							title={
								`${asset.woman__surname} ${asset.woman__first_name?.charAt(
									0
								)}. Resource` || "N/A"
							}
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
					<Row
						justifyContent='space-between'
						gap={scale(8)}
						alignItems='center'
					>
						<Row justifyContent='flex-start' alignItems='center' gap={scale(8)}>
							<Typography
								style={styles.assetSubTitle}
								title={asset.product_code || ""}
								type='body-r'
							/>
							<View style={styles.dot} />
							<Typography title={`N${asset.value.toString()}`} type='body-r' />
						</Row>
						<Typography
							title={formatDateTime(asset.created_at).shortDate || ""}
							type='body-r'
						/>
					</Row>
					<Pad size={scaleHeight(2)} />
					{/* <Row gap={scale(8)}>
                        <ProgressBar
                            progress={asset.metrics?.repayment_progress || 0}
                            color={Colors.cardColor.brown["200"]}
                        />

                        <Typography
                            title={formatDateTime(asset.created_at).date || ""}
                            type='body-r'
                        />
                    </Row> */}
				</View>
			</Row>
			<Divider gapY={scaleHeight(16)} />
		</Pressable>
	);
};

const KidashiAssetList = ({
	status,
	assets,
	navigation,
	from = "KidashiDashboard",
	showAll = false,
}: {
	status?: string;
	assets: IAsset[];
	showAll?: boolean;
	navigation: any;
	from?: "KidashiDashboard" | "Assets" | "VendorAssets";
}) => {
	const visibleAssets = showAll ? assets : assets.slice(0, 2);
	return (
		<View>
			{/* <TextInput
                label='Search'
                leftNode={
                    <Image
                        source={ScreenImages.kidashiMemberDetails.searchIcon}
                        style={styles.searchIcon}
                    />
                }
            /> */}
			<Divider gapY={scaleHeight(16)} />
			<FlatList
				data={
					status === "RUNNING"
						? visibleAssets.filter((item) => item.status === status)
						: visibleAssets
				}
				renderItem={({ item }) => (
					<KidashiAssetCard asset={item} navigation={navigation} from={from} />
				)}
				keyExtractor={(item) => item.id}
			/>
			{assets.length > 1 && !showAll && (
				<Row justifyContent='center' gap={5}>
					<Typography
						title='See all'
						type='label-sb'
						color={Colors.primary[600]}
						onPress={() => navigation.navigate("VendorAssets")}
					/>
					<Image
						source={ScreenImages.kidashiCreateTrustCircles.forwardIcon}
						style={styles.arrowRightIcon}
					/>
				</Row>
			)}
		</View>
	);
};

export default KidashiAssetList;
