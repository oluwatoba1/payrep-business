import {useCallback, useState} from 'react';
import {BackHandler, ScrollView, View} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';

import {MoreStackParamList, PrivateNavigatorParamList} from '@navigation/types';
import {MainLayout} from '@components/Layout';
import {Button, IconButton, Typography} from '@components/Forms';
import {mainAccountLimitStyles} from '../styles';
import AccountTierCard from '@components/Cards/AccountTierCard';
import {useGetTiersMutation} from '@store/apis/complianceApi';
import useToast from '@hooks/useToast';
import {DEFAULT_ERROR_MESSAGE, shimmerDelay} from '@utils/Constants';
import {useFocusEffect} from '@react-navigation/native';
import {useAppSelector} from '@store/hooks';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import {moderateScale, scaleHeight} from '@utils/Helpers';
import Pad from '@components/Pad';

type AccountTiersProps = StackScreenProps<MoreStackParamList, 'AccountTiers'>;

export default function AccountTiers({
  navigation: {navigate},
}: AccountTiersProps) {
  const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);
  const [getTiers, {isLoading}] = useGetTiersMutation();
  const {showToast} = useToast();
  const customer = useAppSelector(state => state.customer.customer);

  const [tiers, setTiers] = useState<ITier[]>([]);

  const handleNavigation = (
    index: number,
    canNavigate: boolean,
    tier: ITier,
  ) => {
    if (!canNavigate) {
      return;
    }
    switch (index) {
      case 1:
        navigate('ProofOfAddress');
        break;
      case 2:
        customer?.type === 'individual'
          ? navigate('IdemnityAgreement', {tier})
          : navigate('BusinessIncorporation', {tier});
        break;

      default:
        showToast('danger', 'Invalid action');
        break;
    }
  };

  const fetchTiers = async () => {
    try {
      const {status, message, data} = await getTiers().unwrap();
      if (status) {
        setTiers(data);
      } else {
        showToast('danger', message);
      }
    } catch (error: ErrorResponse | any) {
      showToast(
        'danger',
        error.data?.message || error.message || DEFAULT_ERROR_MESSAGE,
      );
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchTiers();

      const backAction = () => {
        navigate('Profile');
        return true; // Prevent default behavior
      };

      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
      );

      return () => backHandler.remove(); // Cleanup
    }, []),
  );

  return (
    <MainLayout
      backAction={() => navigate('Profile')}
      rightTitle="Account Limits">
      <View style={mainAccountLimitStyles.container}>
        <View style={mainAccountLimitStyles.heading}>
          <Typography
            title="There are three levels of Tiers that PayRep users operates on."
            type="subheading"
          />
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          <ShimmerPlaceholder
            delay={shimmerDelay}
            visible={!isLoading}
            style={
              isLoading
                ? {
                    width: '100%',
                    height: scaleHeight(150),
                    borderRadius: moderateScale(16),
                  }
                : {}
            }>
            {tiers.map((tier, index) => (
              <AccountTierCard
                key={index}
                currentTier={tier.id === customer?.tier?.id}
                canUpgrade={tier.code === (customer?.tier?.code || 0) + 1}
                tier={tier}
                onNavigate={() =>
                  handleNavigation(
                    index,
                    tier.code === (customer?.tier?.code || 0) + 1,
                    tier,
                  )
                }
              />
            ))}

            <Pad size={20} />


              <Button
                title="Upgrade to Business Plus"
                onPress={() =>
                  customer?.tier?.code === 3
                    ? navigate('BusinessIncorporation', {tier: customer.tier})
                    : showToast(
                        'warning',
                        'You need to be on Tier 3 to complete business verification',
                      )
                }
              />
          </ShimmerPlaceholder>
        </ScrollView>
      </View>
    </MainLayout>
  );
}
