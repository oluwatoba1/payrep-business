import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { MembersStackParamList } from "../types";
import { Members } from "@screens/Private/Kidashi/KidashiMembers";
import MemberDetails from "@screens/Private/Kidashi/KidashiMembers/MemberDetails";
import TransactionDetails from "@screens/Private/Kidashi/KidashiMembers/MemberDetails/TransactionDetails";
import AssetDetails from "@screens/Private/Kidashi/KidashiMembers/MemberDetails/Assets/AssetDetails";
import Assets from "@screens/Private/Kidashi/KidashiMembers/MemberDetails/Assets";
import EnterAssetInformation from "@screens/Private/Kidashi/KidashiMembers/MemberDetails/Assets/EnterAssetInformation";
import ReviewAssetRequest from "@screens/Private/Kidashi/KidashiMembers/MemberDetails/Assets/ReviewAssetRequest";
import RepaymentOverview from "@screens/Private/Kidashi/KidashiMembers/MemberDetails/Assets/RepaymentOverview";
import RequestSubmitted from "@screens/Private/Kidashi/KidashiMembers/MemberDetails/Assets/RequestSubmitted";

const Stack = createNativeStackNavigator<MembersStackParamList>();

export default function MembersStack() {
	return (
		<Stack.Navigator
			screenOptions={{ headerShown: false }}
			initialRouteName='Members'
		>
			<Stack.Screen name='Members' component={Members} />
			<Stack.Screen name='MemberDetails' component={MemberDetails} />
			<Stack.Screen name='TransactionDetails' component={TransactionDetails} />
			<Stack.Screen name='Assets' component={Assets} />
			<Stack.Screen name='AssetDetails' component={AssetDetails} />
			<Stack.Screen
				name='EnterAssetInformation'
				component={EnterAssetInformation}
			/>
			<Stack.Screen name='ReviewAssetRequest' component={ReviewAssetRequest} />
			<Stack.Screen name='RepaymentOverview' component={RepaymentOverview} />
			<Stack.Screen name='RequestSubmitted' component={RequestSubmitted} />
		</Stack.Navigator>
	);
}
