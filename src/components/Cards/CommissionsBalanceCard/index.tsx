import {Image, ImageBackground, Pressable, View} from 'react-native';
import ComponentImages from '../../../../assets/images/components';
import styles from '../BonusBalanceCard/styles';
import {useState} from 'react';
import {IconButton, Typography} from '../../Forms';
import IconImages from '../../../../assets/images/appIcons';
import Colors from '../../../theme/Colors';

interface CardDetailsProps {
  ComissionsBalance: string;
  showAccountModalOnPress?: () => void;
}

export default function ComissionsBalanceCard({
  ComissionsBalance,
  showAccountModalOnPress = () => {},
}: CardDetailsProps) {
  const [isHidden, setIsHidden] = useState(true);

  const toggleBalanceVisibility = () => {
    setIsHidden(!isHidden);
  };
  return (
    <View style={styles.container}>
      <ImageBackground
        source={ComponentImages.commissionsCard.card}
        style={styles.card}
        imageStyle={styles.cardImage}>
        <View style={styles.details}>
          <View style={styles.cardHeader}>
            <View style={styles.iconButtonAlignment}>
              <IconButton
                onPress={showAccountModalOnPress}
                containerStyle={styles.iconButtonContainerStyle}
                activeOpacity={0.7}>
                <Image
                  source={ComponentImages.dropdDown.arrowDown}
                  tintColor={Colors.black}
                />
              </IconButton>
            </View>
          </View>
          <Typography
            title="Comissions"
            type="label-sb"
            color={Colors.gray['base']}
          />
          <View style={styles.walletBalance}>
            <Typography title="₦" type="heading3-b" color={Colors.gray[600]} />
            <Typography
              title={isHidden ? '*********' : ComissionsBalance}
              type="heading4-b"
              color={Colors.gray[600]}
            />
            <Pressable onPress={toggleBalanceVisibility}>
              <Image source={IconImages.icon.eye} style={styles.viewIcon} />
            </Pressable>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
}
