import {Image, View} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';

import {MainLayout, Row} from '@components/Layout';
import {Button, Typography} from '@components/Forms';
import {styles} from './styles';
import ScreenImages from '@assets/images/screens';
import Pad from '@components/Pad';
import {MoreStackParamList} from '@navigation/types';
import {useAppDispatch, useAppSelector} from '@store/hooks';
import useToast from '@hooks/useToast';
import {useDeactivateAccountMutation} from '@store/apis/authApi';
import {setCredentials} from '@store/slices/authSlice';
import {DEFAULT_ERROR_MESSAGE} from '@utils/Constants';
import {updateAppstate} from '@store/slices/appSlice';
import {persistAppState} from '@utils/Helpers';

type DeactivateAccountProps = StackScreenProps<
  MoreStackParamList,
  'DeactivateAccount'
>;

export default function DeactivateAccount({
  navigation: {goBack},
}: DeactivateAccountProps) {
  const dispatch = useAppDispatch();
  const {showToast} = useToast();

  const customer = useAppSelector(state => state.auth.customer);

  const [deactivateAccount, {isLoading}] = useDeactivateAccountMutation();

  const deactivate = async () => {
    try {
      const {status, message} = await deactivateAccount({
        username: customer?.username || '',
        customer_id: customer?.id || '',
      }).unwrap();
      if (status) {
        dispatch(
          setCredentials({
            token: null,
            user_id: null,
          }),
        );
        await persistAppState({
          customer: null,
        });
        dispatch(
          updateAppstate({
            customer: null,
          }),
        );
        return;
      }

      showToast('danger', message);
    } catch (error: any) {
      showToast(
        'danger',
        error.data?.message || error.message || DEFAULT_ERROR_MESSAGE,
      );
    }
  };

  return (
    <MainLayout backAction={goBack} isLoading={isLoading}>
      <Typography title="Deactivate Account" type="heading4-sb" />
      <Pad />
      <Typography
        title="We are sad to see you go! Are you sure you want to deactivate your account?"
        type="subheading"
      />

      <View style={styles.deactivateItemContainer}>
        <Image
          style={styles.deactivateImageStyle}
          source={ScreenImages.profileScreen.closeLineIcon}
        />
        <Typography
          title="You will need to contact admin should you decide to reactivate your account"
          type="subheading"
        />
      </View>

      <Pad size={50} />

      <Row justifyContent="space-between" gap={10}>
        <Button
          title="Keep My Account"
          containerStyle={styles.keepAccountButton}
        />
        <Button
          title="Deactivate"
          containerStyle={styles.deactivateAccountButton}
          onPress={deactivate}
        />
      </Row>
    </MainLayout>
  );
}
