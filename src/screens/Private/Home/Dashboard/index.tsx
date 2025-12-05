import { useCallback, useEffect, useState } from "react";
import {
	Alert,
	BackHandler,
	Image,
	TouchableOpacity,
	View,
} from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { CompositeScreenProps, useFocusEffect } from "@react-navigation/native";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";

import styles from "./styles";
import Pad from "@components/Pad";
import { MainLayout, Row } from "@components/Layout";
import {
	AccountDetailsCard,
	DisputesCard,
	KidashiCard,
	Pill,
	TransactionsCard,
} from "@components/Cards";
import { Typography } from "@components/Forms";
import IconImages from "@assets/images/appIcons";
import { addCommas, mmkvStorage } from "@utils/Helpers";
import { DEFAULT_ERROR_MESSAGE } from "@utils/Constants";
import { BottomTabParamList, HomeStackParamList } from "@navigation/types";
import useToast from "@hooks/useToast";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import {
	useGetAccountsMutation,
	useGetDisputesMutation,
	useGetTransactionsMutation,
} from "@store/apis/accountApi";
import {
	setAccounts,
	setDisputes,
	setTransactions,
	setSelectedAccount,
} from "@store/slices/accountSlice";
import { AccountsModal } from "@components/Modal";
import ComponentImages from "@assets/images/components";
import { setCredentials } from "@store/slices/authSlice";
import { useFetchKidashiVendorMutation } from "@store/apis/kidashiApi";
import { setVendor } from "@store/slices/kidashiSlice";
import { IAction } from "@components/Cards/AccountDetailsCard";

// Keys for storage
const STORAGE_KEYS = {
	ACCOUNTS: "user_accounts",
	TRANSACTIONS: "user_transactions",
	DISPUTES: "user_disputes",
};

type DashboardProps = CompositeScreenProps<
	StackScreenProps<HomeStackParamList, "Dashboard">,
	CompositeScreenProps<
		BottomTabScreenProps<BottomTabParamList, "More">,
		BottomTabScreenProps<BottomTabParamList, "History">
	>
>;

export default function Dashboard({
	navigation: { navigate },
}: DashboardProps) {
	const dispatch = useAppDispatch();
	const { showToast } = useToast();
	const customer = useAppSelector((state) => state.customer.customer);
	const selectedAccount = useAppSelector(
		(state) => state.account.selectedAccount
	);
	const vendor = useAppSelector((state) => state.kidashi.vendor);
	const appState = useAppSelector((state) => state.app.appState);

	const { accounts, transactions, disputes } = useAppSelector(
		(state) => state.account
	);

	const [fetchKidashiVendor, { isLoading: isLoadingVendors }] =
		useFetchKidashiVendorMutation();

	const [getAccounts, { isLoading: isLoadingAccounts }] =
		useGetAccountsMutation();
	const [getTransactions, { isLoading: isLoadingTransactions }] =
		useGetTransactionsMutation();
	const [getDisputes, { isLoading: isLoadingDisputes }] =
		useGetDisputesMutation();

	const ACTIONS_DATA: IAction[] = [
		{
			id: "01",
			title: "Send",
			icon: ComponentImages.accountDetailsCard.send,
			navigate: () =>
				navigate("History", {
					screen: "Transfer",
					params: { screen: "BankTransfer" },
				}),
		},
		{
			id: "02",
			title: "Bills",
			icon: ComponentImages.accountDetailsCard.bills,
			navigate: () =>
				navigate("History", {
					screen: "Bills",
					params: { screen: "BillsCategories" },
				}),
		},
		{
			id: "03",
			title: "Earnings",
			icon: ComponentImages.accountDetailsCard.earnings,
			navigate: () =>
				navigate("Home", {
					screen: "Earnings",
				}),
		},
		{
			id: "04",
			title: "My Cards",
			icon: ComponentImages.accountDetailsCard.cards,
			navigate: () => navigate("More", { screen: "ListBankCardScreen" }),
		},
	];

	const [showAccountsModal, setShowAccountsModal] = useState<boolean>(false);
	const [refresher, setRefresher] = useState<number>(
		new Date().getMilliseconds()
	);

	const fetchAccounts = async () => {
		try {
			const { status, message, data } = await getAccounts({
				customer: customer?.id || "",
			}).unwrap();

			if (status) {
				dispatch(setAccounts(data));
				mmkvStorage.set(STORAGE_KEYS.ACCOUNTS, JSON.stringify(data));

				const primaryAccount =
					data.find((account) => account.account_class === "primary") || null;
				dispatch(setSelectedAccount(primaryAccount));
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

	const getVendor = async () => {
		try {
			const { status, data } = await fetchKidashiVendor({
				cba_customer_id: customer?.id || "",
			}).unwrap();

			if (status) {
				dispatch(setVendor(data));
				return;
			}
			dispatch(setVendor(null));
		} catch (error: ErrorResponse | any) {
			// fail silently
			dispatch(setVendor(null));
		}
	};

	const fetchTransactions = async (account: string) => {
		try {
			const { status, message, data } = await getTransactions({
				count: 50,
				account,
			}).unwrap();

			if (status) {
				dispatch(setTransactions(data));
				mmkvStorage.set(STORAGE_KEYS.TRANSACTIONS, JSON.stringify(data));
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

	const fetchDisputes = async (account: string) => {
		try {
			const { status, message, data } = await getDisputes({
				count: 50,
				account,
			}).unwrap();
			if (status) {
				dispatch(setDisputes(data));
				mmkvStorage.set(STORAGE_KEYS.DISPUTES, JSON.stringify(data));
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

	const handleNotifications = () => {
		navigate("Notifications");
	};

	const displayName = (): string => {
		return customer?.business_name || "";
	};

	const handleNavigateToProfile = () => {
		navigate("More", {
			screen: "Account",
		});
	};

	const navigateToKidashi = useCallback(() => {
		switch (vendor?.status) {
			case "ACTIVE":
				appState?.newKidashiVendor
					? navigate("KidashiBottomTabs", {
							screen: "Trust Circles",
							params: { screen: "CreateTrustCircle" },
					  })
					: navigate("KidashiBottomTabs", {
							screen: "KidashiHome",
							params: { screen: "KidashiDashboard" },
					  });
				break;

			default:
				navigate("KidashiBottomTabs", {
					screen: "KidashiHome",
					params: { screen: "KidashiRegistration" },
				});
		}
	}, [vendor?.status]);

	useEffect(() => {
		const loadCachedData = () => {
			// Safely check if we have data in MMKV
			const cachedAccounts = mmkvStorage.getString(STORAGE_KEYS.ACCOUNTS);
			const cachedTransactions = mmkvStorage.getString(
				STORAGE_KEYS.TRANSACTIONS
			);
			const cachedDisputes = mmkvStorage.getString(STORAGE_KEYS.DISPUTES);

			// If Redux is empty but Cache exists, populate Redux immediately
			if (accounts.length === 0 && cachedAccounts) {
				const parsedAccounts = JSON.parse(cachedAccounts);
				dispatch(setAccounts(parsedAccounts));

				// Also restore the primary account selection
				const primaryAccount = parsedAccounts.find(
					(acc: any) => acc.account_class === "primary"
				);
				if (primaryAccount) dispatch(setSelectedAccount(primaryAccount));
			}

			if (transactions.length === 0 && cachedTransactions) {
				dispatch(setTransactions(JSON.parse(cachedTransactions)));
			}

			if (disputes.length === 0 && cachedDisputes) {
				dispatch(setDisputes(JSON.parse(cachedDisputes)));
			}
		};

		loadCachedData();
	}, []);

	useFocusEffect(
		useCallback(() => {
			const backAction = () => {
				Alert.alert("Hold on!", "Are you sure you want to logout?", [
					{ text: "Cancel", onPress: () => null, style: "cancel" },
					{
						text: "YES",
						onPress: () =>
							dispatch(setCredentials({ token: null, user_id: null })),
					},
				]);
				return true; // Prevent default behavior
			};

			const backHandler = BackHandler.addEventListener(
				"hardwareBackPress",
				backAction
			);

			return () => backHandler.remove(); // Cleanup
		}, [])
	);

	useFocusEffect(
		useCallback(() => {
			if (customer?.id) {
				fetchAccounts();
				getVendor();
			}
		}, [customer, refresher])
	);

	useEffect(() => {
		selectedAccount && fetchTransactions(selectedAccount.id);
		selectedAccount && fetchDisputes(selectedAccount.id);
	}, [selectedAccount, refresher]);

	return (
		<MainLayout
			showHeader={false}
			keyboardAvoidingType='scroll-view'
			isRefreshing={
				isLoadingAccounts || isLoadingTransactions || isLoadingDisputes
			}
			onRefresh={() => setRefresher(new Date().getMilliseconds())}
		>
			<AccountsModal
				showModal={showAccountsModal}
				onClose={() => setShowAccountsModal(false)}
				onAccountSelect={(account) => dispatch(setSelectedAccount(account))}
				accounts={accounts}
			/>
			<Row alignItems='flex-start' containerStyle={styles.headerArea}>
				<View style={styles.profileArea}>
					<TouchableOpacity onPress={handleNavigateToProfile}>
						<Image
							source={
								customer?.image
									? { uri: customer.image }
									: IconImages.users.careUser
							}
							style={styles.profilePicture}
						/>
					</TouchableOpacity>
					<View>
						<Row gap={10}>
							<Typography
								title={`Tier ${customer?.tier?.code ?? ""} Account`}
								type='body-r'
							/>
							{customer?.tier?.code !== 3 ? (
								<Pill
									onPress={() => navigate("More", { screen: "AccountTiers" })}
									text='Upgrade'
								/>
							) : null}
						</Row>
						<Pad size={5} />
						<Typography
							title={`Hello ${displayName() || "User"}! 🖐`}
							type='subheading-sb'
						/>
					</View>
				</View>
			</Row>
			<Pad size={24} />

			<AccountDetailsCard
				accountName={selectedAccount?.account_name || "---"}
				accountNumber={selectedAccount?.account_number || "---"}
				walletBalance={addCommas(selectedAccount?.balance || "0.00")}
				showAccountModalOnPress={() => setShowAccountsModal(true)}
				actions={ACTIONS_DATA}
				onSelectAccountNumber={showToast}
			/>

			<Pad size={24} />

			<KidashiCard onProceed={navigateToKidashi} />

			<Pad size={20} />

			<TransactionsCard
				transactions={[...transactions].slice(0, 3)}
				handleNavigate={() =>
					navigate("History", { screen: "TransactionHistory" })
				}
			/>

			<Pad size={24} />

			<DisputesCard disputes={[...disputes].slice(0, 3)} />
		</MainLayout>
	);
}
