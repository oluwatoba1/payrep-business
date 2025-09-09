import {Image, ImageURISource, Pressable} from 'react-native';
import styles from './styles';
import {scale, scaleHeight} from '../../../utils/Helpers';
import {StackNavigationProp} from '@react-navigation/stack';
import {WalletStackParamList} from '../../../navigation/types';
import {useNavigation} from '@react-navigation/native';

type BillsNavigationProp = StackNavigationProp<WalletStackParamList>;

interface BillsProviderCardProps {
  id: string;
  name: string;
  code: string;
  image: string;
  description: string;
  vas_category: string;
  onPress: () => void;
}

export default function BillsProviderCard({
  cardDetails,
}: BillsProviderCardProps) {
  const navigation = useNavigation<IBillsNavigationProps>();
  let onCardPress;
  switch (cardDetails.type) {
    case 'cable':
      onCardPress = () => {
        navigation.navigate('CableTVSubscriptionScreen', {
          billProvider: cardDetails.provider,
        });
      };
      break;

    case 'electricity':
      onCardPress = () => {
        navigation.navigate('ElectrictySubscriptionScreen', {
          billProvider: cardDetails.provider,
        });
      };
      break;

    default:
      onCardPress = () => {};
      break;
  }

  return (
    <Pressable
      onPress={onCardPress}
      style={{...styles.category, backgroundColor: cardDetails.colour}}>
      <Image source={cardDetails.arrow} style={styles.categoryArrow} />
      <Image
        source={cardDetails.icon}
        style={{
          ...styles.categoryIcon,
          width: cardDetails.iconWidth,
          height: cardDetails.iconHeight,
        }}
      />
    </Pressable>
  );
}
