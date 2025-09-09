import {ScrollView, View} from 'react-native';
import {MainLayout} from '@components/Layout';
import {SearchInput, Typography} from '@components/Forms';
import {useEffect, useState} from 'react';
import {generalStyles} from '../../../styles';
import {NetworkCard} from '@components/Cards';

const networkItems = [
  {
    bankName: 'MTN',
    percent: 90,
    description: 'Fast and Reliable',
  },
  {
    bankName: 'Airtel',
    percent: 75,
    description: 'Good network',
  },
  {
    bankName: 'Glo',
    percent: 50,
    description: 'Moderate speed',
  },
  {
    bankName: '9mobile',
    percent: 30,
    description: 'Slower speed',
  },
];

export default function AirtimeDataNetwork() {
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
          <Typography type="heading4-sb" title="Airtime & Data Network" />
          <SearchInput
            searchPlaceholder="Search Network"
            searchText={searchText}
            onSearch={onSearch}
            style={generalStyles.searchTextColor}
          />
        </View>

        <ScrollView showsHorizontalScrollIndicator={false}>
          <NetworkCard
            networkItems={filteredNetworkItems}
            networkcardType="default"
          />
        </ScrollView>
      </View>
    </MainLayout>
  );
}
