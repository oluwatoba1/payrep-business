import {View} from 'react-native';
import {MainLayout} from '../../../../../../components/Layout';
import {Button, Typography} from '../../../../../../components/Forms';
import PinPad from '../../../../../../components/Forms/PinPad';
import {useState} from 'react';
import {styles} from './styles';
import {generalStyles} from '../../../styles';
import Pad from '../../../../../../components/Pad';
import {StackScreenProps} from '@react-navigation/stack';
import {
  PrivateNavigatorParamList,
  MoreStackParamList
} from '../../../../../../navigation/types';
import {CompositeScreenProps} from '@react-navigation/native';


type ResetTransactionPinProps = CompositeScreenProps<
  StackScreenProps<MoreStackParamList, 'ResetTransactionScreen'>,
  StackScreenProps<PrivateNavigatorParamList, 'MessageScreen'>
>;

export default function ResetTransactionPin({
  navigation: {navigate, goBack},
}: ResetTransactionPinProps) {
  const [currentPin, setCurrentPin] = useState('');
  const [newPin, setNewPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');

  const handleCurrentPinInput = (value: string) => {
    setCurrentPin(value);
  };

  const handleNewPinInput = (value: string) => {
    setNewPin(value);
  };

  const handleConfirmPinInput = (value: string) => {
    setConfirmPin(value);
  };

  const handleUpdatePin = () => {
    navigate('MoreSuccessMessageScreen', {
      title: 'New Pin',
      subTitle: 'Congratulations! Youve successfully changed your old pin',
  })
  };
  return (
    <MainLayout backAction={() => goBack()}>
      <View style={generalStyles.container}>
        <Typography title="Reset Transaction PIN" type='heading4-sb' />
        <Typography
          title="Changing your PIN ensures maximum account security. Create a unique four-digit PIN for secure transactions."
          type="subheading"
        />

        <View style={styles.pinContainer}>
          <View style={styles.pinHolder}>
            <Typography title="Current PIN Code" style={styles.text} />
            <PinPad pin={currentPin} onInput={handleCurrentPinInput} />
          </View>
          <View style={styles.pinHolder}>
            <Typography title="New PIN Code" style={styles.text} />
            <PinPad pin={newPin} onInput={handleNewPinInput} />
          </View>
          <View style={styles.pinHolder}>
            <Typography title="Confirm New PIN Code" style={styles.text} />
            <PinPad pin={confirmPin} onInput={handleConfirmPinInput} />
          </View>
        </View>

        <Pad size={150} />
        <View style={generalStyles.buttonContainer}>
          <Button title="Update PIN" onPress={handleUpdatePin} />
        </View>
      </View>
    </MainLayout>
  );
}
