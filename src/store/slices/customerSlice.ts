import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

const initialState: ICustomer = {
  customer: null,
};

const CustomerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    setCustomerDetails: (
      state,
      action: PayloadAction<CustomerBasicResponse>,
    ) => {
      state.customer = action.payload;
    },
  },
});

export const {setCustomerDetails} = CustomerSlice.actions;

export default CustomerSlice;
