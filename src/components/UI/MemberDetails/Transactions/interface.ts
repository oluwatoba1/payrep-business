export interface MemberTransaction {
	title: string;
	amount: string;
	date: string;
	status: string;
	type: "credit" | "debit" | "other";
}
