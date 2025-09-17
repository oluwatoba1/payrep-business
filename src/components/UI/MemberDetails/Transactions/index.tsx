import { View, Text } from "react-native";
import React from "react";
import EmptyState from "@components/Miscellaneous/EmptyState";
import ScreenImages from "@assets/images/screens";

const MemberTransactions = () => {
	const transactions = [];

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
		<View>
			<Text>MemberTransactions</Text>
		</View>
	);
};

export default MemberTransactions;
