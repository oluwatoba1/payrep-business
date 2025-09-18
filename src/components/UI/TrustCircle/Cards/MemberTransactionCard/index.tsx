import { Typography } from "@components/Forms";
import { Row } from "@components/Layout";
import { Image, View } from "react-native";
import styles from "./styles";
import Colors from "@theme/Colors";
import ScreenImages from "@assets/images/screens";

export interface IMemberTransaction {
	description: string;
	date: string;
	totalAmount: string;
	transactionType: "loan-disbursement" | "loan-repayment";
}

interface MemberTransactionProps {
	item: IMemberTransaction;
	isLastItem: boolean;
}

export default function MemberTransactionCard({
	item,
	isLastItem,
}: MemberTransactionProps) {
	const generateTransactionIcon = (type: string) => {
		switch (type) {
			case "loan-disbursement":
				return (
					<Row
						containerStyle={{
							...styles.iconContainer,
							backgroundColor: "#E0CCFF",
						}}
						justifyContent='center'
					>
						<Image
							source={ScreenImages.kidashiHome.loanDisbursement}
							style={styles.icon}
						/>
					</Row>
				);
			case "loan-repayment":
				return (
					<Row
						containerStyle={{
							...styles.iconContainer,
							backgroundColor: Colors.primary["100"],
						}}
						justifyContent='center'
					>
						<Image
							source={ScreenImages.kidashiHome.loanRepayment}
							style={styles.icon}
						/>
					</Row>
				);
			default:
				return (
					<Row
						containerStyle={{
							...styles.iconContainer,
							backgroundColor: "#E0CCFF",
						}}
						justifyContent='center'
					>
						<Image
							source={ScreenImages.kidashiHome.loanDisbursement}
							style={styles.icon}
						/>
					</Row>
				);
		}
	};

	return (
		<Row
			alignItems='center'
			justifyContent='space-between'
			containerStyle={{
				...styles.container,
				...(isLastItem && { borderBottomWidth: 0 }),
			}}
		>
			<Row
				gap={6}
				alignItems='center'
				justifyContent='flex-start'
				containerStyle={{ width: "55%" }}
			>
				{generateTransactionIcon(item.transactionType)}
				<View>
					<Typography
						title={item.description}
						type='body-sb'
						color={Colors.neutral["600"]}
						numberOfLines={1}
					/>
					<Typography
						title={item.date}
						type='label-sb'
						color={Colors.neutral["400"]}
					/>
				</View>
			</Row>
			<Typography
				title={`+ ${item.totalAmount}`}
				type='body-sb'
				color={Colors.success["600"]}
			/>
		</Row>
	);
}
