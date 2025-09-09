import React from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { SuccessMessage } from '../../../../components';
import { MoreStackParamList, SavingsStackParamList } from '../../../../navigation/types';



type SuccessMessageScreenNavigationProp = StackNavigationProp<MoreStackParamList, "MoreSuccessMessageScreen">;

type SuccessMessageScreenRouteProp = RouteProp<MoreStackParamList, "MoreSuccessMessageScreen">;

interface MoreSuccessScreenProps {
  navigation: SuccessMessageScreenNavigationProp;
  route: SuccessMessageScreenRouteProp;
}

export default function MoreSuccessMessageScreen({ navigation, route }: MoreSuccessScreenProps) {
  const { title, subTitle, logo } = route.params;

  const handleNavigation = () => {
    navigation.navigate("ListBankCardScreen");
  };

  return <SuccessMessage successLogo={logo} title={title} subTitle={subTitle} onButtonPress={handleNavigation} buttonTitle='Process to Home'/>;
}
