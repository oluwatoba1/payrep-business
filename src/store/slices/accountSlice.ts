import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

const initialState: IAccount = {
  accounts: [],
  transactions: [],
  disputes: [],
  selectedAccount: null,
  selectedTransaction: null,
  cashoutRequest: {
    account: '',
    type: 'commission',
    amount: 0,
  },
};

const AccountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    setAccounts: (state, action: PayloadAction<Account[]>) => {
      state.accounts = action.payload;
    },
    setSelectedAccount: (state, action: PayloadAction<Account | null>) => {
      state.selectedAccount = action.payload;
    },
    setTransactions: (state, action: PayloadAction<ITransaction[]>) => {
      state.transactions = action.payload;
    },
    setSelectedTransaction: (
      state,
      action: PayloadAction<ITransaction | null>,
    ) => {
      state.selectedTransaction = action.payload;
    },
    setDisputes: (state, action: PayloadAction<IDispute[]>) => {
      state.disputes = action.payload;
    },
    setCashoutRequest: (
      state,
      action: PayloadAction<IAccount['cashoutRequest']>,
    ) => {
      state.cashoutRequest = action.payload;
    },
  },
});

export const {
  setAccounts,
  setSelectedAccount,
  setSelectedTransaction,
  setTransactions,
  setDisputes,
  setCashoutRequest,
} = AccountSlice.actions;

export default AccountSlice;
