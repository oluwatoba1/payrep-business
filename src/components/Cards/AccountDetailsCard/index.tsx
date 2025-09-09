import {Fragment, useState} from 'react';
import {
  FlatList,
  Image,
  ImageSourcePropType,
  TouchableOpacity,
  View,
} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';

import ComponentImages from '../../../../assets/images/components';
import {styles} from './styles';
import {IconButton, Typography} from '../../Forms';
import Colors from '../../../theme/Colors';
import IconImages from '../../../../assets/images/appIcons';
import ActionItem from './ActionItems';
import {Row} from '@components/Layout';

export interface IAction {
  id: string;
  title: string;
  icon: ImageSourcePropType;
  navigate: () => void;
}

interface AcctDetailsProps {
  accountName: string;
  accountNumber: string;
  walletBalance: string;
  showDetails?: boolean;
  showActions?: boolean;
  actions?: IAction[];
  showAccountModalOnPress?: () => void;
}

export default function AcctDetailsCard({
  accountName,
  accountNumber,
  walletBalance,
  showDetails = true,
  showActions = true,
  actions = [],
  showAccountModalOnPress = () => {},
}: AcctDetailsProps) {
  const [isBalanceHidden, setIsBalanceHidden] = useState(true);

  const toggleBalanceVisibility = () => {
    setIsBalanceHidden(!isBalanceHidden);
  };

  return (
    <View style={{gap: 24}}>
      <View style={styles.main}>
        <View style={styles.top}>
          <View style={styles.balanceContainer}>
            <View style={styles.cardHeader}>
              <View style={styles.cardHeaderText}>
                <Typography title="Balance" type="heading5-sb" />
              </View>
              <View style={styles.iconButtonAlignment}>
                <IconButton
                  onPress={showAccountModalOnPress}
                  containerStyle={styles.iconButtonContainerStyle}
                  activeOpacity={0.7}>
                  <Image
                    source={ComponentImages.dropdDown.arrowDown}
                    tintColor={Colors.black}
                  />
                </IconButton>
              </View>
            </View>
            <View style={styles.balance}>
              <View style={styles.nairaBalanceArea}>
                <Typography title="₦" type="heading3-b" color={Colors.black} />
                <Typography
                  title={isBalanceHidden ? '**************' : walletBalance}
                  type="heading4-b"
                  color={Colors.black}
                  style={{verticalAlign: 'middle'}}
                />
              </View>
              <TouchableOpacity onPress={toggleBalanceVisibility}>
                <Image source={IconImages.icon.eye} style={styles.hideIcon} />
              </TouchableOpacity>
            </View>
          </View>
          {showDetails && (
            <Fragment>
              <Row
                gap={8}
                justifyContent="space-between"
                containerStyle={{width: '100%'}}>
                <Typography
                  title={accountName}
                  type="body-r"
                  color={Colors.black}
                  numberOfLines={1}
                  style={{width: '55%'}}
                />
                <View style={styles.accountNumberContainer}>
                  <Typography
                    title={accountNumber}
                    type="body-sb"
                    color={Colors.black}
                  />
                  <TouchableOpacity
                    onPress={() => Clipboard.setString(accountNumber)}>
                    <Image
                      source={IconImages.icon.copyDark}
                      style={styles.copyIcon}
                    />
                  </TouchableOpacity>
                </View>
              </Row>
            </Fragment>
          )}
        </View>
      </View>
      {showActions && (
        <View style={styles.bottom}>
          <FlatList
            data={actions}
            renderItem={({item}) => (
              <ActionItem action={item} onNavigate={item.navigate} />
            )}
            keyExtractor={item => item.id}
            horizontal
            contentContainerStyle={styles.bottom1}
          />
        </View>
      )}
    </View>
  );
}
