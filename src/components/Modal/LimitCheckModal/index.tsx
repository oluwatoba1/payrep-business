import type React from 'react';
import {View} from 'react-native';
import {Typography} from '@components/Forms';
import {Button} from '@components/Forms';
import ModalWrapper from '../ModalWrapper';
import {styles} from './styles';
import {Row} from '@components/Layout';
import {formatCurrency, formatValue} from '@utils/Helpers';

interface LimitExceededModalProps {
  showModal: boolean;
  onClose: () => void;
  transactionAmount: string;
  limitMessage?: string;
  amountLeft?: string;
}

export default function LimitExceededModal({
  showModal,
  onClose,
  transactionAmount,
  limitMessage,
  amountLeft,
}: LimitExceededModalProps) {
  const getLimitMessage = `This transaction exceeds your transaction limit of`;
  const rawAmount = formatValue(transactionAmount || '0.00');

  return (
    <ModalWrapper
      visible={showModal}
      transparent={true}
      animationType="fade"
      onClose={onClose}>
      <View>
        <View>
          <Row>
            <View style={styles.modalHeader}>
              <Typography title="Transfer Limit Exceeded" type="heading5-sb" />
            </View>
          </Row>

          <View style={styles.modalContent}>
            <Typography
              title={limitMessage || getLimitMessage}
              type="body-r"
              style={styles.limitMessage}
            />

            <View style={styles.limitInfoContainer}>
              <View style={styles.limitInfoRow}>
                <Typography title="Transaction Amount:" type="body-r" />
                <Typography title={`${rawAmount}`} type="body-sb" />
              </View>
              <View style={styles.limitInfoRow}>
                <Typography title="Amount Left:" type="body-b" />
                <Typography
                  title={formatCurrency(Number(amountLeft))}
                  type="body-r"
                />
              </View>
              {/* <View style={styles.limitInfoRow}>
                <Typography title="Charges" type="body-r" />
                <Typography title={formatCurrency(Number(rawCharges))} type="body-r" />
              </View>

               */}
            </View>

            <Typography
              title="Please reduce your transfer amount or try again later."
              type="body-r"
              style={styles.limitAdvice}
            />
          </View>

          <View style={styles.modalFooter}>
            <Button title="Close" onPress={onClose} />
          </View>
        </View>
      </View>
    </ModalWrapper>
  );
}
