import {ScrollView, View} from 'react-native';
import {MainLayout} from '@components/Layout';
import {SearchInput, Typography} from '@components/Forms';
import {useEffect, useState} from 'react';
import {generalStyles} from '../../../styles';
import {NetworkCard} from '@components/Cards';

const networkItems = [
  {
    bankName: 'Access Bank',
    cardTypes: [
      {cardName: 'Mastercard', percent: 75},
      {cardName: 'Verve', percent: 75},
      {cardName: 'Visa', percent: 90},
    ],
  },
  {
    bankName: 'Sterling bank',
    cardTypes: [
      {cardName: 'MasterCard', percent: 80},
      {cardName: 'Verve', percent: 60},
      {cardName: 'Visa', percent: 60},
    ],
  },
];

export default function CardPaymentNetwork() {
  const [searchText, setSearchText] = useState<string>('');
  const [filteredNetworkItems, setFilteredNetworkItems] =
    useState(networkItems);

  const onSearch = (value: string) => {
    setSearchText(value);
    if (!value) {
      setFilteredNetworkItems(networkItems);
      return;
    }

    const lowercasedValue = value.toLowerCase();
    const filteredItems = networkItems.filter(item =>
      item.bankName.toLowerCase().includes(lowercasedValue),
    );
    setFilteredNetworkItems(filteredItems);
  };

  useEffect(() => {
    setFilteredNetworkItems(networkItems);
  }, []);

  return (
    <MainLayout backAction={() => {}}>
      <View style={generalStyles.container}>
        <View style={generalStyles.titleContainer}>
          <Typography type="heading4-sb" title="Card Payment Network" />
          <SearchInput
            searchPlaceholder="Search Card Network"
            searchText={searchText}
            onSearch={onSearch}
            style={generalStyles.searchTextColor}
          />
        </View>

        <ScrollView showsHorizontalScrollIndicator={false}>
          <NetworkCard
            networkItems={filteredNetworkItems}
            networkcardType="cards"
          />
        </ScrollView>
      </View>
    </MainLayout>
  );
}
