import { View, Image, Pressable } from "react-native";
import React, { useMemo, useState } from "react";
import { ModalWrapper } from "@components/Modal";
import ScreenImages from "@assets/images/screens";
import { Button, PinPad, Typography } from "@components/Forms";
import { Row } from "@components/Layout";
import { styles } from "./style";
import Colors from "@theme/Colors";
import Divider from "@components/Miscellaneous/Divider";
import { scale, scaleHeight } from "@utils/Helpers";
import Pad from "@components/Pad";

interface AssetFinanceOtpProps {
	visible: boolean;
	onClose: () => void;
	onVerify: () => void;
	otp: string;
	setOtp: (otp: string) => void;
	phone: string;
}

const AssetFinanceOtp = ({
	visible,
	onClose,
	onVerify,
	otp,
	setOtp,
	phone,
}: AssetFinanceOtpProps) => {
	const maskedPhone = useMemo(() => {
		return `${phone.slice(0, 3)}**** ${phone.slice(-4)}`;
	}, []);

	const handleVerify = () => {
		onVerify();
		onClose();
	};

	const handleResend = () => {
		// TODO: call resend OTP API
	};

	return (
		<ModalWrapper visible={visible} onClose={onClose}>
			<Row justifyContent='flex-end'>
				<Pressable onPress={onClose} hitSlop={10}>
					<Image
						source={ScreenImages.kidashiMemberDetails.closeIcon}
						style={styles.closeIcon}
					/>
				</Pressable>
			</Row>

			<View style={styles.headerIconContainer}>
				<Image
					source={ScreenImages.kidashiMemberDetails.shieldIcon}
					style={styles.headerIcon}
				/>
			</View>

			<Typography title='Enter OTP' style={styles.title} />
			<Typography
				title='Ask member for OTP sent to them and enter it below to confirm verification'
				type='body-sr'
				style={styles.subtitle}
			/>

			<View style={styles.phoneContainer}>
				<Image
					source={ScreenImages.profileScreen.phoneLineIcon}
					style={styles.phoneIcon}
				/>
				<Typography title={maskedPhone} type='body-b' />
			</View>

			<Pad size={scaleHeight(8)} />

			<PinPad pin={otp} onInput={setOtp} codeLength={4} />

			<Pad size={scaleHeight(8)} />

			<Row justifyContent='center' gap={8}>
				<Pressable onPress={handleResend}>
					<Row gap={6}>
						<Typography
							title='Resend otp'
							type='body-sb'
							color={Colors.primary[600]}
						/>
						<Image
							source={ScreenImages.kidashiMemberDetails.resendIcon}
							style={styles.resendIcon}
						/>
					</Row>
				</Pressable>
			</Row>

			<Divider gapY={scaleHeight(8)} />

			<View style={styles.infoBox}>
				<Image
					source={ScreenImages.kidashiMemberDetails.infoIcon}
					style={styles.infoIcon}
				/>
				<Typography
					title='If you don’t have the OTP now, select Complete later to finish once you receive it'
					type='body-r'
					color={Colors.neutral[400]}
					style={{ flex: 1, fontSize: 12 }}
				/>
			</View>

			<Pad size={scaleHeight(12)} />

			{/* <Row gap={12}>
				<View style={{ flex: 1 }}>
					<Button
						title='Complete Later'
						color={Colors.gray["100"]}
						onPress={onClose}
					/>
				</View>
				<View style={{ flex: 1 }}>
					<Button
						title='Verify'
						onPress={handleVerify}
						disabled={otp.length !== 4}
					/>
				</View>
			</Row> */}
			<Button
				title='Verify'
				onPress={handleVerify}
				disabled={otp.length !== 4}
			/>
			<Pad size={10} />
		</ModalWrapper>
	);
};

export default AssetFinanceOtp;
