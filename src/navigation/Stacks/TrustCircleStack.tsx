import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { TrustCircleStackParamList } from "../types";
import {
	TrustCircles,
	TrustCircleDetails,
	CircleName,
	CreateTrustCircle,
} from "@screens/Private/Kidashi/KidashiTrustCircles";

const Stack = createNativeStackNavigator<TrustCircleStackParamList>();

export default function TrustCirclesStack() {
	return (
		<Stack.Navigator
			screenOptions={{ headerShown: false }}
			initialRouteName='TrustCircles'
		>
			<Stack.Screen name='TrustCircles' component={TrustCircles} />
			<Stack.Screen name='TrustCircleDetails' component={TrustCircleDetails} />
			<Stack.Screen name='CreateTrustCircle' component={CreateTrustCircle} />
			<Stack.Screen name='CircleName' component={CircleName} />
		</Stack.Navigator>
	);
}
