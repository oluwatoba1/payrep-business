import { Pressable, Text, View } from 'react-native';
import { styles } from './styles';
import { Typography } from '../../Forms';
import { formatLabel } from '../../../utils/Helpers';
import CustomCard from '../CustomCard';
import ChangePhoneNumberModal from '../../Modal/ChangePhoneNumberModal';
import { useState } from 'react';

interface BaseCardProps {
  title: string;
}

interface AccountInfo {
  firstName?: string;
  middleName?: string;
  lastName?: string;
  dateOfBirth?: string;
  emailAddress?: string;
  phoneNumber?: string;
  bvn?: string;
  nin?: string;
  accountName?: string;
  accountNumber?: string;
  bank?: string;
  homeAddress?: string;
  state?: string;
  lga?: string;
  country?: string;
}

interface NextOfKinInfo {
  fullName?: string;
  emailAddress?: string;
  phoneNumber?: string;
  address?: string;
  relationship?: string;
}

interface AccountCardPropsWithAccountInfo extends BaseCardProps {
  accountInfo: AccountInfo;
  nextOfKinInfo?: never; 
}

interface AccountCardPropsWithNextOfKinInfo extends BaseCardProps {
  accountInfo?: never; 
  nextOfKinInfo: NextOfKinInfo;
}

type AccountCardProps =
  | AccountCardPropsWithAccountInfo
  | AccountCardPropsWithNextOfKinInfo;

export default function AccountCard({ title, accountInfo, nextOfKinInfo }: AccountCardProps) {
  const [showChangePhoneNumberModal, setChangePhoneNumberModal] =
    useState<boolean>(false);

  let dataToRender: AccountInfo | NextOfKinInfo | undefined;
  let dataKeys: string[] = [];

  if (accountInfo) {
    dataToRender = accountInfo;
    dataKeys = Object.keys(accountInfo);
  } else if (nextOfKinInfo) {
    dataToRender = nextOfKinInfo;
    dataKeys = Object.keys(nextOfKinInfo);
    
  }

  if (!dataToRender) {
    return null;
  }

  return (
    <CustomCard visible={true} customContainerStyle={styles.container}>
      <Typography title={title} style={styles.cardTitle} type="subheading" />
      {dataKeys.map(key => (
        <View key={key} style={styles.accountDetailRow}>
          <Typography
            style={styles.accountDetailLabel}
            type="subheading"
            title={formatLabel(key)}
          />
          <View style={styles.changePhoneNumberContainer}>
            <Typography
              style={styles.accountDetailValue}
              type="subheading"
              title={(dataToRender as any)[key]}
            />
          </View>
        </View>
      ))}
    </CustomCard>
  );
}