import {FlatList, View, Image} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';

import {MainLayout, Row} from '../../../../../../components/Layout';
import {Typography} from '../../../../../../components/Forms';
import CustomCard from '../../../../../../components/Cards/CustomCard';
import ComponentImages from '../../../../../../../assets/images/components';
import {MoreStackParamList} from '../../../../../../navigation/types';
import {generalStyles} from '../../../styles';
import {styles} from './styles';

type DisputeScreenProps = StackScreenProps<MoreStackParamList, 'ListDisputesScreen'>;

interface DisputeItem {
  id: string;
  status: 'ongoing' | 'resolved' | 'failed';
  message: string;
  trackingNo: string;
  date: string;
}

const disputes: DisputeItem[] = [
  {
    id: '1',
    status: 'resolved',
    message: 'Reversal of failed POS terminal transaction.',
    trackingNo: 'LXG-56654-TYY',
    date: '16/12/2023',
  },
  {
    id: '2',
    status: 'ongoing',
    message: 'Pending reversal for double charge.',
    trackingNo: 'LXG-12345-ABCD',
    date: '14/12/2023',
  },
  {
    id: '3',
    status: 'failed',
    message: 'Unsuccessful dispute on credit card charge.',
    trackingNo: 'LXG-98765-ZYXW',
    date: '10/12/2023',
  },
];

export default function Disputes({
  navigation: {navigate, goBack},
}: DisputeScreenProps) {
  const handlePress = (id: string) => {
    navigate('ViewDisputeScreen', {disputeId: id});
  };

  const renderItem = ({item}: {item: DisputeItem}) => (
    <DisputeCard
      id={item.id}
      status={item.status}
      message={item.message}
      trackingNo={item.trackingNo}
      date={item.date}
      onPress={() => handlePress(item.id)}
    />
  );

  return (
    <MainLayout backAction={() => goBack()}>
      <View style={generalStyles.container}>
        <View style={generalStyles.titleContainer}>
          <Typography title="Dispute" type="heading4-sb" />
          <Typography
            title="Track and manage your disputes with ease, view ongoing and resolved cases, and stay updated on their progress."
            type="body-r"
          />
        </View>
        {disputes.length > 0 ? (
          <FlatList
            data={disputes}
            renderItem={renderItem}
            keyExtractor={item => item.id}
          />
        ) : (
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Image source={ComponentImages.disputes.emptyDisputes} />
            <Typography
              title="You do not have an ongoing dispute"
              type="label-r"
            />
          </View>
        )}
      </View>
    </MainLayout>
  );
}

interface DisputeCardProps extends DisputeItem {
  onPress?: (id: string) => void;
}

const DisputeCard = ({
  status,
  message,
  trackingNo,
  date,
  id,
  onPress,
}: DisputeCardProps) => {
  const backgroundColors: Record<string, string> = {
    ongoing: '#F59E0B15',
    resolved: 'rgba(2, 171, 117, 0.15)',
    failed: 'rgba(255, 0, 0, 0.15)',
  };

  const textColors: Record<string, string> = {
    ongoing: '#F59E0B',
    resolved: '#02AB75',
    failed: 'red',
  };

  return (
    <CustomCard visible onPress={() => onPress && onPress(id)}>
      <Row
        justifyContent="center"
        containerStyle={{backgroundColor: backgroundColors[status]}}>
        <Typography
          title={status.charAt(0).toUpperCase() + status.slice(1)}
          type="body-sb"
          color={textColors[status]}
        />
      </Row>
      <View style={styles.cardContentContainer}>
        <View>
          <Typography title="Message:" type="body-sb" />
          <Typography title={message} type="body-r" />
        </View>
        <View>
          <Typography title="Tracking No:" type="body-sb" />
          <Typography title={trackingNo} type="body-r" />
        </View>
        <View>
          <Typography title="Date:" type="body-sb" />
          <Typography title={date} type="body-r" />
        </View>
      </View>
    </CustomCard>
  );
};
