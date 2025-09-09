import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {TransferStackParamList} from '../types';

import {
  BankTransfer,
  ConfirmTransaction,
  FundWallet,
  PayrepBankTransfer,
  TransactionSuccess,
  TransactionReceipt,
} from '@screens/Private/Transactions/Transfer';

const Stack = createNativeStackNavigator<TransferStackParamList>();

export default function TransferStack() {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="BankTransfer">
      <Stack.Screen name="BankTransfer" component={BankTransfer} />
      <Stack.Screen name="FundWallet" component={FundWallet} />
      <Stack.Screen name="PayrepBankTransfer" component={PayrepBankTransfer} />
      <Stack.Screen name="ConfirmTransaction" component={ConfirmTransaction} />
      <Stack.Screen name="TransactionSuccess" component={TransactionSuccess} />
      <Stack.Screen name="TransactionReceipt" component={TransactionReceipt} />
    </Stack.Navigator>
  );
}
