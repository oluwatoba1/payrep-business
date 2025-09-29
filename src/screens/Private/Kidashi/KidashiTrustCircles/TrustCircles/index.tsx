import { useCallback, useState } from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { CompositeScreenProps, useFocusEffect } from "@react-navigation/native";
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
import useToast from "@hooks/useToast";
import { useAppSelector } from "@store/hooks";
import { useFetchTrustCirclesMutation } from "@store/apis/kidashiApi";
import { DEFAULT_ERROR_MESSAGE } from "@utils/Constants";
import { ActivityIndicator, FlatList } from "react-native";
import { TrustCircleItemCard } from "@components/UI/TrustCircle/Cards";
import { ITrustCircleItem } from "@components/UI/TrustCircle/Cards/TrustCircleItemCard";
import Pad from "@components/Pad";

type TrustCirclesProps = CompositeScreenProps<
	StackScreenProps<TrustCircleStackParamList, "TrustCircles">,
	BottomTabScreenProps<HomeStackParamList, "Dashboard">
>;

export default function TrustCircles({
	navigation: { navigate },
}: TrustCirclesProps) {
	const { showToast } = useToast();
	const vendor = useAppSelector((state) => state.kidashi.vendor);

	const [fetchTrustCircles, { isLoading }] = useFetchTrustCirclesMutation();

	const [searchText, setSearchText] = useState("");
	const [trustCircles, setTrustCircles] = useState<ITrustCircle[]>([]);

	const emptyStateData: KidashiDashboardEmptyStateProps = {
		icon: ScreenImages.kidashiHome.searchIcon,
		title: "Find Trust Circles",
		description: "Start typing a name to search for trust circles",
	};

	const _fetchTrustCircles = async () => {
		try {
			const { status, message, data } = await fetchTrustCircles({
				vendor_id: vendor?.id || "",
			}).unwrap();

			if (status) {
				setTrustCircles(data.circles);
			} else {
				showToast("danger", message);
			}
		} catch (error: ErrorResponse | any) {
			console.log(error);
			showToast(
				"danger",
				error.data?.message || error.message || DEFAULT_ERROR_MESSAGE
			);
		}
	};

	useFocusEffect(
		useCallback(() => {
			_fetchTrustCircles();
		}, [vendor])
	);

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
			<Pad size={10} />

			{isLoading ? (
				<ActivityIndicator size={20} />
			) : (
				<FlatList<ITrustCircle>
					data={trustCircles}
					renderItem={({ item, index }) => (
						<TrustCircleItemCard
							item={{
								name: item.circle_name,
								membersCount: item.current_member_count || 0,
								totalAmount: "",
							}}
							isLastItem={index === trustCircles.length - 1}
							onPress={() => navigate("TrustCircleDetails", { id: item.id })}
						/>
					)}
					keyExtractor={(_, index) => index.toString()}
					ListEmptyComponent={
						<KidashiDashboardEmptyState {...emptyStateData} />
					}
				/>
			)}
		</KidashiLayout>
	);
}
