interface IAppState {
	onboarded?: boolean;
	launched?: boolean;
	showBalance?: boolean;
	enableBiometrics?: boolean;
	customer?: ICustomerInfo | null;
	hasEverLoggedIn?: boolean;
}

interface IBank {
	code: string;
	name: string;
	cbn_code?: string;
}

interface IBank {
	code: string;
	name: string;
	cbn_code?: string;
}

type RegistrationSteps =
	| "NEW_USER"
	| "MOBILE_NUMBER_REGISTRATION"
	| "EMAIL_REGISTRATION"
	| "PASSWORD_REGISTRATION"
	| "BVN_VERIFICATION"
	| "ADDRESS_REGISTRATION"
	| "IDENTIFICATION_REGISTRATION"
	| "PEP_IDENTIFICATION"
	| "SOURCE_OF_INCOME"
	| "PIN"
	| "ATTESTATION";

type CustomerTypes = "individual" | "corporate";

interface IAuth {
	credentials: {
		token: string | null;
		user_id: string | null;
	};
	registration: {
		mobileNumber: string;
		email: string;
		customer_id: string;
	};
	customer: ICustomerInfo | null;
}

interface ICustomerInfo {
	id?: string;
	first_name?: string;
	surname?: string;
	other_name?: string;
	business_name?: string;
	stage?: RegistrationSteps;
	username?: string;
	type: CustomerTypes;
}

interface IState {
	code: string;
	name: string;
	_id: string;
}

interface ICountry {
	id: string;
	name: string;
	flag: string;
	phoneCode: string;
	states: IState[];
}

interface IToastItem {
	position?: "top" | "bottom";
	type: string;
	message: string;
	duration: number;
}

type KYCStackParamList = {
	KYCIntro: undefined;
	PersonalDetails: undefined;
	LocationDetails: undefined;
	BVNVerification: undefined;
	NINVerification: undefined;
	IDVerification: undefined;
	NationalIDUpload: undefined;
	DriversLicenseUpload: undefined;
	SelfieUpload: undefined;
	PinCreation: undefined;
};

interface IApp {
	appState: IAppState;
	menu: {
		showMenu: boolean;
	};
	statusModal: {
		showStatusModal: boolean;
		statusModalType: "success" | "failed" | "pending";
		statusModalTitle: string;
		statusModalDescription: string;
		statusModalHideActionState: number;
	};
	idempotency: {
		key: string;
		expiry: number;
	};
	countries: ICountry[];
	selectedCountry: ICountry | null;
	toastRequests: IToastItem[];
	kycInitialRouteName: keyof KYCStackParamList;
}

interface IBusinessBank {
	accountNo: string;
	legalName: string;
	code: string;
	accountName: string;
}

interface IRegistration {
	mobileNumber: string;
	phoneCode: string;
	dateOfBirth: Date;
	password: string;
	confirmPassword: string;
	emailAddress?: string;
	userType: string;
	emailOtp?: string;
	pin: string;
	confirmPin: string;
}

interface IProfileCompletion {
	country: string;
	business: Business;
	kycType: KycType;
	pepStatus: string;
	income: Income;
	address: Address;
}

interface ICompliance {
	bvnData: {
		firstName: string;
		middleName: string;
		lastName: string;
		dob: string;
		bvn: string;
		phoneNumber: string;
		gender: string;
		email: string;
	};
	ninData: {
		firstName: string;
		middleName: string;
		lastName: string;
		dob: string;
		nin: string;
		phoneNumber: string;
		gender: string;
		email: string;
	};
}

interface Business {
	businessName: string;
	rcNumber: string;
	incorporationDate: string;
}

interface KycType {
	type: string;
	nin: string;
	bvn: string;
}

interface Income {
	occupation: string;
	additionalSourceOfIncome: string;
	annualIncome: string;
}

interface Address {
	houseNumber: string;
	streetNumber: string;
	city: string;
	state: string;
	lga: string;
}
interface IEasySavings {
	savingsGoal: string;
	amount: string;
	goalDeadline: string;
	deductedAmount: string;
	primarySourceFund: string;
}

interface LoginCredentials {
	username: string;
	password: string;
	device_id: string;
	login_type: "password" | "biometrics";
	signature?: string;
	signature_payload?: string;
	customer_type: string | null;
}

interface InitiatePasswordResetCredentials {
	username: string;
	device_id: string;
}

interface PasswordResetCredentials {
	username: string;
	otp: string;
	password: string;
}

interface DeactivateAccountCredentials {
	username: string;
	customer_id: string;
}
interface ChangePasswordCredentials {
	username: string;
	current_password: string;
	new_password: string;
}

interface RegisterDeviceCredentials {
	username: string;
	otp: string;
	device_id: string;
	customer_type: string | null;
}

interface RegisterDeviceResponse {
	facial_recognition: boolean;
	token: string;
	customer: string;
}

interface LoginResponse {
	is_new_device: boolean;
	token: string;
	user_id: string;
	customer: ICustomerInfo;
	has_multiple_profile: boolean;
	customers: ICustomerInfo[];
}

interface InitiateResetPasswordResponse {
	is_new_device: boolean;
}

interface RegisterBiometricsCredentials {
	username: string;
	public_key: string;
}

interface RegisterCredentials {
	type: string | null;
	mobile_number: string;
	email: string;
	password: string;
	otp: string;
	device_id: string;
	customer_id: string;
}

interface RegisterMobileDataResponse {
	stage: RegistrationSteps;
	has_personal_profile: boolean;
	customer_id: string | null;
}

interface BvnLookupCredentials {
	bvn: string;
}
interface NinLookupCredentials {
	nin: string;
}

interface VerificationLogsCredentials {
	verification: string;
}

interface KycLimiterCredentials {
	type: string;
	customer_id: string;
	provider: string;
}

interface VerificationLogsResponse {
	id: string;
	customer: string;
	type: string;
	customer_update_status: boolean;
	status: boolean;
	payload: {
		[key: string]: any;
	};
	created_at: string;
}

interface DeviceRegistrationLogResponse {
	id: string;
	status: boolean;
}

interface LocationCredentials {
	residential_address: string;
	state: string;
	lga: string;
	country: string;
}

interface PepCredentials {
	pep: boolean;
}

interface SourceOfIncomeCredentials {
	occupation: string;
	annual_income: string;
	employment_type: string;
}

interface AuthResponse<Type> {
	status: boolean;
	message: string;
	data: Type;
}

interface KidashAuthBase {
	status: boolean;
	message: string;
}

type KidashiAuthResponse<Type> = KidashAuthBase & Type;

interface SuccessResponse<Type> {
	error: boolean;
	errors: string[];
	message: string;
	data: Type | Type[];
	token: string;
}

interface ErrorResponse {}

interface CustomerBasicResponse {
	id: string;
	first_name: string;
	other_name: string;
	surname: string;
	mobile_number: string;
	dob: string;
	image: string;
	state__name: string;
	lga__name: string;
	residential_address: string;
	kyc?: IKYC;
	tier?: ITier;
	status: boolean;
	stage: string;
	type: string;
	email: string;
	nationality: string;
	profile_picture: string;
	next_of_kin__name: string;
	next_of_kin__email: string;
	next_of_kin__mobile_phone: string;
	next_of_kin__address: string;
	next_of_kin__relationship: string;
	business_name: string;
}

interface CustomerEarningsResponse {
	total_bonus: string;
	total_commission: string;
}

interface IKYC {
	id: string;
	nin: string;
	bvn: string;
	bvn_verification_status: boolean;
	nin_verification_status: boolean;
}

interface ICustomer {
	customer: CustomerBasicResponse | null;
}

interface IService {
	vasCategory: IVasCategoryResponse | null;
	vasCategoryService: IVasCategoryServiceResponse | null;
}

interface IBillPurchaseResponse {
	token?: string;
	units?: number;
	debt?: number;
	parcels?: string[];
	txn_status: "successful" | "pending" | "failed";
	reference_number: string;
}

interface IBillForm {
	meterNumber: string;
	amount: string;
	narration?: string;
	tariffClass: string;
	mobileNumber: string;
	bouquetId: string;
	smartcardNumber: string;
}

interface IBillEnquiryResponse {
	name: string;
	address: string;
	debt: number;
	fi: string;
}

interface IBillPurchaseDetails {
	formData: IBillForm;
	customerDetails: IBillEnquiryResponse;
}

interface IBill {
	purchaseResponse: IBillPurchaseResponse | null;
	purchaseRequest: Partial<IBillPurchaseRequest>;
}

interface IBillPurchaseRequest {
	customer_account_number: string;
	meter_number: string;
	meter_name: string;
	service_code: string;
	pin: string;
	amount: number;
	fi: string;
	device_id: string;
	address: string;
	debt: number;
	mobile_number: string;
	tariff_class: string;
	remarks: string;
	smartcard_number: string;
	customer_name: string;
	bouquet_id: string;
}

interface Account {
	id: string;
	account_number: string;
	account_name: string;
	account_class: "primary" | "secondary";
	status: boolean;
	balance: number;
	account_type: string;
	commission: string;
	bonus: string;
}

interface INameEnquiry {
	source_account_number: string;
	beneficiary_account_number: string;
	bank_code: string;
}

interface IBeneficiary {
	accountNumber: string;
	accountName: string;
	code: string;
	name: string;
}

interface ITransferRequest {
	source_account_number: string;
	beneficiary_account_number: string;
	beneficiary_account_name: string;
	bank_code: string;
	bank_name: string;
	amount: number;
	remarks: string;
	pin: string;
	fi?: string;
	device_id?: string;
	transfer_type: "intra" | "inter";
	kyc: number;
	bvn: string;
	ner: string;
}
interface ITransaction {
	account__account_name: string;
	account__account_number: string;
	id: string;
	amount: number;
	reference_number: string;
	third_party_ref: string;
	session_id: string;
	rrn: string;
	response_code: string;
	serial_number: string;
	service__code: string;
	account_number: string;
	bank: string;
	company_commission: string;
	bank_code: string;
	bank_name: string;
	fi: string;
	beneficiary_account_name: string;
	beneficiary_account_number: string;
	senders_account_name: string;
	source_account_number: string;
	source_account_name: string;
	senders_account_number: string;
	card_number: string;
	card_owner: string;
	token: string;
	units: number;
	address: string;
	kct: string;
	remarks: string;
	charges: string;
	customer_commission: string;
	bonus: string;
	bank_commission: string;
	aggregator_commission: string;
	stamp_duty: string;
	bank_charges: string;
	service_charges: string;
	balance_before: string;
	balance_after: string;
	transaction_type: "credit" | "debit";
	transaction_description: string;
	status: "successful" | "failed" | "pending";
	txn_status: "successful" | "pending" | "failed";
	is_reversal: string;
	is_reversed: string;
	is_lien: string;
	is_bill: string;
	created_at: string;
	transaction_date: string;
}

interface ITransferResponse extends ITransaction {
	is_invalid?: boolean;
	pin_try_exceed?: boolean;
}

interface SourceAccount {
	accountName: string;
	accountNumber: string;
	balance: string | number;
}

interface DestinationAccount {
	accountName: string;
	accountNumber: string;
	bankName: string;
	bankCode: string;
}

interface ITransferDetails {
	sourceAccount: SourceAccount;
	destinationAccount: DestinationAccount;
	amount: string;
	charges: string;
	deductible: string;
	narration: string;
	isFromBeneficiaryList: boolean;
	timestamp: string;
	transferType: string;
	deviceId: string;
	service?: string;
	fi: string;
	kyc: number;
	bvn: string;
	ner: string;
	transactionStatus?: "successful" | "failed" | "pending";
}

interface ITransfer {
	transferResponse: ITransferResponse | null;
	transferDetails: ITransferDetails | null;
}

interface IDispute {
	dispute_id: string;
	type: "declined_debit" | "double_debit";
	mobile_number: string;
	account_number: string;
	account_name: string;
	bank_code: string;
	bank_name: string;
	rrn: string;
	serial_number: string;
	amount: number;
	status: boolean;
	action:
		| "reversed-to-customer"
		| "credited-to-wallet"
		| "advice-to-bank"
		| "no-debit"
		| "rejected";
	description: string;
	treated_date: string;
	created_at: string;
}

interface IAccount {
	accounts: Account[];
	transactions: ITransaction[];
	selectedTransaction: ITransaction | null;
	disputes: IDispute[];
	selectedAccount: Account | null;
	cashoutRequest: {
		account: string;
		type: "commission" | "bonus";
		amount: number;
	};
}

interface IBusinessInformationForm {
	business_name: string;
	business_description: string;
	business_address: string;
}

interface IPinForm {
	pin: string;
}

interface ITier {
	id: string;
	name: string;
	code: number;
	pos_daily_transfer_limit: number;
	pos_transfer_limit: number;
	mobile_daily_transfer_limit: number;
	mobile_transfer_limit: number;
	web_daily_transfer_limit: number;
	web_transfer_limit: number;
	withdrawal_limit: number;
}

interface IdemnityForm {
	daily_limit: number;
	tier: string;
}

interface AgreementForm {
	name: "attestation" | "idemnity";
}

interface INameEnquiryResponse {
	status: boolean;
	message: string;
	beneficiary_account_name?: string;
	transfer_type?: "debit" | "credit";
	bank_code: string;
	bank_name: string;
	beneficiary_account_number: string;
	response_code: string;
	ner: string;
	session_id: string;
	bvn: string;
	kyc: number;
	fi: string;
}

interface INameEnquiryRequest {
	// bank_name: string;
	bank_code: string;
	beneficiary_account_number: string | number;
	source_account_number: string | number;
	bank_name: string;
}

interface IFetchBanksRequest {
	account_number?: string;
}

interface IBank {
	name: string;
	code: string;
	cbn?: string;
}

interface ITransactionQueryParams {
	count?: number;
	account: string;
	start_date?: string;
	end_date?: string;
	service_code?: string;
}

interface ICashoutRequest {
	account: string;
	amount: number;
	type: "commission" | "bonus";
	pin: string;
}

interface IProductRequest {
	type: "savings" | "current" | "pos" | "pool" | "virtual";
}

interface IProductResponse {
	id: string;
	name: string;
}

interface ICreateSecondaryAccountRequest {
	customer: string;
	account_type: "savings" | "current" | "pos" | "pool" | "virtual";
	product: string;
}

interface IFetchBanksResponse {
	status: boolean;
	data: IBank[];
	message: string;
}
interface IVasCategoryResponse {
	id: string;
	name: string;
	code: string;
	image: string;
	description: string;
}

interface IVasCategoryServiceResponse extends IVasCategoryResponse {
	vas_category: string;
}

interface IMeterEnquiryRequest {
	customer_account_number: string;
	meter_number: string;
	service_code: string;
}

interface IMeterEnquiryResponse {
	name: string;
	address: string;
	debt: number;
	fi: string;
}

interface IMeterPurchaseRequest {
	customer_account_number: string;
	meter_number: string;
	meter_name: string;
	service_code: string;
	pin: string;
	amount: number;
	fi: string;
	remarks: string;
	device_id: string;
	address: string;
	debt: number;
}

interface IAirtimePurchaseRequest {
	customer_account_number: string;
	mobile_number: string;
	service_code: string;
	pin: string;
	amount: number;
	device_id: string;
}

interface ISmartcardEnquiryRequest {
	customer_account_number: string;
	smartcard_number: string;
	service_code: string;
}

interface ISmartcardEnquiryResponse {
	name: string;
	fi: string;
}

interface IBouquet {
	text: string;
	price: string;
	id: string;
}

interface IBundle {
	text: string;
	price: string;
	id: string;
}

interface IBouquetRequest {
	customer_account_number: string;
	service_code: string;
}

interface ICablePurchaseRequest {
	customer_account_number: string;
	bouquet_id: string;
	smartcard_number: string;
	customer_name: string;
	service_code: string;
	pin: string;
	amount: number;
	fi: string;
	remarks: string;
	device_id: string;
}

interface IBundle {
	text: string;
	price: string;
	id: string;
}

interface IBundleRequest {
	customer_account_number: string;
	service_code: string;
}

interface IDataPurchaseRequest {
	customer_account_number: string;
	tariff_class: string;
	mobile_number: string;
	service_code: string;
	pin: string;
	amount: number;
	device_id: string;
}

interface IStatementRequest {
	name: string;
	account: string;
	start_date: string;
	end_date: string;
	email: string;
	format: string;
	signed: boolean;
}

interface IVendorGuarantor {
	first_name: string;
	surname: string;
	other_name: string;
	phone: string;
	relationship: string;
	nin: string;
	email: string;
	state_id: string;
	lga_id: string;
	gender: string;
	dob: string;
	nationality: string;
}

interface VendorRegistrationRequest {
	cba_customer_id: string;
	business_type: string;
	community: string;
	guarantors: IVendorGuarantor[];
	business_description: string;
}

interface IKidashi {
	vendor_id: string;
	registration: Omit<VendorRegistrationRequest, "cba_customer_id">;
	vendor: IVendor | null;
	circle_details: ITrustCircleDetail | null;
	selected_account: iWomanAccount | null;
	memberDetails: IWomanDetails | null;
	assetRequest: Partial<IAssetRequest>;
}

interface CreateTrustCircleRequest {
	vendor_id: string;
	circle_name: string;
	description: string;
}

interface IVendor {
	id: string;
	first_name: string;
	surname: string;
	other_name: string;
	phone: string;
	email: string;
	business_type: string;
	business_description: string;
	address: string;
	community: string;
	status: "PENDING" | "ACTIVE" | "INACTIVE" | "SUSPENDED" | "REJECTED";
	cba_customer_id: string;
	geo_region: string;
	state: string;
	lga: string;
	country: string;
	active_trust_circles_count: number;
	total_women_onboarded: number;
}

interface ITrustCircle {
	id: string;
	circle_name: string;
	description: string;
	max_members: number;
	current_member_count: number;
	can_add_more_members: boolean;
	status: string;
}

interface IWomen {
	id: string;
	first_name: string;
	other_name: string;
	surname: string;
	mobile_number: string;
	account_number: string;
	loan_amount: string;
	occupation: string;
	employment_type: string;
	image: string;
	status: string;
	cba_customer_id: string;
}

interface IWomanDetails {
	id: string;
	first_name: string;
	other_name: string;
	surname: string;
	mobile_number: string;
	account_number: string;
	email: string;
	date: string;
	start_date: string;
	end_date: string;
	trust_circle_id: string;
	cba_customer_id: string;
	vendor_id: string;
	state_id: string;
	lga_id: string;
	country_id: string;
	repayment_status: string;
	status: string;
	lga: string;
	nin: string;
	state: string;
	maximum_balance: string;
	tier: string;
	dob: string;
}

interface ITrustCircleDetail {
	id: string;
	circle_name: string;
	description: string;
	max_members: 0;
	members_count: 0;
	status: string;
	loan_eligibility: boolean;
	women: IWomen[];
}

interface iWomanAccount {
	id: string;
	customer__first_name: string;
	customer__other_name: string;
	customer__surname: string;
	customer__email: string;
	customer_id: string;
	account_number: string;
}

interface IAssetRequest {
	vendor_id: string;
	woman_id: string;
	product_code: string;
	value: string;
	markup: string;
	items_requested: {
		name: string;
		price: string;
	}[];
	otp: string;
}

interface OtpRequest {
	purpose: "ASSET_REQUEST";
	recipient: string;
	subject_id: string;
	channel: "sms";
}

interface iWomanMemberDetails {
	account_number: string;
	cba_customer_id: string;
	country_id: string;
	email: string;
	first_name: string;
	lga_id: string;
	mobile_number: string;
	other_name: string;
	repayment_status: string;
	state_id: string;
	status: string;
	surname: string;
	trust_circle_id: string;
	vendor_id: string;
	id: string;
}

interface IAsset {
	id: string;
	created_at: string;
	items_requested: { name: string; price: string }[];
	loan_id: string | null;
	markup: number;
	name: string | null;
	product_code: string | null;
	status: AssetStatus;
	value: number;
	vendor__first_name?: string;
	vendor__id?: string;
	vendor__surname?: string;
	woman__first_name?: string;
	woman__id?: string;
	woman__surname?: string;
	asset_id?: string;
	vendor_id?: string;
	woman_id?: string;
	date?: string;
	start_date?: string;
	end_date?: string;
}

type AssetStatus =
	| "REQUESTED"
	| "QUERIED"
	| "APPROVED"
	| "REJECTED"
	| "FAILED"
	| "ALL";
