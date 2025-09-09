import {View} from 'react-native';
import TextInput from '../TextInput';
import {styles} from './styles';

export default function CardForm() {
  return (
    <View style={styles.cardFormContainer}>
      <TextInput placeholder="Card Number" />
      <View style={styles.innerInputContainer}>
        <TextInput
          containerStyle={styles.inputSize}
          placeholder="Expiry Date"
        />
        <TextInput placeholder="CVV" containerStyle={styles.inputSize} />
      </View>
    </View>
  );
}
