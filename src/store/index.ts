import {configureStore} from '@reduxjs/toolkit';

import {
  AppSlice,
  AuthSlice,
  ComplianceSlice,
  CustomerSlice,
  AccountSlice,
  TransferSlice,
  TransactionSlice,
  ServiceSlice,
  BillSlice,
} from './slices/';
import {
  AuthApi,
  ComplianceApi,
  GeneralApi,
  CustomerApi,
  AccountApi,
  TransferApi,
  ServiceApi,
  BillsApi,
  ReportApi,
} from './apis';

export const store = configureStore({
  reducer: {
    // add reducers here
    [AppSlice.name]: AppSlice.reducer,
    [AuthSlice.name]: AuthSlice.reducer,
    [AuthApi.reducerPath]: AuthApi.reducer,
    [GeneralApi.reducerPath]: GeneralApi.reducer,
    [CustomerSlice.name]: CustomerSlice.reducer,
    [CustomerApi.reducerPath]: CustomerApi.reducer,
    [ComplianceSlice.name]: ComplianceSlice.reducer,
    [ComplianceApi.reducerPath]: ComplianceApi.reducer,
    [AccountSlice.name]: AccountSlice.reducer,
    [TransferSlice.name]: TransferSlice.reducer,
    [AccountApi.reducerPath]: AccountApi.reducer,
    [TransferApi.reducerPath]: TransferApi.reducer,
    [TransactionSlice.name]: TransactionSlice.reducer,
    [ServiceApi.reducerPath]: ServiceApi.reducer,
    [ServiceSlice.reducerPath]: ServiceSlice.reducer,
    [BillsApi.reducerPath]: BillsApi.reducer,
    [BillSlice.reducerPath]: BillSlice.reducer,
    [ReportApi.reducerPath]: ReportApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      .concat(AuthApi.middleware)
      .concat(ComplianceApi.middleware)
      .concat(GeneralApi.middleware)
      .concat(CustomerApi.middleware)
      .concat(AccountApi.middleware)
      .concat(TransferApi.middleware)
      .concat(ServiceApi.middleware)
      .concat(BillsApi.middleware)
      .concat(ReportApi.middleware),
  // to add more middleware, simply chain `.concat(middle)` to the code above and
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
