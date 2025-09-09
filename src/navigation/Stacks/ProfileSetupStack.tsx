import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {ProfileStackParamList} from '../types';
import {
  KycVerification,
  ProfileCompletionIntro,
  FacialRecognition,
  LocationDetails,
  MeansOfIdentification,
  Pep,
  SourceOfIncome,
  BusinessInformation,
  Pin,
  Attestation,
} from '@screens/Private/ProfileSetup';
import {useNavigationState} from '@react-navigation/native';
import {useFetchCustomerDetailsQuery} from '@store/apis/customerApi';
import {useAppDispatch, useAppSelector} from '@store/hooks';
import {setCustomerDetails} from '@store/slices/customerSlice';
import useToast from '@hooks/useToast';

const Stack = createNativeStackNavigator<ProfileStackParamList>();

export default function ProfileSetupStack() {
  const dispatch = useAppDispatch();
  const customer = useAppSelector(state => state.customer) || {};
  const {showToast} = useToast();
  const screenState = useNavigationState(state => state);

  const {currentData: customerResponse, refetch: refetchCustomerDetails}: any =
    useFetchCustomerDetailsQuery();

  useEffect(() => {
    refetchCustomerDetails();
  }, [screenState]);

  useEffect(() => {
    if (customerResponse) {
      !customerResponse.error
        ? dispatch(setCustomerDetails({...customer, ...customerResponse.data}))
        : showToast('danger', 'Unable to fetch customer information');
    }
  }, [customerResponse]);

  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="ProfileCompletionIntro">
      <Stack.Screen
        name="ProfileCompletionIntro"
        component={ProfileCompletionIntro}
      />
      <Stack.Screen name="KycVerification" component={KycVerification} />
      <Stack.Screen name="FacialRecognition" component={FacialRecognition} />
      <Stack.Screen name="LocationDetails" component={LocationDetails} />
      <Stack.Screen
        name="MeansOfIdentification"
        component={MeansOfIdentification}
      />
      <Stack.Screen name="Pep" component={Pep} />
      <Stack.Screen name="SourceOfIncome" component={SourceOfIncome} />
      <Stack.Screen
        name="BusinessInformation"
        component={BusinessInformation}
      />
      <Stack.Screen name="Pin" component={Pin} />
      <Stack.Screen name="Attestation" component={Attestation} />
    </Stack.Navigator>
  );
}
