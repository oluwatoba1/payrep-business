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

// Helper functions for formatting
const formatCurrency = (amount: number): string => {
	return new Intl.NumberFormat("en-NG", {
		style: "currency",
		currency: "NGN",
		minimumFractionDigits: 0,
		maximumFractionDigits: 0,
	}).format(amount);
};

const formatDate = (dateString: string): string => {
	const date = new Date(dateString);
	return date.toLocaleDateString("en-GB", {
		day: "numeric",
		month: "short",
		year: "numeric",
	});
};

const calculateDuration = (startDate: string, endDate: string): string => {
	const start = new Date(startDate);
	const end = new Date(endDate);
	const diffTime = Math.abs(end.getTime() - start.getTime());
	const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

	if (diffDays < 30) {
		return `${diffDays} days`;
	} else if (diffDays < 365) {
		const months = Math.round(diffDays / 30);
		return `${months} month${months > 1 ? "s" : ""}`;
	} else {
		const years = Math.round(diffDays / 365);
		return `${years} year${years > 1 ? "s" : ""}`;
	}
};

const OngoingCard = ({ asset }: { asset: iAssetDetails | null }) => {
	const metrics = asset?.metrics;
	const progress = metrics?.repayment_progress || 0;
	const amountPaid = metrics?.amount_repaid || 0;
	const amountRemaining = metrics?.amount_unpaid || 0;
	// console.log({ asset });

	// Calculate total installments (assuming 14-day intervals)
	const totalDays = metrics
		? Math.ceil(
				(new Date(metrics.maturity_date).getTime() -
					new Date(metrics.disbursement_date).getTime()) /
					(1000 * 60 * 60 * 24)
		  )
		: 0;
	const totalInstallments = Math.ceil(totalDays / 14);
	const completedInstallments = Math.floor(
		(progress / 100) * totalInstallments
	);

	return (
		<View style={styles.ongoingCardContainer}>
			<View style={styles.ongoingCardProgressContainer}>
				<Row>
					<Typography title='Progress' type='body-r' style={styles.cardLabel} />
					<Typography
						title={
							metrics
								? `${completedInstallments} of ${totalInstallments}`
								: "N/A"
						}
						type='body-r'
						style={styles.cardLabel}
					/>
				</Row>
				<Pad size={scaleHeight(4)} />
				<ProgressBar
					color={Colors.cardColor.brown["200"]}
					progress={progress}
				/>
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
						title={metrics ? formatCurrency(amountPaid) : "N/A"}
						type='body-b'
						style={styles.cardAmount}
					/>
					<Typography
						title={metrics ? formatCurrency(amountRemaining) : "N/A"}
						type='body-r'
						style={styles.cardAmount}
					/>
				</Row>
			</View>
		</View>
	);
};

const ApprovedCard = ({ asset }: { asset: iAssetDetails | null }) => {
	const metrics = asset?.metrics;

	const duration = metrics
		? calculateDuration(metrics.disbursement_date, metrics.maturity_date)
		: "N/A";

	return (
		<View style={styles.approvedCardContainer}>
			<View style={styles.approvedCardHeaderContainer}>
				<Row>
					<Typography title='Schedule' type='body-r' style={styles.cardLabel} />
					<Typography
						title={`Duration: ${duration}`}
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
				<Typography title={"N/A"} type='body-r' style={styles.cardLabel2} />
			</View>
			<View style={styles.approvedCardDetailsContainer}>
				<Typography title='Start Date' type='body-r' style={styles.cardLabel} />
				<Typography
					title={
						metrics?.disbursement_date
							? formatDate(metrics.disbursement_date)
							: "N/A"
					}
					type='body-r'
					style={styles.cardLabel2}
				/>
			</View>
			<View style={styles.approvedCardDetailsContainer}>
				<Typography title='End Date' type='body-r' style={styles.cardLabel} />
				<Typography
					title={
						metrics?.maturity_date ? formatDate(metrics.maturity_date) : "N/A"
					}
					type='body-r'
					style={styles.cardLabel2}
				/>
			</View>
		</View>
	);
};

const DeniedCard = ({ asset }: { asset: iAssetDetails | null }) => {
	const assetData = asset?.asset;
	const rejectReason = assetData?.reject_reason || "N/A";

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
					title={rejectReason}
					type='body-r'
					color={Colors.gray[600]}
					style={styles.deniedMessage}
				/>
			</View>
		</View>
	);
};

const RejectedCard = ({ asset }: { asset: iAssetDetails | null }) => {
	const metrics = asset?.metrics;

	const duration = metrics
		? calculateDuration(metrics.disbursement_date, metrics.maturity_date)
		: "N/A";

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
						title={`Duration: ${duration}`}
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
						title={"N/A"}
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
						title={
							metrics?.disbursement_date
								? formatDate(metrics.disbursement_date)
								: "N/A"
						}
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
						title={
							metrics?.maturity_date ? formatDate(metrics.maturity_date) : "N/A"
						}
						type='body-r'
						color={Colors.black}
						style={styles.rejectedValue}
					/>
				</View>
			</View>
		</View>
	);
};

const AssetStatusCard = ({
	status,
	asset,
}: {
	status: AssetStatus;
	asset: iAssetDetails | null;
}) => {
	// console.log({ asset });
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
			{status === "APPROVED" && <ApprovedCard asset={asset} />}
			{status === "RUNNING" && <OngoingCard asset={asset} />}
			{status === "REJECTED" && <DeniedCard asset={asset} />}
			{status === "FAILED" && <RejectedCard asset={asset} />}
		</View>
	);
};

export default AssetStatusCard;
