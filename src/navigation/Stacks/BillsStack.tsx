import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {BillsStackParamList} from '../types';
import {
  AirtimeForm,
  BillReceipt,
  BillsCategories,
  BillsServices,
  BillSuccess,
  CableForm,
  DataForm,
  ElectricityForm,
  ConfirmBills,
} from '@screens/Private/Transactions/Bills';

const Stack = createNativeStackNavigator<BillsStackParamList>();

export default function BillsStack() {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="BillsCategories">
      <Stack.Screen name="BillsCategories" component={BillsCategories} />
      <Stack.Screen name="BillsServices" component={BillsServices} />
      <Stack.Screen name="AirtimeForm" component={AirtimeForm} />
      <Stack.Screen name="CableForm" component={CableForm} />
      <Stack.Screen name="DataForm" component={DataForm} />
      <Stack.Screen name="ElectricityForm" component={ElectricityForm} />
      <Stack.Screen name="ConfirmBills" component={ConfirmBills} />
      <Stack.Screen name="BillSuccess" component={BillSuccess} />
      <Stack.Screen name="BillReceipt" component={BillReceipt} />
    </Stack.Navigator>
  );
}
