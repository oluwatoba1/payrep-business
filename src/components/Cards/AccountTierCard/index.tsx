import React from 'react';
import {
  Image,
  ImageProps,
  ImageSourcePropType,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import CustomCard from '../CustomCard';
import {Typography} from '../../Forms';
import {styles} from './styles';
import {Row} from '@components/Layout';
import ScreenImages from '@assets/images/screens';
import Pad from '@components/Pad';
import {current} from '@reduxjs/toolkit';
import Colors from '@theme/Colors';

interface ITier {
  id: string;
  name: string;
  code: number;
  pos_daily_transfer_limit: number;
  pos_transfer_limit: number;
  mobile_daily_transfer_limit: number;
  mobile_transfer_limit: number;
  web_daily_transfer_limit: number;
  web_transfer_limit: number;
  withdrawal_limit: number;
}

type AccountTierCardProps = {
  limitCustomStyle?: ViewStyle;
  textColor?: TextStyle;
  canUpgrade: boolean;
  currentTier: boolean;
  onNavigate: () => void;
  tier: ITier;
};

export const addCommas = (
  value: number | string,
  removeDecimal: boolean = false,
): string => {
  if (typeof value !== 'string') {
    value = String(value);
  }

  if (value.trim() === '') {
    return ''; // Handle empty input gracefully
  }

  // Check if the input includes a decimal point
  const hasDecimal = value.includes('.');

  // Split into integer and decimal parts
  const [integerPart, decimalPart] = value.split('.');

  // Add commas to the integer part
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  // Preserve trailing decimal point if input ends with "."
  if (hasDecimal && !removeDecimal) {
    return decimalPart !== undefined
      ? `${formattedInteger}.${decimalPart}`
      : `${formattedInteger}.`;
  }

  // If no decimal exists or `removeDecimal` is true, return the formatted integer
  return formattedInteger;
};

export default function AccountTierCard({
  textColor = {},
  limitCustomStyle = {},
  currentTier,
  canUpgrade,
  tier,
  onNavigate,
}: AccountTierCardProps) {
  const tierIconMap: Record<number, ImageSourcePropType> = {
    1: ScreenImages.MoreScreen.tierOneIcon,
    2: ScreenImages.MoreScreen.tierTwoIcon,
    3: ScreenImages.MoreScreen.tierThreeIcon,
  };
  return (
    <CustomCard
      visible={true}
      customContainerStyle={{
        backgroundColor: currentTier ? Colors.primary.base : Colors.gray['200'],
      }}
      onPress={onNavigate}>
      <Row gap={4} justifyContent="flex-start">
        <Typography
          title="Tier"
          type="body-b"
          style={[styles.labelStyle, textColor]}
        />
        <Image source={tierIconMap[tier.code]} style={styles.tierLogo} />
        <Pad size={40} />
        {canUpgrade && (
          <Typography
            title={`(Upgrade to ${tier.name})`}
            type="body-b"
            color={Colors.black}
          />
        )}
      </Row>
      <View>
        <Row containerStyle={{...styles.limitContainer, ...limitCustomStyle}}>
          <Typography
            type="label-sb"
            title="Daily Limit:"
            style={styles.labelStyle}
          />
          <Typography
            type="label-sb"
            title={`N${addCommas(tier.mobile_daily_transfer_limit, true)}`}
            style={[styles.labelStyle]}
          />
        </Row>
        <Pad size={16} />
        <Row containerStyle={{...styles.limitContainer, ...limitCustomStyle}}>
          <Typography
            type="label-sb"
            title="Transfer Limit:"
            style={[styles.labelStyle]}
          />
          <Typography
            type="label-sb"
            title={`N${addCommas(tier.mobile_transfer_limit, true)}`}
            style={[styles.labelStyle]}
          />
        </Row>
      </View>
    </CustomCard>
  );
}
