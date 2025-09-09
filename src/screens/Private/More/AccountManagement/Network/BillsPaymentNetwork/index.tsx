import {useEffect, useState} from 'react';
import {ScrollView, View} from 'react-native';
import {MainLayout} from '@components/Layout';
import {SearchInput, Typography} from '@components/Forms';
import {generalStyles} from '../../../styles';
import {NetworkCard} from '@components/Cards';

const networkItems = [
  {
    bankName: 'PHCN',
    percent: 60,
    description: 'stable network',
  },
  {
    bankName: 'DSTV',
    percent: 90,
    description: 'excellent network',
  },
  {
    bankName: 'GOTV',
    percent: 70,
    description: 'stable network',
  },
  {
    bankName: 'Water Board',
    percent: 50,
    description: 'stable network',
  },
];

export default function BillsPaymentNetwork() {
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
          <Typography type="heading4-sb" title="Bills Payment Network" />
          <SearchInput
            searchPlaceholder="Search Bill Service"
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
