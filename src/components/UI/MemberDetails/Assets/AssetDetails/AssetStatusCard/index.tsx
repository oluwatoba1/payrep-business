import { Typography } from "@components/Forms";
import React from "react";
import { View } from "react-native";
import { getStatusColor } from "../../AssetList/utll";
import { styles } from "./styles";
import { Row } from "@components/Layout";
import ProgressBar from "@components/Forms/ProgressBar";
import Colors from "@theme/Colors";
import { scaleHeight, scale } from "@utils/Helpers";
import Pad from "@components/Pad";
import { Status } from "@screens/Private/Kidashi/KidashiMembers/MemberDetails/Assets/AssetDetails";

const OngoingCard = () => {
	return (
		<View style={styles.ongoingCardContainer}>
			<View style={styles.ongoingCardProgressContainer}>
				<Row>
					<Typography title='Progress' type='body-r' style={styles.cardLabel} />
					<Typography title='2 of 5' type='body-r' style={styles.cardLabel} />
				</Row>
				<Pad size={scaleHeight(4)} />
				<ProgressBar color={Colors.cardColor.brown["200"]} progress={30} />
			</View>
			<View style={styles.ongoingCardDetailsContainer}>
				<Row>
					<Typography
						title='Amount paid'
						type='body-r'
						style={styles.cardLabel}
					/>
					<Typography
						title='Remaining'
						type='body-r'
						style={styles.cardLabel}
					/>
				</Row>
				<Row>
					<Typography
						title='N200,000'
						type='body-b'
						style={styles.cardAmount}
					/>
					<Typography
						title='N100,000'
						type='body-r'
						style={styles.cardAmount}
					/>
				</Row>
			</View>
		</View>
	);
};

const ApprovedCard = () => {
	return (
		<View style={styles.approvedCardContainer}>
			<View style={styles.approvedCardHeaderContainer}>
				<Row>
					<Typography title='Schedule' type='body-r' style={styles.cardLabel} />
					<Typography
						title='Duration: 1 month'
						type='body-r'
						style={styles.cardLabel}
					/>
				</Row>
				<Pad size={scaleHeight(4)} />
			</View>
			<View style={styles.approvedCardDetailsContainer}>
				<Typography
					title='Repayment Plan'
					type='body-r'
					style={styles.cardLabel}
				/>
				<Typography
					title='N5,250 every 14 days (includes 5% interest)'
					type='body-r'
					style={styles.cardLabel2}
				/>
			</View>
			<View style={styles.approvedCardDetailsContainer}>
				<Typography title='Start Date' type='body-r' style={styles.cardLabel} />
				<Typography
					title='20 Sept 2025'
					type='body-r'
					style={styles.cardLabel2}
				/>
			</View>
			<View style={styles.approvedCardDetailsContainer}>
				<Typography title='End Date' type='body-r' style={styles.cardLabel} />
				<Typography
					title='15 Nov 2025'
					type='body-r'
					style={styles.cardLabel2}
				/>
			</View>
		</View>
	);
};

const DeniedCard = () => {
	return (
		<View style={styles.deniedCardContainer}>
			{/* Header Section */}
			<View style={styles.deniedCardHeader}>
				<Row alignItems='center' gap={scale(8)}>
					<View style={styles.deniedIconContainer}>
						<Typography
							title='i'
							type='label-sb'
							color={Colors.danger[400]}
							style={styles.deniedIcon}
						/>
					</View>
					<Typography
						title='Application Denied'
						type='body-sb'
						color={Colors.danger[400]}
						style={styles.deniedTitle}
					/>
				</Row>
			</View>

			{/* Message Body */}
			<View style={styles.deniedCardBody}>
				<Typography
					title='Application denied because the requested amount exceeds the eligible financing limit'
					type='body-r'
					color={Colors.gray[600]}
					style={styles.deniedMessage}
				/>
			</View>
		</View>
	);
};

const RejectedCard = () => {
	return (
		<View style={styles.rejectedCardContainer}>
			{/* Header Section */}
			<View style={styles.rejectedCardHeader}>
				<Row justifyContent='space-between' alignItems='center'>
					<Typography
						title='Schedule'
						type='body-sb'
						color={Colors.gray[600]}
						style={styles.rejectedHeaderLabel}
					/>
					<Typography
						title='Duration: 1 month'
						type='body-r'
						color={Colors.gray[600]}
						style={styles.rejectedHeaderValue}
					/>
				</Row>
			</View>

			{/* Body Section */}
			<View style={styles.rejectedCardBody}>
				{/* Repayment Plan */}
				<View style={styles.rejectedDetailRow}>
					<Typography
						title='Repayment Plan'
						type='body-sb'
						color={Colors.gray[600]}
						style={styles.rejectedLabel}
					/>
					<Typography
						title='₦5,250 every 14 days (includes 5% interest)'
						type='body-r'
						color={Colors.black}
						style={styles.rejectedValue}
					/>
				</View>

				{/* Start Date */}
				<View style={styles.rejectedDetailRow}>
					<Typography
						title='Start Date'
						type='body-sb'
						color={Colors.gray[600]}
						style={styles.rejectedLabel}
					/>
					<Typography
						title='20 Sept 2025'
						type='body-r'
						color={Colors.black}
						style={styles.rejectedValue}
					/>
				</View>

				{/* End Date */}
				<View style={styles.rejectedDetailRow}>
					<Typography
						title='End Date'
						type='body-sb'
						color={Colors.gray[600]}
						style={styles.rejectedLabel}
					/>
					<Typography
						title='15 Nov 2025'
						type='body-r'
						color={Colors.black}
						style={styles.rejectedValue}
					/>
				</View>
			</View>
		</View>
	);
};

const AssetStatusCard = ({ status }: { status: Status }) => {
	return (
		<View style={styles.container}>
			<View style={styles.assetStatusContainerView}>
				<Typography
					title={status}
					type='body-sb'
					color={getStatusColor(status)?.color}
					style={[
						styles.assetStatusContainer,
						{
							backgroundColor: getStatusColor(status)?.backgroundColor,
						},
					]}
				/>
			</View>
			<Pad size={scaleHeight(8)} />
			{status === "approved" && <ApprovedCard />}
			{status === "ongoing" && <OngoingCard />}
			{status === "denied" && <DeniedCard />}
			{status === "rejected" && <RejectedCard />}
		</View>
	);
};

export default AssetStatusCard;
