import React from 'react';
import {View, Image, ImageSourcePropType} from 'react-native';
import IconImages from '../../../../assets/images/appIcons';
import styles from './styles';
import ComponentImages from '@assets/images/components';
import Colors from '@theme/Colors';

interface StatusIconProps {
  type?: 'credit' | 'debit';
  serviceCode?: string;
  isBill?: boolean;
}

export default function StatusIcon({
  type = 'credit',
  serviceCode,
  isBill,
}: StatusIconProps) {
  const isCredit = type === 'credit';

  const loadIcon = (): ImageSourcePropType => {
    if (isBill) {
      return ComponentImages.accountDetailsCard.bills;
    }
    if (serviceCode === 'tran01') {
      return ComponentImages.accountDetailsCard.send;
    }
    if (serviceCode === 'with01') {
      return ComponentImages.accountDetailsCard.cards;
    }
    return IconImages.arrows.debitSuccess;
  };

  return (
    <View style={isCredit ? styles.success : styles.error}>
      <Image
        source={loadIcon()}
        style={[
          styles.icon,
          {tintColor: isCredit ? Colors.success.base : Colors.danger.base},
        ]}
      />
    </View>
  );
}
