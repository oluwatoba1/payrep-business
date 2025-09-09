import {Text, View} from 'react-native';
import styles from './styles';
import {Button, Typography} from '../../../components/Forms';
import {MainLayout} from '../../../components/Layout';
import LinearGradient from 'react-native-linear-gradient';
import {StackScreenProps} from '@react-navigation/stack';
import {PrivateNavigatorParamList} from '../../../navigation/types';

type MessageProps = StackScreenProps<
  PrivateNavigatorParamList,
  'MessageScreen'
>;

export default function Message({route}: MessageProps) {
  const {title, message, action} = route.params;

  //   useFocusEffect(useCallback(() => {
  //     fetchTransactions()
  //   }, []))

  return (
    <MainLayout showHeader={false} backAction={() => null}>
      <LinearGradient
        colors={['rgba(255, 249, 235, 0.30)', '#FFF8E5']}
        start={{x: 0.15, y: 0}}
        end={{x: 0.7, y: 0.6}}
        style={styles.linearGradient}>
        <View style={styles.body}>
          <Typography title={title} type="heading" />
          <Typography
            title={message}
            type="subheading"
            style={styles.subheadingContent}
          />
        </View>

        <View style={styles.btnContainer}>
          <Button title="Done" onPress={action} />
        </View>
      </LinearGradient>
    </MainLayout>
  );
}
