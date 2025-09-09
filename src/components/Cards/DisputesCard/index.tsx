import ComponentImages from '../../../../assets/images/components';
import styles from './styles';
import {Image, Pressable, ScrollView, View} from 'react-native';
import Colors from '../../../theme/Colors';
import {Typography} from '../../Forms';
import {Badge} from '..';
import IconImages from '../../../../assets/images/appIcons';

interface IDispute {
  dispute_id: string;
  type: 'declined_debit' | 'double_debit';
  mobile_number: string;
  account_number: string;
  account_name: string;
  bank_code: string;
  bank_name: string;
  rrn: string;
  serial_number: string;
  amount: number;
  status: boolean;
  action:
    | 'reversed-to-customer'
    | 'credited-to-wallet'
    | 'advice-to-bank'
    | 'no-debit'
    | 'rejected';
  description: string;
  treated_date: string;
  created_at: string;
}

interface DisputeProps {
  disputes: IDispute[];
}

const Item = (props: IDispute) => {
  return (
    <View style={styles.disputeCardContainer}>
      <Badge type={props.status ? 'successful' : 'failed'} />
      <View style={styles.disputeDetailsContainer}>
        <View style={styles.disputeTrackingID}>
          <Typography
            title="Tracking No:"
            type="body-sb"
            color={Colors.gray['base']}
          />
          <Typography
            title={props.dispute_id}
            type="body-r"
            color={Colors.gray['base']}
          />
        </View>
        <View style={styles.disputeDate}>
          <Typography
            title="Date:"
            type="body-sb"
            color={Colors.gray['base']}
          />
          <Typography
            title={new Date(props.created_at).toLocaleDateString()}
            type="body-r"
            color={Colors.gray['base']}
          />
        </View>
      </View>
    </View>
  );
};

export default function Disputes({disputes}: DisputeProps) {
  return (
    <View style={styles.disputeContainer}>
      <Typography
        title="Disputes"
        type="subheading-sb"
        color={Colors.gray[600]}
      />

      {disputes.length ? (
        <View style={styles.disputeCardsContainer}>
          <View style={styles.disputeCard}>
            <ScrollView
              contentContainerStyle={styles.disputeItemContainer}
              horizontal
              showsHorizontalScrollIndicator={false}>
              {disputes.map((dispute, index) => (
                <Item key={index} {...dispute} />
              ))}
            </ScrollView>
          </View>
          <Pressable onPress={() => {}} style={styles.more}>
            <Typography
              title="View More"
              type="body-sb"
              color={Colors.gray[700]}
              style={styles.viewMoreText}
            />
            <Image
              source={IconImages.arrows.circleArrowRight}
              style={styles.arrowIcon}
            />
          </Pressable>
        </View>
      ) : (
        <View style={styles.emptyDisputesContainer}>
          <Image
            source={ComponentImages.disputes.emptyDisputes}
            style={styles.emptyBox}
          />
          <Typography
            title="Sorry! You do not have an ongoing dispute running."
            type="label-r"
            color={Colors.gray[400]}
          />
        </View>
      )}
    </View>
  );
}
