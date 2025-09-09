import React from 'react';
import {Pressable, View} from 'react-native';
import SearchModal from '../SearchModal';
import {Typography} from '../../Forms';
import {modalMainStyles} from '../styles';

interface IDropdownItem {
  name: string;
  code: string;
}

interface AnnualIncomeModalProps {
  showModal: boolean;
  options: IDropdownItem[];
  value?: string;
  onClose: () => void;
  onSelect: (item: IDropdownItem) => void;
}

export default function AnnualIncomeModal({
  showModal,
  onClose,
  onSelect,
  options,
}: AnnualIncomeModalProps) {
  const renderDropdownItem = (item: IDropdownItem) => (
    <Pressable onPress={() => onSelect(item)} style={modalMainStyles.card}>
      <View style={modalMainStyles.textContainer}>
        <Typography title={item.name} type="body-r" />
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
      title="Annual Income"
      renderDropdownItem={renderDropdownItem}
      showSearchInput={false}
    />
  );
}
