import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { KidashiHomeStackParamList } from "../types";
import { KidashiDashboard } from "@screens/Private/Kidashi/KidashiHome";
import MemberRegistrationStack from "./MemberRegistration";
import KidashiRegistrationStack from "./KidashiRegistrationStack";
import NotificationIndex from "@screens/Private/Kidashi/KidashiNotifications";
import KidashiNotificationDetails from "@screens/Private/Kidashi/KidashiNotifications/Details";
import {
	TransferAccountNumber,
	TransferAmount,
	TransferConfirmation,
	TransferDetails,
	TransferSuccess,
} from "@screens/Private/Kidashi/KidashiHome/Transfer";
import AssetDetails from "@screens/Private/Kidashi/KidashiMembers/MemberDetails/Assets/AssetDetails";
import VendorAssets from "@screens/Private/Kidashi/KidashiHome/VendorAssetList";

const Stack = createNativeStackNavigator<KidashiHomeStackParamList>();

export default function HomeStack() {
	return (
		<Stack.Navigator
			screenOptions={{ headerShown: false }}
			initialRouteName='KidashiDashboard'
		>
			<Stack.Screen name='KidashiDashboard' component={KidashiDashboard} />
			<Stack.Screen
				name='TransferAccountNumber'
				component={TransferAccountNumber}
			/>
			<Stack.Screen name='TransferAmount' component={TransferAmount} />
			<Stack.Screen
				name='TransferConfirmation'
				component={TransferConfirmation}
			/>
			<Stack.Screen name='TransferSuccess' component={TransferSuccess} />
			<Stack.Screen name='TransferDetails' component={TransferDetails} />
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
			<Stack.Screen name="VendorAssets" component={VendorAssets} />
			<Stack.Screen name="AssetDetails" component={AssetDetails} />

		</Stack.Navigator>
	);
}
