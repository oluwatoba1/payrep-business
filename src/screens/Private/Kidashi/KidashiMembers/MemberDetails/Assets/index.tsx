import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import SafeAreaWrapper from "@components/Layout/SafeAreaWrapper";
import Tab from "@components/Miscellaneous/Tab";
import Pad from "@components/Pad";
import AssetList from "@components/UI/MemberDetails/Assets/AssetList";
import { CompositeScreenProps } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { HomeStackParamList, MembersStackParamList } from "@navigation/types";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { StackScreenProps } from "@react-navigation/stack";
import { useGetAllAssetsMutation } from "@store/apis/kidashiApi";
import useToast from "@hooks/useToast";
import EmptyState from "@components/Miscellaneous/EmptyState";
import ScreenImages from "@assets/images/screens";
import { useAppSelector } from "@store/hooks";

type KidashiMembersProps = CompositeScreenProps<
	StackScreenProps<MembersStackParamList, "Assets">,
	BottomTabScreenProps<HomeStackParamList, "Dashboard">
>;

const Assets = ({ navigation }: KidashiMembersProps) => {
	const [activeTab, setActiveTab] = useState<string>("Ongoing");
	const memberDetails = useAppSelector((state) => state.kidashi.memberDetails);

	const { showToast } = useToast();
	const [getAllAssets, { isLoading }] = useGetAllAssetsMutation();
	const [assets, setAssets] = useState<IAsset[]>([]);

	const fetchAssets = async () => {
		getAllAssets({ filters: { woman_id: memberDetails?.id || '' } })
			.unwrap()
			.then((res) => {
				setAssets(res.data);
			})
			.catch((err) => {
				console.log(err);
				showToast("danger", err.data.message);
			});
	};

	useEffect(() => {
		fetchAssets();
	}, [memberDetails?.id]);

	return (
		<SafeAreaWrapper
			title={`Assets for ${memberDetails?.first_name || "Woman"}`}
			backAction={() =>
				navigation.navigate("MemberDetails", {
					id: memberDetails?.cba_customer_id || "",
				})
			}
		>
			<Tab
				items={["REQUESTED", "ALL"]}
				onTap={(value) => setActiveTab(value.toUpperCase() as AssetStatus)}
				value={activeTab}
			/>
			<Pad size={16} />
			{assets.length === 0 && (
				<EmptyState
					description='When you have active asset finance, you’ll see repayment progress here'
					icon={ScreenImages.kidashiMemberDetails.packageIcon}
					title='No assets found'
				/>
			)}
			{activeTab === "REQUESTED" && (
				<AssetList status='REQUESTED' assets={assets} navigation={navigation} />
			)}
			{activeTab === "ALL" && (
				<AssetList assets={assets} navigation={navigation} />
			)}
		</SafeAreaWrapper>
	);
};

export default Assets;
