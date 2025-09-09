import {ScrollView, View} from 'react-native';
import {MainLayout} from '@components/Layout';
import {SearchInput, Typography} from '@components/Forms';
import {useEffect, useState} from 'react';
import {generalStyles} from '../../../styles';
import {NetworkCard} from '@components/Cards';

const networkItems = [
  {
    bankName: 'Sterling Bank',
    percent: 40,
    description: 'Unstable network',
  },
  {
    bankName: 'Access Bank',
    percent: 80,
    description: 'Stable network',
  },
  {
    bankName: 'Eco Bank',
    percent: 40,
    description: 'Unstable network',
  },
];

export default function BankTransferNetwork() {
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
          <Typography type="heading4-sb" title="Bank Transfer Network" />
          <SearchInput
            searchPlaceholder="Search Bank"
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
