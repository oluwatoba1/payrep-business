import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {PublicNavigatorParamList} from './types';
import {
  Splashscreen,
  Onboarding,
  Login,
  ForgotPassword,
  ResetPassword,
  Landing,
  UserType,
  MobileNumber,
  VerificationCode,
  EmailAddress,
  CreatePassword,
  EmailVerification,
  SuccessMessage,
  RegisterNewDevice,
  FacialRecognition,
} from '../screens/Public';

const Stack = createNativeStackNavigator<PublicNavigatorParamList>();

export default function PublicNavigator() {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Splashscreen" component={Splashscreen} />
      <Stack.Screen name="Onboarding" component={Onboarding} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
      <Stack.Screen name="SuccessMessage" component={SuccessMessage} />
      <Stack.Screen name="Landing" component={Landing} />
      <Stack.Screen name="UserType" component={UserType} />
      <Stack.Screen name="MobileNumber" component={MobileNumber} />
      <Stack.Screen name="EmailAddress" component={EmailAddress} />
      <Stack.Screen name="EmailVerification" component={EmailVerification} />
      <Stack.Screen name="VerificationCode" component={VerificationCode} />
      <Stack.Screen name="CreatePassword" component={CreatePassword} />

      <Stack.Screen name="RegisterNewDevice" component={RegisterNewDevice} />
      <Stack.Screen name="FacialRecognition" component={FacialRecognition} />
    </Stack.Navigator>
  );
}
