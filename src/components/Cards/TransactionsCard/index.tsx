import {Image, ScrollView, Text, View, Pressable} from 'react-native';
import ComponentImages from '../../../../assets/images/components';
import styles from './styles';
import {Badge, StatusIcon} from '..';
import {Typography} from '../../Forms';
import Colors from '../../../theme/Colors';
import IconImages from '../../../../assets/images/appIcons';

interface ITransaction {
  id: string;
  amount: number;
  reference_number: string;
  third_party_ref: string;
  session_id: string;
  rrn: string;
  response_code: string;
  serial_number: string;
  service__code: string;
  beneficiary_account_name: string;
  beneficiary_account_number: string;
  account__account_name: string;
  senders_account_name: string;
  account_number: string;
  senders_account_number: string;
  card_number: string;
  card_owner: string;
  bank: string;
  token: string;
  kct: string;
  remarks: string;
  charges: string;
  customer_commission: string;
  bonus: string;
  company_commission: string;
  aggregator_commission: string;
  stamp_duty: string;
  bank_charges: string;
  service_charges: string;
  balance_before: string;
  balance_after: string;
  transaction_type: 'credit' | 'debit';
  transaction_description: string;
  status: 'successful' | 'failed' | 'pending';
  is_reversal: string;
  is_reversed: string;
  is_lien: string;
  is_bill: string;
  created_at: string;
}

interface TransactionsCardProps {
  transactions: ITransaction[];
  handleNavigate: () => void;
}

interface TransactionItemProps {
  transaction: ITransaction;
  onPress?: () => void;
}

const addCommas = (
  value: number | string,
  removeDecimal: boolean = false,
): string => {
  if (typeof value !== 'string') {
    value = String(value);
  }

  if (value.trim() === '') {
    return ''; // Handle empty input gracefully
  }

  // Check if the input includes a decimal point
  const hasDecimal = value.includes('.');

  // Split into integer and decimal parts
  const [integerPart, decimalPart] = value.split('.');

  // Add commas to the integer part
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  // Preserve trailing decimal point if input ends with "."
  if (hasDecimal && !removeDecimal) {
    return decimalPart !== undefined
      ? `${formattedInteger}.${decimalPart}`
      : `${formattedInteger}.`;
  }

  // If no decimal exists or `removeDecimal` is true, return the formatted integer
  return formattedInteger;
};

export const TransactonItem = ({
  transaction,
  onPress,
}: TransactionItemProps) => {
  const formattedAmount = `₦${addCommas(transaction.amount)}`;

  return (
    <Pressable
      style={styles.transactionCardContainer}
      onPress={() => onPress && onPress()}>
      <View style={styles.transactionDetailsL}>
        <StatusIcon
          isBill={!!transaction.is_bill}
          serviceCode={transaction.service__code}
          type={transaction.transaction_type}
        />
        <View style={styles.transactionDetails}>
          <Typography
            type="label-r"
            title={
              transaction.beneficiary_account_name?.toUpperCase() ??
              transaction.beneficiary_account_number
            }
          />
          <Typography title={formattedAmount} type="body-r" />
        </View>
      </View>
      <View style={styles.transactionDetailsR}>
        <Badge
          type={transaction.status}
          backgroundColor="transparent"
          style={{paddingRight: 0}}
        />
        <Typography
          title={new Date(transaction.created_at).toLocaleDateString()}
          type="label-r"
        />
      </View>
    </Pressable>
  );
};

export default function TransactionsCard({
  transactions,
  handleNavigate,
}: TransactionsCardProps) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Typography
          title="Transactions"
          type="subheading-sb"
          color={Colors.gray[600]}
        />
      </View>

      <View>
        {transactions.length > 0 ? (
          <View style={styles.transactionsContainer}>
            <ScrollView contentContainerStyle={styles.transaction}>
              {transactions.map((transaction, index) => (
                <TransactonItem key={index} transaction={transaction} />
              ))}
            </ScrollView>
            <View style={styles.viewMore}>
              <Pressable style={styles.more} onPress={handleNavigate}>
                <Typography
                  title="View More"
                  type="body-r"
                  style={styles.viewMoreText}
                />
                <Image
                  source={IconImages.arrows.circleArrowRight}
                  style={styles.arrowIcon}
                />
              </Pressable>
            </View>
          </View>
        ) : (
          <View style={styles.emptyTransactionsContainer}>
            <Image
              source={ComponentImages.disputes.emptyDisputes}
              style={styles.emptyBox}
            />
            <Typography
              title="You do not have a transaction history. Start a transaction today."
              type="label-r"
              color={Colors.gray[400]}
              style={{textAlign: 'center'}}
            />
          </View>
        )}
      </View>
    </View>
  );
}
