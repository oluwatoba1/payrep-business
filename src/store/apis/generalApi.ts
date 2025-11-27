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
		baseUrl: `${BASE_URL}/api/v1/general/`,
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
		console.log("Invalid token detected on general api, logging out user.");
		api.dispatch(setCredentials({ token: null, user_id: null }));
	}

	return result;
};

const GeneralApi = createApi({
	reducerPath: "generalApi",
	baseQuery: customBaseQuery,
	endpoints: (builder) => ({
		fetchStates: builder.query<AuthResponse<any>, void>({
			query: () => ({
				url: "mobile/states",
			}),
		}),
		fetchLgas: builder.mutation<AuthResponse<any>, { state: string }>({
			query: (body) => ({
				url: "mobile/lgas",
				method: "POST",
				body,
			}),
		}),
		fetchCountries: builder.query<AuthResponse<ICountry[]>, void>({
			query: () => ({
				url: "mobile/countries",
			}),
		}),
	}),
});

export const {
	useFetchStatesQuery,
	useFetchLgasMutation,
	useFetchCountriesQuery,
} = GeneralApi;

export default GeneralApi;
