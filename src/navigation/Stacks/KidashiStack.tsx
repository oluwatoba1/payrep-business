import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import {KidashiOnboarding} from "@screens/Private/Kidashi";
import { KidashiStackParamList } from "../types";

const Stack = createNativeStackNavigator<KidashiStackParamList>();

export default function BillsStack() {
	return (
		<Stack.Navigator
			screenOptions={{ headerShown: false }}
			initialRouteName='KidashiOnboarding'
		>
			<Stack.Screen
				name='KidashiOnboarding'
				component={KidashiOnboarding}
			/>
		</Stack.Navigator>
	);
}
