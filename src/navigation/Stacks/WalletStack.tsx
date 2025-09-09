import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeStackParamList} from '../types';
import {
  AirtimeScreen,
  BankTransferScreen,
  BillPaymentScreen,
  ConfirmTransactionScreen,
  CableSubscriptionScreen,
  FundWalletScreen,
  CableProviderScreen,
  ElectricityBillsProvider,
  ElectricityBills,
  DataBills,
} from '@screens/Private/Home';
import WalletHome from '@screens/Private/Wallet/WalletHome';

const Stack = createNativeStackNavigator<HomeStackParamList>();

export default function WalletStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="BillPaymentScreen" component={BillPaymentScreen} />
      <Stack.Screen name="WalletHomeScreen" component={WalletHome} />
      <Stack.Screen name="FundWalletScreen" component={FundWalletScreen} />
      <Stack.Screen name="BankTransferScreen" component={BankTransferScreen} />
      <Stack.Screen
        name="ConfirmTransactionScreen"
        component={ConfirmTransactionScreen}
      />
      <Stack.Screen name="AirtimeScreen" component={AirtimeScreen} />
      <Stack.Screen name="DataScreen" component={DataBills} />
      <Stack.Screen
        name="CableTVSubscriptionScreen"
        component={CableSubscriptionScreen}
      />
      <Stack.Screen
        name="CableTVProviderScreen"
        component={CableProviderScreen}
      />
      <Stack.Screen
        name="ElectrictySubscriptionScreen"
        component={ElectricityBills}
      />
      <Stack.Screen
        name="ElectricityProviderScreen"
        component={ElectricityBillsProvider}
      />
    </Stack.Navigator>
  );
}
