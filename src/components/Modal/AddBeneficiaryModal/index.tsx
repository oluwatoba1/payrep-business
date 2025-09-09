import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity, Image, Pressable} from 'react-native';
import {Button, TextInput, Typography} from '@components/Forms';
import {ModalWrapper} from '..';
import {styles} from './styles';
import ComponentImages from '@assets/images/components';

interface DestinationAccountProps {
  accountName: string;
  accountNumber: string;
  bankName: string;
  bankCode: string;
}

interface AddBeneficiaryProps {
  destinationAccount?: DestinationAccountProps;
  showModal: boolean;
  onClose: () => void;
  onAddBeneficiary: (
    beneficiaryName: string,
  ) => Promise<{status: boolean; message?: string}>;
}

export default function AddBeneficiaryModal({
  showModal,
  onClose,
  onAddBeneficiary,
  destinationAccount,
}: AddBeneficiaryProps) {
  // Form state
  const [beneficiaryName, setBeneficiaryName] = useState('');

  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (showModal) {
      setBeneficiaryName(destinationAccount?.accountName || '');
      setIsSuccess(false);
      setError('');
    }
  }, [showModal, destinationAccount]);

  const handleNameChange = (text: string) => {
    setBeneficiaryName(text);
    if (error) setError('');
  };

  const handleSubmit = async () => {
    const nameToUse =
      beneficiaryName.trim() || destinationAccount?.accountName || '';

    if (!nameToUse) {
      setError('Beneficiary name is required');
      return;
    }

    const result = await onAddBeneficiary(nameToUse);

    setIsSuccess(!!result?.status);
  };

  const renderSuccessState = () => {
    return (
      <View style={styles.successContainer}>
        <View style={styles.successIconContainer}>
          <Image
            style={styles.image}
            source={ComponentImages.onboarding.successful}
          />
        </View>
        <Typography
          title="Beneficiary Added Successfully"
          type="heading5-sb"
          style={styles.successTitle}
        />
        <Typography
          title={`${
            beneficiaryName || destinationAccount?.accountName
          } has been added to your beneficiaries list.`}
          type="body-r"
          style={styles.successMessage}
        />
      </View>
    );
  };

  const hasRequiredInfo =
    destinationAccount?.accountNumber && destinationAccount?.accountName;

  return (
    <ModalWrapper visible={showModal} onClose={onClose}>
      <View style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerContent}>
            <Typography title="Add New Beneficiary" type="heading5-sb" />
          </View>

          <Pressable onPress={onClose} style={styles.closeButton}>
            <Typography title="close" type="body-sb" />
          </Pressable>
        </View>

        {isSuccess ? (
          renderSuccessState()
        ) : !hasRequiredInfo ? (
          <View style={styles.errorContainer}>
            <Typography
              title="Missing account information. Please complete a transfer first."
              type="body-r"
              style={styles.errorText}
            />
            <Button
              title="Close"
              onPress={onClose}
              style={styles.closeErrorButton}
            />
          </View>
        ) : (
          <View style={styles.formContainer}>
            <View style={styles.accountInfoContainer}>
              <Typography
                title="Account Information"
                type="body-sb"
                style={styles.sectionTitle}
              />

              <View style={styles.infoRow}>
                <Typography
                  title="Account Number:"
                  type="body-r"
                  style={styles.infoLabel}
                />
                <Typography
                  title={destinationAccount?.accountNumber || ''}
                  type="body-r"
                  style={styles.infoValue}
                />
              </View>

              {destinationAccount?.bankName ? (
                <View style={styles.infoRow}>
                  <Typography
                    title="Bank:"
                    type="body-r"
                    style={styles.infoLabel}
                  />
                  <Typography
                    title={destinationAccount.bankName}
                    type="body-r"
                    style={styles.infoValue}
                  />
                </View>
              ) : null}

              <View style={styles.infoRow}>
                <Typography
                  title="Account Name:"
                  type="body-r"
                  style={styles.infoLabel}
                />
                <Typography
                  title={destinationAccount?.accountName || ''}
                  type="body-r"
                  style={styles.infoValue}
                />
              </View>
            </View>

            <View style={styles.formGroup}>
              <TextInput
                type="text"
                label="Beneficiary Name (Optional)"
                placeholder="Enter a custom name or leave blank to use account name"
                value={beneficiaryName}
                onChangeText={handleNameChange}
                error={error}
              />
              <Typography
                title="Leave blank to use the account name"
                type="body-r"
                style={styles.helperText}
              />
            </View>

            {/* Submit Button */}
            <Button
              title="Save Beneficiary"
              onPress={handleSubmit}
              style={styles.submitButton}
            />

            {/* {isLoading && (
              <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0066CC" />
                <Typography 
                  title="Adding beneficiary..." 
                  type="body-r" 
                  style={styles.loadingText} 
                />
              </View>
            )} */}
          </View>
        )}
      </View>
    </ModalWrapper>
  );
}
