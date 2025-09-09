import React from 'react';
import { Pressable, View } from "react-native";
import SearchModal from "../SearchModal";
import { Typography } from "../../Forms";
import { modalMainStyles } from '../styles';
import { styles } from './styles';


interface IDropdownItem {
  name: string;
  code: string;
  percentage: string;
}

interface InterestRateModalProps {
  showModal: boolean;
  options: IDropdownItem[];
  value: string;
  onClose: () => void;
  onSelect: (item: IDropdownItem) => void;
}

export default function InterestRateModal({
  showModal,
  onClose,
  onSelect,
  options,
}: InterestRateModalProps) {

  const renderDropdownItem = (item: IDropdownItem) =>  (
    <Pressable onPress={() => onSelect(item)} style={[modalMainStyles.card]}>
      <View style={[modalMainStyles.textContainer, styles.rateContainer]}>
        <Typography title={item.name} type='subheading-sb' />
        <Typography 
          title={item.percentage} 
          type='body-r' 
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
      title="Interest Rate on Duration"
      searchPlaceholder="Search Interest Rate..."
      renderDropdownItem={renderDropdownItem}
      showSearchInput={false}
    />
  );
}

