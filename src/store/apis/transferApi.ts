import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
	BaseQueryFn,
	FetchArgs,
	FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import { RootState } from "..";
import { BASE_URL } from "@utils/Constants";
import { setCredentials } from "@store/slices/authSlice";

const customBaseQuery: BaseQueryFn<
	string | FetchArgs,
	unknown,
	FetchBaseQueryError
> = async (args, api, extraOptions) => {
	const rawBaseQuery = fetchBaseQuery({
		baseUrl: `${BASE_URL}/api/v1/`,
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
		console.log("Invalid token detected on transfer api, logging out user.");
		api.dispatch(setCredentials({ token: null, user_id: null }));
	}

	return result;
};

const TransferApi = createApi({
	reducerPath: "transferApi",
	baseQuery: customBaseQuery,
	tagTypes: ["Beneficiaries", "TransferLimits", "Banks"],
	endpoints: (builder) => ({
		nameEnquiry: builder.mutation<INameEnquiryResponse, INameEnquiryRequest>({
			query: (body) => ({
				url: "/transaction/transfer/mobile/name_enquiry",
				method: "POST",
				body,
			}),
		}),
		fetchBanks: builder.mutation<IFetchBanksResponse, IFetchBanksRequest>({
			query: (body) => ({
				url: "/general/mobile/banks",
				method: "POST",
				body,
			}),
			invalidatesTags: ["Banks"],
		}),
		checkTransferLimits: builder.mutation({
			query: (body) => ({
				url: "/transaction/transfer/mobile/limits_check",
				method: "POST",
				body,
			}),
		}),
		bankTransfer: builder.mutation<
			AuthResponse<ITransferResponse>,
			ITransferRequest
		>({
			query: (body) => ({
				url: "/transaction/transfer/mobile/bank_transfer",
				method: "POST",
				body,
			}),
		}),
		fetchCustomerBeneficiaries: builder.mutation({
			query: (body) => ({
				url: "/transaction/mobile/fetch_beneficiaries",
				method: "POST",
				body,
			}),
		}),
		addCustomerBeneficiary: builder.mutation({
			query: (body) => ({
				url: "/transaction/mobile/add_beneficiary",
				method: "POST",
				body,
			}),
		}),
	}),
});

export const {
	useNameEnquiryMutation,
	useFetchBanksMutation,
	useCheckTransferLimitsMutation,
	useBankTransferMutation,
	useFetchCustomerBeneficiariesMutation,
	useAddCustomerBeneficiaryMutation,
} = TransferApi;

export default TransferApi;
