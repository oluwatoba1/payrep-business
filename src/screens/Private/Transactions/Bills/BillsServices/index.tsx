import {ImageBackground, Pressable, View} from 'react-native';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';
import {useEffect, useState} from 'react';
import {StackScreenProps} from '@react-navigation/stack';

import {MainLayout, Row} from '@components/Layout';
import {Typography} from '@components/Forms';
import Pad from '@components/Pad';
import IconImages from '@assets/images/appIcons';
import ComponentImages from '@assets/images/components';
import Colors from '@theme/Colors';
import useToast from '@hooks/useToast';
import {useGetVasCategoryServicesMutation} from '@store/apis/serviceApi';
import {BillsStackParamList} from '@navigation/types';
import {DEFAULT_ERROR_MESSAGE, shimmerDelay} from '@utils/Constants';
import {chunkArray} from '@utils/Helpers';
import {BillsRecents} from '@components/Miscellaneous';
import {useAppDispatch, useAppSelector} from '@store/hooks';
import styles from './styles';
import {setVasCategoryService} from '@store/slices/serviceSlice';

interface IRecents {
  name: string;
  id: string;
}
const recents: IRecents[] = [
  {
    name: 'Oluwatoba F',
    id: '2409678023',
  },
  {
    name: 'Oluwatoba L',
    id: '2409678029',
  },
  {
    name: 'Oluwatoba S',
    id: '2409678027',
  },
  {
    name: 'Oluwatoba F',
    id: '2409678025',
  },
  {
    name: 'Oluwatoba K',
    id: '2409678021',
  },
  {
    name: 'Oluwatoba K',
    id: '2409678021',
  },
  {
    name: 'Oluwatoba K',
    id: '2409678021',
  },
  {
    name: 'Oluwatoba K',
    id: '2409678021',
  },
];
const trimmedRecents = recents.slice(0, 7);

const CableTV = [
  {
    provider: 'DSTV',
    type: 'cable',
    icon: ComponentImages.CableTV.dstv,
    colour: '#E0F5FF',
    arrow: IconImages.arrows.blueRight,
    iconHeight: 20,
    iconWidth: 107.7,
  },
  {
    provider: 'GoTV',
    type: 'cable',
    icon: ComponentImages.CableTV.gotv,
    colour: '#E8F7F2',
    arrow: IconImages.arrows.greenRight,
    iconHeight: 20,
    iconWidth: 106,
  },
  {
    provider: 'Startimes',
    type: 'cable',
    icon: ComponentImages.CableTV.startimes,
    colour: '#FCEDE3',
    arrow: IconImages.arrows.orangeRight,
    iconHeight: 69,
    iconWidth: 88,
  },
  {
    provider: 'TSTV',
    type: 'cable',
    icon: ComponentImages.CableTV.tstv,
    colour: '#FDE2EE',
    arrow: IconImages.arrows.pinkRight,
    iconHeight: 40,
    iconWidth: 140,
  },
];

type BillsServicesProps = StackScreenProps<
  BillsStackParamList,
  'BillsServices'
>;

export default function BillsServices({
  navigation: {navigate, goBack, canGoBack},
}: BillsServicesProps) {
  const dispatch = useAppDispatch();
  const [getVasCategoryServices, {isLoading}] =
    useGetVasCategoryServicesMutation();
  const {showToast} = useToast();
  const vasCategory = useAppSelector(state => state.service.vasCategory);

  const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

  const [services, setServices] = useState<IVasCategoryServiceResponse[]>([]);

  const fetchServices = async () => {
    try {
      const {status, message, data} = await getVasCategoryServices({
        category_id: vasCategory?.id || '',
      }).unwrap();
      if (status) {
        setServices(data);
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

  const handleNavigate = (service: IVasCategoryServiceResponse) => {
    dispatch(setVasCategoryService(service));
    switch (vasCategory?.code) {
      case 'electric':
        navigate('ElectricityForm');
        break;

      case 'data':
        navigate('DataForm');
        break;

      case 'airtime':
        navigate('AirtimeForm');
        break;

      case 'cable':
        navigate('CableForm');
        break;

      default:
        showToast('warning', 'Service is currently unavailable');
        break;
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);
  return (
    <MainLayout
      backAction={() => canGoBack() && goBack()}
      keyboardAvoidingType="scroll-view">
      <Typography title={vasCategory?.name || ''} type="heading5-sb" />
      <Pad size={12} />
      <Typography
        title={vasCategory?.description || ''}
        color={Colors.gray['base']}
        type="body-r"
      />
      <Pad size={16} />
      <BillsRecents recents={trimmedRecents} />

      <Pad size={24} />

      {isLoading ? (
        <Row gap={10}>
          <ShimmerPlaceholder
            visible={!isLoading}
            delay={shimmerDelay}
            style={
              isLoading ? styles.shimmerContainer : {}
            }></ShimmerPlaceholder>
          <ShimmerPlaceholder
            visible={!isLoading}
            delay={shimmerDelay}
            style={
              isLoading ? styles.shimmerContainer : {}
            }></ShimmerPlaceholder>
        </Row>
      ) : (
        chunkArray([...services], 2).map((chunk, index) => (
          <Row gap={10} key={index}>
            {chunk.map((service, i) =>
              service.image ? (
                <Pressable
                  key={`${index}-${i}`}
                  onPress={() => handleNavigate(service)}>
                  <ImageBackground
                    source={{uri: service.image}}
                    style={styles.serviceContainer}
                    imageStyle={styles.serviceImage}
                  />
                </Pressable>
              ) : (
                <Pressable
                  key={`${index}-${i}`}
                  onPress={() => handleNavigate(service)}
                  style={styles.defaultServiceContainer}>
                  <Typography
                    title={service.name.substring(0, 2)}
                    type="heading"
                    style={{textTransform: 'uppercase'}}
                  />
                </Pressable>
              ),
            )}
          </Row>
        ))
      )}
      <Pad size={80} />
    </MainLayout>
  );
}
