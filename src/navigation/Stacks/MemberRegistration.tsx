import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { MemberRegistrationStackParamList } from "../types";
import {
	MemberPhoneNumber,
	MemberPhoneNumberVerification,
	MemberEmail,
	MemberEmailVerification,
	MemberFaceCaptureVerification,
	MemberLocationDetails,
	MemberMeansOfIdentification,
	MemberMeansOfVerification,
	MemberPep,
	MemberPersonalInformation,
	MemberSourceOfIncome,
	MemberAttestation,
	MemberSuccessScreen,
} from "@screens/Private/Kidashi/KidashiHome/MemberRegistration";

const Stack = createNativeStackNavigator<MemberRegistrationStackParamList>();

export default function MemberRegistrationStack() {
	return (
		<Stack.Navigator
			screenOptions={{ headerShown: false }}
			initialRouteName='MemberPhoneNumber'
		>
			<Stack.Screen name='MemberPhoneNumber' component={MemberPhoneNumber} />
			<Stack.Screen
				name='MemberPhoneNumberVerification'
				component={MemberPhoneNumberVerification}
			/>
			<Stack.Screen name='MemberEmail' component={MemberEmail} />
			<Stack.Screen
				name='MemberEmailVerification'
				component={MemberEmailVerification}
			/>
			<Stack.Screen
				name='MemberMeansOfVerification'
				component={MemberMeansOfVerification}
			/>
			<Stack.Screen
				name='MemberFaceCaptureVerification'
				component={MemberFaceCaptureVerification}
			/>
			<Stack.Screen
				name='MemberPersonalInformation'
				component={MemberPersonalInformation}
			/>
			<Stack.Screen
				name='MemberLocationDetails'
				component={MemberLocationDetails}
			/>
			<Stack.Screen
				name='MemberMeansOfIdentification'
				component={MemberMeansOfIdentification}
			/>
			<Stack.Screen name='MemberPep' component={MemberPep} />
			<Stack.Screen
				name='MemberSourceOfIncome'
				component={MemberSourceOfIncome}
			/>
			<Stack.Screen name='MemberAttestation' component={MemberAttestation} />
			<Stack.Screen
				name='MemberSuccessScreen'
				component={MemberSuccessScreen}
			/>
		</Stack.Navigator>
	);
}
