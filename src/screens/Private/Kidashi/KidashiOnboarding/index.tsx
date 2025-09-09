import { StackScreenProps } from "@react-navigation/stack";

import { Typography } from "@components/Forms";
import { MainLayout } from "@components/Layout";
import { KidashiStackParamList } from "@navigation/types";

type KidashiOnboardingProps = StackScreenProps<
	KidashiStackParamList,
	"KidashiOnboarding"
>;

export default function KidashiOnboarding({
	navigation: { navigate, goBack },
}: KidashiOnboardingProps) {
	return (
		<MainLayout>
			<Typography title='Kidashi Onboarding Screen' />
		</MainLayout>
	);
}
