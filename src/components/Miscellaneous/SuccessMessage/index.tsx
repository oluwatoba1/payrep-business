import {Image, ImageProps, Pressable, View, StyleSheet} from 'react-native';
import {Button, Typography} from '../../Forms';
import {styles} from './styles';
import ComponentImages from '../../../../assets/images/components';
import {useAppSelector} from '@store/hooks';
import LinearGradient from 'react-native-linear-gradient';
import {Row} from '@components/Layout';
import Colors from '@theme/Colors';
import Pad from '@components/Pad';

interface ActionCardProps {
  title: string;
  icon: any;
  onPress: () => void;
  disabled?: boolean;
}

const ActionCard = ({
  title,
  icon,
  onPress,
  disabled = false,
}: ActionCardProps) => {
  return (
    <Pressable
      style={[styles.cardWrapper]}
      onPress={disabled ? undefined : onPress}
      android_ripple={{color: 'rgba(255,255,255,0.3)', borderless: false}}>
      <LinearGradient
        colors={
          disabled
            ? [Colors.gray[100], Colors.gray[400]]
            : [Colors.primary[50], Colors.primary[100]]
        }
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={[styles.card, disabled && styles.cardDisabled]}>
        <View style={styles.iconContainer}>
          <Image source={icon} style={styles.icon} resizeMode="contain" />
        </View>
        <Typography title={title} type="body-sb" style={styles.text} />
      </LinearGradient>
    </Pressable>
  );
};

interface SuccessMessageProps {
  onButtonPress: () => void;
  onBeneficiaryBtnPress?: () => void;
  onRecurringTransferPress?: () => void;
  onOneTimeTransferPress?: () => void;
  title: string;
  subTitle: string;
  showReceiptButton?: boolean;
  onReceiptPress?: () => void;
  successLogo?: ImageProps;
  buttonTitle?: string;
  showActionCards?: boolean;
}

export default function SuccessMessage({
  successLogo,
  onButtonPress,
  onBeneficiaryBtnPress = () => {},
  onRecurringTransferPress = () => {},
  onOneTimeTransferPress = () => {},
  title,
  subTitle,
  showReceiptButton = true,
  onReceiptPress = () => {},
  showActionCards = false,
  buttonTitle = 'Done',
}: SuccessMessageProps) {
  return (
    <View style={styles.container}>
      <Pad size={80} />

      <Image
        style={styles.image}
        source={
          !successLogo ? ComponentImages.onboarding.successful : successLogo
        }
      />
      <View style={styles.content}>
        <Typography type="heading" title={title} />
        <Typography type="body-r" title={subTitle} style={styles.text} />
      </View>

      {/* Action Cards Grid */}
      {showActionCards && (
        <View style={styles.cardsContainer}>
          <Row>
            {showReceiptButton && (
              <ActionCard
                title="View Receipt"
                icon={ComponentImages.BeneficiaryCard.shareIcon}
                onPress={onReceiptPress}
              />
            )}
            <ActionCard
              title="Add Beneficiary"
              icon={ComponentImages.userTypeCard.individual}
              onPress={onBeneficiaryBtnPress}
            />
          </Row>

          <Row>
            <ActionCard
              title="Recurring Transfer"
              icon={ComponentImages.BeneficiaryCard.recurringTransfer}
              onPress={onRecurringTransferPress}
            />
            <ActionCard
              title="One Tap Payment"
              icon={ComponentImages.BeneficiaryCard.oneTapPayment}
              onPress={onOneTimeTransferPress}
            />
          </Row>
        </View>
      )}

      <Pad size={50} />

      <Button
        title={buttonTitle}
        onPress={onButtonPress}
        containerStyle={styles.doneButton}
      />
    </View>
  );
}
