import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { MoreStackParamList } from "../types";
import {
	AccountScreen,
	AddBankCardScreen,
	ListBankCardsScreen,
	Profile,
	ViewBankCardScreen,
	SecuritySettings,
	ResetTransactionScreen,
	ChangePassword,
	SupportScreen,
	NotificationScreen,
	DeactivateAccount,
	LinkPaymentMethodScreen,
	MoreSuccessMessageScreen,
	AccountTiers,
	ProofOfAddress,
	NINVerification,
	BusinessIncorporation,
	IdemnityAgreement,
	TerminalScreen,
	BillsPaymentNetworkScreen,
	CardPaymentNetworkScreen,
	BankTransferNetworkScreen,
	AirtimeDataNetworkScreen,
	NetworkHomeScreen,
	ListDisputesScreen,
	ViewDisputeScreen,
	AddAccount,
} from "../../screens/Private/More";
import KidashiStack from "./KidashiStack";

const Stack = createNativeStackNavigator<MoreStackParamList>();

export default function MoreStackNavigator() {
	return (
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name='Profile' component={Profile} />
			<Stack.Screen name='Account' component={AccountScreen} />
			<Stack.Screen name='ListBankCardScreen' component={ListBankCardsScreen} />
			<Stack.Screen name='ViewBankCardScreen' component={ViewBankCardScreen} />
			<Stack.Screen name='AddBankCardScreen' component={AddBankCardScreen} />
			<Stack.Screen name='AccountTiers' component={AccountTiers} />
			<Stack.Screen name='ProofOfAddress' component={ProofOfAddress} />
			<Stack.Screen name='NINVerification' component={NINVerification} />
			<Stack.Screen
				name='BusinessIncorporation'
				component={BusinessIncorporation}
			/>
			<Stack.Screen name='IdemnityAgreement' component={IdemnityAgreement} />
			<Stack.Screen
				name='LinkPaymentMethodScreen'
				component={LinkPaymentMethodScreen}
			/>
			<Stack.Screen name='SecuritySettings' component={SecuritySettings} />
			<Stack.Screen
				name='ResetTransactionScreen'
				component={ResetTransactionScreen}
			/>
			<Stack.Screen name='ChangePassword' component={ChangePassword} />
			<Stack.Screen name='SupportScreen' component={SupportScreen} />
			<Stack.Screen name='NotificationScreen' component={NotificationScreen} />
			<Stack.Screen name='DeactivateAccount' component={DeactivateAccount} />
			<Stack.Screen
				name='MoreSuccessMessageScreen'
				component={MoreSuccessMessageScreen}
			/>
			<Stack.Screen name='TerminalsScreen' component={TerminalScreen} />
			<Stack.Screen name='NetworkHomeScreen' component={NetworkHomeScreen} />
			<Stack.Screen
				name='AirtimeDataNetworkScreen'
				component={AirtimeDataNetworkScreen}
			/>
			<Stack.Screen
				name='BankTransferNetworkScreen'
				component={BankTransferNetworkScreen}
			/>
			<Stack.Screen
				name='CardPaymentNetworkScreen'
				component={CardPaymentNetworkScreen}
			/>
			<Stack.Screen
				name='BillsPaymentNetworkScreen'
				component={BillsPaymentNetworkScreen}
			/>
			<Stack.Screen name='ListDisputesScreen' component={ListDisputesScreen} />
			<Stack.Screen name='ViewDisputeScreen' component={ViewDisputeScreen} />
			<Stack.Screen name='AddAccount' component={AddAccount} />
			<Stack.Screen name='Kidashi' component={KidashiStack} />
		</Stack.Navigator>
	);
}
