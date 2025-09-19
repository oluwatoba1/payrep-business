import { View, Text, Image, FlatList } from "react-native";
import React from "react";
import EmptyState from "@components/Miscellaneous/EmptyState";
import ScreenImages from "@assets/images/screens";
import { MemberTransaction } from "./interface";
import { styles } from "./style";
import { Row } from "@components/Layout";
import { scale, scaleHeight } from "@utils/Helpers";
import { Typography } from "@components/Forms";
import Colors from "@theme/Colors";
import { Pressable } from "react-native-gesture-handler";
import Divider from "@components/Miscellaneous/Divider";

const TransactionCard = ({
	transaction,
	navigate,
}: {
	navigate: any;
	transaction: MemberTransaction;
}) => {
	const iconStyle = [
		styles.iconContainer,
		transaction.type === "credit"
			? styles.iconContainerCredit
			: transaction.type === "debit"
			? styles.iconContainerDebit
			: styles.iconContainerUnknown,
	];

	return (
		<Pressable
			style={styles.container}
			onPress={() => {
				navigate("TransactionDetails");
			}}
		>
			<Row>
				<Row gap={scale(10)}>
					<View style={iconStyle}>
						<Image
							source={
								transaction.type === "credit"
									? ScreenImages.kidashiMemberDetails.creditIcon
									: transaction.type === "debit"
									? ScreenImages.kidashiMemberDetails.debitIcon
									: ScreenImages.kidashiMemberDetails.debitCreditIcon
							}
							style={styles.transactionIcon}
						/>
					</View>
					<View>
						<Typography title={transaction.title} type='subheading-sb' />
						<Typography title={transaction.date} type='label-r' />
					</View>
				</Row>
				<Typography
					title={`${
						transaction.type === "credit"
							? "+ "
							: transaction.type === "debit"
							? "- "
							: ""
					}${transaction.amount}`}
					type='body-b'
					color={
						transaction.type === "credit"
							? Colors.success[600]
							: transaction.type === "debit"
							? Colors.danger[600]
							: Colors.gray[700]
					}
				/>
			</Row>
			<Divider gapY={scaleHeight(10)} />
		</Pressable>
	);
};

const MemberTransactions = ({ navigate }: { navigate: any }) => {
	const transactions: MemberTransaction[] = [
		{
			title: "Repayment",
			amount: "₦100,000",
			date: "Aug 01, 2025",
			status: "successful",
			type: "debit",
		},
		{
			title: "Loan Disbursed",
			amount: "₦300,000",
			date: "Aug 01, 2025",
			status: "successful",
			type: "credit",
		},
		{
			title: "Deposit",
			amount: "₦150,000",
			date: "Aug 01, 2025",
			status: "successful",
			type: "other",
		},
		{
			title: "Repayment",
			amount: "₦100,000",
			date: "Aug 01, 2025",
			status: "successful",
			type: "debit",
		},
		{
			title: "Loan Disbursed",
			amount: "₦300,000",
			date: "Aug 01, 2025",
			status: "successful",
			type: "credit",
		},
		{
			title: "Deposit",
			amount: "₦150,000",
			date: "Aug 01, 2025",
			status: "successful",
			type: "other",
		},
		{
			title: "Loan Disbursed",
			amount: "₦300,000",
			date: "Aug 01, 2025",
			status: "successful",
			type: "credit",
		},
		{
			title: "Deposit",
			amount: "₦150,000",
			date: "Aug 01, 2025",
			status: "successful",
			type: "other",
		},
		{
			title: "Repayment",
			amount: "₦100,000",
			date: "Aug 01, 2025",
			status: "successful",
			type: "debit",
		},
		{
			title: "Loan Disbursed",
			amount: "₦300,000",
			date: "Aug 01, 2025",
			status: "successful",
			type: "credit",
		},
		{
			title: "Deposit",
			amount: "₦150,000",
			date: "Aug 01, 2025",
			status: "successful",
			type: "other",
		},
		{
			title: "Loan Disbursed",
			amount: "₦300,000",
			date: "Aug 01, 2025",
			status: "successful",
			type: "credit",
		},
		{
			title: "Deposit",
			amount: "₦150,000",
			date: "Aug 01, 2025",
			status: "successful",
			type: "other",
		},
		{
			title: "Repayment",
			amount: "₦100,000",
			date: "Aug 01, 2025",
			status: "successful",
			type: "debit",
		},
		{
			title: "Loan Disbursed",
			amount: "₦300,000",
			date: "Aug 01, 2025",
			status: "successful",
			type: "credit",
		},
		{
			title: "Deposit",
			amount: "₦150,000",
			date: "Aug 01, 2025",
			status: "successful",
			type: "other",
		},
	];

	const hasTransactions = transactions.length > 0;

	if (!hasTransactions) {
		return (
			<View
				style={{
					flex: 1,
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<EmptyState
					icon={ScreenImages.kidashiMemberDetails.transactionIcon}
					title='No Transactions yet'
					description='When loans are created or payments are made, you’ll see them listed here'
				/>
			</View>
		);
	}
	return (
		<FlatList<MemberTransaction>
			data={transactions}
			keyExtractor={(_, index) => index.toString()}
			renderItem={({ item }) => (
				<TransactionCard navigate={navigate} transaction={item} />
			)}
			contentContainerStyle={{ flexGrow: 1 }}
		/>
	);
};

export default MemberTransactions;
