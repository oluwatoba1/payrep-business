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
    baseUrl: `${BASE_URL}/api/v1/compliance/`,
    prepareHeaders(headers, {getState}) {
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

const ComplianceApi = createApi({
  reducerPath: 'complianceApi',
  baseQuery: customBaseQuery,
  endpoints: builder => ({
    bvnLookup: builder.mutation<AuthResponse<any>, BvnLookupCredentials>({
      query: body => {
        const customerId: string = store.getState().auth.customer?.id || '';
        return {
          url: 'mobile/bvn_lookup',
          method: 'POST',
          body: {...body, customer: customerId},
        };
      },
    }),
    ninLookup: builder.mutation<AuthResponse<any>, NinLookupCredentials>({
      query: body => {
        const customerId: string = store.getState().auth.customer?.id || '';
        return {
          url: 'mobile/nin_lookup',
          method: 'POST',
          body: {...body, customer: customerId},
        };
      },
    }),
    verificationCheck: builder.mutation<
      AuthResponse<VerificationLogsResponse[]>,
      VerificationLogsCredentials
    >({
      query: body => {
        return {
          url: 'mobile/verification_check',
          method: 'POST',
          body,
        };
      },
    }),
    kycLimitCheck: builder.mutation<
      AuthResponse<null[]>,
      KycLimiterCredentials
    >({
      query: body => {
        return {
          url: 'mobile/kyc_verification_limiter',
          method: 'POST',
          body,
        };
      },
    }),
    uploadMeansofIdentification: builder.mutation<AuthResponse<null>, FormData>(
      {
        query: body => {
          const customerId: string = store.getState().auth.customer?.id || '';
          return {
            url: `mobile/documents/${customerId}`,
            method: 'POST',
            body,
          };
        },
      },
    ),
    getTiers: builder.mutation<AuthResponse<ITier[]>, void>({
      query: () => {
        return {
          url: 'mobile/fetch_tiers',
          method: 'POST',
        };
      },
    }),
    submitIdemnityAgreement: builder.mutation<AuthResponse<null>, IdemnityForm>(
      {
        query: body => {
          const customerId: string = store.getState().auth.customer?.id || '';
          return {
            url: `mobile/idemnity_agreement/${customerId}`,
            method: 'POST',
            body,
          };
        },
      },
    ),
    getAttestation: builder.mutation<AuthResponse<null>, AgreementForm>({
      query: body => ({
        url: 'mobile/get_agreement',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const {
  useBvnLookupMutation,
  useNinLookupMutation,
  useVerificationCheckMutation,
  useKycLimitCheckMutation,
  useUploadMeansofIdentificationMutation,
  useGetTiersMutation,
  useSubmitIdemnityAgreementMutation,
  useGetAttestationMutation,
} = ComplianceApi;

export default ComplianceApi;
