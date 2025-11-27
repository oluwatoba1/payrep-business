import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query';

import {RootState} from '..';
import {BASE_URL} from '@utils/Constants';
import {setCredentials} from '@store/slices/authSlice';

const customBaseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const rawBaseQuery = fetchBaseQuery({
    baseUrl: `${BASE_URL}/api/v1/`,
    prepareHeaders(headers, {getState}) {
      headers.set('Content-Type', 'application/json');
      const {token} = (getState() as RootState).auth.credentials;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  });

  const result = await rawBaseQuery(args, api, extraOptions);

  if (
    result?.error?.data &&
    typeof result?.error.data === 'object' &&
    'message' in result?.error.data &&
    typeof result?.error.data.message === 'string' &&
    result?.error.data.message?.toLowerCase().includes('invalid token')
  ) {
    console.log('Invalid token detected on account api, logging out user.');
    api.dispatch(setCredentials({token: null, user_id: null}));
  }

  return result;
};

const AccountApi = createApi({
  reducerPath: 'accountApi',
  baseQuery: customBaseQuery,
  endpoints: builder => ({
    getAccounts: builder.mutation<
      AuthResponse<Account[]>,
      {customer?: string; account_number?: string}
    >({
      query: body => ({
        url: 'account/mobile/customer_account_details',
        method: 'POST',
        body,
      }),
    }),
    getTransactions: builder.mutation<
      AuthResponse<ITransaction[]>,
      ITransactionQueryParams
    >({
      query: body => ({
        url: 'transaction/mobile/customer_transactions',
        method: 'POST',
        body,
      }),
    }),
    getDisputes: builder.mutation<
      AuthResponse<IDispute[]>,
      {count: number; account: string}
    >({
      query: body => ({
        url: 'transaction/mobile/customer_disputes',
        method: 'POST',
        body,
      }),
    }),
    cashout: builder.mutation<AuthResponse<null>, ICashoutRequest>({
      query: body => ({
        url: 'account/mobile/cashout',
        method: 'POST',
        body,
      }),
    }),
    getProducts: builder.mutation<
      AuthResponse<IProductResponse[]>,
      IProductRequest
    >({
      query: body => ({
        url: 'account/mobile/fetch_products',
        method: 'POST',
        body,
      }),
    }),
    createSecondaryAccount: builder.mutation<
      AuthResponse<null>,
      ICreateSecondaryAccountRequest
    >({
      query: body => ({
        url: 'account/mobile/create_secondary_account',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const {
  useGetAccountsMutation,
  useGetTransactionsMutation,
  useGetDisputesMutation,
  useCashoutMutation,
  useGetProductsMutation,
  useCreateSecondaryAccountMutation,
} = AccountApi;

export default AccountApi;
