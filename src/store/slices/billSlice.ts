import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

const initialState: IBill = {
  purchaseResponse: null,
  purchaseRequest: {},
};

const BillSlice = createSlice({
  name: 'bills',
  initialState,
  reducers: {
    setPurchaseResponse: (
      state,
      action: PayloadAction<IBillPurchaseResponse>,
    ) => {
      state.purchaseResponse = action.payload;
    },
    setPurchaseRequest: (
      state,
      action: PayloadAction<Partial<IBillPurchaseRequest>>,
    ) => {
      state.purchaseRequest = action.payload;
    },
  },
});

export const {setPurchaseResponse, setPurchaseRequest} = BillSlice.actions;

export default BillSlice;
