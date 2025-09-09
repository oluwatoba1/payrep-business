import React from 'react';
import {Image, View, FlatList, ScrollView} from 'react-native';
import {Typography} from '../../Forms';
import ComponentImages from '../../../../assets/images/components';
import {styles} from './styles';

interface TierCardProps {
  tier: number;
  dailyLimit: string;
  maxLimit: string;
  stages: number;
}

const TierCard: React.FC<TierCardProps> = ({
  tier,
  dailyLimit,
  maxLimit,
  stages,
}) => {
  const renderStars = (stage: number) => {
    const stars = [];
    for (let i = 0; i < stages; i++) {
      stars.push(
        <Image
          key={i}
          style={styles.starIcon}
          source={
            i < stage
              ? ComponentImages.TierCard.starFill
              : ComponentImages.TierCard.starLine
          }
        />,
      );
    }
    return stars;
  };

  const TierItem = ({item}: {item: number}) => (
    <View
      key={item}
      style={[
        styles.cardContainer,
        item === tier ? styles.lightCard : styles.blurredCard,
      ]}>
      <View style={styles.tierRow}>
        <Typography title={`Tier ${item}`} />
        <View style={styles.starsContainer}>{renderStars(item)}</View>
      </View>
      <View style={styles.row}>
        <Typography title="Daily Transaction Limit" type="subheading" />
        <Typography title={dailyLimit} />
      </View>
      <View style={styles.row}>
        <Typography title="Maximum Transaction Limit" type="subheading" />
        <Typography title={maxLimit} />
      </View>
    </View>
  );

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {Array.from({length: stages}, (_, i) => i + 1).map((item, index) => (
        <TierItem key={index} item={item} />
      ))}
    </ScrollView>
  );
};

export default TierCard;
