import React, { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useNavigationState } from "@react-navigation/native";

import { HomeStackParamList } from "../types";
import {
	Dashboard,
	Earnings,
	Cashout,
	CashoutConfirmation,
	Notifications,
} from "@screens/Private/Home";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import useToast from "@hooks/useToast";
import { useFetchCustomerDetailsQuery } from "@store/apis/customerApi";
import { setCustomerDetails } from "@store/slices/customerSlice";
import KidashiStack from "./KidashiRegistrationStack";
import KidashiBottomTabNavigator from "@navigation/KidashiBottomNavigator";

const Stack = createNativeStackNavigator<HomeStackParamList>();

export default function HomeStack() {
	const dispatch = useAppDispatch();
	const customer = useAppSelector((state) => state.customer) || {};
	const { showToast } = useToast();
	const screenState = useNavigationState((state) => state);

	const {
		currentData: customerResponse,
		refetch: refetchCustomerDetails,
	}: any = useFetchCustomerDetailsQuery();

	useEffect(() => {
		refetchCustomerDetails();
	}, [screenState]);

	useEffect(() => {
		if (customerResponse) {
			!customerResponse.error
				? dispatch(
						setCustomerDetails({ ...customer, ...customerResponse.data })
				  )
				: showToast("danger", "Unable to fetch customer information");
		}
	}, [customerResponse]);
	return (
		<Stack.Navigator
			screenOptions={{ headerShown: false }}
			initialRouteName='Dashboard'
		>
			<Stack.Screen name='Dashboard' component={Dashboard} />
			<Stack.Screen name='Notifications' component={Notifications} />
			<Stack.Screen name='Earnings' component={Earnings} />
			<Stack.Screen name='Cashout' component={Cashout} />
			<Stack.Screen
				name='CashoutConfirmation'
				component={CashoutConfirmation}
			/>
			<Stack.Screen name='KidashiRegistration' component={KidashiStack} />
			<Stack.Screen
				name='KidashiBottomTabs'
				component={KidashiBottomTabNavigator}
				options={{ headerShown: false }}
			/>
		</Stack.Navigator>
	);
}
