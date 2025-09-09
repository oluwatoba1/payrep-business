import {View, StyleSheet} from 'react-native';
import {MainLayout} from '../../../../../../components/Layout';
import {Button, Typography} from '../../../../../../components/Forms';
import {generalStyles} from '../../../styles';
import {StackScreenProps} from '@react-navigation/stack';
import {MoreStackParamList} from '../../../../../../navigation/types';
import {styles} from './styles';

type DisputeScreenProps = StackScreenProps<
  MoreStackParamList,
  'ViewDisputeScreen'
>;

interface DisputeDetails {
  disputeId: string;
  transactionDate: string;
  trackingNo: string;
  message: string;
  initialDate: string;
  resolutionDate: string;
  status: 'ongoing' | 'resolved' | 'failed';
}

const mockDisputeDetails: DisputeDetails = {
  disputeId: '1',
  transactionDate: '10/12/2023',
  trackingNo: 'LXG-98765-ZYXW',
  message: 'Unsuccessful dispute on credit card charge.',
  initialDate: '11/12/2023',
  resolutionDate: '12/12/2023',
  status: 'resolved',
};

export default function ViewDispute({route, navigation}: DisputeScreenProps) {
  const {disputeId} = route.params;

  const disputeDetails = {...mockDisputeDetails, disputeId}; // Mock data for illustration

  const statusColors = {
    ongoing: '#F59E0B',
    resolved: '#02AB75',
    failed: 'red',
  };

  return (
    <MainLayout backAction={() => navigation.goBack()}>
      <View style={generalStyles.container}>
        <View style={styles.header}>
          <Typography title="View Dispute" type="heading4-sb" />
        </View>
        <View style={styles.detailsContainer}>
          <DetailRow label="Dispute:" value={disputeDetails.disputeId} />
          <DetailRow
            label="Transaction Date:"
            value={disputeDetails.transactionDate}
          />
          <DetailRow label="Tracking No:" value={disputeDetails.trackingNo} />
          <DetailRow label="Message:" value={disputeDetails.message} />
          <DetailRow label="Initial Date:" value={disputeDetails.initialDate} />
          <DetailRow
            label="Resolution Date:"
            value={disputeDetails.resolutionDate}
          />
          <DetailRow
            label="Status:"
            value={
              disputeDetails.status.charAt(0).toUpperCase() +
              disputeDetails.status.slice(1)
            }
            valueStyle={{color: statusColors[disputeDetails.status]}}
          />
        </View>
        <View style={generalStyles.buttonContainer}>
          <Button title="Close" onPress={() => navigation.goBack()} />
        </View>
      </View>
    </MainLayout>
  );
}

interface DetailRowProps {
  label: string;
  value: string;
  valueStyle?: object;
}

const DetailRow = ({label, value, valueStyle}: DetailRowProps) => (
  <View style={styles.row}>
    <Typography title={label} type="body-sb" />
    <Typography title={value} type="body-r" style={valueStyle} />
  </View>
);
