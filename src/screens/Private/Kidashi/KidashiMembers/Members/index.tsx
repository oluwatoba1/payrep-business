import { useState } from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { CompositeScreenProps } from "@react-navigation/native";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { FlatList, Image } from "react-native";

import { Button, Typography } from "@components/Forms";
import { KidashiLayout } from "@components/Layout";
import ScreenImages from "@assets/images/screens";
import ComponentImages from "@assets/images/components";
import Colors from "@theme/Colors";
import {
	KidashiDashboardEmptyState,
	SearchContainer,
} from "@components/Miscellaneous";
import { KidashiDashboardEmptyStateProps } from "@components/Miscellaneous/KidashiDashboardEmptyState";
import { HomeStackParamList, MembersStackParamList } from "@navigation/types";
import { useSearchWomanMutation } from "@store/apis/kidashiApi";
import { DEFAULT_ERROR_MESSAGE } from "@utils/Constants";
import useToast from "@hooks/useToast";
import { KidashiMemberItemCard } from "@components/Cards";
import { useAppSelector } from "@store/hooks";
import { scale } from "@utils/Helpers";
import { StyleSheet } from "react-native";
import { styles } from "./styles";

type KidashiMembersProps = CompositeScreenProps<
	StackScreenProps<MembersStackParamList, "Members">,
	BottomTabScreenProps<HomeStackParamList, "Dashboard">
>;

export default function Members({
	navigation: { navigate },
}: KidashiMembersProps) {
	const [searchText, setSearchText] = useState("");
	const [searchWoman, { isLoading: isLoadingSearchWoman }] =
		useSearchWomanMutation();
	const { showToast } = useToast();
	const [members, setMembers] = useState<iWomanMemberDetails[]>([]);
	const emptyStateData: KidashiDashboardEmptyStateProps = {
		icon: ScreenImages.kidashiHome.searchIcon,
		title: "Find members",
		description:
			"Start typing a Phone No, Account No or NIN to search for members",
	};

	const handleSearch = async () => {
		await searchWoman({
			search: searchText,
		})
			.unwrap()
			.then((res) => {
				if (res.status) {
					console.log(res.data);
					setMembers(res.data);
				}
			})
			.catch((err) => {
				console.log(err);
				showToast("danger", err.data.message || DEFAULT_ERROR_MESSAGE);
			});
	};

	// console.log(isLoadingSearchWoman);

	return (
		<KidashiLayout
			leftNode={
				<Typography
					title='Members'
					type='subheading-b'
					color={Colors.neutral["700"]}
				/>
			}
			isLoading={isLoadingSearchWoman}
			rightAction={() => navigate("Dashboard")}
		>
			<SearchContainer
				searchText={searchText}
				setSearchText={setSearchText}
				onSearch={() => handleSearch()}
				placeholder='Phone, Account no or NIN'
				isLoading={isLoadingSearchWoman}
			/>
			{members && members.length > 0 ? (
				<FlatList<iWomanMemberDetails>
					data={members}
					renderItem={({ item }) => (
						<KidashiMemberItemCard
							title={`${item.first_name} ${item.surname}`}
							subtitle={item.mobile_number
								.split("")
								.map((c, index) => (index > 2 && index < 7 ? "*" : c))
								.join("")}
							onSelect={() => {
								navigate("MemberDetails", { id: item.cba_customer_id });
							}}
							rightNode={
								<Image
									source={ComponentImages.kidashiMemberCard.arrowRightIcon2}
									style={styles.proceedToMemberIcon}
								/>
							}
						/>
					)}
					keyExtractor={(item) => item.cba_customer_id}
					showsVerticalScrollIndicator={false}
				/>
			) : (
				<KidashiDashboardEmptyState {...emptyStateData} />
			)}
		</KidashiLayout>
	);
}
