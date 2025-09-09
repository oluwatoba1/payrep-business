import React from 'react';
import {Pressable, View} from 'react-native';
import SearchModal from '../SearchModal';
import {Typography} from '../../Forms';
import {modalMainStyles} from '../styles';

export interface IBeneficiaryOption {
  name: string;
  bank_code: string;
  bank_name: string;
  account_number: string;
}

interface TransferBeneficiaryModalProps {
  showModal: boolean;
  options: IBeneficiaryOption[];
  onClose: () => void;
  onSelect: (item: IBeneficiaryOption) => void;
}

const getShortName = (name: string) => {
  const parts = name.split(' ');
  if (parts.length > 1) {
    return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
};

export default function TransferBeneficiaryModal({
  showModal,
  onClose,
  onSelect,
  options,
}: TransferBeneficiaryModalProps) {
  const renderDropdownItem = (item: IBeneficiaryOption) => (
    <Pressable
      onPress={() => onSelect(item)}
      style={modalMainStyles.card}
      key={item.account_number}>
      <View style={modalMainStyles.iconContainer}>
        <Typography
          title={getShortName(item.name)}
          type="subheading-sb"
          style={modalMainStyles.iconText}
        />
      </View>
      <View style={modalMainStyles.textContainer}>
        <Typography title={item.name} type="subheading-sb" />
        <Typography
          title={
            item.bank_name
              ? `${item.bank_name} (${item.account_number})`
              : `${item.account_number}`
          }
          type="body-r"
        />
      </View>
    </Pressable>
  );

  return (
    <SearchModal<IBeneficiaryOption>
      showModal={showModal}
      onClose={onClose}
      options={options}
      value=""
      onSelect={onSelect}
      title="Select Beneficiary"
      searchPlaceholder="Search Beneficiaries..."
      renderDropdownItem={renderDropdownItem}
    />
  );
}
