import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
	BaseQueryFn,
	FetchArgs,
	FetchBaseQueryError,
} from "@reduxjs/toolkit/query";

import { RootState, store } from "..";
import { KIDASHI_URL } from "@utils/Constants";
import { setCredentials } from "@store/slices/authSlice";

const customBaseQuery: BaseQueryFn<
	string | FetchArgs,
	unknown,
	FetchBaseQueryError
> = async (args, api, extraOptions) => {
	const rawBaseQuery = fetchBaseQuery({
		baseUrl: `${KIDASHI_URL}/api/v1/`,
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
		api.dispatch(setCredentials({ token: null, user_id: null }));
	}

	return result;
};

const KidashiApi = createApi({
	reducerPath: "kidashiApi",
	baseQuery: customBaseQuery,
	endpoints: (builder) => ({
		register: builder.mutation<
			KidashiAuthResponse<{ vendor_id: string }>,
			VendorRegistrationRequest
		>({
			query: (body) => ({
				url: "vendor/mobile/onboarding/business",
				method: "POST",
				body,
			}),
		}),
		createTrustCircle: builder.mutation<
			KidashiAuthResponse<{ circle_id: string }>,
			CreateTrustCircleRequest
		>({
			query: (body) => ({
				url: "trust_circle/mobile/create",
				method: "POST",
				body,
			}),
		}),
		fetchKidashiVendor: builder.mutation<
			AuthResponse<IVendor>,
			{ cba_customer_id: string }
		>({
			query: (body) => ({
				url: "vendor/mobile/get_vendor_detail",
				method: "POST",
				body,
			}),
		}),
		fetchTrustCircles: builder.mutation<
			AuthResponse<{ circles: ITrustCircle[] }>,
			{ vendor_id: string }
		>({
			query: (body) => ({
				url: "trust_circle/mobile/fetch",
				method: "POST",
				body,
			}),
		}),
		fetchTrustCircle: builder.mutation<
			AuthResponse<ITrustCircleDetail>,
			{ id: string }
		>({
			query: (body) => ({
				url: "trust_circle/mobile/get",
				method: "POST",
				body,
			}),
		}),
		updateLocation: builder.mutation<
			AuthResponse<null>,
			LocationCredentials & { cba_customer_id: string }
		>({
			query: (body) => {
				const customerId: string = store.getState().auth.customer?.id || "";
				return {
					url: "mobile/location_setup",
					method: "PUT",
					body,
				};
			},
		}),
		updatePep: builder.mutation<
			AuthResponse<null>,
			PepCredentials & { cba_customer_id: string }
		>({
			query: (body) => {
				return {
					url: "woman/mobile/pep",
					method: "PUT",
					body,
				};
			},
		}),
		updateIncome: builder.mutation<
			AuthResponse<null>,
			SourceOfIncomeCredentials & { cba_customer_id: string }
		>({
			query: (body) => {
				return {
					url: "woman/mobile/income",
					method: "PUT",
					body,
				};
			},
		}),
		affirmAttestation: builder.mutation<
			AuthResponse<null>,
			{ cba_customer_id: string }
		>({
			query: (body) => {
				return {
					url: "woman/mobile/attestation",
					method: "POST",
					body,
				};
			},
		}),
		bvnLookup: builder.mutation<
			AuthResponse<any>,
			BvnLookupCredentials & { cba_customer_id: string }
		>({
			query: (body) => {
				const customerId: string = store.getState().auth.customer?.id || "";
				return {
					url: "woman/mobile/bvn_lookup",
					method: "POST",
					body: { ...body, customer: customerId },
				};
			},
		}),
		ninLookup: builder.mutation<
			AuthResponse<any>,
			NinLookupCredentials & { cba_customer_id: string }
		>({
			query: (body) => {
				const customerId: string = store.getState().auth.customer?.id || "";
				return {
					url: "woman/mobile/nin_lookup",
					method: "POST",
					body: { ...body, customer: customerId },
				};
			},
		}),
		uploadMeansofIdentification: builder.mutation<AuthResponse<null>, FormData>(
			{
				query: (body) => {
					return {
						url: "woman/mobile/identification_check",
						method: "POST",
						body,
					};
				},
			}
		),
		addMemberToTrustCircle: builder.mutation<
			AuthResponse<null>,
			{
				initiating_vendor_id: string;
				woman_id: string;
				trust_circle_id: string;
				selected_voters?: string[];
			}
		>({
			query: (body) => ({
				url: "trust_circle/mobile/propose-member",
				method: "POST",
				body,
			}),
		}),
	}),
});

export const {
	useRegisterMutation,
	useCreateTrustCircleMutation,
	useFetchKidashiVendorMutation,
	useFetchTrustCirclesMutation,
	useFetchTrustCircleMutation,
	useAddMemberToTrustCircleMutation,
} = KidashiApi;

export default KidashiApi;
