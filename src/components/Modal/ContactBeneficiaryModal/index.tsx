import React from 'react';
import {Pressable, View} from 'react-native';
import SearchModal from '../SearchModal';
import {Typography} from '../../Forms';
import {modalMainStyles} from '../styles';

interface IDropdownItem {
  name: string;
  code: string;
  bankName?: string;
  accountNumber?: string;
}

interface ContactBeneficiaryModalProps {
  showModal: boolean;
  options: IDropdownItem[];
  value: string;
  onClose: () => void;
  onSelect: (item: IDropdownItem) => void;
}

const getShortName = (name: string) => {
  const parts = name.split(' ');
  if (parts.length > 1) {
    return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
  }
  return name.substring(0, 2).toUpperCase();
};

export default function ContactBeneficiaryModal({
  showModal,
  onClose,
  onSelect,
  options,
}: ContactBeneficiaryModalProps) {
  const renderDropdownItem = (item: IDropdownItem) => (
    <Pressable onPress={() => onSelect(item)} style={modalMainStyles.card}>
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
            item.bankName
              ? `${item.bankName} (${item.accountNumber ?? ''})`
              : item.accountNumber ?? ''
          }
          type="body-r"
        />
      </View>
    </Pressable>
  );

  return (
    <SearchModal<IDropdownItem>
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
