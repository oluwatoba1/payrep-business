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
	const [assetDetails, setAssetDetails] = useState<IAsset | null>(null);
	const fetchAssetDetails = async () => {
		const { status, data } = await getAssetDetails({
			asset_id,
		}).unwrap();
		if (status) {
			setAssetDetails(data);
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
							? `₦ ${assetDetails.value.toLocaleString()}`
							: undefined
					}
					reference={assetDetails?.id}
				/>
				<AssetStatusCard status={assetDetails?.status || "ALL"} />
				<AssetDetailList
					memberName={`${assetDetails?.woman__first_name ?? ""} ${
						assetDetails?.woman__surname ?? ""
					}`.trim()}
					trustCircle={assetDetails?.product_code ?? ""}
					date={assetDetails?.created_at?.split("T")[0]}
					time={assetDetails?.created_at?.split("T")[1]?.slice(0, 5)}
					items={(assetDetails?.items_requested ?? []).map((it) => ({
						name: it.name,
						amount: `₦ ${Number(it.price).toLocaleString()}`,
					}))}
					total={
						assetDetails
							? `₦ ${assetDetails.value.toLocaleString()}`
							: undefined
					}
					status={assetDetails?.status || "ALL"}
				/>
			</ScrollView>
			{assetDetails?.status === "REQUESTED" && (
				<Button
					title='Cancel Request'
					containerStyle={styles.rejectedCardContainer}
					textStyle={{ color: Colors.danger["base"] }}
					onPress={() => setCancelRequestModalVisible(true)}
				/>
			)}
			<Pad size={scaleHeight(16)} />
			<CancelRequestModal
				visible={cancelRequestModalVisible}
				onClose={() => setCancelRequestModalVisible(false)}
			/>
		</SafeAreaWrapper>
	);
};

export default AssetDetails;
