// import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
// import { RootState } from "..";

// // Define Transaction Type
// interface Transaction {
//   reference_number: string; 
//   beneficiary_account_number: string; 
//   beneficiary_account_name: string; 
//   source_account_number: string; 
//   source_account_name: string; 
//   bank_name: string; 
//   remarks: string; 
//   transaction_type: "credit" | "debit";
//   status: "successful" | "pending" | "failed";
//   transaction_date: string;
// }

// const transactionsAdapter = createEntityAdapter<Transaction>({
//   selectId: (transaction) => transaction.reference_number,
//   sortComparer: (a, b) => b.transaction_date.localeCompare(a.transaction_date), // Sort by latest
// });


// const initialState = transactionsAdapter.getInitialState();


// const transactionSlice = createSlice({
//   name: "transactions",
//   initialState,
//   reducers: {
//     addTransaction: transactionsAdapter.addOne, 
//     setTransactions: transactionsAdapter.setAll,
//     updateTransaction: transactionsAdapter.updateOne,
//     removeTransaction: transactionsAdapter.removeOne,
//   },
// });

// // Export Actions
// export const { addTransaction, setTransactions, updateTransaction, removeTransaction } =
//   transactionSlice.actions;

// export const transactionSelectors = transactionsAdapter.getSelectors(
//   (state: RootState) => state.transactions
// );

// export default transactionSlice;


import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Transaction {
  reference_number: string;
  amount: number;
  transaction_type: "credit" | "debit";
  status: "successful" | "pending" | "failed";
  transaction_date: string;
  service?: number | string;
  remarks?: string;
  source_account_number: string;
  source_account_name: string;
  account__account_name: string;
  account__account_number: string;
  session_id?: string;
  beneficiary_account_number: string;
  beneficiary_account_name: string;
  bank_name?: string;
  bank_code?: string;
  bank?: string;
  fi: string;
}

interface TransactionState {
  transactions: Transaction[];
  selectedTransaction: Transaction | null;
}

const initialState: TransactionState = {
  transactions: [],
  selectedTransaction: null,
};

const transactionSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    
    addTransaction: (state, action: PayloadAction<Transaction>) => {
      state.transactions.unshift(action.payload); 
    },

    setTransactions: (state, action: PayloadAction<Transaction[]>) => {
      state.transactions = action.payload;
    },

    setSelectedTransaction: (state, action: PayloadAction<string>) => {
      const transaction = state.transactions.find(
        (txn) => txn.reference_number === action.payload
      );
      state.selectedTransaction = transaction || null;
    },

    clearSelectedTransaction: (state) => {
      state.selectedTransaction = null;
    },
  },
});

export const { addTransaction, setTransactions, setSelectedTransaction, clearSelectedTransaction } =
  transactionSlice.actions;

export default transactionSlice
