import { useEffect, useState } from "react";
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
	KidashiBottomTabParamList,
	KidashiHomeStackParamList,
	TrustCircleStackParamList,
} from "@navigation/types";
import CreateTrustCircleModal from "@components/Modal/CreateTrustCircleModal";
import { addCommas } from "@utils/Helpers";
import { ITrustCircleItem } from "@components/UI/TrustCircle/Cards/TrustCircleItemCard";
import {
	TrustCircleItemCard,
	MemberTransactionCard,
} from "@components/UI/TrustCircle/Cards";
import { IMemberTransaction } from "@components/UI/TrustCircle/Cards/MemberTransactionCard";
import { useAppSelector } from "@store/hooks";
import {
	useFetchNotificationsMutation,
	useOnboardWomanMutation,
} from "@store/apis/kidashiApi";
import useToast from "@hooks/useToast";
import { DEFAULT_ERROR_MESSAGE } from "@utils/Constants";

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
	"Resource Requests": {
		icon: ScreenImages.kidashiHome.noTrustCircles,
		title: "No resource requests yet",
		description:
			"Once members start applying for resource financing, their requests will appear here for your review.",
	},
	"My Earnings": {
		icon: ScreenImages.kidashiHome.noTransactions,
		title: "No Earnings Yet",
		description:
			"Start funding members to grow your income and see your earnings here",
	},
};

const dummyTrustCircleData: ITrustCircleItem[] = [
	{
		name: "Ladi Cooperative Group",
		membersCount: 5,
		totalAmount: "",
	},
	{
		name: "Bayan Dutse Traders Group",
		membersCount: 8,
		totalAmount: "",
	},
	{
		name: "Kawo Food Sellers Union",
		membersCount: 3,
		totalAmount: "",
	},
];

const dummyMemberTransactionData: IMemberTransaction[] = [
	{
		description: "Loan Disbursed",
		date: "Sep 3, 2025",
		totalAmount: `₦${addCommas(5000)}`,
		transactionType: "loan-disbursement",
	},
	{
		description: "Loan Repayment",
		date: "Sep 10, 2025",
		totalAmount: `₦${addCommas(3000)}`,
		transactionType: "loan-repayment",
	},
	{
		description: "Loan Disbursed",
		date: "Sep 15, 2025",
		totalAmount: `₦${addCommas(7000)}`,
		transactionType: "loan-disbursement",
	},
];

type TabType = "Resource Requests" | "My Earnings";

type KidashiDashboardProps = CompositeScreenProps<
	StackScreenProps<KidashiHomeStackParamList, "KidashiDashboard">,
	CompositeScreenProps<
		BottomTabScreenProps<HomeStackParamList, "Dashboard">,
		BottomTabScreenProps<KidashiBottomTabParamList, "Trust Circles">
	>
>;

export default function KidashiDashboard({
	navigation: { navigate },
}: KidashiDashboardProps) {
	const [activeTab, setActiveTab] = useState<TabType>("Resource Requests");
	const [showBottomSheet, setShowBottomSheet] = useState(false);
	const [notificationCount, setNotificationCount] = useState<number>(0);

	const { showToast } = useToast();
	const customer = useAppSelector((state) => state.customer.customer);
	const [onboardWoman] = useOnboardWomanMutation();
	const [fetchNotifications] = useFetchNotificationsMutation();

	const options = [
		{
			label: "Transfer to Member",
			sub: "Transfer money to a member's account",
			icon: ScreenImages.kidashiHome.transferIcon,
			onPress: () => navigate("TransferAccountNumber"),
		},
		{
			label: "Create a Trust Circle",
			sub: "Set up a new group for loans",
			icon: ScreenImages.kidashiHome.createTrustCircle,
			onPress: () => navigate("Trust Circles", { screen: "CreateTrustCircle" }),
		},
		{
			label: "Add a New Member",
			sub: "Create account or add to circle",
			icon: ScreenImages.kidashiHome.joinKidashi,
			onPress: () =>
				navigate("MemberRegistration", { screen: "MemberPhoneNumber" }),
		},
	];

	useEffect(() => {
		const getUnreadCount = async () => {
			try {
				const res = await fetchNotifications({ filters: {} }).unwrap();
				if (res?.status && Array.isArray(res?.data)) {
					const unread = res.data.filter((n: any) => !n?.is_read).length;
					setNotificationCount(unread);
				}
			} catch (e) {
				// noop
			}
		};
		getUnreadCount();
	}, [fetchNotifications]);

	const registerWoman = async () => {
		try {
			const { status, message } = await onboardWoman({
				vendor_cba_customer_id: customer?.id || "",
				woman_cba_customer_id: "e0d8775f-45d0-4ba3-9442-039dca3948d4",
			}).unwrap();
			if (status) {
				showToast("success", "Success");
			}
		} catch (error: ErrorResponse | any) {
			showToast(
				"danger",
				error.data?.message || error.message || DEFAULT_ERROR_MESSAGE
			);
		}
	};

	// useEffect(() => {
	// 	registerWoman();
	// }, []);

	return (
		<KidashiLayout
			rightAction={() => navigate("Dashboard")}
			goToNotification={() => navigate("KidashiNotifications")}
			notificationCount={notificationCount}
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
				items={["Resource Requests", "My Earnings"]}
				value={activeTab}
				onTap={(value) => setActiveTab(value as TabType)}
			/>

			<FlatList<ITrustCircleItem | IMemberTransaction>
				data={[]}
				renderItem={({ item, index }) =>
					activeTab === "My Earnings" ? (
						<MemberTransactionCard
							item={item as IMemberTransaction}
							isLastItem={index === dummyMemberTransactionData.length - 1}
						/>
					) : (
						<TrustCircleItemCard
							item={item as ITrustCircleItem}
							isLastItem={index === dummyTrustCircleData.length - 1}
						/>
					)
				}
				keyExtractor={(_, index) => index.toString()}
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
				options={options}
			/>
		</KidashiLayout>
	);
}
