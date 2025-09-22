import { View, Image, Pressable, FlatList } from "react-native";
import React from "react";
import { TextInput, Typography } from "@components/Forms";
import ScreenImages from "@assets/images/screens";
import styles from "./styles";
import Divider from "@components/Miscellaneous/Divider";
import { scale, scaleHeight } from "@utils/Helpers";
import { Row } from "@components/Layout";
import Colors from "@theme/Colors";
import ProgressBar from "@components/Forms/ProgressBar";
import Pad from "@components/Pad";
import { AssetItem, assetList } from "./mockData";
import { getStatusColor } from "./utll";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MembersStackParamList } from "@navigation/types";

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
	status,
	title,
	reference,
	amount,
	progress,
	date,
	navigation,
}: Omit<AssetItem, "navigate"> & {
	navigation: NativeStackNavigationProp<MembersStackParamList>;
}) => {
	return (
		<Pressable onPress={() => navigation.navigate("AssetDetails")}>
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
							title={title}
							style={styles.assetTitle}
							type='heading5-sb'
						/>
						<Row gap={scale(4)}>
							<Typography
								title={status}
								type='body-sb'
								color={getStatusColor(status)?.color}
								style={[
									styles.assetStatusContainer,
									{
										backgroundColor: getStatusColor(status)?.backgroundColor,
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
						<Typography title={reference} type='body-r' />
						<View style={styles.dot} />
						<Typography title={amount} type='body-r' />
					</Row>
					<Pad size={scaleHeight(2)} />
					<Row gap={scale(8)}>
						{status === "ongoing" && (
							<ProgressBar
								progress={progress || 0}
								color={Colors.cardColor.brown["200"]}
							/>
						)}
						{status === "approved" && <TapReview />}

						<Typography title={date} type='body-r' />
					</Row>
				</View>
			</Row>
			<Divider gapY={scaleHeight(16)} />
		</Pressable>
	);
};

const AssetList = ({
	status,
	navigation,
}: {
	status?: string;
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
					status
						? assetList.filter((item) => item.status === status)
						: assetList
				}
				renderItem={({ item }) => (
					<AssetCard {...item} navigation={navigation} />
				)}
				keyExtractor={(item) => item.id}
			/>
		</View>
	);
};

export default AssetList;
