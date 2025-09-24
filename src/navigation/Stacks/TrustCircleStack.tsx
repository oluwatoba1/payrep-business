import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { TrustCircleStackParamList } from "../types";
import {
	TrustCircles,
	TrustCircleDetails,
	CircleName,
	CreateTrustCircle,
	EnterAccountNumber,
	SelectVerifiers,
	MemberVerification,
	MemberAdditionSuccessScreen,
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
			<Stack.Screen name='EnterAccountNumber' component={EnterAccountNumber} />
			<Stack.Screen name='SelectVerifiers' component={SelectVerifiers} />
			<Stack.Screen name='MemberVerification' component={MemberVerification} />
			<Stack.Screen
				name='MemberAdditionSuccessScreen'
				component={MemberAdditionSuccessScreen}
			/>
		</Stack.Navigator>
	);
}
