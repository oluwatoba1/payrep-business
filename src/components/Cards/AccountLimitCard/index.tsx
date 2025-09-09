import React from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import {Typography} from '../../Forms';
import ComponentImages from '../../../../assets/images/components';
import Clipboard from '@react-native-clipboard/clipboard';
import styles from './styles';

interface AccountLimitAccountCardProps {
  accountNumber: string;
  accountName: string;
  bank: string;
}

const AccountLimitAccountCard: React.FC<AccountLimitAccountCardProps> = ({
  accountName,
  accountNumber,
  bank,
}) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.row}>
        <View>
          <Typography
            title="Account Number"
            type="subheading"
            style={styles.subheading}
          />
          <View style={styles.iconContainer}>
            <Typography title={accountNumber} />
            <TouchableOpacity
              onPress={() => Clipboard.setString(accountNumber)}>
              <Image
                source={ComponentImages.accountDetailsCard.copyIcon}
                style={[styles.copyIcon]}
              />
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <Typography title="Bank" type="subheading" />
          <Typography title={bank} />
        </View>
      </View>
      <View style={styles.marginTop16}>
        <Typography
          title="Account Name"
          type="subheading"
          style={styles.subheading}
        />
        <Typography title={accountName} />
      </View>
    </View>
  );
};

export default AccountLimitAccountCard;
