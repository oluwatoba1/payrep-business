import React, { useState } from "react";
import { styles } from "./style";
import SafeAreaWrapper from "@components/Layout/SafeAreaWrapper";
import MemberDetailsHeaderComp from "@components/UI/MemberDetails/HeaderComp";
import MemberDetailsCard from "@components/UI/MemberDetails/MemberDetailsCard";
import Colors from "@theme/Colors";
import Tab from "@components/Miscellaneous/Tab";
import AccountInfo from "@components/UI/MemberDetails/AccountInfo";
import MoreDetails from "@components/UI/MemberDetails/MoreDetails";
import Transactions from "@components/UI/MemberDetails/Transactions";
import Pad from "@components/Pad";
import { StackScreenProps } from "@react-navigation/stack";
import { MembersStackParamList } from "@navigation/types";

type TabType = "Transactions" | "More details" | "Account Info";

type MemberDetailsProps = StackScreenProps<
	MembersStackParamList,
	"MemberDetails"
>;
const MemberDetails = ({ navigation: { navigate } }: MemberDetailsProps) => {
	const [activeTab, setActiveTab] = useState<TabType>("Transactions");
	return (
		<SafeAreaWrapper title='Member Details'>
			<MemberDetailsHeaderComp />
			<MemberDetailsCard navigate={navigate} />
			<Tab
				items={["Transactions", "More details", "Account Info"]}
				value={activeTab}
				onTap={(value) => setActiveTab(value as TabType)}
			/>
			<Pad size={16} />
			{activeTab === "Transactions" && <Transactions navigate={navigate} />}
			{activeTab === "More details" && <MoreDetails />}
			{activeTab === "Account Info" && <AccountInfo />}
		</SafeAreaWrapper>
	);
};

export default MemberDetails;
