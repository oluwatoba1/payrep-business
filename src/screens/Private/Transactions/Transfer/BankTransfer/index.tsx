// React & React Native Core
import { useCallback, useMemo, useState } from "react";
import { BackHandler, Image, Keyboard, Pressable, View } from "react-native";

// Third-party Libraries
import { StackScreenProps } from "@react-navigation/stack";
import LinearGradient from "react-native-linear-gradient";
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
import DeviceInfo from "react-native-device-info";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { useFocusEffect, useNavigation } from "@react-navigation/native";

// Navigation
import { BottomTabParamList, TransferStackParamList } from "@navigation/types";

// Components
import { AccountDetailsCard, BeneficiaryCard } from "@components/Cards";
import { Button, TextInput, Typography } from "@components/Forms";
import { MainLayout } from "@components/Layout";
import {
	AccountsModal,
	BankModal,
	TransferBeneficiaryModal,
	LimitExceededModal,
} from "@components/Modal";

// Store & State Management
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { setSelectedAccount } from "@store/slices/accountSlice";
import { setTransferDetails } from "@store/slices/transferSlice";
import {
	useCheckTransferLimitsMutation,
	useFetchBanksMutation,
	useFetchCustomerBeneficiariesMutation,
	useNameEnquiryMutation,
} from "@store/apis/transferApi";

// Utilities & Constants
import { addCommas, removeCommas, scaleHeight } from "@utils/Helpers";
import { DEFAULT_ERROR_MESSAGE } from "@utils/Constants";

// Assets
import ComponentImages from "@assets/images/components";

// Styles
import { styles } from "./styles";

// Custom Hooks & Validators
import useToast from "@hooks/useToast";
import useTransferValidation from "./validator";
import Pad from "@components/Pad";
import { IBeneficiaryOption } from "@components/Modal/TransferBeneficiaryModal";

type BankTransferProps = StackScreenProps<
	TransferStackParamList,
	"BankTransfer"
>;

export default function BankTransfer({ navigation }: BankTransferProps) {
	const INITIAL_BANK_STATE = { name: "", code: "", cbn_code: "" };
	const INITIAL_BENEFICIARY_STATE = {
		name: "",
		bank_code: "",
		bank_name: "",
		account_number: "",
		account_name: "",
	};
	// ======================================
	// State Management & Selectors
	// ======================================
	const dispatch = useAppDispatch();
	const { showToast } = useToast();
	const BANK_TRANSFER_SERVICE_CODE = "tran01";
	const accounts = useAppSelector((state) => state.account.accounts);
	const selectedAccount = useAppSelector(
		(state) => state.account.selectedAccount
	);
	const customer_id = useAppSelector((state) => state.customer.customer?.id);

	// ======================================
	// API Hooks & Mutations
	// ======================================
	const [fetchBanks, { isLoading: isFetchingBanks }] = useFetchBanksMutation();
	const [
		nameEnquiry,
		{ isLoading: isNameEnquiryLoading, error: nameEnquiryError },
	] = useNameEnquiryMutation();
	const [checkTransferLimits, { isLoading: isCheckingLimits }] =
		useCheckTransferLimitsMutation();
	const [fetchCustomerBeneficiaries, { isLoading: isLoadingBeneficiaries }] =
		useFetchCustomerBeneficiariesMutation();

	// ======================================
	// Component State
	// ======================================
	// UI Visibility States
	const [showAccountsModal, setShowAccountsModal] = useState(false);
	const [showBeneficiaryCard, setShowBeneficiaryCard] = useState(false);
	const [showBeneficiaryModalList, setShowBeneficiaryModalList] =
		useState(false);
	const [showBankModal, setShowBankModal] = useState(false);
	const [showLimitModal, setShowLimitModal] = useState(false);

	// Data States
	const [beneficiaries, setBeneficiaries] = useState<IBeneficiaryOption[]>([]);
	const [relatedBanks, setRelatedBanks] = useState<IBank[]>([]);
	const [selectedBank, setSelectedBank] = useState<IBank>(INITIAL_BANK_STATE);
	const [selectedBeneficiary, setSelectedBeneficiary] =
		useState<IBeneficiaryOption>(INITIAL_BENEFICIARY_STATE);
	const [transferType, setTransferType] = useState<string>("");
	const [manualEntry, setManualEntry] = useState(false);
	const [amountLeft, setAmountLeft] = useState("");
	const [errorLimitMessage, setErrorLimitMessage] = useState("");
	const [enquiryResponse, setEnquiryResponse] = useState<INameEnquiryResponse>({
		status: false,
		response_code: "",
		message: "",
		transfer_type: "debit",
		beneficiary_account_number: "",
		beneficiary_account_name: "",
		bank_code: "",
		bank_name: "",
		ner: "",
		session_id: "",
		bvn: "",
		kyc: 0,
		fi: "",
	});

	// Loading States
	const [isLoadingMoreBanks, setIsLoadingMoreBanks] = useState(false);
	const [showBeneficiaryShimmer, setShowBeneficiaryShimmer] = useState(false);

	// ======================================
	// Form Handling
	// ======================================
	const {
		formData: { accountNumber, amount, narration },
		formErrors,
		setAccountNumber,
		setAmount,
		setNarration,
		validateForm,
	} = useTransferValidation();

	// ========================================
	// Navigation routing
	// ========================================
	const { reset } =
		useNavigation<BottomTabNavigationProp<BottomTabParamList>>();

	const isFormValid = useMemo(
		() => showBeneficiaryCard && !!amount && accountNumber.length === 10,
		[showBeneficiaryCard, amount, accountNumber]
	);

	// ======================================
	// UI Components
	// ======================================
	const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

	// ======================================
	// Helper Functions
	// ======================================

	const handleApiError = (error: any, context?: string) => {
		showToast(
			"danger",
			error.data?.message || error.message || DEFAULT_ERROR_MESSAGE
		);
	};

	// ======================================
	// Event Handlers
	// ======================================
	// UI Interactions

	const handleBeneficiaryModal = useCallback(async () => {
		setShowBeneficiaryModalList((prev) => !prev);
		try {
			const { status, data, message } = await fetchCustomerBeneficiaries({
				customer_id,
				service_code: BANK_TRANSFER_SERVICE_CODE,
			}).unwrap();

			if (status) {
				if (data.length > 0) setBeneficiaries(data);
				// setShowBankModal(true);
			} else {
				showToast("danger", message);
			}
		} catch (error: any) {
			showToast(
				"danger",
				error.data?.message || error.message || DEFAULT_ERROR_MESSAGE
			);
		}
	}, []);

	const handleCloseBeneficiary = useCallback(() => {
		setShowBeneficiaryCard(false);
		setAccountNumber("");
		setSelectedBank(INITIAL_BANK_STATE);
		setManualEntry(false);
	}, [setAccountNumber]);

	// Bank Selection
	const handleBankSelection = useCallback(
		async (bank: IBank) => {
			setSelectedBank(bank);
			setShowBankModal(false);
			if (accountNumber.length === 10) {
				Keyboard.dismiss();
				performNameEnquiry(accountNumber, bank.code, bank.name);
			}
		},
		[accountNumber]
	);

	// Account Number Handling
	const handleAccountNumberChange = useCallback(
		async (text: string) => {
			setAccountNumber(text);
			setManualEntry(true);

			if (text.length !== 10) return;

			try {
				const result = await fetchBanks({ account_number: text }).unwrap();

				if (result.status && result.data.length > 0) {
					setRelatedBanks(result.data);
					setShowBankModal(true);
					// if (result.data.length === 1) {
					//   handleBankSelection(result.data[0])
					// } else {
					//   setShowBankModal(true);
					// }
				} else {
					const allBanks = await fetchBanks({}).unwrap();

					if (allBanks.status) {
						setRelatedBanks(allBanks.data);
						setShowBankModal(true);
					}
				}
			} catch (error: any) {
				showToast(
					"danger",
					error.data?.message || error.message || DEFAULT_ERROR_MESSAGE
				);
			}
		},
		[fetchBanks, handleBankSelection]
	);

	const performNameEnquiry = useCallback(
		async (accNumber: string, bankCode: string, bankName?: string) => {
			setShowBeneficiaryShimmer(true);
			try {
				const result = await nameEnquiry({
					source_account_number: selectedAccount?.account_number || "",
					beneficiary_account_number: accNumber,
					bank_code: bankCode,
					bank_name: bankName || "",
				}).unwrap();

				setEnquiryResponse(result);

				if (result.status) {
					setTransferType(result.transfer_type || "debit");
					setSelectedBeneficiary({
						name: result.beneficiary_account_name || "",
						bank_code: result.bank_code,
						bank_name: result.bank_name || bankName || "",
						account_number: result.beneficiary_account_number,
					});
					setShowBeneficiaryCard(!isNameEnquiryLoading);
				} else {
					showToast("danger", result.message);
				}
			} catch (error: any) {
				showToast(
					"danger",
					error.data?.message || error.message || DEFAULT_ERROR_MESSAGE
				);
				setShowBeneficiaryCard(false);
			} finally {
				setShowBeneficiaryShimmer(false);
			}
		},
		[nameEnquiry, selectedAccount]
	);

	const handleBeneficiarySelection = useCallback(
		async (beneficiary: IBeneficiaryOption) => {
			setManualEntry(false);
			setShowBeneficiaryModalList(false);
			setShowBeneficiaryShimmer(true);
			setAccountNumber(beneficiary.account_number);
			setSelectedBank({
				name: beneficiary.bank_name || "",
				code: beneficiary.bank_code || "",
				cbn_code: "",
			});

			// if (beneficiary.accountNumber && beneficiary.code){
			try {
				beneficiary.account_number &&
					beneficiary.bank_code &&
					(await performNameEnquiry(
						beneficiary.account_number,
						beneficiary.bank_code,
						beneficiary.bank_name
					));
			} catch (error) {
				setShowBeneficiaryCard(false);
			} finally {
				setShowBeneficiaryShimmer(false);
			}
		},
		[performNameEnquiry]
	);

	//Bank Data Fetching
	const handleBankFetch = useCallback(async () => {
		setIsLoadingMoreBanks(true);
		try {
			const result = await fetchBanks({}).unwrap();

			if (result.status) {
				setRelatedBanks(result.data);
			} else {
				showToast("danger", "Failed to load banks");
			}
		} catch (error: any) {
			showToast(
				"danger",
				error.data?.message || error.message || DEFAULT_ERROR_MESSAGE
			);
		} finally {
			setIsLoadingMoreBanks(false);
		}
	}, [fetchBanks]);

	const handleContinueTransfer = useCallback(async () => {
		validateForm(async () => {
			try {
				const result = await checkTransferLimits({
					amount: removeCommas(amount),
					source_account_number: selectedAccount?.account_number,
				}).unwrap();

				if (!result.status && !result.amount_left) {
					showToast("danger", result.message);
					return;
				}
				if (!result.status && result.amount_left) {
					setShowLimitModal(true);
					setAmountLeft(result.amount_left);
					setErrorLimitMessage(result.message);
					return;
				}

				const transferDetails = {
					sourceAccount: {
						accountName: selectedAccount?.account_name || "",
						accountNumber: selectedAccount?.account_number || "",
						balance: selectedAccount?.balance || "0.00",
					},
					destinationAccount: {
						accountName: selectedBeneficiary.name,
						accountNumber: selectedBeneficiary.account_number,
						bankName: selectedBeneficiary.bank_name || "",
						bankCode: selectedBeneficiary.bank_code,
					},
					amount,
					narration: narration || "",
					charges: result.charges || "0.00",
					deductible: result.deductible || "0.00",
					isFromBeneficiaryList: !manualEntry,
					timestamp: new Date().toISOString(),
					transferType,
					deviceId: await DeviceInfo.getUniqueId(),
					fi: result.fi || "Payrep",
					service: BANK_TRANSFER_SERVICE_CODE,
					kyc: enquiryResponse.kyc,
					ner: enquiryResponse.ner,
					bvn: enquiryResponse.bvn,
				};

				dispatch(setTransferDetails(transferDetails));

				navigation.navigate("ConfirmTransaction");
			} catch (error: any) {
				showToast(
					"danger",
					error.data?.message || error.message || DEFAULT_ERROR_MESSAGE
				);
			}
		});
	}, [
		validateForm,
		checkTransferLimits,
		amount,
		selectedAccount,
		selectedBeneficiary,
		narration,
		manualEntry,
		dispatch,
		navigation,
	]);

	const renderBeneficiarySection = () => {
		if (showBeneficiaryCard) return null;

		return (
			<View>
				<Pressable
					style={styles.doubleUserTeamContainer}
					onPress={handleBeneficiaryModal}
				>
					<Image
						style={styles.doubleUserIcon}
						source={ComponentImages.Wallet.teamLine}
					/>
					<Typography title='Select Beneficiary' type='body-sb' />
				</Pressable>

				<TextInput
					label='Account Number'
					type='text'
					placeholder='Enter the account'
					keyboardType='numeric'
					error={formErrors.accountNumber}
					value={accountNumber}
					maxLength={10}
					onChangeText={handleAccountNumberChange}
					editable={!isNameEnquiryLoading}
				/>
			</View>
		);
	};

	const navigateToHome = () => {
		reset({
			index: 0,
			routes: [
				{
					name: "Home",
					state: {
						index: 0,
						routes: [{ name: "Dashboard" }],
					},
				},
			],
		});
		return true;
	};

	useFocusEffect(
		useCallback(() => {
			const backHandler = BackHandler.addEventListener(
				"hardwareBackPress",
				navigateToHome
			);

			return () => backHandler.remove(); // Cleanup
		}, [])
	);

	const isLoading = isFetchingBanks || isCheckingLimits;

	return (
		<MainLayout
			backAction={navigateToHome}
			isLoading={isLoading}
			keyboardAvoidingType='scroll-view'
		>
			<LimitExceededModal
				showModal={showLimitModal}
				onClose={() => setShowLimitModal(false)}
				transactionAmount={amount || "0.00"}
				amountLeft={amountLeft || "0.00"}
				limitMessage={errorLimitMessage}
			/>

			<BankModal
				showModal={showBankModal}
				onClose={() => setShowBankModal(false)}
				options={relatedBanks || []}
				value={selectedBank.code}
				onSelect={handleBankSelection}
				onViewMore={handleBankFetch}
				isLoadingMore={isLoadingMoreBanks}
			/>

			{/* modal to show benificary lists */}
			<TransferBeneficiaryModal
				showModal={showBeneficiaryModalList}
				onClose={() => setShowBeneficiaryModalList(false)}
				onSelect={(beneficiary) => handleBeneficiarySelection(beneficiary)}
				options={beneficiaries}
			/>

			{/* modal to show account lists */}
			<AccountsModal
				showModal={showAccountsModal}
				onClose={() => setShowAccountsModal(false)}
				onAccountSelect={(account) => dispatch(setSelectedAccount(account))}
				accounts={accounts}
			/>

			<AccountDetailsCard
				accountName={selectedAccount?.account_name || "---"}
				accountNumber={selectedAccount?.account_number || "---"}
				walletBalance={addCommas(selectedAccount?.balance || "0.00")}
				showDetails={true}
				showAccountModalOnPress={() => setShowAccountsModal(true)}
			/>

			{renderBeneficiarySection()}

			{isNameEnquiryLoading ? <Pad size={20} /> : null}

			<ShimmerPlaceholder
				visible={!showBeneficiaryShimmer}
				style={showBeneficiaryShimmer ? styles.shimmerBeneficiary : {}}
				shimmerStyle={showBeneficiaryShimmer ? styles.shimmerBeneficiary : {}}
			>
				{showBeneficiaryCard && !isNameEnquiryLoading && (
					<BeneficiaryCard
						accountName={selectedBeneficiary.name}
						accountNumber={selectedBeneficiary.account_number}
						bankName={selectedBeneficiary.bank_name}
						showCard={showBeneficiaryCard}
						onClose={handleCloseBeneficiary}
					/>
				)}
			</ShimmerPlaceholder>

			<TextInput
				label='Amount'
				type='text'
				placeholder='Enter Amount'
				keyboardType='numeric'
				error={formErrors.amount}
				value={amount}
				onChangeText={(text) => setAmount(text)}
				editable={!isNameEnquiryLoading && showBeneficiaryCard}
			/>
			{/* {renderChargesInfo()} */}

			<TextInput
				label='Narration'
				multiline={true}
				numberOfLines={5}
				customTextInputStyle={{ minHeight: scaleHeight(120) }}
				type='text'
				error={formErrors.narration}
				placeholder='Enter Narration'
				value={narration}
				onChangeText={setNarration}
				editable={!isNameEnquiryLoading && showBeneficiaryCard}
			/>

			<Pad size={30} />

			<Button
				title='Continue'
				onPress={handleContinueTransfer}
				disabled={!isFormValid}
			/>
		</MainLayout>
	);
}
