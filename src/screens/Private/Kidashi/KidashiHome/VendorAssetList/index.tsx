import { BackHandler, View } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import SafeAreaWrapper from "@components/Layout/SafeAreaWrapper";
import Tab from "@components/Miscellaneous/Tab";
import Pad from "@components/Pad";
import AssetList from "@components/UI/MemberDetails/Assets/AssetList";
import { CompositeScreenProps, useFocusEffect } from "@react-navigation/native";
import {
	HomeStackParamList,
	KidashiHomeStackParamList,
	MembersStackParamList,
} from "@navigation/types";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { StackScreenProps } from "@react-navigation/stack";
import { useGetAllAssetsMutation } from "@store/apis/kidashiApi";
import useToast from "@hooks/useToast";
import EmptyState from "@components/Miscellaneous/EmptyState";
import ScreenImages from "@assets/images/screens";
import { useAppSelector } from "@store/hooks";
import KidashiAssetList from "@components/UI/KidashiDashboard/AssetList";
import { Row } from "@components/Layout";

type KidashiVendorAssetsProps = CompositeScreenProps<
	StackScreenProps<KidashiHomeStackParamList, "VendorAssets">,
	BottomTabScreenProps<HomeStackParamList, "Dashboard">
>;

const VendorAssets = ({ navigation }: KidashiVendorAssetsProps) => {
	const [activeTab, setActiveTab] = useState<string>("RUNNING");
	const vendor_id = useAppSelector((state) => state.kidashi.vendor?.id);

	const { showToast } = useToast();
	const [getAllAssets, { isLoading }] = useGetAllAssetsMutation();
	const [assets, setAssets] = useState<IAsset[]>([]);

	const fetchAssets = async () => {
		getAllAssets({ filters: { vendor_id } })
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
	}, [vendor_id]);

	const backAction = () => {
		navigation.navigate("KidashiDashboard");
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

	// console.log({ assets });

	return (
		<SafeAreaWrapper title={"Vendor Resources"} backAction={backAction}>
			<Tab
				items={["RUNNING", "ALL"]}
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

			<View style={{ flex: 1 }}>
				<KidashiAssetList
					status={activeTab}
					assets={assets}
					navigation={navigation}
					from='VendorAssets'
					showAll={true}
				/>
			</View>
		</SafeAreaWrapper>
	);
};

export default VendorAssets;
