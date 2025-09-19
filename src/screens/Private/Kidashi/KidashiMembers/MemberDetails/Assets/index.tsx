import { View, Text } from "react-native";
import React, { useState } from "react";
import SafeAreaWrapper from "@components/Layout/SafeAreaWrapper";
import Tab from "@components/Miscellaneous/Tab";
import Pad from "@components/Pad";
import AssetList from "@components/UI/MemberDetails/Assets/AssetList";

const Assets = () => {
	const [activeTab, setActiveTab] = useState<string>("Ongoing");
	return (
		<SafeAreaWrapper title='Assets for Zainab'>
			<Tab
				items={["Ongoing", "All"]}
				onTap={(value) => setActiveTab(value)}
				value={activeTab}
			/>
			<Pad size={16} />
			{activeTab === "Ongoing" && <AssetList status='ongoing' />}
			{activeTab === "All" && <AssetList />}
		</SafeAreaWrapper>
	);
};

export default Assets;
