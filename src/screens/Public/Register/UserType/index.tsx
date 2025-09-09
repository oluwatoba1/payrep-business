import {useState} from 'react';
import {View} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';

// Local
import {MainLayout, Row} from '@components/Layout';
import {UserTypeCard} from '@components/Cards';
import ComponentImages from '@assets/images/components';
import {styles} from './styles';
import {Typography} from '@components/Forms';
import {PublicNavigatorParamList} from '@navigation/types';
import {PNB} from '@theme/Fonts';
import Pad from '@components/Pad';
import {USER_TYPES} from '@utils/Constants';

type UserTypeProps = StackScreenProps<PublicNavigatorParamList, 'UserType'>;

export default function UserType({
  navigation: {navigate, goBack},
}: UserTypeProps) {
  const handleSelectUserType = (userType: string) => {
    navigate('MobileNumber', {userType});
  };

  return (
    <MainLayout backAction={goBack} rightTitle="Select an account type">
      <UserTypeCard userTypes={USER_TYPES} onSelect={handleSelectUserType} />
    </MainLayout>
  );
}
