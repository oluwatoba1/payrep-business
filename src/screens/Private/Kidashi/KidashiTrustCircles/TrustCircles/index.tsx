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
import {
	HomeStackParamList,
	TrustCircleStackParamList,
} from "@navigation/types";

type TrustCirclesProps = CompositeScreenProps<
	StackScreenProps<TrustCircleStackParamList, "TrustCircles">,
	BottomTabScreenProps<HomeStackParamList, "Dashboard">
>;

export default function TrustCircles({
	navigation: { navigate },
}: TrustCirclesProps) {
	const [searchText, setSearchText] = useState("");

	const emptyStateData: KidashiDashboardEmptyStateProps = {
		icon: ScreenImages.kidashiHome.searchIcon,
		title: "Find Trust Circles",
		description: "Start typing a name to search for trust circles",
	};

	return (
		<KidashiLayout
			leftNode={
				<Typography
					title='Trust Circles'
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
				placeholder='Search'
			/>
			<KidashiDashboardEmptyState {...emptyStateData} />
		</KidashiLayout>
	);
}
