import {FlatList, Image, SafeAreaView, View, Pressable} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {useNavigation} from '@react-navigation/native';

import styles from './styles';
import ComponentImages from '@assets/images/components';
import {useState} from 'react';
import {Button, Typography} from '@components/Forms';
import Colors from '@theme/Colors';
import {scale, scaleHeight} from '@utils/Helpers';
import {HomeStackParamList} from '@navigation/types';
import Pad from '@components/Pad';

type ScreenNavigationProps = StackNavigationProp<
  HomeStackParamList,
  'Earnings'
>;
interface IEarningsData {
  id: string;
  title: string;
  cardType: 'commission' | 'bonus';
  action: () => void;
}

interface EarningsProps {
  earnings: {[key: string]: string};
  earningsData: IEarningsData[];
}

interface EarningsCardItemProps {
  cardType: string;
  earnings: {[key: string]: string};
  onPress: () => void;
}

const EarningsCardItem = ({
  cardType,
  earnings,
  onPress,
}: EarningsCardItemProps) => {
  let nairaValue;
  let title;
  let style;

  const [isHidden, setIsHidden] = useState(true);
  const navigation = useNavigation<ScreenNavigationProps>();
  const toggleBalanceVisibility = () => {
    setIsHidden(!isHidden);
  };

  switch (cardType) {
    case 'commission':
      title = 'Commission';
      style = styles.itemCommission;
      nairaValue = earnings[cardType];
      return (
        <View style={style}>
          <View style={styles.cashoutContainer}>
            <Button
              title="Cashout"
              textStyle={{color: Colors.white}}
              containerStyle={styles.cashoutButton}
              onPress={onPress}
            />
          </View>
          <Pad size={4} />
          <View style={styles.details}>
            <Typography
              title={title}
              type="label-sb"
              color={Colors.gray['base']}
            />
            <View style={styles.balanceRow}>
              <Typography
                title={isHidden ? '*********' : nairaValue}
                type="heading4-b"
              />
              <Pressable onPress={toggleBalanceVisibility}>
                <Image
                  source={ComponentImages.earnings.eyeLine}
                  style={styles.viewIcon}
                />
              </Pressable>
            </View>
          </View>
          <View style={styles.images}>
            <Image
              source={ComponentImages.earnings.commissionsIcon}
              style={{width: scale(72), ...styles.icon}}
            />
          </View>
          <View
            style={{
              backgroundColor: Colors.gray['600'],
              width: scale(372),
              height: scaleHeight(74),
              transform: [{rotate: '-30deg'}],
              left: -0.51,
              bottom: 70,
              zIndex: -1,
            }}
          />
        </View>
      );
    case 'bonus':
      title = 'Bonus';
      style = styles.itemBonus;
      nairaValue = earnings[cardType];
      return (
        <View style={style}>
          <View style={styles.cashoutContainer}>
            <Button
              title="Cashout"
              textStyle={{color: Colors.white}}
              containerStyle={styles.cashoutButton}
              onPress={onPress}
            />
          </View>
          <Pad size={4} />
          <View style={styles.details}>
            <Typography
              title={title}
              type="label-sb"
              color={Colors.gray['base']}
            />
            <View style={styles.balanceRow}>
              <Typography
                title={isHidden ? '*********' : nairaValue}
                type="heading4-b"
              />
              <Pressable onPress={toggleBalanceVisibility}>
                <Image
                  source={ComponentImages.earnings.eyeLine}
                  style={styles.viewIcon}
                />
              </Pressable>
            </View>
          </View>
          <View style={styles.images}>
            <Image
              source={ComponentImages.earnings.bonusIcon}
              style={{width: scale(85), ...styles.icon}}
            />
          </View>
          <View
            style={{
              backgroundColor: Colors.gray['600'],
              width: scale(372),
              height: scaleHeight(74),
              transform: [{rotate: '-30deg'}],
              left: -0.51,
              bottom: 70,
              zIndex: -1,
            }}
          />
        </View>
      );
    default:
      return null;
  }
};

export default function EarningsCard({earnings, earningsData}: EarningsProps) {
  const filteredData = earningsData.filter(item =>
    Object.keys(earnings).includes(item.cardType),
  );
  return (
    <View style={styles.container}>
      <FlatList
        data={filteredData}
        renderItem={({item}) => (
          <EarningsCardItem
            {...item}
            earnings={earnings}
            onPress={() => item.action()}
          />
        )}
        keyExtractor={item => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
}
