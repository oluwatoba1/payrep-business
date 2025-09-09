import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import {
	KidashiOnboarding,
	VendorInformation,
	VendorItems,
} from "@screens/Private/Kidashi";
import { KidashiStackParamList } from "../types";

const Stack = createNativeStackNavigator<KidashiStackParamList>();

export default function BillsStack() {
	return (
		<Stack.Navigator
			screenOptions={{ headerShown: false }}
			initialRouteName='KidashiOnboarding'
		>
			<Stack.Screen name='KidashiOnboarding' component={KidashiOnboarding} />
			<Stack.Screen name='VendorInformation' component={VendorInformation} />
			<Stack.Screen name='VendorItems' component={VendorItems} />
		</Stack.Navigator>
	);
}
