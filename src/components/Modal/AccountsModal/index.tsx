import {FlatList, Pressable, View} from 'react-native';

import Pad from '@components/Pad';
import ModalWrapper from '../ModalWrapper';
import {Typography} from '@components/Forms';
import styles from './styles';
import Colors from '@theme/Colors';
import {addCommas, scaleHeight} from '@utils/Helpers';

interface Account {
  id: string;
  account_number: string;
  account_name: string;
  account_class: 'primary' | 'secondary';
  status: boolean;
  balance: number;
  account_type: string;
  commission: string;
  bonus: string;
}

interface AccountsModalProps {
  showModal: boolean;
  onClose: () => void;
  onAccountSelect: (account: Account) => void;
  accounts: Account[];
}

export default function AccountsModal({
  showModal,
  onClose,
  onAccountSelect,
  accounts,
}: AccountsModalProps) {
  return (
    <ModalWrapper
      visible={showModal}
      onClose={onClose}
      modalContentStyle={{height: scaleHeight(500)}}>
      <Pad size={20} />
      <FlatList<Account>
        data={accounts}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) => (
          <Pressable
            onPress={() => [onAccountSelect(item), onClose()]}
            style={[
              styles.itemContainer,
              {
                borderBottomWidth: index !== accounts.length - 1 ? 1 : 0,
              },
            ]}>
            <View style={styles.accountDetails}>
              <Typography
                title={item.account_number}
                type="body-sb"
                color={Colors.black}
              />
              <View
                style={[
                  styles.accountClassBadge,
                  {
                    backgroundColor:
                      item.account_class === 'primary'
                        ? Colors.primary['base']
                        : Colors.custom.blue1,
                  },
                ]}>
                <Typography
                  title={item.account_class.toUpperCase()}
                  type="label-r"
                  color={Colors.black}
                />
              </View>
            </View>
            <Typography
              title={item.account_name}
              type="body-r"
              color={Colors.gray[900]}
            />
            <Typography
              title={`₦${item.balance ? addCommas(item.balance) : '0.00'}`}
              type="body-sb"
              color={Colors.gray[900]}
            />
          </Pressable>
        )}
      />
    </ModalWrapper>
  );
}
