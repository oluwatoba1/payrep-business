import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import {
	KidashiOnboarding,
	VendorInformation,
	VendorItems,
	GuarantorDetails,
	ReviewDetails,
	OnboardingSuccess,
	OnboardingStatus,
} from "@screens/Private/Kidashi/VendorRegistration";
import { KidashiRegistrationStackParamList } from "../types";
import { useAppSelector } from "@store/hooks";

const Stack = createNativeStackNavigator<KidashiRegistrationStackParamList>();

export default function KidashiRegistrationStack() {
	const vendor = useAppSelector((state) => state.kidashi.vendor);
	return (
		<Stack.Navigator
			screenOptions={{ headerShown: false }}
			// TODO: remove this comment
			// initialRouteName={!vendor ? "KidashiOnboarding" : "OnboardingStatus"}
			initialRouteName={"KidashiOnboarding"}
		>
			<Stack.Screen name='VendorInformation' component={VendorInformation} />
			<Stack.Screen name='KidashiOnboarding' component={KidashiOnboarding} />
			<Stack.Screen name='VendorItems' component={VendorItems} />
			<Stack.Screen name='GuarantorDetails' component={GuarantorDetails} />
			<Stack.Screen name='ReviewDetails' component={ReviewDetails} />
			<Stack.Screen name='OnboardingSuccess' component={OnboardingSuccess} />
			<Stack.Screen name='OnboardingStatus' component={OnboardingStatus} />

			{/* Add screeens for trust cycle */}
		</Stack.Navigator>
	);
}
