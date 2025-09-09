import React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

import { SavingsStackParamList } from '../../../../navigation/types';
import { SuccessMessage } from '@components/Miscellaneous';



type SuccessMessageScreenNavigationProp = StackNavigationProp<SavingsStackParamList, "SavingsSuccessMessageScreen">;

type SuccessMessageScreenRouteProp = RouteProp<SavingsStackParamList, "SavingsSuccessMessageScreen">;

interface SavingsSuccessScreenProps {
  navigation: SuccessMessageScreenNavigationProp;
  route: SuccessMessageScreenRouteProp;
}

export default function SuccessMessageScreen({ navigation, route }: SavingsSuccessScreenProps) {
  const { title, subTitle } = route.params;


  const handleReceipt = () => {
    navigation.navigate('SavingsReceiptScreen', {
      id: '012883778272993939393930090',
      type: 'credit',
      source: 'SourceAccount',
      destination: 'DestinationAccount',
      date: '18/12/2023',
      status: 'successful',
      amount: '22000',
    })
    
  }

  const handleNavigation = () => {
    navigation.navigate("SavingsScreen");
  };

  return <SuccessMessage title={title} subTitle={subTitle} onButtonPress={handleNavigation} showReceiptButton onReceiptPress={handleReceipt}/>;
}
