import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { KidashiBottomTabParamList } from "./types";
import { BottomTabBar } from "../components";
import { KidashiHomeStack } from "./Stacks";

const Tab = createBottomTabNavigator<KidashiBottomTabParamList>();

export default function BottomTabNavigator() {
	return (
		<Tab.Navigator
			tabBar={(props) => <BottomTabBar {...props} />}
			initialRouteName='KidashiHome'
			screenOptions={{
				headerShown: false,
			}}
		>
			<Tab.Screen name='KidashiHome' component={KidashiHomeStack} />
		</Tab.Navigator>
	);
}
