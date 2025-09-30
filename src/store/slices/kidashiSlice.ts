import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: IKidashi = {
	vendor_id: "",
	registration: {
		business_type: "",
		community: "",
		guarantors: [],
		business_description: "",
	},
	vendor: null,
	memberDetails: null,
	assetRequest: {
		items_requested: [],
		value: "0",
	},
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
		setVendor: (state, action: PayloadAction<IVendor>) => {
			state.vendor = action.payload;
		},
		setMemberDetails: (state, action: PayloadAction<IWomanDetails>) => {
			state.memberDetails = action.payload;
		},
		setAssetRequest: (state, action: PayloadAction<Partial<IAssetRequest>>) => {
			state.assetRequest = action.payload;
		},
	},
});

export const {
	setRegistrationDetails,
	setVendorId,
	setVendor,
	setMemberDetails,
	setAssetRequest,
} = KidashiSlice.actions;

export default KidashiSlice;
