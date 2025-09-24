import { Button, IconButton, Typography } from "@components/Forms";
import { MainLayout, Row } from "@components/Layout";
import Pad from "@components/Pad";
import { TrustCirclePill } from "@components/UI";
import { Image, View } from "react-native";
import styles from "./styles";
import ComponentImages from "@assets/images/components";
import { StackScreenProps } from "@react-navigation/stack";
import { TrustCircleStackParamList } from "@navigation/types";

type MemberVerificationProps = StackScreenProps<
	TrustCircleStackParamList,
	"MemberVerification"
>;

export default function MemberVerification({
	navigation: { navigate },
}: MemberVerificationProps) {
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
			</View>
			<View style={styles.verifierContainer}>
				<TrustCirclePill
					icon={ComponentImages.kidashiMemberCard.memberIcon}
					title='Dorcas Danjuma'
				/>
			</View>
			<View style={styles.verifierContainer}>
				<TrustCirclePill
					icon={ComponentImages.kidashiMemberCard.memberIcon}
					title='Kande Ibrahim'
				/>
			</View>

			<Pad size={120} />

			<IconButton onPress={() => navigate("MemberAdditionSuccessScreen")}>
				<Row gap={8} alignItems='center' justifyContent='center'>
					<Typography title='Skip for now' />
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
