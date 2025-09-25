import { Button, IconButton, PinPad, Typography } from "@components/Forms";
import { MainLayout, Row } from "@components/Layout";
import Pad from "@components/Pad";
import { TrustCirclePill } from "@components/UI";
import { Image, View } from "react-native";
import styles from "./styles";
import ComponentImages from "@assets/images/components";
import { StackScreenProps } from "@react-navigation/stack";
import { TrustCircleStackParamList } from "@navigation/types";
import Colors from "@theme/Colors";
import { useState } from "react";

type MemberVerificationProps = StackScreenProps<
	TrustCircleStackParamList,
	"MemberVerification"
>;

export default function MemberVerification({
	navigation: { navigate },
}: MemberVerificationProps) {
	const [otp1, setOtp1] = useState<string>("");
	const [otp2, setOtp2] = useState<string>("");
	const [otp3, setOtp3] = useState<string>("");
	return (
		<MainLayout keyboardAvoidingType='scroll-view'>
			<Pad size={16} />

			<Typography title='Member Verification' type='heading-sb' />
			<Typography
				title='To confirm this new member, enter the OTP codes sent to 3 members of the trust circle. This step ensures that everyone is aware and in agreement'
				type='label-r'
			/>

			<Pad size={24} />

			<View style={styles.verifierContainer}>
				<TrustCirclePill
					icon={ComponentImages.kidashiMemberCard.memberIcon}
					title='Aisha Bello'
				/>

				<Pad />

				<PinPad pin={otp1} onInput={setOtp1} codeLength={6} error='' />
			</View>
			<View style={styles.verifierContainer}>
				<TrustCirclePill
					icon={ComponentImages.kidashiMemberCard.memberIcon}
					title='Dorcas Danjuma'
				/>

				<Pad />

				<PinPad pin={otp2} onInput={setOtp2} codeLength={6} error='' />
			</View>
			<View style={styles.verifierContainer}>
				<TrustCirclePill
					icon={ComponentImages.kidashiMemberCard.memberIcon}
					title='Kande Ibrahim'
				/>

				<Pad />

				<PinPad pin={otp3} onInput={setOtp3} codeLength={6} error='' />
			</View>

			<Pad size={120} />

			<IconButton onPress={() => navigate("MemberAdditionSuccessScreen")}>
				<Row gap={8} alignItems='center' justifyContent='center'>
					<Typography
						title='Skip for now'
						type='label-sb'
						color={Colors.primary["600"]}
					/>
					<Image
						source={ComponentImages.kidashiCard.arrowRight}
						style={styles.skipIcon}
					/>
				</Row>
			</IconButton>

			<Pad size={20} />

			<Button
				title='Continue'
				onPress={() => navigate("MemberAdditionSuccessScreen")}
			/>
		</MainLayout>
	);
}
