import {Image, TouchableOpacity, View} from 'react-native';
import {MainLayout} from '../../../../../components/Layout';
import styles from './styles';
import {SearchBar, Typography} from '../../../../../components/Forms';
import Pad from '../../../../../components/Pad';
import React, {useState} from 'react';
import {TerminalsCard} from '../../../../../components/Cards';
import Colors from '../../../../../theme/Colors';
import IconImages from '../../../../../../assets/images/appIcons';

let terminals = [
  {
    serialNo: 'P260300466206',
    transactionsCount: '2,300',
    withdrawalsCount: '500',
    withdrawalAmount: '48,500,000',
    lastTransaction: '14 of Aug, 2024:12:30pm',
  },
  {
    serialNo: 'P260300466206',
    transactionsCount: '2,300',
    withdrawalsCount: '500',
    withdrawalAmount: '48,500,000',
    lastTransaction: '14 of Aug, 2024:12:30pm',
  },
  {
    serialNo: 'P260300466206',
    transactionsCount: '2,300',
    withdrawalsCount: '500',
    withdrawalAmount: '48,500,000',
    lastTransaction: '14 of Aug, 2024:12:30pm',
  },
  {
    serialNo: 'P260300466206',
    transactionsCount: '2,300',
    withdrawalsCount: '500',
    withdrawalAmount: '48,500,000',
    lastTransaction: '14 of Aug, 2024:12:30pm',
  },
  {
    serialNo: 'P260300466206',
    transactionsCount: '2,300',
    withdrawalsCount: '500',
    withdrawalAmount: '48,500,000',
    lastTransaction: '14 of Aug, 2024:12:30pm',
  },
  {
    serialNo: 'P260300466206',
    transactionsCount: '2,300',
    withdrawalsCount: '500',
    withdrawalAmount: '48,500,000',
    lastTransaction: '14 of Aug, 2024:12:30pm',
  },
];

let User = {
  walletBalance: '1,000,000',
  terminals: 2,
  name: 'Oluwatoba Folarin J',
  company: 'Payrep LTD.',
};

export default function Terminals() {
  const [isFilterHidden, setIsFilterHidden] = useState(true);

  const toggleFilterVisibility = () => {
    setIsFilterHidden(!isFilterHidden);
  };
  return (
    <MainLayout backAction={() => null}>
      <View style={styles.container}>
        <Typography title="Terminals" type="heading4-sb" />
        <Typography
          title="Efficiently manage and review all transactions across your terminals"
          type="body-r"
        />
        <Pad size={16} />
        <View style={styles.filterArea}>
          <View style={{width: '75%'}}>
            <SearchBar title="Search transactions" />
          </View>
          <View style={styles.filterContainer}>
            <TouchableOpacity
              style={styles.filter}
              onPress={toggleFilterVisibility}>
              <Image
                source={IconImages.icon.filter}
                style={styles.filterIcon}
              />
              <Typography
                title="Filter"
                type="body-b"
                color={Colors.gray[600]}
              />
            </TouchableOpacity>
          </View>
        </View>
        <Pad size={24} />
        <TerminalsCard terminals={terminals} />
      </View>
    </MainLayout>
  );
}
