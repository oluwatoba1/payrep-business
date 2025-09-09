import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query';

import {RootState, store} from '..';
import {BASE_URL} from '@utils/Constants';
import {setCredentials} from '@store/slices/authSlice';

const customBaseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  const rawBaseQuery = fetchBaseQuery({
    baseUrl: `${BASE_URL}/api/v1/transaction/bills/`,
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
    api.dispatch(setCredentials({token: null, user_id: null}));
  }

  return result;
};

const BillsApi = createApi({
  reducerPath: 'billsApi',
  baseQuery: customBaseQuery,
  endpoints: builder => ({
    meterEnquiry: builder.mutation<
      AuthResponse<IMeterEnquiryResponse>,
      IMeterEnquiryRequest
    >({
      query: body => ({
        url: 'mobile/meter_name_enquiry',
        method: 'POST',
        body,
      }),
    }),
    meterPurchase: builder.mutation<
      AuthResponse<IBillPurchaseResponse>,
      IMeterPurchaseRequest
    >({
      query: body => ({
        url: 'mobile/meter_purchase',
        method: 'POST',
        body,
      }),
    }),
    airtimePurchase: builder.mutation<
      AuthResponse<IBillPurchaseResponse>,
      IAirtimePurchaseRequest
    >({
      query: body => ({
        url: 'mobile/airtime_purchase',
        method: 'POST',
        body,
      }),
    }),
    getBouquets: builder.mutation<AuthResponse<IBouquet[]>, IBouquetRequest>({
      query: body => ({
        url: 'mobile/bouquets',
        method: 'POST',
        body,
      }),
    }),
    smartcardEnquiry: builder.mutation<
      AuthResponse<ISmartcardEnquiryResponse>,
      ISmartcardEnquiryRequest
    >({
      query: body => ({
        url: 'mobile/smartcard_enquiry',
        method: 'POST',
        body,
      }),
    }),
    cablePurchase: builder.mutation<
      AuthResponse<IBillPurchaseResponse>,
      ICablePurchaseRequest
    >({
      query: body => ({
        url: 'mobile/cable_purchase',
        method: 'POST',
        body,
      }),
    }),
    getBundles: builder.mutation<AuthResponse<IBundle[]>, IBundleRequest>({
      query: body => ({
        url: 'mobile/data_bundles',
        method: 'POST',
        body,
      }),
    }),
    dataPurchase: builder.mutation<
      AuthResponse<IBillPurchaseResponse>,
      IDataPurchaseRequest
    >({
      query: body => ({
        url: 'mobile/data_purchase',
        method: 'POST',
        body,
      }),
    }),
    billPurchase: builder.mutation<
      AuthResponse<IBillPurchaseResponse>,
      Partial<IBillPurchaseRequest>
    >({
      query: body => {
        const storeState: RootState = store.getState();
        const vasCategoryCode: string =
          storeState.service.vasCategory?.code || '';
        return {
          url: `mobile/${vasCategoryCode}_purchase`,
          method: 'POST',
          body,
        };
      },
    }),
  }),
});

export const {
  useMeterEnquiryMutation,
  useMeterPurchaseMutation,
  useAirtimePurchaseMutation,
  useGetBouquetsMutation,
  useSmartcardEnquiryMutation,
  useCablePurchaseMutation,
  useGetBundlesMutation,
  useDataPurchaseMutation,
  useBillPurchaseMutation,
} = BillsApi;

export default BillsApi;
