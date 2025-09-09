import {View} from 'react-native';
import {Button, Typography} from '../../../../components/Forms';
import styles from './styles';
import Colors from '../../../../theme/Colors';
import {MainLayout} from '../../../../components/Layout';
import Pad from '../../../../components/Pad';
import {StackScreenProps} from '@react-navigation/stack';
import {TransactionStackParamList} from '@navigation/types';

type DisputesProps = StackScreenProps<TransactionStackParamList, 'Disputes'>;

export default function Disputes({navigation: {goBack}}: DisputesProps) {
  const dispute = {
    id: '',
    startDate: '',
    endDate: '',
    transactionDate: '',
    message: '',
    status: '',
  };
  return (
    <MainLayout backAction={goBack}>
      <View style={styles.container}>
        <Typography title="View Dispute" type="heading4-sb" />
        <Pad size={24} />
        <View style={styles.detailsContainer}>
          <View style={styles.details}>
            <Typography title="Dispute :" type="body-sb" />
            <Typography title="NEW" type="body-r" color={Colors.gray['base']} />
          </View>
          <View style={styles.details}>
            <Typography title="Transaction Date :" type="body-sb" />
            <Typography
              title={dispute.transactionDate}
              type="body-r"
              color={Colors.gray['base']}
            />
          </View>
          <View style={styles.details}>
            <Typography title="Tracking No. :" type="body-sb" />
            <Typography
              title={dispute.id}
              type="body-r"
              color={Colors.gray['base']}
            />
          </View>
          <View style={styles.details}>
            <Typography title="Message :" type="body-sb" />
            <Typography
              title={dispute.message}
              type="body-r"
              color={Colors.gray['base']}
            />
          </View>
          <View style={styles.details}>
            <Typography title="Initiation Date :" type="body-sb" />
            <Typography
              title={dispute.startDate}
              type="body-r"
              color={Colors.gray['base']}
            />
          </View>
          <View style={styles.details}>
            <Typography title="Resolution Date :" type="body-sb" />
            <Typography
              title={dispute.endDate}
              type="body-r"
              color={Colors.gray['base']}
            />
          </View>
          <View style={styles.details}>
            <Typography title="Transaction status" type="body-sb" />
            <Typography
              title={dispute.status}
              type="body-r"
              color={Colors.danger['base']}
            />
          </View>
        </View>
        <View style={styles.buttonContainer}>
          <Button title="Close" />
        </View>
      </View>
    </MainLayout>
  );
}
