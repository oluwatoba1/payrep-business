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
} from "@screens/Private/Kidashi";
import { KidashiStackParamList } from "../types";
import CreateTrustCircles from "@screens/Private/Kidashi/CreateTrustCircles";
import CircleName from "@screens/Private/Kidashi/CreateTrustCircles/CircleName";

const Stack = createNativeStackNavigator<KidashiStackParamList>();

export default function KidashiStack() {
	return (
		<Stack.Navigator
			screenOptions={{ headerShown: false }}
			initialRouteName='OnboardingStatus'
		>
			<Stack.Screen name='VendorInformation' component={VendorInformation} />
			<Stack.Screen name='KidashiOnboarding' component={KidashiOnboarding} />
			<Stack.Screen name='VendorItems' component={VendorItems} />
			<Stack.Screen name='GuarantorDetails' component={GuarantorDetails} />
			<Stack.Screen name='ReviewDetails' component={ReviewDetails} />
			<Stack.Screen name='OnboardingSuccess' component={OnboardingSuccess} />
			<Stack.Screen name='OnboardingStatus' component={OnboardingStatus} />
			<Stack.Screen name='CreateTrustCircles' component={CreateTrustCircles} />
			<Stack.Screen name='CircleName' component={CircleName} />
			{/* Add screeens for trust cycle */}
		</Stack.Navigator>
	);
}
