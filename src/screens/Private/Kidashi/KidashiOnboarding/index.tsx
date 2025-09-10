import { StackScreenProps } from "@react-navigation/stack";

import { Typography } from "@components/Forms";
import { MainLayout } from "@components/Layout";
import { KidashiStackParamList } from "@navigation/types";
import { KidashiOnboarder } from "@components/Miscellaneous";

type KidashiOnboardingProps = StackScreenProps<
	KidashiStackParamList,
	"KidashiOnboarding"
>;

export default function KidashiOnboarding({
	navigation: { navigate, goBack },
}: KidashiOnboardingProps) {
	return (
		<KidashiOnboarder
			onProceed={() => navigate("VendorInformation")}
			onCancel={goBack}
		/>
	);
}
