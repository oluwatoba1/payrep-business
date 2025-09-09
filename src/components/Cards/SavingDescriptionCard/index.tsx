import React from 'react';
import { View, Image, Pressable, ViewStyle, TextStyle } from 'react-native';
import { styles } from './styles';
import CustomCard from '../CustomCard';
import { Typography } from '../../Forms';


type SavingsRatingCardProps = {
  title: string;
  description: string;
  interestRate: string;
  backgroundColor: string;
  badgeColor: string;
  imageSource: any;
  imagePosition?: 'top' | 'bottom';
  onNavigate?: () => void
  actionButtonBackgroundColor?: ViewStyle | ViewStyle[];
  actionButtonTextColor?: TextStyle;
};

const SavingsRatingCard = ({
  title,
  description,
  interestRate,
  backgroundColor,
  badgeColor,
  imageSource,
  imagePosition = 'bottom',
  actionButtonBackgroundColor = {},
  actionButtonTextColor = {},
  onNavigate
}: SavingsRatingCardProps) => {
  return (
    <View style={styles.container}>
      <CustomCard visible customContainerStyle={[styles.cardContainer, { backgroundColor }]} onPress={onNavigate}>
        <View style={styles.contentContainer}>
          <View>
            {/* <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}> */}
              <Typography title={title} type="body-b" style={styles.textWhite} />
              {/* <Pressable style={actionButtonBackgroundColor}>
                <Typography title="Edit" type="body-b" style={actionButtonTextColor} />
              </Pressable> */}
            {/* </View> */}
            <View style={styles.descriptionContainer}>
              <View style={styles.descriptionWidth}>
                <Typography title={description} type="label-r" style={styles.textWhite} />
              </View>
            </View>
          </View>
          <View style={[styles.badgeContainer, { backgroundColor: badgeColor }]}>
            <Typography title={interestRate} type="body-sb" style={styles.textWhite} />
          </View>
        </View>
      </CustomCard>
      <Image
        source={imageSource}
        style={[
          styles.image,
          imagePosition === 'top' ? styles.imageTop : styles.imageBottom,
        ]}
      />
    </View>
  );
};


export default SavingsRatingCard;
