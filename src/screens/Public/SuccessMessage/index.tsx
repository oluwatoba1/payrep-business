import {StackScreenProps} from '@react-navigation/stack';

// Local
import {PublicNavigatorParamList} from '@navigation/types';
import {SuccessMessage} from '@components/Miscellaneous';

type SuccessMessageProps = StackScreenProps<
  PublicNavigatorParamList,
  'SuccessMessage'
>;

export default function SuccessMessageScreen({
  navigation,
  route,
}: SuccessMessageProps) {
  const {title, subTitle} = route.params;

  const handleNavigation = () => {
    navigation.navigate('Login');
  };

  return (
    <SuccessMessage
      title={title}
      subTitle={subTitle}
      onButtonPress={handleNavigation}
    />
  );
}
