import React, { useCallback, useEffect, useState } from "react";
import { BackHandler, ScrollView } from "react-native";
import SafeAreaWrapper from "@components/Layout/SafeAreaWrapper";
import AssetDetailsHeader from "@components/UI/MemberDetails/Assets/AssetDetails/AssetDetailsHeader";
import AssetStatusCard from "@components/UI/MemberDetails/Assets/AssetDetails/AssetStatusCard";
import AssetDetailList from "@components/UI/MemberDetails/Assets/AssetDetails/AssetDetailsList";
import Pad from "@components/Pad";
import { scaleHeight } from "@utils/Helpers";
import { styles } from "../styles";
import Colors from "@theme/Colors";
import { Button } from "@components/Forms";
import CancelRequestModal from "@components/UI/MemberDetails/Assets/AssetDetails/CancelRequestModal";
import { StackScreenProps } from "@react-navigation/stack";
import { MembersStackParamList } from "@navigation/types";
import { useGetAssetDetailsMutation } from "@store/apis/kidashiApi";

import { useFocusEffect } from "@react-navigation/native";
export type Status =
	| "approved"
	| "pending approval"
	| "rejected"
	| "ongoing"
	| "denied"
	| "repaid"
	| "cancelled";
type AssetDetailsProps = StackScreenProps<
	MembersStackParamList,
	"AssetDetails"
>;

const AssetDetails = ({
	navigation: { navigate },
	route,
}: AssetDetailsProps) => {
	const asset_id = route?.params?.asset_id ?? "";
	const [cancelRequestModalVisible, setCancelRequestModalVisible] =
		useState(false);
	const [getAssetDetails, { isLoading }] = useGetAssetDetailsMutation();
	const [assetDetails, setAssetDetails] = useState<iAssetDetails | null>(null);
	// console.log(asset_id);
	const fetchAssetDetails = async () => {
		const res = await getAssetDetails({
			asset_id,
		}).unwrap();
		// console.log({ res });
		if (res.status) {
			setAssetDetails(res.data);
		}
	};
	useEffect(() => {
		if (asset_id) fetchAssetDetails();
	}, [asset_id]);

	const backAction = () => {
		navigate("Assets");
		return true; // Prevent default behavior
	};

	useFocusEffect(
		useCallback(() => {
			const backHandler = BackHandler.addEventListener(
				"hardwareBackPress",
				backAction
			);

			return () => backHandler.remove(); // Cleanup
		}, [])
	);

	return (
		<SafeAreaWrapper
			title='Asset Details'
			backAction={() => navigate("Assets")}
		>
			<ScrollView showsVerticalScrollIndicator={false}>
				<AssetDetailsHeader
					amount={
						assetDetails
							? `₦ ${assetDetails?.asset?.value.toLocaleString()}`
							: undefined
					}
					reference={assetDetails?.asset?.product_code || ""}
				/>
				<AssetStatusCard
					status={assetDetails?.asset?.status || "ALL"}
					asset={assetDetails}
				/>
				<AssetDetailList
					memberName={`${assetDetails?.asset?.woman__first_name ?? ""} ${
						assetDetails?.asset?.woman__surname ?? ""
					}`.trim()}
					date={assetDetails?.asset?.created_at?.split("T")[0]}
					time={assetDetails?.asset?.created_at?.split("T")[1]?.slice(0, 5)}
					items={(assetDetails?.asset?.items_requested ?? []).map((it) => ({
						name: it.name,
						amount: `₦ ${Number(it.price).toLocaleString()}`,
					}))}
					total={
						assetDetails
							? `₦ ${assetDetails?.asset?.value.toLocaleString()}`
							: undefined
					}
					status={assetDetails?.asset?.status || "ALL"}
				/>
			</ScrollView>
			{assetDetails?.asset?.status === "RUNNING" && (
				<Button
					title='Cancel Request'
					containerStyle={styles.rejectedCardContainer}
					textStyle={{ color: Colors.danger["base"] }}
					onPress={() => setCancelRequestModalVisible(true)}
				/>
			)}
			<Pad size={scaleHeight(16)} />
			{/* <CancelRequestModal
				visible={cancelRequestModalVisible}
				onClose={() => setCancelRequestModalVisible(false)}
			/> */}
		</SafeAreaWrapper>
	);
};

export default AssetDetails;
