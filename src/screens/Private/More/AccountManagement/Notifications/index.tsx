import {View} from 'react-native';
import {MainLayout} from '../../../../../components/Layout';
import {generalStyles} from '../../styles';
import {Typography} from '../../../../../components/Forms';
import {styles} from './styles';
import {useState} from 'react';
import CustomSwitch from '../../../../../components/Forms/CustomSwitch';

export default function Notification() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [pendingTransfer, setPendingTransfer] = useState(true);
  const [failedTransaction, setFailedTransaction] = useState(true);
  const [commissionBonusAlert, setCommissionBonusAlert] = useState(true);
  return (
    <MainLayout backAction={() => {}}>
      <View style={generalStyles.container}>
        <Typography title="Notifications" type="heading4-sb" />
        <View style={styles.itemContainer}>
          <Typography title="Enable Notification" type="subheading" />
          <CustomSwitch
            value={notificationsEnabled}
            onValueChange={() => setNotificationsEnabled(prev => !prev)}
          />
        </View>
        <Typography title="Notify Me About" />
        <View style={styles.itemContainer}>
          <Typography title="Pending Transfer" type="subheading" />
          <CustomSwitch
            value={pendingTransfer}
            onValueChange={() => setPendingTransfer(prev => !prev)}
          />
        </View>
        <View style={styles.itemContainer}>
          <Typography title="Failed Transaction" type="subheading" />
          <CustomSwitch
            value={failedTransaction}
            onValueChange={() => setFailedTransaction(prev => !prev)}
          />
        </View>
        <View style={styles.itemContainer}>
          <Typography title="Alert on commission and Bonus" type="subheading" />
          <CustomSwitch
            value={commissionBonusAlert}
            onValueChange={() => setCommissionBonusAlert(prev => !prev)}
          />
        </View>
      </View>
    </MainLayout>
  );
}
