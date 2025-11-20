import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: IKidashi = {
	vendor_id: "",
	registration: {
		business_type: "",
		community: "",
		guarantors: [],
		business_description: "",
		state_id: "",
		lga_id: "",
	},
	circle_details: null,
	vendor: null,
	selected_account: null,
	memberDetails: null,
	assetRequest: {
		items_requested: [],
		value: "0",
	},
	loanProduct: null,
	repaymentPlan: null,
};

const KidashiSlice = createSlice({
	name: "kidashi",
	initialState,
	reducers: {
		setRegistrationDetails: (
			state,
			action: PayloadAction<Partial<VendorRegistrationRequest>>
		) => {
			state.registration = {
				...state.registration,
				...action.payload,
			};
		},
		setVendorId: (state, action: PayloadAction<string>) => {
			state.vendor_id = action.payload;
		},
		setVendor: (state, action: PayloadAction<IVendor | null>) => {
			state.vendor = action.payload;
		},
		setTrustCircleDetails: (
			state,
			action: PayloadAction<ITrustCircleDetail>
		) => {
			state.circle_details = action.payload;
		},
		setSelectedAccountDetails: (
			state,
			action: PayloadAction<iWomanAccount>
		) => {
			state.selected_account = action.payload;
		},
		setMemberDetails: (state, action: PayloadAction<IWomanDetails>) => {
			state.memberDetails = action.payload;
		},
		setAssetRequest: (state, action: PayloadAction<Partial<IAssetRequest>>) => {
			state.assetRequest = action.payload;
		},
		setLoanProduct: (state, action: PayloadAction<ILoanProduct | null>) => {
			state.loanProduct = action.payload;
		},
		setRepaymentPlan: (state, action: PayloadAction<IRepaymentPlan | null>) => {
			state.repaymentPlan = action.payload;
		},
	},
});

export const {
	setRegistrationDetails,
	setVendorId,
	setVendor,
	setTrustCircleDetails,
	setSelectedAccountDetails,
	setMemberDetails,
	setAssetRequest,
	setLoanProduct,
	setRepaymentPlan,
} = KidashiSlice.actions;

export default KidashiSlice;
