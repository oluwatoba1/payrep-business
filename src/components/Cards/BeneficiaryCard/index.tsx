import { Image, Pressable, View, StyleSheet } from "react-native";
import ComponentImages from "../../../../assets/images/components";
import { Typography } from "../../Forms";
import { styles } from "./styles";
import Pad from "../../Pad";
import Colors from "../../../theme/Colors";

interface BeneficiaryCardProps {
  accountName: string;
  bankName?: string;
  accountNumber: string;
  title?: string;
  showCard?: boolean;
  onClose?: () => void;
}

export default function BeneficiaryCard({
  accountName,
  accountNumber,
  bankName,
  showCard = true,
  title = "Beneficiary",
  onClose,
}: BeneficiaryCardProps) {
  if (!showCard) return null;

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={ComponentImages.BeneficiaryCard.userPlaceholder}
          style={styles.image}
        />
      </View>
      <View style={styles.verticalLine} />
      <View style={styles.detailsContainer}>
        <View style={styles.textContainer}>
          <View>
            <Typography title={title.toUpperCase()} type="label-r" />
            <Pad size={4}/>
            <View style={styles.horinzontalLine} />
          </View>
          <Pad size={8} />
          <Typography title={accountName}  type="label-sb" color={Colors.black}/>
          <Typography title={accountNumber} type="label-sb" />
          <Typography title={bankName} type="label-r" color={Colors.black} />
        </View> 
        {onClose && (
          <Pressable onPress={onClose} style={styles.closeButton}>
            <Image source={ComponentImages.BeneficiaryCard.cancel} style={styles.closeIcon} />
          </Pressable>
        )}
      </View>
    </View>
  );
}


