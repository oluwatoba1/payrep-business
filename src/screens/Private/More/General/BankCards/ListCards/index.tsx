import {useCallback} from 'react';
import {BackHandler} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {useFocusEffect} from '@react-navigation/native';

import {Button, Typography} from '@components/Forms';
import {MainLayout, Row} from '@components/Layout';
import {BankCard} from '@components/Cards';
import {MoreStackParamList} from '@navigation/types';
import Pad from '@components/Pad';

type LinkPaymentMethodScreenProps = StackScreenProps<
  MoreStackParamList,
  'ListBankCardScreen'
>;

export default function ListBankCardScreen({
  navigation: {navigate},
}: LinkPaymentMethodScreenProps) {
  const CARDS: {
    cardType: 'MASTERCARD' | 'VERVE' | 'VISA';
    cardHolderName: string;
    cardHolderNumber: string;
  }[] = [
    {
      cardType: 'MASTERCARD',
      cardHolderName: 'Musa Abdullahi Omeiza',
      cardHolderNumber: '**** **** **** 1234',
    },
    {
      cardType: 'MASTERCARD',
      cardHolderName: 'Musa Abdullahi Omeiza',
      cardHolderNumber: '**** **** **** 1234',
    },
    {
      cardType: 'MASTERCARD',
      cardHolderName: 'Musa Abdullahi Omeiza',
      cardHolderNumber: '**** **** **** 1234',
    },
    {
      cardType: 'MASTERCARD',
      cardHolderName: 'Musa Abdullahi Omeiza',
      cardHolderNumber: '**** **** **** 1234',
    },
    {
      cardType: 'MASTERCARD',
      cardHolderName: 'Musa Abdullahi Omeiza',
      cardHolderNumber: '**** **** **** 1234',
    },
    {
      cardType: 'MASTERCARD',
      cardHolderName: 'Musa Abdullahi Omeiza',
      cardHolderNumber: '**** **** **** 1234',
    },
    {
      cardType: 'VERVE',
      cardHolderName: 'Musa Abdullahi Omeiza',
      cardHolderNumber: '**** **** **** 1234',
    },
  ];

  const handleScreenNav = () => {
    navigate('LinkPaymentMethodScreen');
  };

  useFocusEffect(
    useCallback(() => {
      const backAction = () => {
        navigate('Profile');
        return true; // Prevent default behavior
      };

      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
      );

      return () => backHandler.remove(); // Cleanup
    }, []),
  );

  return (
    <MainLayout
      keyboardAvoidingType="scroll-view"
      backAction={() => navigate('Profile')}>
      <Typography title="Bank Cards" type="heading" />
      <Typography
        title="Manage all your cards connected to PayRep. Click on the card to view details."
        type="subheading"
      />

      <Pad size={150} />

      <Row justifyContent="center" alignItems="center">
        <Typography title="No cards added yet" type="body-r" />
      </Row>
    </MainLayout>
  );
}
