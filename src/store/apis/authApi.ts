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
		api.dispatch(setCredentials({ token: null, user_id: null }));
	}

	return result;
};

const AuthApi = createApi({
	reducerPath: "authenticationApi",
	baseQuery: customBaseQuery,
	endpoints: (builder) => ({
		login: builder.mutation<AuthResponse<LoginResponse>, LoginCredentials>({
			query: (body) => ({
				url: "auth/mobile/login",
				method: "POST",
				body,
			}),
		}),
		clonePersonalProfile: builder.mutation<
			AuthResponse<null>,
			{ customer_id: string }
		>({
			query: (body) => ({
				url: "auth/mobile/clone_personal_profile",
				method: "POST",
				body,
			}),
		}),
		initiatePasswordReset: builder.mutation<
			AuthResponse<InitiateResetPasswordResponse | null>,
			InitiatePasswordResetCredentials
		>({
			query: (body) => ({
				url: "auth/mobile/initiate_reset_password",
				method: "POST",
				body,
			}),
		}),
		passwordReset: builder.mutation<
			AuthResponse<null>,
			PasswordResetCredentials
		>({
			query: (body) => ({
				url: "auth/mobile/reset_password",
				method: "POST",
				body,
			}),
		}),
		passwordChange: builder.mutation<
			AuthResponse<null>,
			ChangePasswordCredentials
		>({
			query: (body) => ({
				url: "auth/mobile/change_password",
				method: "POST",
				body,
			}),
		}),
		pinChange: builder.mutation<AuthResponse<null>, ChangePinCredentials>({
			query: (body) => ({
				url: "auth/mobile/change_pin",
				method: "POST",
				body,
			}),
		}),
		resetPin: builder.mutation<AuthResponse<null>, ResetPinCredentials>({
			query: (body) => ({
				url: "auth/mobile/reset_pin",
				method: "POST",
				body,
			}),
		}),
		deactivateAccount: builder.mutation<
			AuthResponse<null>,
			DeactivateAccountCredentials
		>({
			query: (body) => ({
				url: "auth/mobile/deactivate_account",
				method: "POST",
				body,
			}),
		}),
		registerEmail: builder.mutation<
			AuthResponse<null>,
			Partial<RegisterCredentials>
		>({
			query: (body) => ({
				url: "customer/mobile/register_email",
				method: "POST",
				body,
			}),
		}),
		verifyEmail: builder.mutation<
			AuthResponse<null>,
			Partial<RegisterCredentials>
		>({
			query: (body) => ({
				url: "customer/mobile/verify_email",
				method: "POST",
				body,
			}),
		}),
		registerMobileNumber: builder.mutation<
			AuthResponse<{ customer_id: string }>,
			Partial<RegisterCredentials>
		>({
			query: (body) => ({
				url: "customer/mobile/register_mobile_number",
				method: "POST",
				body,
			}),
		}),
		verifyMobileNumber: builder.mutation<
			AuthResponse<RegisterMobileDataResponse>,
			Partial<RegisterCredentials>
		>({
			query: (body) => ({
				url: "customer/mobile/verify_mobile_number",
				method: "POST",
				body,
			}),
		}),
		sendOtp: builder.mutation<AuthResponse<null>, Partial<RegisterCredentials>>(
			{
				query: (body) => ({
					url: "customer/mobile/send_otp",
					method: "POST",
					body,
				}),
			}
		),
		verifyOtp: builder.mutation<
			AuthResponse<null>,
			Partial<RegisterCredentials>
		>({
			query: (body) => ({
				url: "customer/mobile/verify_otp",
				method: "POST",
				body,
			}),
		}),
		verifyDevice: builder.mutation<
			AuthResponse<null>,
			Partial<RegisterCredentials>
		>({
			query: (body) => ({
				url: "customer/mobile/verify_customer_device",
				method: "POST",
				body,
			}),
		}),
		deviceRegistrationLogCheck: builder.mutation<
			AuthResponse<DeviceRegistrationLogResponse[]>,
			VerificationLogsCredentials
		>({
			query: (body) => {
				return {
					url: "auth/mobile/device_registration_log_check",
					method: "POST",
					body,
				};
			},
		}),
		registerPassword: builder.mutation<
			AuthResponse<null>,
			Partial<RegisterCredentials>
		>({
			query: (body) => ({
				url: "customer/mobile/register_password",
				method: "POST",
				body,
			}),
		}),
		registerBiometrics: builder.mutation<
			AuthResponse<null>,
			Partial<RegisterBiometricsCredentials>
		>({
			query: (body) => ({
				url: "customer/mobile/register_biometrics",
				method: "POST",
				body,
			}),
		}),
		registerDevice: builder.mutation<
			AuthResponse<RegisterDeviceResponse>,
			RegisterDeviceCredentials
		>({
			query: (body) => ({
				url: "auth/mobile/register_device",
				method: "POST",
				body,
			}),
		}),
	}),
});

export const {
	useLoginMutation,
	useClonePersonalProfileMutation,
	useInitiatePasswordResetMutation,
	usePasswordResetMutation,
	usePasswordChangeMutation,
	usePinChangeMutation,
	useResetPinMutation,
	useDeactivateAccountMutation,
	useRegisterEmailMutation,
	useVerifyEmailMutation,
	useVerifyDeviceMutation,
	useDeviceRegistrationLogCheckMutation,
	useRegisterMobileNumberMutation,
	useVerifyMobileNumberMutation,
	useSendOtpMutation,
	useVerifyOtpMutation,
	useRegisterPasswordMutation,
	useRegisterBiometricsMutation,
	useRegisterDeviceMutation,
} = AuthApi;

export default AuthApi;
