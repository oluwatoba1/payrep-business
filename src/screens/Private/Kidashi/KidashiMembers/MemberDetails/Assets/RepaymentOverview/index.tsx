import { Image, ScrollView, View } from "react-native";
import React, { useMemo, useState } from "react";
import SafeAreaWrapper from "@components/Layout/SafeAreaWrapper";
import { Button, Typography } from "@components/Forms";
import { MainLayout, Row } from "@components/Layout";
import { styles } from "./style";
import Colors from "@theme/Colors";
import { scale, scaleHeight } from "@utils/Helpers";
import Divider from "@components/Miscellaneous/Divider";
import ScreenImages from "@assets/images/screens";
import Pad from "@components/Pad";
import AssetFinanceOtp from "@components/UI/MemberDetails/Assets/AssetFinanceOtp";
import { MembersStackParamList } from "@navigation/types";
import { StackScreenProps } from "@react-navigation/stack";
import {
	useCreateAssetMutation,
	useGenerateOtpMutation,
} from "@store/apis/kidashiApi";
import useToast from "@hooks/useToast";
import { useAppSelector } from "@store/hooks";
import { DEFAULT_ERROR_MESSAGE } from "@utils/Constants";

type ReviewAssetRequestProps = StackScreenProps<
	MembersStackParamList,
	"RepaymentOverview"
>;

const RepaymentOverview = ({
	navigation: { navigate },
}: ReviewAssetRequestProps) => {
	const { showToast } = useToast();
	const [createAsset, { isLoading }] = useCreateAssetMutation();
	const [generateOtp] = useGenerateOtpMutation();

	const { vendor, memberDetails, assetRequest } = useAppSelector(
		(state) => state.kidashi
	);

	console.log("====>>>", vendor);

	const [showOtpModal, setShowOtpModal] = useState(false);
	const [otp, setOtp] = useState<string>("");

	const totalCost = 46000;
	const interestRatePercent = 5;
	const interestAmount = 1380;
	const totalPayable = totalCost + interestAmount;

	const installmentFrequencyDays = 14;
	const installmentAmount = 5250;

	const startDate = useMemo(() => new Date(2025, 8, 20), []);
	const endDate = useMemo(() => new Date(2025, 9, 31), []);
	const installment1Date = useMemo(() => new Date(2025, 9, 4), []);
	const installment2Date = useMemo(() => new Date(2025, 9, 18), []);

	const formatDate = (date: Date) =>
		date.toLocaleDateString("en-GB", {
			day: "2-digit",
			month: "short",
			year: "numeric",
		});

	const formatCurrency = (amount: number) => {
		return `₦ ${amount.toLocaleString("en-NG", {
			minimumFractionDigits: 2,
			maximumFractionDigits: 2,
		})}`;
	};

	const getOtp = async () => {
		try {
			const { status, message } = await generateOtp({
				purpose: "ASSET_REQUEST",
				recipient: memberDetails?.mobile_number || "",
				subject_id: vendor?.id || "",
				channel: "sms",
			}).unwrap();
			if (status) {
				navigate("RequestSubmitted");
			} else {
				showToast("danger", message);
			}
		} catch (error: ErrorResponse | any) {
			showToast(
				"danger",
				error.data?.message || error.message || DEFAULT_ERROR_MESSAGE
			);
		}
	};

	const submit = async () => {
		try {
			const { status, message } = await createAsset({
				vendor_id: vendor?.id || "",
				woman_id: memberDetails?.woman_id || "",
				loan_product_id: "9c9628ed-bdb1-40f2-a216-ea6b871f7d75",
				value: assetRequest.value || "0",
				markup: String(
					(interestRatePercent / 100) * Number(assetRequest.value || "0")
				),
				items_requested: assetRequest?.items_requested || [],
				otp,
			}).unwrap();
			if (status) {
				navigate("RequestSubmitted");
			} else {
				showToast("danger", message);
			}
		} catch (error: ErrorResponse | any) {
			showToast(
				"danger",
				error.data?.message || error.message || DEFAULT_ERROR_MESSAGE
			);
		}
	};

	return (
		<MainLayout rightTitle='Review Payment Terms' isLoading={isLoading}>
			<ScrollView>
				<View>
					<View style={styles.boxIconContainer}>
						<Image
							source={ScreenImages.kidashiMemberDetails.boxIcon}
							style={styles.boxIcon}
						/>
					</View>
					<Typography title='Review Payment Terms' style={styles.screenTitle} />
					<Typography
						title='Please go through the repayment schedule, cost, and interest carefully. Confirm the terms before the request is submitted'
						type='body-sr'
						style={styles.screenSubTitle}
					/>
				</View>

				<Divider gapY={scaleHeight(8)} gapX={-20} />

				<View style={styles.scheduleCard}>
					<View style={styles.scheduleCardHeader}>
						<Typography
							title='Schedule'
							type='body-sb'
							style={styles.sectionTitle}
						/>
					</View>

					<View style={styles.cardInner}>
						<Typography title='Repayment Plan' type='body-sb' />
						<Typography
							title={`${formatCurrency(
								installmentAmount
							)} every ${installmentFrequencyDays} days (includes ${interestRatePercent}% interest)`}
							type='body-b'
							color={Colors.gray["900"]}
						/>
						<Divider
							gapY={scaleHeight(16)}
							dividerColor={Colors.gray[300]}
							gapX={-20}
						/>
						<Typography title='Duration' type='body-sb' />
						<Typography title='1 Month' type='body-b' />
						<Divider gapY={scaleHeight(16)} />
						<Row justifyContent='space-between'>
							<View style={{ flex: 1 }}>
								<Typography title='Start Date' type='body-sb' />
								<Typography title={formatDate(startDate)} type='body-b' />
							</View>
							<View style={{ width: scale(16) }} />
							<View style={{ flex: 1 }}>
								<Typography title='End Date' type='body-sb' />
								<Typography title={formatDate(endDate)} type='body-b' />
							</View>
						</Row>
						<Divider
							gapY={scaleHeight(16)}
							dividerColor={Colors.gray[300]}
							gapX={-20}
						/>
						<Typography title='Payment Dates' type='body-sb' />
						<Row justifyContent='space-between'>
							<View style={{ flex: 1 }}>
								<Typography title='Installment #1' type='label-r' />
								<Typography
									title={formatDate(installment1Date)}
									type='body-b'
								/>
							</View>
							<View style={{ width: scale(16) }} />
							<View style={{ flex: 1 }}>
								<Typography title='Installment #2' type='label-r' />
								<Typography
									title={formatDate(installment2Date)}
									type='body-b'
								/>
							</View>
						</Row>
						<Divider
							gapY={scaleHeight(16)}
							dividerColor={Colors.gray[300]}
							gapX={-20}
						/>
						<View>
							<Typography title='Total Cost' type='body-sb' />
							<Typography title={formatCurrency(totalCost)} type='body-b' />
						</View>
						<Pad size={scaleHeight(16)} />
						<View>
							<Typography
								title={`Interest (${interestRatePercent}%)`}
								type='body-sb'
							/>
							<Typography
								title={formatCurrency(interestAmount)}
								type='body-b'
							/>
						</View>
					</View>
					<View style={styles.scheduleCardHeader}>
						<Typography title='Total Payable' type='body-sb' />
						<Typography title={formatCurrency(totalPayable)} type='body-b' />
					</View>
				</View>
			</ScrollView>
			<Divider gapY={scaleHeight(16)} gapX={scale(-16)} />
			<Button
				title='Agree & Continue'
				onPress={() => [setShowOtpModal(true), getOtp()]}
			/>
			<AssetFinanceOtp
				visible={showOtpModal}
				onClose={() => setShowOtpModal(false)}
				onVerify={submit}
				otp={otp}
				setOtp={setOtp}
			/>
		</MainLayout>
	);
};

export default RepaymentOverview;
