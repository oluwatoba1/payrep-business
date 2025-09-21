import React from "react";
import { ScrollView } from "react-native";
import SafeAreaWrapper from "@components/Layout/SafeAreaWrapper";
import AssetDetailsHeader from "@components/UI/MemberDetails/Assets/AssetDetails/AssetDetailsHeader";
import AssetStatusCard from "@components/UI/MemberDetails/Assets/AssetDetails/AssetStatusCard";
import AssetDetailList from "@components/UI/MemberDetails/Assets/AssetDetails/AssetDetailsList";
import Pad from "@components/Pad";
import { scaleHeight } from "@utils/Helpers";
export type Status =
	| "approved"
	| "pending approval"
	| "rejected"
	| "ongoing"
	| "denied"
	| "repaid"
	| "cancelled";
const AssetDetails = () => {
	const status: Status = "ongoing";
	return (
		<SafeAreaWrapper title='Asset Details'>
			<ScrollView showsVerticalScrollIndicator={false}>
				<AssetDetailsHeader />
				<AssetStatusCard status={status} />
				<AssetDetailList status={status} />
			</ScrollView>
			<Pad size={scaleHeight(16)} />
		</SafeAreaWrapper>
	);
};

export default AssetDetails;
