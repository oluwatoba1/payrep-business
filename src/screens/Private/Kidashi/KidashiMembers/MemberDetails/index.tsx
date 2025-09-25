import React, { useCallback, useState } from "react";
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
import { BackHandler, Image, Pressable } from "react-native";
import { Typography } from "@components/Forms";
import ScreenImages from "@assets/images/screens";
import PerformActionModal from "@components/UI/MemberDetails/PerformActionModal";
import { useFocusEffect } from "@react-navigation/native";

type TabType = "Transactions" | "More details" | "Account Info";

type MemberDetailsProps = StackScreenProps<
	MembersStackParamList,
	"MemberDetails"
>;
const MemberDetails = ({ navigation: { navigate } }: MemberDetailsProps) => {
	const [activeTab, setActiveTab] = useState<TabType>("Transactions");
	const [visible, setVisible] = useState(false);

	const backAction = () => {
		navigate("Members");
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
		<SafeAreaWrapper title='Member Details' backAction={backAction}>
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
			<Pressable
				style={styles.performActionButton}
				onPress={() => setVisible(true)}
			>
				<Image
					source={ScreenImages.kidashiMemberDetails.boltIcon}
					style={styles.boltIcon}
				/>
				<Typography
					title='Perform an Action'
					type='body-sb'
					style={styles.performActionText}
				/>
			</Pressable>
			<PerformActionModal
				visible={visible}
				onClose={() => setVisible(false)}
				parent='MemberDetails'
				navigate={navigate}
			/>
		</SafeAreaWrapper>
	);
};

export default MemberDetails;
