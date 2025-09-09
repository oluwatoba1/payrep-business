import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {SupportStackParamList} from '../types';
import SupportScreen from '../../screens/Private/Support';

const Stack = createNativeStackNavigator<SupportStackParamList>();

export default function SupportStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="SupportScreen" component={SupportScreen} />
    </Stack.Navigator>
  );
}
