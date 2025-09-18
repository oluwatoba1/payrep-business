import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { MemberRegistrationStackParamList } from "../types";

const Stack = createNativeStackNavigator<MemberRegistrationStackParamList>();

export default function MemberRegistrationStack() {
	return (
		<Stack.Navigator
			screenOptions={{ headerShown: false }}
			initialRouteName='MemberPhoneNumber'
		>
			{/* <Stack.Screen name='VendorInformation' component={VendorInformation} />
			<Stack.Screen name='KidashiOnboarding' component={KidashiOnboarding} />
			<Stack.Screen name='VendorItems' component={VendorItems} />
			<Stack.Screen name='GuarantorDetails' component={GuarantorDetails} />
			<Stack.Screen name='ReviewDetails' component={ReviewDetails} />
			<Stack.Screen name='OnboardingSuccess' component={OnboardingSuccess} />
			<Stack.Screen name='OnboardingStatus' component={OnboardingStatus} /> */}

			{/* Add screeens for trust cycle */}
		</Stack.Navigator>
	);
}
