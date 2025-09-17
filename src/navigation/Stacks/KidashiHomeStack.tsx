import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { KidashiHomeStackParamList } from "../types";
import { KidashiDashboard } from "@screens/Private/Kidashi/KidashiHome";
import CreateTrustCircles from "@screens/Private/Kidashi/CreateTrustCircles";
import CircleName from "@screens/Private/Kidashi/CreateTrustCircles/CircleName";

const Stack = createNativeStackNavigator<KidashiHomeStackParamList>();

export default function HomeStack() {
	return (
		<Stack.Navigator
			screenOptions={{ headerShown: false }}
			initialRouteName='KidashiDashboard'
		>
			<Stack.Screen name='KidashiDashboard' component={KidashiDashboard} />
			<Stack.Screen name='CreateTrustCircles' component={CreateTrustCircles} />
			<Stack.Screen name='CircleName' component={CircleName} />
		</Stack.Navigator>
	);
}
