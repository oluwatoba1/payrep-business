import AsyncStorage from "@react-native-async-storage/async-storage";
import { createMMKV } from "react-native-mmkv";

import { height, width } from "./Constants";
import { APP_STATE } from "@env";
import ComponentImages from "@assets/images/components";

const GUIDELINEWIDTH = 375;
const GUIDELINEHEIGHT = 812;

export const scale = (size: number, factor: number = 1.02): number =>
	(width / GUIDELINEWIDTH / factor) * size; // scale dp according to width

export const scaleHeight = (size: number): number =>
	(height / GUIDELINEHEIGHT) * size; // scale dp according to height

export const moderateScale = (size: number, factor: number = 0.5) =>
	size + (scale(size) - size) * factor; // font-size, border-radius

export const formatLabel = (key: string) => {
	return key
		.replace(/([A-Z])/g, " $1")
		.replace(/^./, (str) => str.toUpperCase());
};

export const getRelativeTime = (notificationDate: Date): string => {
	const now = new Date();
	const diffMs = now.getTime() - notificationDate.getTime();
	const diffSeconds = Math.floor(diffMs / 1000);
	const diffMinutes = Math.floor(diffSeconds / 60);
	const diffHours = Math.floor(diffMinutes / 60);
	const diffDays = Math.floor(diffHours / 24);
	const diffMonths = Math.floor(diffDays / 30);
	const diffYears = Math.floor(diffDays / 365);

	if (diffYears > 0) {
		if (diffYears === 1) return "1 year ago";
		return `${diffYears} years ago`;
	} else if (diffMonths > 0) {
		if (diffMonths === 1) return "1 month ago";
		return `${diffMonths} months ago`;
	} else if (diffDays > 0) {
		if (diffDays === 1) return "1 day ago";
		return `${diffDays} days ago`;
	} else if (diffHours > 0) {
		if (diffHours === 1) return "1 hour ago";
		return `${diffHours} hours ago`;
	} else if (diffMinutes > 0) {
		if (diffMinutes === 1) return "1 minute ago";
		return `${diffMinutes} minutes ago`;
	} else {
		return "Just now";
	}
};

export const formatCountdown = (countdown: number) => {
	const hours = Math.floor(countdown / 3600);
	const minutes = Math.floor((countdown % 3600) / 60);
	const seconds = countdown % 60;

	return `${hours > 0 ? `${hours.toString().padStart(2, "0")}:` : ""}${minutes
		.toString()
		.padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
};

export const fetchAppState = async (): Promise<IAppState | null> => {
	try {
		const data = await AsyncStorage.getItem(APP_STATE);

		return data ? JSON.parse(data) : null;
	} catch (error) {
		// Do we really want to show users this error. I think its better to catch this type of errors with something like sentry
		return null;
	}
};

export async function persistAppState(
	state: Partial<IAppState>
): Promise<void> {
	try {
		const appState = (await fetchAppState()) || {};
		const data = {
			...appState,
			...state,
		};
		await AsyncStorage.setItem(APP_STATE, JSON.stringify(data));
	} catch (error) {
		//TODO: Decide on what to do here
	}
}

export const chunkArray = (array: Array<any> = [], size: number) => {
	let index = 0;
	const chunkedArray = [];

	while (index < array.length) {
		chunkedArray.push(array.slice(index, index + size));
		index += size;
	}

	return chunkedArray;
};

export const addCommas = (
	value: number | string,
	removeDecimal: boolean = false
): string => {
	if (typeof value !== "string") {
		value = String(value);
	}

	value = value.replace(/,/g, "");

	if (value.trim() === "") {
		return ""; // Handle empty input gracefully
	}

	// Check if the input includes a decimal point
	const hasDecimal = value.includes(".");

	// Split into integer and decimal parts
	const [integerPart, decimalPart] = value.split(".");

	// Add commas to the integer part
	const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

	// Preserve trailing decimal point if input ends with "."
	if (hasDecimal && !removeDecimal) {
		return decimalPart !== undefined
			? `${formattedInteger}.${decimalPart}`
			: `${formattedInteger}.`;
	}

	// If no decimal exists or `removeDecimal` is true, return the formatted integer
	return formattedInteger;
};

export const removeCommas = (value: string): string => {
	if (!value) {
		return ""; // Handle empty input gracefully
	}

	// Remove commas from the string
	const strippedString = value.replace(/,/g, "");

	// Return stripped string directly to preserve trailing decimals like "123."
	return strippedString;
};

export const ACTIONS_DATA = [
	{ id: "01", title: "Send", icon: ComponentImages.accountDetailsCard.send },
	{ id: "02", title: "Bills", icon: ComponentImages.accountDetailsCard.bills },
	{
		id: "03",
		title: "Earnings",
		icon: ComponentImages.accountDetailsCard.earnings,
	},
	{
		id: "04",
		title: "My Cards",
		icon: ComponentImages.accountDetailsCard.cards,
	},
];

export const formatCurrency = (amount: number) => {
	return `₦${amount.toLocaleString(undefined, {
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	})}`;
};

export const formatValue = (value: string) =>
	formatCurrency(Number(removeCommas(String(value))));

export const maskString = (
	input: string | number,
	visibleStart: number = 4,
	visibleEnd: number = 2,
	maskChar: string = "*",
	maskCount: number = 4
): string => {
	const str = String(input);
	if (str.length <= visibleStart + visibleEnd) return str;

	return `${str.slice(0, visibleStart)}${maskChar.repeat(maskCount)}${str.slice(
		-visibleEnd
	)}`;
};

export const formatDateTime = (isoString: string) => {
	const date = new Date(isoString);

	const day = String(date.getUTCDate()).padStart(2, "0");
	const month = String(date.getUTCMonth() + 1).padStart(2, "0");
	const year = date.getUTCFullYear();

	const hours = String(date.getUTCHours()).padStart(2, "0");
	const minutes = String(date.getUTCMinutes()).padStart(2, "0");

	const shortMonth = date.toLocaleString("en-US", { month: "short" }); // e.g. "Aug"
	const shortDate = `${day} ${shortMonth}`;

	return {
		date: `${day}/${month}/${year}`,
		time: `${hours}:${minutes}`,
		shortDate,
	};
};

export const formatDateForFilter = (date?: Date) =>
	date ? date.toLocaleDateString("en-GB") : undefined;

export const buildReceiptHTML = (
	transaction: ITransaction,
	dateGenerated: string,
	logoURI: string,
	checkmarkURI: string
) => {
	const {
		account__account_name,
		amount,
		source_account_name,
		beneficiary_account_name,
		beneficiary_account_number,
		bank_name,
		bank,
		reference_number,
		status,
		txn_status,
		remarks,
		session_id,
		token,
		units,
		address,
		created_at,
	} = transaction;

	const transactionDate = formatDateTime(created_at);
	const generatedDate = formatDateTime(dateGenerated);

	return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="UTF-8" />
        <style>
          body {
            font-family: Arial, sans-serif;
            padding: 24px;
            color: #000;
            position: relative;
            height: 80vh;
          }

          .watermark {
            position: absolute;
            top: 50%;
            left: 50%;
            width: 208px;
            height: 208px;
            opacity: 0.05;
            transform: translate(-50%, -50%);
            z-index: 0;
          }
          .header {
            text-align: center;
            padding-bottom: 30px;
          }
          .logo {
            width: 100px;
            height: 100px;
            padding-bottom: 8px;
          }
          .title {
            font-size: 24px;
            font-weight: bold;
            padding: 16px 0;
          }
          .checkmark {
            height: 28px;
            padding: 12px auto;
          }
          .row {
            display: flex;
            justify-content: space-between;
            padding: 20px 0;
            border-width: 0 0 .3px 0;
            border-color: #D4D6D7;
            border-style: solid;
          }
          .no-border {
            border-width: 0px;
          }
          .label {
            font-weight: bold;
            color: #191B1B;
          }
          .value {
            text-align: right;
          }
          .amount {
            font-size: 24px;
            font-weight: bold;
            text-align: center;
            padding: 24px 0;
          }
          .status-successful { color: #02AB75; }
          .status-failed { color: #EF4444; }
          .status-pending { color: #FEB800; }
        </style>
      </head>
      <body>
      <img class="watermark" src="${logoURI}" />
      <div>
          <div class="header">
            <img class="logo" src="${logoURI}" />
            <div class="row no-border">
              <span class="label">Generated on:</span>
              <span>${generatedDate.date} ${generatedDate.time}</span>
            </div>
            <div class="title">Transaction Receipt</div>
            <img class="checkmark" src="${checkmarkURI}" />
          </div>

          <div class="amount">${formatCurrency(amount)}</div>

          <div class="row"><span class="label">Sender:</span><span class="value">${
						source_account_name || account__account_name
					}</span></div>
          <div class="row">
            <span class="label">Recipient:</span>
            <div>
              <span class="value" style="padding-bottom: 5px; display: block;">${
								beneficiary_account_name || ""
							}</span>
              <span class="value">${beneficiary_account_number}${
		bank_name || bank ? ` | ${bank_name || bank}` : ""
	}</span>
            </div>
          </div>
          <div class="row"><span class="label">Date:</span><span class="value">${
						transactionDate.date
					} ${transactionDate.time}</span></div>
          <div class="row"><span class="label">Reference:</span><span class="value">${reference_number}</span></div>
          ${
						token
							? `<div class="row"><span class="label">Token:</span><span class="value">${token}</span></div>`
							: ""
					}
          ${
						units
							? `<div class="row"><span class="label">Units:</span><span class="value">${units}</span></div>`
							: ""
					}
          ${
						address
							? `<div class="row"><span class="label">Address:</span><span class="value">${address}</span></div>`
							: ""
					}
          ${
						session_id
							? `<div class="row"><span class="label">Session ID:</span><span class="value">${session_id}</span></div>`
							: ""
					}
          <div class="row"><span class="label">Narration:</span><span class="value">${
						remarks || "-"
					}</span></div>
          <div class="row no-border">
            <span class="label">Status:</span>
            <span class="value status-${txn_status ?? status}">${
		txn_status ?? status
	}</span>
          </div>
        </div>
      </body>
    </html>

  `;
};

export const formatToInternationalPhoneNumber = (phone: string): string => {
	if (!phone) return "";

	// Remove all non-digit characters for safety
	const digitsOnly = phone.replace(/\D/g, "");

	if (digitsOnly.length >= 10) {
		return `+234${digitsOnly.slice(-10)}`;
	} else {
		return `+234${digitsOnly.padEnd(10 - digitsOnly.length, "0")}`;
	}

	return phone;
};

export const normalizeName = (name: string) =>
	name.length < 2 ? name.padEnd(2, ".") : name;

export const mmkvStorage = createMMKV({
	id: "user-storage",
	encryptionKey: "hunter2",
	mode: "multi-process",
	readOnly: false,
});
