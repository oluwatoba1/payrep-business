declare module "@env" {
	export const APP_MODE: "local" | "sandbox" | "production";
	export const APP_STATE: string;
	export const PROD_BASE_URL: string;
	export const SANDBOX_BASE_URL: string;
	export const LOCAL_BASE_URL: string;
	export const QOREID_SANDBOX_CLIENT_ID: string;
	export const QOREID_LOCAL_CLIENT_ID: string;
	export const QOREID_PROD_CLIENT_ID: string;
	export const KIDASHI_LOCAL_URL: string;
	export const KIDASHI_SANDBOX_URL: string;
	export const KIDASHI_PROD_URL: string;
}
