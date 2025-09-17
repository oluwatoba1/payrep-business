import React, { useState } from "react";
import { styles } from "./style";
import SafeAreaWrapper from "@components/Layout/SafeAreaWrapper";
import MemberDetailsHeaderComp from "@components/UI/MemberDetails/HeaderComp";
import MemberDetailsCard, {
	MemberDetailsCardProps,
} from "@components/UI/MemberDetails/MemberDetailsCard";
import Colors from "@theme/Colors";
import Tab from "@components/Miscellaneous/Tab";
import AccountInfo from "@components/UI/MemberDetails/AccountInfo";
import MoreDetails from "@components/UI/MemberDetails/MoreDetails";
import Transactions from "@components/UI/MemberDetails/Transactions";
import Pad from "@components/Pad";

type TabType = "Transactions" | "More details" | "Account Info";

const MemberDetails = () => {
	const items: MemberDetailsCardProps["items"] = [
		{
			title: "Assets",
			value: "0",
			backgroundColor: Colors.neutral["50"],
			titleColor: Colors.neutral["400"],
			descriptionColor: Colors.black,
			onPress: () => {},
		},
		{
			title: "Outstanding",
			value: "₦0.00",
			backgroundColor: Colors.success["100"],
			titleColor: Colors.success["400"],
			descriptionColor: Colors.black,
		},
	];
	const [activeTab, setActiveTab] = useState<TabType>("Transactions");
	return (
		<SafeAreaWrapper title='Member Details'>
			<MemberDetailsHeaderComp />
			<MemberDetailsCard items={items} />
			<Tab
				items={["Transactions", "More details", "Account Info"]}
				value={activeTab}
				onTap={(value) => setActiveTab(value as TabType)}
			/>
			<Pad size={16} />
			{activeTab === "Transactions" && <Transactions />}
			{activeTab === "More details" && <MoreDetails />}
			{activeTab === "Account Info" && <AccountInfo />}
		</SafeAreaWrapper>
	);
};

export default MemberDetails;
