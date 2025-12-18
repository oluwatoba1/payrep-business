import { Image, ScrollView, View } from "react-native";
import React, { useMemo, useState, useEffect } from "react";
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
import { useGetRepaymentPlanMutation } from "@store/apis/loanApi";
import useToast from "@hooks/useToast";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { DEFAULT_ERROR_MESSAGE } from "@utils/Constants";
import { setRepaymentPlan } from "@store/slices/kidashiSlice";

type ReviewAssetRequestProps = StackScreenProps<
	MembersStackParamList,
	"RepaymentOverview"
>;

const RepaymentOverview = ({
	navigation: { navigate },
}: ReviewAssetRequestProps) => {
	const { showToast } = useToast();
	const dispatch = useAppDispatch();
	const [createAsset, { isLoading }] = useCreateAssetMutation();
	const [generateOtp] = useGenerateOtpMutation();
	const [getRepaymentPlan, { isLoading: isLoadingPlan }] =
		useGetRepaymentPlanMutation();

	const { vendor, memberDetails, assetRequest, repaymentPlan } = useAppSelector(
		(state) => state.kidashi
	);

	const [showOtpModal, setShowOtpModal] = useState(false);
	const [otp, setOtp] = useState<string>("");

	useEffect(() => {
		if (assetRequest.product_code && assetRequest.value) {
			fetchRepaymentPlan();
		}
	}, [assetRequest.product_code, assetRequest.value]);

	const fetchRepaymentPlan = async () => {
		try {
			const { status, message, data } = await getRepaymentPlan({
				product_code: assetRequest.product_code || "",
				amount: parseFloat(assetRequest.value || "0"),
			}).unwrap();

			if (status) {
				dispatch(setRepaymentPlan(data));
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

	// Calculate loan details from repayment plan
	const totalCost = useMemo(() => repaymentPlan?.amount || 0, [repaymentPlan]);

	const interestRatePercent = useMemo(
		() => repaymentPlan?.interest_rate || 0,
		[repaymentPlan]
	);

	const interestAmount = useMemo(
		() => repaymentPlan?.total_interest || 0,
		[repaymentPlan]
	);

	const totalPayable = useMemo(
		() => repaymentPlan?.total_repayable || 0,
		[repaymentPlan]
	);

	const tenor = useMemo(() => repaymentPlan?.tenor || 30, [repaymentPlan]);

	const repaymentCycle = useMemo(
		() => repaymentPlan?.repayment_cycle || "DAILY",
		[repaymentPlan]
	);

	const installmentAmount = useMemo(
		() => repaymentPlan?.repayment_amount || 0,
		[repaymentPlan]
	);

	const totalFees = useMemo(
		() => repaymentPlan?.total_fees || 0,
		[repaymentPlan]
	);

	const startDate = useMemo(() => new Date(), []);
	const endDate = useMemo(() => {
		const end = new Date();
		end.setDate(end.getDate() + tenor);
		return end;
	}, [tenor]);

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
				showToast("success", "OTP has been sent to member");
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
				woman_id: memberDetails?.id || "",
				value: assetRequest.value || "0",
				markup: String(repaymentPlan?.total_cost.toFixed(2) || 0),
				items_requested: assetRequest?.items_requested || [],
				product_code: assetRequest.product_code || "",
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
		} finally {
			setShowOtpModal(false);
			setOtp("");
		}
	};

	return (
		<SafeAreaWrapper
			title='Review Payment Terms'
			isLoading={isLoading || isLoadingPlan}
		>
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
						title='Please go through the repayment schedule, and cost. Confirm the terms before the request is submitted'
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
							title={`${formatCurrency(installmentAmount)} ${
								repaymentCycle === "DAILY"
									? "daily"
									: repaymentCycle === "WEEKLY"
									? "weekly"
									: "monthly"
							}`}
							type='body-b'
							color={Colors.gray["900"]}
						/>
						<Divider
							gapY={scaleHeight(16)}
							dividerColor={Colors.gray[300]}
							gapX={-20}
						/>
						<Typography title='Duration' type='body-sb' />
						<Typography
							title={`${tenor} ${
								repaymentPlan?.tenor_type?.toLowerCase() || "days"
							}`}
							type='body-b'
						/>
						<Divider
							gapY={scaleHeight(16)}
							dividerColor={Colors.gray[300]}
							gapX={-20}
						/>

						<View>
							<Typography title='Principal Amount' type='body-sb' />
							<Typography title={formatCurrency(totalCost)} type='body-b' />
						</View>
						<Pad size={scaleHeight(16)} />
						<View>
							<Typography title='Charges' type='body-sb' />
							<Typography
								title={formatCurrency(interestAmount)}
								type='body-b'
							/>
						</View>
						{totalFees > 0 && (
							<>
								<Pad size={scaleHeight(16)} />
								<View>
									<Typography title='Processing Fees' type='body-sb' />
									<Typography title={formatCurrency(totalFees)} type='body-b' />
								</View>
							</>
						)}
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
				handleResend={getOtp}
				phone={memberDetails?.mobile_number || ""}
			/>
		</SafeAreaWrapper>
	);
};

export default RepaymentOverview;
