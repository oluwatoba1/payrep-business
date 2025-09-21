import { View, Text } from "react-native";
import React, { useState } from "react";
import SafeAreaWrapper from "@components/Layout/SafeAreaWrapper";
import Tab from "@components/Miscellaneous/Tab";
import Pad from "@components/Pad";
import AssetList from "@components/UI/MemberDetails/Assets/AssetList";
import { CompositeScreenProps, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { HomeStackParamList, MembersStackParamList } from "@navigation/types";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { StackScreenProps } from "@react-navigation/stack";

type KidashiMembersProps = CompositeScreenProps<
	StackScreenProps<MembersStackParamList, "Assets">,
	BottomTabScreenProps<HomeStackParamList, "Dashboard">
>;

const Assets = ({ navigation }: KidashiMembersProps) => {
	const [activeTab, setActiveTab] = useState<string>("Ongoing");

	return (
		<SafeAreaWrapper title='Assets for Zainab'>
			<Tab
				items={["Ongoing", "All"]}
				onTap={(value) => setActiveTab(value)}
				value={activeTab}
			/>
			<Pad size={16} />
			{activeTab === "Ongoing" && (
				<AssetList status='ongoing' navigation={navigation} />
			)}
			{activeTab === "All" && <AssetList navigation={navigation} />}
		</SafeAreaWrapper>
	);
};

export default Assets;
