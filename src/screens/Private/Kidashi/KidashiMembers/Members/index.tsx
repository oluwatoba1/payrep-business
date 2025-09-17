import { useState } from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { CompositeScreenProps } from "@react-navigation/native";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";

import { Typography } from "@components/Forms";
import { KidashiLayout } from "@components/Layout";
import ScreenImages from "@assets/images/screens";
import Colors from "@theme/Colors";
import {
	KidashiDashboardEmptyState,
	SearchContainer,
} from "@components/Miscellaneous";
import { KidashiDashboardEmptyStateProps } from "@components/Miscellaneous/KidashiDashboardEmptyState";
import { HomeStackParamList, MembersStackParamList } from "@navigation/types";

type KidashiMembersProps = CompositeScreenProps<
	StackScreenProps<MembersStackParamList, "Members">,
	BottomTabScreenProps<HomeStackParamList, "Dashboard">
>;

export default function Members({
	navigation: { navigate },
}: KidashiMembersProps) {
	const [searchText, setSearchText] = useState("");

	const emptyStateData: KidashiDashboardEmptyStateProps = {
		icon: ScreenImages.kidashiHome.searchIcon,
		title: "Find members",
		description:
			"Start typing a Phone No, Account No or NIN to search for members",
	};

	return (
		<KidashiLayout
			leftNode={
				<Typography
					title='Members'
					type='subheading-b'
					color={Colors.neutral["700"]}
				/>
			}
			rightAction={() => navigate("Dashboard")}
		>
			<SearchContainer
				searchText={searchText}
				setSearchText={setSearchText}
				onSearch={() => {}}
				placeholder='Phone, Account no or NIN'
			/>
			<KidashiDashboardEmptyState {...emptyStateData} />
		</KidashiLayout>
	);
}
