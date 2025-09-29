import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
	BaseQueryFn,
	FetchArgs,
	FetchBaseQueryError,
} from "@reduxjs/toolkit/query";

import { RootState } from "..";
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
			KidashiAuthResponse<{}>,
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
	}),
});

export const {
	useRegisterMutation,
	useCreateTrustCircleMutation,
	useFetchKidashiVendorMutation,
} = KidashiApi;

export default KidashiApi;
