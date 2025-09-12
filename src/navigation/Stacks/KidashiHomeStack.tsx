import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { KidashiHomeStackParamList } from "../types";
import { KidashiDashboard } from "@screens/Private/Kidashi/KidashiHome";

const Stack = createNativeStackNavigator<KidashiHomeStackParamList>();

export default function HomeStack() {
	return (
		<Stack.Navigator
			screenOptions={{ headerShown: false }}
			initialRouteName='KidashiDashboard'
		>
			<Stack.Screen name='KidashiDashboard' component={KidashiDashboard} />
		</Stack.Navigator>
	);
}
