import { Dimensions, StatusBar } from "react-native";

import {
	APP_MODE,
	PROD_BASE_URL,
	SANDBOX_BASE_URL,
	LOCAL_BASE_URL,
	QOREID_LOCAL_CLIENT_ID,
	QOREID_PROD_CLIENT_ID,
	QOREID_SANDBOX_CLIENT_ID,
	KIDASHI_LOCAL_URL,
	KIDASHI_SANDBOX_URL,
	KIDASHI_PROD_URL,
} from "@env";
import ComponentImages from "../../assets/images/components";

interface ENV_CONFIG {
	BASE_URL: string;
	QOREID_CLIENT_ID: string;
	KIDASHI_URL: string;
}

export const { height, width } = Dimensions.get("window");

export const baseDP = 10;

export const STATUS_BAR_HEIGHT = StatusBar.currentHeight || 15;

export const MAIN_LAYOUT_HORIZONTAL_PADDING = 16;

export const BOTTOM_TAB_CONTAINER_HEIGHT = 71;

export const HEADER_CONTAINER_HEIGHT = 60;

export const RESEND_COUNTDOWN = 600;

export const ONBOARDING_DATA = [
	{
		title: "Welcome to PayRep",
		description:
			"Your all-in-one platform for seamless, secure, and efficient payment solutions through POS terminals and mobile app transactions",
		backgroundImage: ComponentImages.onboarding.one,
		progressImage: ComponentImages.onboarding.progressOnePng,
	},
	{
		title: "Secure Transactions",
		description:
			"Your financial security is our top priority. Rest easy, knowing your transactions are protected by state-of-the-art security measures",
		backgroundImage: ComponentImages.onboarding.two,
		progressImage: ComponentImages.onboarding.progressTwoPng,
	},
	{
		title: "24/7 Support",
		description:
			"Our support team is available around the clock to assist agents, merchants, and individual users whenever needed",
		backgroundImage: ComponentImages.onboarding.three,
		progressImage: ComponentImages.onboarding.progressThreePng,
	},
];

export const USER_TYPES = [
	{
		title: "Personal Banking",
		description:
			"For individuals who want a stress-free way to handle everyday needs like savings, transfers, and account access.",
		icon: ComponentImages.userTypeCard.individual,
		value: "individual",
	},
	{
		title: "Business Banking",
		description:
			"For businesses that need a dependable platform to manage operations, make payouts, and stay in control—all in one place.",
		icon: ComponentImages.userTypeCard.merchant,
		value: "corporate",
	},
];

const APP_CONFIG: Record<"local" | "sandbox" | "production", ENV_CONFIG> = {
	local: {
		BASE_URL: LOCAL_BASE_URL,
		QOREID_CLIENT_ID: QOREID_LOCAL_CLIENT_ID,
		KIDASHI_URL: KIDASHI_LOCAL_URL,
	},
	sandbox: {
		BASE_URL: SANDBOX_BASE_URL,
		QOREID_CLIENT_ID: QOREID_SANDBOX_CLIENT_ID,
		KIDASHI_URL: KIDASHI_SANDBOX_URL,
	},
	production: {
		BASE_URL: PROD_BASE_URL,
		QOREID_CLIENT_ID: QOREID_PROD_CLIENT_ID,
		KIDASHI_URL: KIDASHI_PROD_URL,
	},
};

export const BASE_URL = APP_CONFIG[APP_MODE].BASE_URL;
export const KIDASHI_URL = APP_CONFIG[APP_MODE].KIDASHI_URL;
export const QOREID_CLIENT_ID = APP_CONFIG[APP_MODE].QOREID_CLIENT_ID;
console.log("BASE_URL:------------------", BASE_URL);
console.log("KBASE_URL:-----------------", KIDASHI_URL);
export const DEFAULT_ERROR_MESSAGE = "Something went wrong, contact support";

export const IDCardTypes = [
	{ label: "Int'l passport", value: "international_passport" },
	{ label: "Driver's license", value: "drivers_license" },
	{ label: "Voter's card", value: "voters_card" },
	{ label: "National ID card", value: "national_id" },
];

export const shimmerDelay = 0;

export const defaultAttestationText = (fullName: string) => `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      <title>Attestation Agreement</title>
      <style>
          body {
              font-family: Arial, sans-serif;
              padding: 20px;
              line-height: 1.6;
              background-color: #f9f9f9;
              color: #333;
          }
          h1 {
              text-align: center;
              font-size: 24px;
              margin-bottom: 30px;
          }
          .content {
              background-color: #fff;
              padding: 20px;
              border-radius: 8px;
              box-shadow: 0 0 10px rgba(0,0,0,0.1);
          }
          .signature-section {
              margin-top: 40px;
          }
          .signature-line {
              border-bottom: 1px solid #333;
              width: 250px;
              margin-top: 10px;
          }
          .label {
              font-weight: bold;
              margin-top: 20px;
          }
      </style>
  </head>
  <body>
      <h1>Attestation Agreement</h1>
      <div class="content">
          <p>
              I, <span class="label" id="fullName">${fullName}</span>, hereby attest that all information provided by me is accurate, truthful, and complete to the best of my knowledge. I acknowledge that any false statements or misrepresentation may result in legal or administrative consequences as permitted under applicable laws or organizational policies.
          </p>

          <p>
              By signing this agreement, I confirm my understanding of the terms and affirm my commitment to comply with the stated obligations and responsibilities.
          </p>

          <p>
              This attestation shall remain valid for the duration of my involvement with the organization or until formally revoked in writing.
          </p>
      </div>
  </body>
  </html>
`;

export const ACCOUNT_TYPES = [
	{ label: "Savings", value: "savings" },
	{ label: "Current", value: "current" },
	{ label: "POS", value: "pos" },
	{ label: "Virtual", value: "virtual" },
];

export const KYCLOG_TYPES = {
	BVN_VERIFICATION: "bvn_verification",
	NIN_VERIFICATION: "nin_verification",
};

export const VENDOR_CATEGORIES = [
	{ label: "Retail", value: "RETAIL" },
	{ label: "Wholesale", value: "WHOLESALE" },
	{ label: "Manufacturing", value: "MANUFACTURING" },
	{ label: "Services", value: "SERVICES" },
	{ label: "Agriculture", value: "AGRICULTURE" },
	{ label: "Others", value: "OTHER" },
];
