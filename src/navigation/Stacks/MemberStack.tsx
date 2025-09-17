import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { MembersStackParamList } from "../types";
import { Members } from "@screens/Private/Kidashi/KidashiMembers";
import MemberDetails from "@screens/Private/Kidashi/KidashiMembers/MemberDetails";

const Stack = createNativeStackNavigator<MembersStackParamList>();

export default function MembersStack() {
	return (
		<Stack.Navigator
			screenOptions={{ headerShown: false }}
			initialRouteName='Members'
		>
			<Stack.Screen name='Members' component={Members} />
			<Stack.Screen name='MemberDetails' component={MemberDetails} />
		</Stack.Navigator>
	);
}
