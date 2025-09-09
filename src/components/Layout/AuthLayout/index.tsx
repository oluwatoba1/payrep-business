import {Keyboard, TouchableWithoutFeedback, View} from 'react-native';
import {ReactNode} from 'react';
import styles from './styles';
import LogoLoader from '../LogoLoader';

interface AuthLayoutProps {
  children: ReactNode;
  isLoading?: boolean;
  loadingTitle?: string;
}

export default function ({children, isLoading, loadingTitle}: AuthLayoutProps) {
  // add containerstyle layout
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View style={styles.container}>
        <LogoLoader isLoading={!!isLoading} title={loadingTitle || ''} />
        {children}
      </View>
    </TouchableWithoutFeedback>
  );
}
