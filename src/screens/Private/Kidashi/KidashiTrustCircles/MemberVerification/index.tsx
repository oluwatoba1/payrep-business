import { Typography } from "@components/Forms";
import { MainLayout } from "@components/Layout";
import Pad from "@components/Pad";

export default function MemberVerification() {
	return (
		<MainLayout>
			<Pad size={16} />

			<Typography title='Member Verification' type='heading-sb' />
			<Typography
				title='To confirm this new member, enter the OTP codes sent to 3 members of the trust circle. This step ensures that everyone is aware and in agreement'
				type='label-r'
			/>

			<Pad size={24} />
		</MainLayout>
	);
}
