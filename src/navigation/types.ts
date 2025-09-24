import { NavigatorScreenParams } from "@react-navigation/native";

interface INotification {
	title: string;
	description: string;
	time: string;
	read: boolean;
}

export type PublicNavigatorParamList = {
	Splashscreen: undefined;
	Onboarding: undefined;
	Landing: undefined;
	Login: undefined;
	UserType: undefined;
	ForgotPassword: undefined;
	ResetPassword: {
		username: string;
	};
	CreatePassword: undefined;

	MobileNumber: { userType: string };
	VerificationCode: { userType: string };
	EmailVerification: undefined;
	EmailAddress: undefined;
	RegisterNewDevice: { username: string; customerType: string | null };
	FacialRecognition: { token: string; customer: string };
	SuccessMessage: {
		title: string;
		subTitle: string;
	};
};
export type PrivateNavigatorParamList = {
	ProfileSetupIntro: undefined;
	BillsCategories: undefined;
	Kidashi: undefined;
	BottomTabs: NavigatorScreenParams<BottomTabParamList>;
	MessageScreen: { title: string; message: string; action: () => void };
};

export type BottomTabParamList = {
	Home: NavigatorScreenParams<HomeStackParamList>;
	Support: NavigatorScreenParams<SupportStackParamList>;
	History: NavigatorScreenParams<TransactionStackParamList>;
	More: NavigatorScreenParams<MoreStackParamList>;
	Savings: NavigatorScreenParams<SavingsStackParamList>;
};

export type KidashiBottomTabParamList = {
	KidashiHome: NavigatorScreenParams<KidashiHomeStackParamList>;
	"Trust Circles": NavigatorScreenParams<TrustCircleStackParamList>;
	KidashiMembers: NavigatorScreenParams<MembersStackParamList>;
};

export type KidashiHomeStackParamList = {
	KidashiDashboard: undefined;
	CreateTrustCircles: undefined;
	CircleName: undefined;
	MemberRegistration: NavigatorScreenParams<MemberRegistrationStackParamList>;
};

export type TrustCircleStackParamList = {
	TrustCircles: undefined;
	TrustCircleDetails: undefined;
	CreateTrustCircle: undefined;
	CircleName: undefined;
	EnterAccountNumber: undefined;
	SelectVerifiers: undefined;
	MemberVerification: undefined;
	MemberAdditionSuccessScreen: undefined;
};

export type MembersStackParamList = {
	Members: undefined;
	MemberDetails: undefined;
	TransactionDetails: undefined;
	Assets: undefined;
	AssetDetails: { status: string } | undefined;
	EnterAssetInformation: undefined;
};

export type HomeStackParamList = {
	Dashboard: undefined;
	Earnings: undefined;
	Cashout: undefined;
	CashoutConfirmation: undefined;
	Notifications: undefined;
	KidashiRegistration: undefined;
	KidashiBottomTabs: NavigatorScreenParams<KidashiBottomTabParamList>;
};

export type ProfileStackParamList = {
	ProfileCompletionIntro: undefined;
	KycVerification: undefined;
	FacialRecognition: undefined;
	LocationDetails: undefined;
	MeansOfIdentification: undefined;
	Pep: undefined;
	SourceOfIncome: undefined;
	BusinessInformation: undefined;
	Pin: undefined;
	Attestation: undefined;
};

export type BillsStackParamList = {
	BillsCategories: undefined;
	BillsServices: undefined;
	ElectricityForm: undefined;
	DataForm: undefined;
	CableForm: undefined;
	AirtimeForm: undefined;
	BillSuccess: undefined;
	BillReceipt: undefined;
	ConfirmBills: undefined;
};

export type KidashiStackParamList = {
	KidashiOnboarding: undefined;
	VendorInformation: undefined;
	VendorItems: undefined;
	GuarantorDetails: undefined;
	ReviewDetails: undefined;
	OnboardingSuccess: undefined;
	OnboardingStatus: undefined;
};

export type MemberRegistrationStackParamList = {
	MemberPhoneNumber: undefined;
	MemberPhoneNumberVerification: undefined;
	MemberEmail: undefined;
	MemberEmailVerification: undefined;
	MemberMeansOfVerification: undefined;
	MemberFaceCaptureVerification: undefined;
	MemberPersonalInformation: undefined;
	MemberLocationDetails: undefined;
	MemberMeansOfIdentification: undefined;
	MemberPep: undefined;
	MemberSourceOfIncome: undefined;
	MemberAttestation: undefined;
	MemberSuccessScreen: undefined;
};

export type TransferStackParamList = {
	FundWallet: undefined;
	BankTransfer: undefined;
	PayrepBankTransfer: undefined;
	ConfirmTransaction: undefined;
	TransactionSuccess: undefined;
	TransactionReceipt: undefined;
};

export type TransactionStackParamList = {
	TransactionHistory: undefined;
	TransactionReceipt: undefined;
	Disputes: undefined;
	StatementRequest: undefined;
	Bills: NavigatorScreenParams<BillsStackParamList>;
	Transfer: NavigatorScreenParams<TransferStackParamList>;
};

export type MoreStackParamList = {
	Profile: undefined;
	Account: undefined;
	ListBankCardScreen: undefined;
	ViewBankCardScreen: undefined;
	AddBankCardScreen: undefined;
	AccountTiers: undefined;
	SecuritySettings: undefined;
	ResetTransactionScreen: undefined;
	ChangePassword: undefined;
	SupportScreen: undefined;
	NotificationScreen: undefined;
	DeactivateAccount: undefined;
	LinkPaymentMethodScreen: undefined;
	MoreSuccessMessageScreen: {
		title: string;
		subTitle: string;
		logo?: undefined;
	};
	ProofOfAddress: undefined;
	NINVerification: undefined;
	BusinessIncorporation: { tier: ITier };
	IdemnityAgreement: { tier: ITier };
	TierTwoVerificationScreen: undefined;
	TierThreeResidentialAddressScreen: undefined;
	NextOfKinDetailsScreen: undefined;
	TerminalsScreen: undefined;
	EditAddressScreen: undefined;
	AirtimeDataNetworkScreen: undefined;
	BankTransferNetworkScreen: undefined;
	CardPaymentNetworkScreen: undefined;
	BillsPaymentNetworkScreen: undefined;
	NetworkHomeScreen: undefined;
	ListDisputesScreen: undefined;
	ViewDisputeScreen: {
		disputeId: string;
	};
	AddAccount: undefined;
};

export type SupportStackParamList = {
	SupportScreen: undefined;
};

export type SavingsStackParamList = {
	// easy savings
	AddEasySavingsScreen: undefined;
	PreviewEasySavingsScreen: undefined;
	EditEasySavingsScreen: undefined;
	EasySavingsWithdrawScreen: undefined;
	// automated savings
	PreviewAutomatedSavingsScreen: {
		amount: string;
		date: string;
		source: string;
	};
	AutomatedSavingsScreen: undefined;
	AutomatedSavingsWithdrawScreen: undefined;
	// total savings
	TotalSavingsScreen: undefined;
	TotalSavingsWithdrawScreen: undefined;
	// locked savings
	LockedSavingsScreen: undefined;
	LockedSavingsWithdrawScreen: undefined;
	PreviewLockedSavingsScreen: undefined;
	// generic savings options
	LinkCardScreen: undefined;
	LinkBankScreen: undefined;
	SavingsSuccessMessageScreen: {
		title: string;
		subTitle: string;
		ref_number: string;
	};
	SavingsScreen: undefined;
	WithdrawSavingsListsScreen: undefined;
	ConfirmSavingstransactionScreen: undefined;
	SavingsReceiptScreen: {
		id: string;
		type: string;
		source: string;
		destination: string;
		date: string;
		status: "successful" | "pending" | "failed";
		amount: string;
	};
	EasySavingsListScreen: undefined;
	AutoEasySavingsListScreen: undefined;
	EditAutoEasySavingsScreen: undefined;
};
