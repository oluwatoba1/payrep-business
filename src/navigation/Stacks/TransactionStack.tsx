import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {TransactionStackParamList} from '../types';
import {
  TransactionHistory,
  TransactionReceipt,
  Disputes,
} from '@screens/Private/Transactions';
import TransferStack from './TransferStack';
import BillsStack from './BillsStack';

const Stack = createNativeStackNavigator<TransactionStackParamList>();

export default function TransactionStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="TransactionHistory" component={TransactionHistory} />
      <Stack.Screen name="Disputes" component={Disputes} />
      <Stack.Screen name="TransactionReceipt" component={TransactionReceipt} />
      <Stack.Screen name="Bills" component={BillsStack} />
      <Stack.Screen name="Transfer" component={TransferStack} />
    </Stack.Navigator>
  );
}
