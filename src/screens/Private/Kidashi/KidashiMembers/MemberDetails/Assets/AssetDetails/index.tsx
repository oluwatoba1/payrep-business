import React, { useState } from "react";
import { ScrollView } from "react-native";
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

const AssetDetails = ({ route }: AssetDetailsProps) => {
	const status: Status =
		(route?.params?.status as Status) ?? "pending approval";
	const [cancelRequestModalVisible, setCancelRequestModalVisible] =
		useState(false);
	return (
		<SafeAreaWrapper title='Asset Details'>
			<ScrollView showsVerticalScrollIndicator={false}>
				<AssetDetailsHeader />
				<AssetStatusCard status={status} />
				<AssetDetailList status={status} />
			</ScrollView>
			{status === "pending approval" && (
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
