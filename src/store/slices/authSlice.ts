import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

const initialState: IAuth = {
  credentials: {
    token: null,
    user_id: null
  },
  registration: {
    mobileNumber: '',
    email: ''
  },
  customer: null
};

const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<IAuth['credentials']>) => {
      state.credentials = action.payload;
    },
    setRegistrationDetails: (state, action: PayloadAction<{ mobileNumber: string, email: string }>) => {
      state.registration = action.payload;
    },
    setCustomer: (state, action: PayloadAction<ICustomerInfo>) => {
      state.customer = action.payload;
    },
  },
});

export const { setCredentials, setRegistrationDetails, setCustomer } = AuthSlice.actions;

export default AuthSlice;