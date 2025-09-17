import { useState } from "react";
import { FlatList, Image, Pressable, Text } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { CompositeScreenProps } from "@react-navigation/native";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";

import { Typography } from "@components/Forms";
import { KidashiLayout, Row } from "@components/Layout";
import ScreenImages from "@assets/images/screens";
import { KidashiHomeCard } from "@components/Cards";
import { KidashiHomeCardProps } from "@components/Cards/KidashiHomeCard";
import Colors from "@theme/Colors";
import styles from "./styles";
import Pad from "@components/Pad";
import Tab from "@components/Miscellaneous/Tab";
import { KidashiDashboardEmptyState } from "@components/Miscellaneous";
import { KidashiDashboardEmptyStateProps } from "@components/Miscellaneous/KidashiDashboardEmptyState";
import {
	HomeStackParamList,
	KidashiHomeStackParamList,
} from "@navigation/types";
import CreateTrustCircleModal from "@components/Modal/CreateTrustCircleModal";
import TrustCircleItem, {
	ITrustCircleItem,
} from "@components/UI/TrustCircle/TrustCircleItem";
import { addCommas } from "@utils/Helpers";

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

const dummyTrustCircleData: ITrustCircleItem[] = [
	{
		name: "Ladi Cooperative Groupppppppppppppppp",
		membersCount: 5,
		totalAmount: `₦${addCommas(5000)}`,
	},
	{
		name: "Bayan Dutse Traders Group",
		membersCount: 8,
		totalAmount: `₦${addCommas(120000)}`,
	},
	{
		name: "Kawo Food Sellers Union",
		membersCount: 3,
		totalAmount: `₦${addCommas(3250)}`,
	},
];

type TabType = "Top Performing" | "Recent Transactions";

type KidashiDashboardProps = CompositeScreenProps<
	StackScreenProps<KidashiHomeStackParamList, "KidashiDashboard">,
	BottomTabScreenProps<HomeStackParamList, "Dashboard">
>;

export default function KidashiDashboard({
	navigation: { navigate },
}: KidashiDashboardProps) {
	const [activeTab, setActiveTab] = useState<TabType>("Top Performing");
	const [showBottomSheet, setShowBottomSheet] = useState(false);

	return (
		<KidashiLayout
			rightAction={() => navigate("Dashboard")}
			headerFooter={
				<Row
					alignItems='center'
					justifyContent='space-between'
					containerStyle={styles.earningsBanner}
				>
					<Typography
						title='My Earnings'
						type='label-r'
						color={Colors.neutral["400"]}
					/>

					<Row alignItems='center' justifyContent='space-between' gap={8}>
						<Typography
							title='+₦0.00'
							type='label-sb'
							color={Colors.success["600"]}
						/>
						<Row alignItems='center' justifyContent='space-between'>
							<Typography
								title='See Breakdown'
								type='label-sb'
								color={Colors.primary["600"]}
							/>
							<Image
								source={ScreenImages.kidashiHome.caretRight}
								style={styles.caretIcon}
							/>
						</Row>
					</Row>
				</Row>
			}
		>
			<Pad size={16} />

			<KidashiHomeCard items={overview} />

			<Pad size={16} />

			<Tab
				items={["Top Performing", "Recent Transactions"]}
				value={activeTab}
				onTap={(value) => setActiveTab(value as TabType)}
			/>

			<FlatList
				data={dummyTrustCircleData}
				renderItem={({ item, index }) => (
					<TrustCircleItem
						item={item}
						isLastItem={index === dummyTrustCircleData.length - 1}
					/>
				)}
				keyExtractor={(item) => item.name}
				ListEmptyComponent={
					<KidashiDashboardEmptyState {...emptyStateData[activeTab]} />
				}
			/>

			<Pressable
				onPress={() => setShowBottomSheet(true)}
				style={styles.plusIconContainer}
			>
				<Image
					source={ScreenImages.kidashiHome.create}
					style={styles.plusIcon}
				/>
			</Pressable>

			<CreateTrustCircleModal
				visible={showBottomSheet}
				onClose={() => setShowBottomSheet(false)}
			/>
		</KidashiLayout>
	);
}
