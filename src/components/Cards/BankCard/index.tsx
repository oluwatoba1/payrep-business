import {useRef, useState} from 'react';
import {Image, ImageBackground, Pressable, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import {styles} from './styles';
import ComponentImages from '@assets/images/components';
import {Row} from '@components/Layout';
import {Typography} from '@components/Forms';
import Pad from '@components/Pad';
import Colors from '@theme/Colors';
interface BankCardProps {
  index: number;
  handleCardPress: () => void;
  cardType: 'MASTERCARD' | 'VERVE' | 'VISA';
  cardHolderName: string;
  cardHolderNumber: string;
  numberOfTransactions?: number;
  amount?: string;
  commission?: string;
  editCard?: () => void;
}

export default function BankCard({
  index,
  handleCardPress,
  cardType,
  cardHolderName,
  cardHolderNumber,
  numberOfTransactions = 0,
  amount = 'N20,000',
  commission = 'N30,000',
  editCard,
}: BankCardProps) {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const cardRef = useRef<View | null>(null);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const cardBackground =
    cardType === 'MASTERCARD'
      ? ComponentImages.BankCards.masterCardBg
      : cardType === 'VERVE'
      ? ComponentImages.BankCards.verveCardBg
      : '';

  const cardLogo =
    cardType === 'MASTERCARD'
      ? ComponentImages.BankCards.MasterCardIcon
      : cardType === 'VERVE'
      ? ComponentImages.BankCards.VerveIcon
      : '';

  return (
    <Pressable
      key={index}
      onPress={() => (modalVisible ? toggleModal() : handleCardPress())}
      style={styles.cardContainer}
      ref={cardRef}>
      <ImageBackground source={cardBackground} imageStyle={styles.cardImage}>
        <View style={styles.cardDetailsContainer}>
          <Row alignItems="center" justifyContent="space-between">
            <Typography
              title={cardType}
              type="subheading-sb"
              color={Colors.white}
            />
            <Typography
              title="..."
              type="heading4-sb"
              color={Colors.white}
              onPress={toggleModal}
            />
          </Row>
          <View style={styles.cardBody}>
            <DetailRow
              label="Number of Transactions:"
              value={`${numberOfTransactions}`}
            />
            <DetailRow label="Amount:" value={`${amount}`} />
            <DetailRow label="Commission:" value={`${commission}`} />
          </View>
          <Typography
            title={cardHolderNumber}
            type="text"
            style={styles.cardNumber}
          />
          <Row alignItems="center" justifyContent="space-between">
            <Typography
              title={cardHolderName.toUpperCase()}
              type="subheading"
              style={styles.cardName}
            />
            <Image source={cardLogo} style={styles.cardLogo} />
          </Row>
        </View>
      </ImageBackground>
      {modalVisible ? (
        <View style={styles.menu}>
          <Typography title="More Option" type="label-sb" />

          <Pad size={16} />

          <Typography title="Edit" type="body-r" onPress={editCard} />
        </View>
      ) : null}
    </Pressable>
  );
}

const DetailRow = ({label, value}: {label: string; value: string}) => (
  <View style={styles.detailRow}>
    <Typography title={label} type="body-r" style={styles.cardNumber} />
    <Typography title={value} type="body-r" style={styles.cardNumber} />
  </View>
);
