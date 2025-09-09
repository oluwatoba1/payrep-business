import React, {useRef, useState} from 'react';
import {View, Image, ScrollView} from 'react-native';
import ViewShot from 'react-native-view-shot';
import IconImages from '../../../../assets/images/appIcons';
import styles from './styles';
import {Button, Typography} from '../../Forms';
import Colors from '../../../theme/Colors';
import {formatCurrency, formatDateTime} from '@utils/Helpers';
import ShareModal from '@components/Modal/ShareModal';
import {Row} from '@components/Layout';
import Pad from '@components/Pad';

interface TransactionReceiptProps {
  selectedTransaction: ITransaction | null;
  homeAction: () => void;
}

export default function TransactionReceipt({
  selectedTransaction,
  homeAction,
}: TransactionReceiptProps) {
  const [modalVisible, setModalVisible] = useState(false);
  const viewShotRef = useRef(null);

  const dateGenerated = new Date().toISOString();

  if (!selectedTransaction) {
    return (
      <View>
        <Typography
          title="Transaction not found."
          type="heading5-sb"
          color={Colors.danger['base']}
        />

        <Pad size={50} />

        <Button
          containerStyle={styles.doneButton}
          title="Done"
          onPress={homeAction}
        />
      </View>
    );
  }

  const handleShareModal = () => {
    setModalVisible(prev => !prev);
  };

  let {
    account__account_name,
    account__account_number,
    amount,
    source_account_name,
    source_account_number,
    beneficiary_account_name,
    beneficiary_account_number,
    bank_name,
    reference_number,
    status,
    txn_status,
    remarks,
    session_id,
    token,
    created_at,
    units,
    address,
  } = selectedTransaction;

  source_account_name = source_account_name || account__account_name;
  source_account_number = source_account_number || account__account_number;
  bank_name = bank_name || selectedTransaction.bank;

  const formatTransactionDate = formatDateTime(created_at);
  const formatGeneratedReceiptDate = formatDateTime(dateGenerated || '');

  return (
    <ScrollView
      style={styles.scrollViewContainer}
      showsVerticalScrollIndicator={false}>
      <ViewShot ref={viewShotRef} options={{format: 'png', quality: 1}}>
        <View style={styles.receiptContainer}>
          <View style={styles.detailsContainer}>
            <View style={styles.topDetailsContainer}>
              <View style={styles.receiptHeader}>
                <Image
                  source={IconImages.logo.payrepBlackWithText}
                  style={styles.receiptLogo}></Image>

                <Typography
                  title={`Generated on: ${formatGeneratedReceiptDate.date} ${formatGeneratedReceiptDate.time}`}
                  type="label-r"
                  style={{textAlign: 'left'}}
                  color={Colors.gray['base']}
                />

                <Typography title="Transaction Receipt" type="heading5-sb" />
              </View>
              <Image
                source={IconImages.icon.checkmark}
                style={styles.checkmarkIcon}
              />
            </View>
            <View style={styles.bottomDetailsContainer}>
              <View style={styles.amountContainer}>
                <Typography
                  title={`${formatCurrency(amount)}`}
                  type="heading4-sb"
                />
                <Typography
                  title="Transaction Amount"
                  type="label-sb"
                  color={Colors.gray['base']}
                />
              </View>
              <View>
                <Row
                  alignItems="center"
                  justifyContent="space-between"
                  containerStyle={styles.details}>
                  <Typography title="Sender Details" type="label-sb" />
                  <Typography title={source_account_name} type="label-r" />
                </Row>
                <Row
                  alignItems="center"
                  justifyContent="space-between"
                  containerStyle={styles.details}>
                  <Typography title="Recipient Details" type="label-sb" />
                  <View>
                    {beneficiary_account_name ? (
                      <Typography
                        title={beneficiary_account_name}
                        type="label-r"
                        style={{textAlign: 'right'}}
                      />
                    ) : null}
                    <Typography
                      title={`${beneficiary_account_number}${
                        bank_name ? ` | ${bank_name}` : ''
                      }`}
                      type="label-r"
                      style={{textAlign: 'right'}}
                    />
                  </View>
                </Row>
                <Row
                  alignItems="center"
                  justifyContent="space-between"
                  containerStyle={styles.details}>
                  <Typography title="Transaction Date" type="label-sb" />
                  <Typography
                    title={`${formatTransactionDate?.date || ''} ${
                      formatTransactionDate?.time || ''
                    }`}
                    type="label-r"
                  />
                </Row>
                <Row
                  alignItems="center"
                  justifyContent="space-between"
                  containerStyle={styles.details}>
                  <Typography title="Reference" type="label-sb" />
                  <Typography title={reference_number} type="label-r" />
                </Row>
                {!!token ? (
                  <Row
                    alignItems="center"
                    justifyContent="space-between"
                    containerStyle={styles.details}>
                    <Typography title="Token" type="label-sb" />
                    <Typography selectable title={token} type="label-r" />
                  </Row>
                ) : null}
                {!!units ? (
                  <Row
                    alignItems="center"
                    justifyContent="space-between"
                    containerStyle={styles.details}>
                    <Typography title="Units" type="label-sb" />
                    <Typography
                      selectable
                      title={String(units)}
                      type="label-r"
                    />
                  </Row>
                ) : null}
                {!!address ? (
                  <Row
                    alignItems="center"
                    justifyContent="space-between"
                    containerStyle={styles.details}>
                    <Typography title="Address" type="label-sb" />
                    <Typography selectable title={address} type="label-r" />
                  </Row>
                ) : null}
                {session_id ? (
                  <Row
                    alignItems="center"
                    justifyContent="space-between"
                    containerStyle={styles.details}>
                    <Typography title="Session id" type="label-sb" />
                    <Typography title={session_id || ''} type="label-r" />
                  </Row>
                ) : null}
                <Row
                  alignItems="center"
                  justifyContent="space-between"
                  containerStyle={styles.details}>
                  <Typography title="Narration" type="label-sb" />
                  <Typography title={remarks || '-'} type="label-r" />
                </Row>
                <Row
                  alignItems="center"
                  justifyContent="space-between"
                  containerStyle={{...styles.details, borderBottomWidth: 0}}>
                  <Typography title="Transaction Status" type="label-sb" />
                  <Typography
                    title={status || txn_status || ''}
                    style={
                      (status || txn_status) === 'successful'
                        ? {color: Colors.success.base}
                        : (status || txn_status) === 'failed'
                        ? {color: Colors.danger.base}
                        : (status || txn_status) === 'pending'
                        ? {color: Colors.primary.base}
                        : {color: Colors.black}
                    }
                    type="label-r"
                  />
                </Row>
              </View>
            </View>
          </View>
        </View>
      </ViewShot>
      <Pad size={30} />
      <Row gap={20}>
        <Button
          containerStyle={styles.button}
          title="Download"
          onPress={handleShareModal}
        />
        <Button
          containerStyle={{...styles.button, ...styles.doneButton}}
          title="Done"
          onPress={homeAction}
        />
      </Row>
      <View style={styles.backgroundLogoContainer}>
        <Image
          source={IconImages.logo.payrepBlackWithText}
          style={styles.backgroundLogo}
        />
      </View>
      <ShareModal
        selectedTransaction={selectedTransaction}
        viewRef={viewShotRef}
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
    </ScrollView>
  );
}
