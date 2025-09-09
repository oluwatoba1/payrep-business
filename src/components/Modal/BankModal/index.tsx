import {FlatList, Image, ImageProps, Pressable, View} from 'react-native';
import {DropDownStyles} from './styles';
import ComponentImages from '../../../../assets/images/components';
import {Button, SearchInput, Typography} from '../../Forms';
import {useCallback, useEffect, useState} from 'react';
import {modalMainStyles} from '../styles';
import ModalWrapper from '../ModalWrapper';

interface IDropdownItem {
  name: string;
  code: string;
  image?: ImageProps;
}

interface IBank {
  name: string;
  code: string;
  image?: ImageProps;
}

interface BankModalProps {
  showModal: boolean;
  onClose: () => void;
  options: IDropdownItem[];
  value: string;
  onSelect: (item: IDropdownItem) => void;
  bankSearchPlaceHolder?: string;
  bankModalTitle?: string;
  isLoadingMore?: boolean;
  onViewMore?: (item?: IBank) => void;
}

export default function BankModal({
  showModal,
  onClose,
  options,
  value,
  onSelect,
  bankSearchPlaceHolder = 'Search for a bank',
  bankModalTitle = 'Select Bank',
  isLoadingMore = false,
  onViewMore,
}: BankModalProps) {
  const [searchText, setSearchText] = useState<string>('');
  const [filteredDropdownOptions, setFilteredDropdownOptions] = useState<
    IDropdownItem[]
  >([]);
  const [showingAllBanks, setShowingAllBanks] = useState<boolean>(false);
  const [isSearching, setIsSearching] = useState<boolean>(false);

  const onSearch = (value: string) => {
    const escapedTerm = value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    setSearchText(escapedTerm);
    setIsSearching(true);
    if (!escapedTerm) {
      setFilteredDropdownOptions(options);
      setIsSearching(false);
      return;
    }
    const pattern = new RegExp(escapedTerm, 'i');
    const filtered = options.filter((option: IDropdownItem) =>
      pattern.test(option.name),
    );

    setFilteredDropdownOptions(filtered);
    setIsSearching(false);
  };

  const handleSelect = (item: IDropdownItem) => {
    onSelect(item);
    onClose();
  };

  const handleViewMore = useCallback(async () => {
    if (onViewMore) {
      try {
        await onViewMore();
        setShowingAllBanks(true);
      } catch (error) {}
    }
  }, [onViewMore]);

  useEffect(() => {
    setFilteredDropdownOptions(options);
    setShowingAllBanks(false);
  }, [options]);

  const DropdownItem = ({...item}: IDropdownItem) => {
    return (
      <Pressable style={DropDownStyles.item} onPress={() => handleSelect(item)}>
        {/* bank icon */}
        <View style={DropDownStyles.bankTitle}>
          {item.image && (
            <Image source={item.image} style={DropDownStyles.bankImage} />
          )}
          <Typography title={item.name} type="subheading-sb" />
        </View>
        <View style={DropDownStyles.checkbox}>
          {value === item.code ? (
            <Image
              style={DropDownStyles.checkbox}
              source={ComponentImages.Wallet.checkMarked}
            />
          ) : (
            <Image
              style={DropDownStyles.checkbox}
              source={ComponentImages.Wallet.unCheckedMark}
            />
          )}
        </View>
      </Pressable>
    );
  };

  const renderFooter = () => {
    if (!showingAllBanks && filteredDropdownOptions.length > 0 && onViewMore) {
      return (
        <View style={DropDownStyles.footerContainer}>
          <Pressable
            onPress={handleViewMore}
            style={DropDownStyles.viewMoreWrapper}
            android_ripple={{color: 'rgba(0, 0, 0, 0.1)', borderless: false}}>
            <Typography
              title="View More"
              type="subheading-sb"
              style={DropDownStyles.viewMoreText}
            />
            <Image
              source={ComponentImages.dropdDown.arrowDown}
              style={DropDownStyles.viewMoreIcon}
            />
          </Pressable>
        </View>
      );
    }
    return null;
  };

  const renderEmptyComponent = () => {
    if (searchText) {
      return (
        <View style={DropDownStyles.emptyContainer}>
          <Image
            source={ComponentImages.transactions.emptyBox}
            style={DropDownStyles.emptyIcon}
          />
          <Typography
            title={`No banks found matching "${searchText}"`}
            type="body-r"
          />
          {!showingAllBanks && onViewMore && (
            <Button
              title="View All Banks"
              onPress={handleViewMore}
              style={[
                DropDownStyles.viewMoreButton,
                DropDownStyles.viewAllButton,
              ]}
            />
          )}
        </View>
      );
    }
    return (
      <View style={DropDownStyles.emptyContainer}>
        <Image
          source={ComponentImages.transactions.emptyBox}
          style={DropDownStyles.emptyIcon}
        />
        <Typography title="Sorry! No banks available" type="body-r" />
      </View>
    );
  };

  const isLoading = isLoadingMore || isSearching;
  return (
    <ModalWrapper visible={showModal} onClose={onClose} isLoading={isLoading}>
      <View style={DropDownStyles.modalHeader}>
        <Typography title={bankModalTitle} />
        <Pressable style={DropDownStyles.buttonClose} onPress={onClose}>
          <Typography title="Close" />
        </Pressable>
      </View>
      <View style={modalMainStyles.searchContainer}>
        <SearchInput
          searchPlaceholder={bankSearchPlaceHolder}
          searchText={searchText}
          onSearch={onSearch}
        />
      </View>
      {filteredDropdownOptions?.length > 0 ? (
        <FlatList<IDropdownItem>
          data={filteredDropdownOptions}
          renderItem={({item}) => <DropdownItem {...item} />}
          keyExtractor={item => item.code}
          ListFooterComponent={renderFooter}
        />
      ) : (
        renderEmptyComponent()
      )}
    </ModalWrapper>
  );
}
