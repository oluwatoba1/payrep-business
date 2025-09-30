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
			console.log(token);
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
		onboardWoman: builder.mutation<
			AuthResponse<null>,
			{ vendor_cba_customer_id: string; woman_cba_customer_id: string }
		>({
			query: (body) => ({
				url: "woman/mobile/onboarding/create",
				method: "POST",
				body,
			}),
		}),
		getMemberDetails: builder.mutation<
			AuthResponse<IWomanDetails>,
			{ cba_customer_id: string }
		>({
			query: (body) => ({
				url: "woman/mobile/basic_details",
				method: "POST",
				body,
			}),
		}),
		createAsset: builder.mutation<AuthResponse<IWomanDetails>, IAssetRequest>({
			query: (body) => ({
				url: "asset/mobile/create_asset",
				method: "POST",
				body,
			}),
		}),
		registerWomanEmail: builder.mutation<
			AuthResponse<null>,
			Partial<RegisterCredentials>
		>({
			query: (body) => ({
				url: "woman/mobile/register_email",
				method: "POST",
				body,
			}),
		}),
		verifyWomanEmail: builder.mutation<
			AuthResponse<null>,
			Partial<RegisterCredentials>
		>({
			query: (body) => ({
				url: "woman/mobile/verify_email",
				method: "POST",
				body,
			}),
		}),
		registerWomanMobileNumber: builder.mutation<
			AuthResponse<{ customer_id: string }>,
			Partial<RegisterCredentials>
		>({
			query: (body) => ({
				url: "woman/mobile/register_mobile",
				method: "POST",
				body,
			}),
		}),
		verifyWomanMobileNumber: builder.mutation<
			AuthResponse<RegisterMobileDataResponse>,
			Partial<RegisterCredentials>
		>({
			query: (body) => ({
				url: "woman/mobile/verify_mobile",
				method: "POST",
				body,
			}),
		}),
		updateWomanLocation: builder.mutation<
			AuthResponse<null>,
			LocationCredentials & { cba_customer_id: string }
		>({
			query: (body) => {
				const customerId: string = store.getState().auth.customer?.id || "";
				return {
					url: "mobile/location_setup",
					method: "POST",
					body,
				};
			},
		}),
		updateWomanPep: builder.mutation<
			AuthResponse<null>,
			PepCredentials & { cba_customer_id: string }
		>({
			query: (body) => {
				return {
					url: "woman/mobile/pep",
					method: "POST",
					body,
				};
			},
		}),
		updateWomanIncome: builder.mutation<
			AuthResponse<null>,
			SourceOfIncomeCredentials & { cba_customer_id: string }
		>({
			query: (body) => {
				return {
					url: "woman/mobile/income",
					method: "POST",
					body,
				};
			},
		}),
		affirmWomanAttestation: builder.mutation<
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
		womanBvnLookup: builder.mutation<
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
		womanNinLookup: builder.mutation<
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
		womanUploadMeansofIdentification: builder.mutation<
			AuthResponse<null>,
			FormData
		>({
			query: (body) => {
				return {
					url: "woman/mobile/identification_check",
					method: "POST",
					body,
				};
			},
		}),
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
		getWomanDetails: builder.mutation<
			AuthResponse<iWomanMemberDetails>,
			{ cba_customer_id: string }
		>({
			query: (body) => ({
				url: "woman/mobile/basic_details",
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
	useOnboardWomanMutation,
	useGetMemberDetailsMutation,
	useCreateAssetMutation,
	useVerifyWomanMobileNumberMutation,
	useVerifyWomanEmailMutation,
	useRegisterWomanEmailMutation,
	useRegisterWomanMobileNumberMutation,
	useUpdateWomanIncomeMutation,
	useUpdateWomanLocationMutation,
	useAffirmWomanAttestationMutation,
	useUpdateWomanPepMutation,
	useWomanBvnLookupMutation,
	useWomanNinLookupMutation,
	useWomanUploadMeansofIdentificationMutation,
	useAddMemberToTrustCircleMutation,
	useGetWomanDetailsMutation,
} = KidashiApi;

export default KidashiApi;
