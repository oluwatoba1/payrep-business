import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { KidashiHomeStackParamList } from "../types";
import { KidashiDashboard } from "@screens/Private/Kidashi/KidashiHome";
import MemberRegistrationStack from "./MemberRegistration";
import KidashiRegistrationStack from "./KidashiRegistrationStack";
import NotificationIndex from "@screens/Private/Kidashi/KidashiNotifications";
import KidashiNotificationDetails from "@screens/Private/Kidashi/KidashiNotifications/Details";

const Stack = createNativeStackNavigator<KidashiHomeStackParamList>();

export default function HomeStack() {
	return (
		<Stack.Navigator
			screenOptions={{ headerShown: false }}
			initialRouteName='KidashiDashboard'
		>
			<Stack.Screen name='KidashiDashboard' component={KidashiDashboard} />
			<Stack.Screen
				name='KidashiRegistration'
				component={KidashiRegistrationStack}
			/>
			<Stack.Screen
				name='MemberRegistration'
				component={MemberRegistrationStack}
			/>
			<Stack.Screen name='KidashiNotifications' component={NotificationIndex} />
			<Stack.Screen
				name='KidashiNotificationDetails'
				component={KidashiNotificationDetails}
				options={{ presentation: "modal" }}
			/>
		</Stack.Navigator>
	);
}
