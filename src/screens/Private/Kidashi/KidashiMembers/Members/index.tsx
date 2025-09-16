import { useState } from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { CompositeScreenProps } from "@react-navigation/native";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";

import { Typography } from "@components/Forms";
import { KidashiLayout, Row } from "@components/Layout";
import ScreenImages from "@assets/images/screens";
import { KidashiHomeCardProps } from "@components/Cards/KidashiHomeCard";
import Colors from "@theme/Colors";
import Pad from "@components/Pad";
import { KidashiDashboardEmptyState } from "@components/Miscellaneous";
import { KidashiDashboardEmptyStateProps } from "@components/Miscellaneous/KidashiDashboardEmptyState";
import { HomeStackParamList, MembersStackParamList } from "@navigation/types";

type TabType = "Top Performing" | "Recent Transactions";

type KidashiMembersProps = CompositeScreenProps<
	StackScreenProps<MembersStackParamList, "Members">,
	BottomTabScreenProps<HomeStackParamList, "Dashboard">
>;

export default function Members({
	navigation: { navigate },
}: KidashiMembersProps) {
	const [activeTab, setActiveTab] = useState<TabType>("Top Performing");

	const overview: KidashiHomeCardProps["items"] = [
		{
			title: "Running Assets",
			value: "0",
			backgroundColor: Colors.neutral["50"],
			titleColor: Colors.neutral["400"],
			descriptionColor: Colors.black,
		},
		{
			title: "Overdue Payments",
			value: "₦0.00",
			backgroundColor: Colors.success["100"],
			titleColor: Colors.success["400"],
			descriptionColor: Colors.success["700"],
		},
	];

	const emptyStateData: Record<TabType, KidashiDashboardEmptyStateProps> = {
		"Top Performing": {
			icon: ScreenImages.kidashiHome.noTrustCircles,
			title: "Your top circles will grow here",
			description:
				"Circles with high repayments and will appear here once your members stay consistent",
		},
		"Recent Transactions": {
			icon: ScreenImages.kidashiHome.noTransactions,
			title: "No Transactions yet",
			description:
				"When loans are created or payments are made, you’ll see them listed here",
		},
	};

	return (
		<KidashiLayout
			leftNode={
				<Typography title='Members' type='subheading-b' color={Colors.neutral["700"]} />
			}
			rightAction={() => navigate("Dashboard")}
		>
			<Pad size={16} />

			<Typography title='Trust Circles' />

			<KidashiDashboardEmptyState {...emptyStateData[activeTab]} />
		</KidashiLayout>
	);
}
