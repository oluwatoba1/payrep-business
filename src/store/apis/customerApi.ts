import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
	BaseQueryFn,
	FetchArgs,
	FetchBaseQueryError,
} from "@reduxjs/toolkit/query";

import { RootState, store } from "..";
import { BASE_URL } from "@utils/Constants";
import { setCredentials } from "@store/slices/authSlice";

const customBaseQuery: BaseQueryFn<
	string | FetchArgs,
	unknown,
	FetchBaseQueryError
> = async (args, api, extraOptions) => {
	const rawBaseQuery = fetchBaseQuery({
		baseUrl: `${BASE_URL}/api/v1/customer/`,
		prepareHeaders(headers, { getState }) {
			headers.set("Content-Type", "application/json");
			const { token } = (getState() as RootState).auth.credentials;
			if (token) {
				headers.set("Authorization", `Bearer ${token}`);
			}
			return headers;
		},
	});

	const result = await rawBaseQuery(args, api, extraOptions);

	if (
		result?.error?.data &&
		typeof result?.error.data === "object" &&
		"message" in result?.error.data &&
		typeof result?.error.data.message === "string" &&
		result?.error.data.message?.toLowerCase().includes("invalid token")
	) {
		console.log("Invalid token detected on customer api, logging out user.");
		api.dispatch(setCredentials({ token: null, user_id: null }));
	}

	return result;
};

const CustomerApi = createApi({
	reducerPath: "customerApi",
	baseQuery: customBaseQuery,
	endpoints: (builder) => ({
		updateLocation: builder.mutation<AuthResponse<null>, LocationCredentials>({
			query: (body) => {
				const customerId: string = store.getState().auth.customer?.id || "";
				const womanCustomerId: string =
					store.getState().auth.registration.customer_id || "";
				const id = !!womanCustomerId ? womanCustomerId : customerId;
				return {
					url: `mobile/location/${id}`,
					method: "PUT",
					body,
				};
			},
		}),
		updatePep: builder.mutation<AuthResponse<null>, PepCredentials>({
			query: (body) => {
				const customerId: string = store.getState().auth.customer?.id || "";
				const womanCustomerId: string =
					store.getState().auth.registration.customer_id || "";
				const id = !!womanCustomerId ? womanCustomerId : customerId;
				return {
					url: `mobile/pep/${id}`,
					method: "PUT",
					body,
				};
			},
		}),
		updateIncome: builder.mutation<
			AuthResponse<null>,
			SourceOfIncomeCredentials
		>({
			query: (body) => {
				const customerId: string = store.getState().auth.customer?.id || "";
				const womanCustomerId: string =
					store.getState().auth.registration.customer_id || "";
				const id = !!womanCustomerId ? womanCustomerId : customerId;
				return {
					url: `mobile/income/${id}`,
					method: "PUT",
					body,
				};
			},
		}),
		updateBusinessInformation: builder.mutation<
			AuthResponse<null>,
			IBusinessInformationForm
		>({
			query: (body) => {
				const customerId: string = store.getState().auth.customer?.id || "";
				return {
					url: `mobile/business_information/${customerId}`,
					method: "PUT",
					body,
				};
			},
		}),
		createPin: builder.mutation<AuthResponse<null>, IPinForm>({
			query: (body) => {
				const customerId: string = store.getState().auth.customer?.id || "";
				return {
					url: `mobile/pin/${customerId}`,
					method: "PUT",
					body,
				};
			},
		}),
		affirmAttestation: builder.mutation<
			AuthResponse<{ account_number: string }>,
			void
		>({
			query: (body) => {
				const customerId: string = store.getState().auth.customer?.id || "";
				const womanCustomerId: string =
					store.getState().auth.registration.customer_id || "";
				const id = !!womanCustomerId ? womanCustomerId : customerId;
				return {
					url: `mobile/attestation/${id}`,
					method: "POST",
					body,
				};
			},
		}),
		submitBusinessTierRequirements: builder.mutation<
			AuthResponse<null>,
			FormData
		>({
			query: (body) => {
				const customerId: string = store.getState().auth.customer?.id || "";
				return {
					url: `mobile/business_tier_requirements/${customerId}`,
					method: "PUT",
					body,
				};
			},
		}),
		tierUpgrade: builder.mutation<AuthResponse<null>, void>({
			query: (body) => {
				const customerId: string = store.getState().auth.customer?.id || "";
				return {
					url: `mobile/tier/upgrade/${customerId}`,
					method: "POST",
					body,
				};
			},
		}),
		fetchCustomerDetails: builder.query<
			AuthResponse<CustomerBasicResponse>,
			void
		>({
			query: () => {
				const customerId: string = store.getState().auth.customer?.id || "";
				return {
					url: `mobile/customer_basic/${customerId}`,
				};
			},
		}),
	}),
});

export const {
	useUpdateLocationMutation,
	useUpdatePepMutation,
	useUpdateIncomeMutation,
	useUpdateBusinessInformationMutation,
	useCreatePinMutation,
	useAffirmAttestationMutation,
	useSubmitBusinessTierRequirementsMutation,
	useTierUpgradeMutation,
	useFetchCustomerDetailsQuery,
} = CustomerApi;

export default CustomerApi;
