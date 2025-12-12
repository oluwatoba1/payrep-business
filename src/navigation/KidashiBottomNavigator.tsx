import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { KidashiBottomTabParamList } from "./types";
import { KidashiHomeStack, TrustCircleStack, MemberStack } from "./Stacks";
import KidashiBottomTabBar from "@components/KidashiBottomTabBar";

const Tab = createBottomTabNavigator<KidashiBottomTabParamList>();

export default function KidashiBottomTabNavigator() {
	return (
		<Tab.Navigator
			tabBar={(props) => <KidashiBottomTabBar {...props} />}
			screenOptions={{
				headerShown: false,
			}}
		>
			<Tab.Screen name='KidashiHome' component={KidashiHomeStack} />
			<Tab.Screen name='Trust Circles' component={TrustCircleStack} />
			<Tab.Screen name='KidashiMembers' component={MemberStack} />
		</Tab.Navigator>
	);
}
