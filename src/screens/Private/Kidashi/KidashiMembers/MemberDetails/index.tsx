import {
	ActivityIndicator,
	Alert,
	BackHandler,
	FlatList,
	Image,
	Pressable,
} from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { CompositeScreenProps, useFocusEffect } from "@react-navigation/native";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { StackScreenProps } from "@react-navigation/stack";

import SafeAreaWrapper from "@components/Layout/SafeAreaWrapper";
import MemberDetailsHeaderComp from "@components/UI/MemberDetails/HeaderComp";
import MemberDetailsCard from "@components/UI/MemberDetails/MemberDetailsCard";
import AccountInfo from "@components/UI/MemberDetails/AccountInfo";
import MoreDetails from "@components/UI/MemberDetails/MoreDetails";
import { TransactonItem } from "@components/Cards";
import Pad from "@components/Pad";
import {
	KidashiBottomTabParamList,
	MembersStackParamList,
} from "@navigation/types";
import { Typography } from "@components/Forms";
import ScreenImages from "@assets/images/screens";
import PerformActionModal from "@components/UI/MemberDetails/PerformActionModal";
import { useGetMemberDetailsMutation } from "@store/apis/kidashiApi";
import useToast from "@hooks/useToast";
import {
	BOTTOM_TAB_CONTAINER_HEIGHT,
	DEFAULT_ERROR_MESSAGE,
} from "@utils/Constants";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { setMemberDetails } from "@store/slices/kidashiSlice";
import { KidashiDashboardEmptyState } from "@components/Miscellaneous";
import { KidashiDashboardEmptyStateProps } from "@components/Miscellaneous/KidashiDashboardEmptyState";
import { useGetTransactionsMutation } from "@store/apis/accountApi";
import { setTransactions } from "@store/slices/transactionSlice";
import Tab from "@components/Miscellaneous/Tab";
import { styles } from "./style";

const emptyStateData: KidashiDashboardEmptyStateProps = {
	icon: ScreenImages.kidashiHome.noTrustCircles,
	title: "Your transactions will show here",
	description: "No record of member's transactions available",
};

type TabType = "Transactions" | "More details" | "Account Info";

type MemberDetailsProps = CompositeScreenProps<
	StackScreenProps<MembersStackParamList, "MemberDetails">,
	BottomTabScreenProps<KidashiBottomTabParamList, "Trust Circles">
>;

const MemberDetails = ({ navigation, route }: MemberDetailsProps) => {
	const [isInitialLoad, setIsInitialLoad] = useState<boolean>(true);
	const dispatch = useAppDispatch();
	const { showToast } = useToast();
	const [getMemberDetails, { isLoading: memberDetailsLoading }] =
		useGetMemberDetailsMutation();
	const [getTransactions, { isLoading: transactionsLoading }] =
		useGetTransactionsMutation();

	const memberDetails = useAppSelector((state) => state.kidashi.memberDetails);
	const transactionsData =
		useAppSelector((state) => state.transactions.transactions) || [];

	const [activeTab, setActiveTab] = useState<TabType>("Transactions");
	const [visible, setVisible] = useState<boolean>(false);

	const fetchTransactions = async (params: ITransactionQueryParams) => {
		try {
			const { status, message, data } = await getTransactions(params).unwrap();

			if (status) {
				// TODO: REMOVE DISPATCH, TRANSACTIONS CAN BE ACCESSED IN THE SCREEN STATE
				dispatch(setTransactions(data));
			} else {
				showToast("danger", message);
			}
		} catch (error: ErrorResponse | any) {
			showToast(
				"danger",
				error.data?.message || error.message || DEFAULT_ERROR_MESSAGE
			);
		}
	};

	const fetchDetails = async () => {
		try {
			const { status, message, data } = await getMemberDetails({
				cba_customer_id: route.params.id,
			}).unwrap();
			if (status) {
				dispatch(
					setMemberDetails({ ...data, cba_customer_id: route.params.id })
				);
			} else {
				showToast("danger", message);
				// if fetch fails, go back using our custom back handler
				backAction();
			}
		} catch (error: ErrorResponse | any) {
			showToast(
				"danger",
				error.data?.message || error.message || DEFAULT_ERROR_MESSAGE
			);
			backAction();
		}
	};

	// 🔙 Custom back behaviour: prefer going back in-stack; otherwise use route.params.from to return to origin
	const backAction = () => {
		// Otherwise, inspect the origin passed when navigating here
		const from = (route.params as any)?.from as
			| "TrustCircleDetails"
			| "Members"
			| "Assets"
			| undefined;

		if (from === "Assets") {
			// If origin was Assets, navigate to Assets screen in Members stack
			navigation.navigate("Assets");
			return true;
		}

		if (from === "TrustCircleDetails") {
			navigation.navigate("Trust Circles", {
				screen: "TrustCircleDetails",
				params: { id: memberDetails?.trust_circle || "" },
			});
			return true;
		}

		if (from === "Members") {
			// If origin was Members search, navigate to Members screen
			navigation.navigate("Members");
			return true;
		}

		// Fallback: try to go back
		navigation.goBack();
		return true;
	};

	useFocusEffect(
		useCallback(() => {
			setIsInitialLoad(true);
			fetchDetails();
		}, [route.params.id])
	);

	useEffect(() => {
		if (memberDetails?.account_number) {
			fetchTransactions({ account: memberDetails.account_number });
		}
	}, [memberDetails?.account_number]);

	useFocusEffect(
		useCallback(() => {
			const backHandler = BackHandler.addEventListener(
				"hardwareBackPress",
				backAction
			);

			return () => backHandler.remove();
		}, [backAction])
	);

	return (
		<SafeAreaWrapper backAction={backAction} title='Member Details'>
			<MemberDetailsHeaderComp
				onOTPManagePress={() => navigation.navigate("ManageVerfiers")}
				userName={`${memberDetails?.first_name || ""} ${
					memberDetails?.surname || ""
				}`}
				status={memberDetails?.status}
			/>
			<MemberDetailsCard
				onAssetPress={() => navigation.navigate("Assets")}
				memberDetails={memberDetails}
			/>
			<Tab
				items={["Transactions", "More details", "Account Info"]}
				value={activeTab}
				onTap={(value) => setActiveTab(value as TabType)}
			/>
			<Pad size={20} />

			{activeTab === "Transactions" && (
				<>
					{transactionsLoading ? (
						<ActivityIndicator size='large' />
					) : transactionsData.length === 0 ? (
						<KidashiDashboardEmptyState {...emptyStateData} />
					) : (
						<FlatList
							data={transactionsData as ITransaction[]}
							renderItem={({ item }) => {
								return <TransactonItem transaction={item} onPress={() => {}} />;
							}}
							keyExtractor={(item) => item.reference_number}
							style={{ flex: 1 }}
							contentContainerStyle={styles.transactionContainer}
							showsVerticalScrollIndicator={false}
						/>
					)}
				</>
			)}
			{activeTab === "More details" && <MoreDetails details={memberDetails} />}
			{activeTab === "Account Info" && <AccountInfo details={memberDetails} />}

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
				options={[
					{
						title: "Request Asset Finance",
						subTitle: "Apply for asset support",
						icon: ScreenImages.kidashiMemberDetails.boxIcon,
						onPress: () => navigation.navigate("EnterAssetInformation"),
					},
				]}
				visible={visible}
				onClose={() => setVisible(false)}
			/>
		</SafeAreaWrapper>
	);
};

export default MemberDetails;
