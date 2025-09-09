/**
 * @format
 */
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import {Provider} from 'react-redux';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import App from './App';
import Showcase from './Showcase';
import {name as appName} from './app.json';
import {store} from './src/store';

const Main = () => (
  <SafeAreaProvider>
    <Provider store={store}>
      <App />
    </Provider>
  </SafeAreaProvider>
);

AppRegistry.registerComponent(appName, () => Main);
