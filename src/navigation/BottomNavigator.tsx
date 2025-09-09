import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {BottomTabParamList} from './types';
import {BottomTabBar} from '../components';
import {
  HomeStack,
  TransactionStack,
  MoreStack,
  SupportStack,
  SavingsStack,
} from './Stacks';

const Tab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      tabBar={props => <BottomTabBar {...props} />}
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}>
      <Tab.Screen name="Savings" component={SavingsStack} />
      <Tab.Screen name="History" component={TransactionStack} />
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Support" component={SupportStack} />
      <Tab.Screen name="More" component={MoreStack} />
    </Tab.Navigator>
  );
}
