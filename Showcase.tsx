import {
  SafeAreaView,
  ScrollView,
  View,
  StyleSheet,
  StatusBar,
} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Pad from './src/components/Pad';
import Colors from './src/theme/Colors';
import {scale} from './src/utils/Helpers';
import {MainLayout} from './src/components/Layout';
import {UserTypeCard} from './src/components/Cards';
import {STATUS_BAR_HEIGHT} from './src/utils/Constants';
import {AppNavigator} from './src/navigation';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

// const Stack = createNativeStackNavigator()

// function AuthStack() {
//   return null
// }

// function AuthenticatedStack() {
//   return (
//     <Stack.Navigator
//       screenOptions={{
//         headerStyle: { backgroundColor: Colors.primary[100] },
//         headerTintColor: 'white',
//         contentStyle: { backgroundColor: Colors.primary[100] },
//       }}
//     >
//       <Stack.Screen name="Welcome" component={WelcomeScreen} options={{
//           headerShown: false,

//         }} />

//     </Stack.Navigator>
//   );
// }

// function Navigation() {
//   return (
//     <NavigationContainer>
//       {/* <AuthStack /> */}
//       <AuthenticatedStack />
//     </NavigationContainer>
//   );
// }
export default function Showcase() {
  return (
    <GestureHandlerRootView style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
        animated
      />
      <AppNavigator />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
