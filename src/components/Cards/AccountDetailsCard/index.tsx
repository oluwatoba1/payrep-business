import {Fragment, useState} from 'react';
import {
  FlatList,
  Image,
  ImageBackground,
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
import Pad from '@components/Pad';

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
  onSelectAccountNumber?: Function;
}

export default function AcctDetailsCard({
  accountName,
  accountNumber,
  walletBalance,
  showDetails = true,
  showActions = true,
  actions = [],
  onSelectAccountNumber,
  showAccountModalOnPress = () => {},
}: AcctDetailsProps) {
  const [isBalanceHidden, setIsBalanceHidden] = useState(true);

  const toggleBalanceVisibility = () => {
    setIsBalanceHidden(!isBalanceHidden);
  };

  const onTap = () => {
    Clipboard.setString(accountNumber);
    onSelectAccountNumber &&
      onSelectAccountNumber('success', 'Account number copied to clipboard');
  };

  return (
    <View>
      <ImageBackground
        source={ComponentImages.accountDetailsCard.accountCard}
        style={styles.container}
        imageStyle={styles.imageContainer}>
        <Row alignItems="center" justifyContent="space-between">
          <View>
            <Typography title="Balance" type="label-sb" color="#434F56" />
            <Pad />
            <View style={styles.balance}>
              {isBalanceHidden ? (
                <View style={styles.nairaBalanceArea}>
                  <Typography
                    title="₦"
                    type="heading4-b"
                    color={Colors.black}
                  />
                  <Typography
                    title={walletBalance}
                    type="heading4-b"
                    color={Colors.black}
                    style={{verticalAlign: 'middle'}}
                  />
                </View>
              ) : (
                <Row gap={4}>
                  {Array.from(Array(6).keys()).map((_, i) => (
                    <View key={i} style={styles.hiddenDot} />
                  ))}
                </Row>
              )}
              <TouchableOpacity onPress={toggleBalanceVisibility}>
                <Image source={IconImages.icon.eye} style={styles.hideIcon} />
              </TouchableOpacity>
            </View>
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
            <Pad />
            <Row
              gap={8}
              justifyContent="space-between"
              containerStyle={{width: '100%'}}>
              <TouchableOpacity
                onPress={onTap}
                style={styles.accountNumberContainer}>
                <Typography
                  title={accountNumber}
                  type="body-sb"
                  color={Colors.black}
                />
                <Image
                  source={IconImages.icon.copyDark}
                  style={styles.copyIcon}
                />
              </TouchableOpacity>
            </Row>
          </View>
        </Row>
      </ImageBackground>
      <Pad size={16} />
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
