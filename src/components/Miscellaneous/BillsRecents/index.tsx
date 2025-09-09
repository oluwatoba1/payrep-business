import {Image, View} from 'react-native';
import {FlatList, Pressable} from 'react-native-gesture-handler';
import {Typography} from '../../Forms';
import styles from './styles';
import ComponentImages from '../../../../assets/images/components';

interface IRecents {
  name: string;
  id: string;
}
interface ItemProps {
  name: string;
  id: string;
}
interface RecentsProps {
  recents: IRecents[];
}

const Item = ({name, id}: ItemProps) => {
  return (
    <Pressable style={styles.recent}>
      <View style={styles.recentProfile}>
        <Typography title={name.charAt(0).toUpperCase()} type="body-sb" />
      </View>
      <Typography title={name} type="body-sb" />
      <Typography title={id} type="label-r" />
    </Pressable>
  );
};

export default function BillsRecents({recents}: RecentsProps) {
  return (
    <View style={styles.recentsContainer}>
      <Typography
        title="A quick overview of recent subscriptions"
        type="body-r"
      />

      {recents.length > 0 ? (
        <View style={styles.recentsOuter}>
          <FlatList
            data={recents}
            renderItem={({item}) => <Item {...item} />}
            keyExtractor={(_, index) => String(index)}
            horizontal
            contentContainerStyle={styles.recents}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      ) : (
        <View style={styles.recentsEmpty}>
          <Image
            source={ComponentImages.transactions.emptyBox}
            style={styles.emptyBox}
          />
          <Typography
            title="Sorry! You do not have a transaction for a cable subscription."
            type="label-r"
            style={{textAlign: 'center'}}
          />
        </View>
      )}
    </View>
  );
}
