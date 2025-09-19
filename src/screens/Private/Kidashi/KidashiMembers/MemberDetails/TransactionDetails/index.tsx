import { View, Image, Pressable } from "react-native";
import React from "react";
import SafeAreaWrapper from "@components/Layout/SafeAreaWrapper";
import { Button, Typography } from "@components/Forms";
import { styles } from "./style";
import ScreenImages from "@assets/images/screens";
import Colors from "@theme/Colors";
import Pad from "@components/Pad";
import { getStatusBackgroundColor, getStatusColor } from "./util";
import { Row } from "@components/Layout";
import IconImages from "@assets/images/appIcons";
import Divider from "@components/Miscellaneous/Divider";
import { scaleHeight } from "@utils/Helpers";

interface TransactionDetailsProps {
	transaction?: {
		amount: string;
		type: string;
		status: "successful" | "pending" | "failed";
		date: string;
		description?: string;
	};
}

const TransactionDetails = ({
	transaction = {
		amount: "+ ₦15,300.00",
		type: "Loan Repayment",
		status: "successful",
		date: "Aug 01, 2025",
		description: "Loan repayment transaction",
	},
}: TransactionDetailsProps) => {
	return (
		<SafeAreaWrapper title='Transaction Details'>
			<View style={styles.container}>
				{/* Transaction Icon */}
				<View style={styles.iconContainer}>
					<Image
						source={ScreenImages.kidashiMemberDetails.debitIcon}
						style={styles.transactionIcon}
						resizeMode='contain'
					/>
				</View>
				<Pad size={16} />
				{/* Amount Display */}
				<View style={styles.amountContainer}>
					<Typography
						title={transaction.amount}
						type='heading5-sb'
						color={Colors.success[600]}
						style={styles.amountText}
					/>
				</View>

				<Pad size={16} />
				{/* Transaction Type */}
				<View style={styles.typeContainer}>
					<Typography
						title={transaction.type}
						type='subheading'
						color={Colors.gray[400]}
						style={styles.typeText}
					/>
				</View>
				<Pad size={16} />

				{/* Status Badge */}
				<View style={styles.statusContainer}>
					<View
						style={[
							styles.statusBadge,
							{ backgroundColor: getStatusBackgroundColor(transaction.status) },
						]}
					>
						<Image
							source={ScreenImages.kidashiMemberDetails.checkIcon}
							style={styles.statusIcon}
						/>
						<Typography
							title='Success'
							type='label-sb'
							color={getStatusColor(transaction.status)}
							style={styles.statusText}
						/>
					</View>
				</View>
				<Divider gapY={scaleHeight(10)} />
				<Row>
					<Typography title='Transaction ID' type='body-r' />
					<View style={styles.transNumberContainer}>
						<Pressable onPress={() => {}} style={styles.transNumberPressable}>
							<Image
								source={IconImages.icon.copyDark}
								style={styles.copyIcon}
							/>
							<Typography title='Copy' type='body-r' />
						</Pressable>
						<Typography title='TRX-00245' type='body-r' />
					</View>
				</Row>
				<Divider gapY={scaleHeight(10)} />
				<Row>
					<Typography title='Date' type='body-r' />
					<Typography title={transaction.date} type='body-r' />
				</Row>
				<Divider gapY={scaleHeight(10)} />
				<Row>
					<Typography title='Time' type='body-r' />
					<Typography title='10:00 AM' type='body-r' />
				</Row>
				<Divider gapY={scaleHeight(10)} />
				<Row>
					<Typography title='Payment Method' type='body-r' />
					<Typography title='Transfer' type='body-r' />
				</Row>
				<Divider gapY={scaleHeight(10)} />
				<Row>
					<Typography title='Remaining Balance' type='body-r' />
					<Typography title='₦100,000.00' type='body-r' />
				</Row>
				<Divider gapY={scaleHeight(10)} />
			</View>
			<Pressable style={styles.downloadReceiptContainer}>
				<Image
					source={ScreenImages.kidashiMemberDetails.downloadIcon}
					style={styles.downloadIcon}
				/>
				<Typography title='Download Receipt' type='body-sb' />
			</Pressable>
		</SafeAreaWrapper>
	);
};

export default TransactionDetails;
