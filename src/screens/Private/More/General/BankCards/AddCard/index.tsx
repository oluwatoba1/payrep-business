import {View} from 'react-native';
import {MainLayout} from '../../../../../../components/Layout';
import {Button, Typography} from '../../../../../../components/Forms';
import CardForm from '../../../../../../components/Forms/CardForm';
import {generalStyles} from '../../../styles';
import {StackScreenProps} from '@react-navigation/stack';
import {
  MoreStackParamList,
  PrivateNavigatorParamList,
} from '../../../../../../navigation/types';
import {CompositeScreenProps} from '@react-navigation/native';

type AddCardProps = CompositeScreenProps<
  StackScreenProps<MoreStackParamList, 'AddBankCardScreen'>,
  StackScreenProps<PrivateNavigatorParamList, 'MessageScreen'>
>;

export default function AddCard({navigation: {navigate}}: AddCardProps) {
  const handleSuccessMessageNavigation = () => {
    navigate('MoreSuccessMessageScreen', {
      title: 'New Card',
      subTitle: "You've successfully added a new card to your account",
      // action: () => navigate('ListBankCardScreen'),
    });
  };

  return (
    <MainLayout backAction={() => null}>
      <View style={generalStyles.container}>
        <View>
          <Typography title="Add Debit Cards" type="heading" />
          <Typography
            title="The card must be your personal card that has your name."
            type="subheading"
          />
        </View>
        <CardForm />
        <View style={generalStyles.buttonContainer}>
          <Button title="Save" onPress={handleSuccessMessageNavigation} />
        </View>
      </View>
    </MainLayout>
  );
}
