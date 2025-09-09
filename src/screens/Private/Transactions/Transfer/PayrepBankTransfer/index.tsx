import {useState} from 'react';
import {ActivityIndicator, Image, Pressable, View} from 'react-native';
import {StackNavigationProp, StackScreenProps} from '@react-navigation/stack';

import {Button, TextInput, Typography} from '@components/Forms';
import {MainLayout} from '@components/Layout';
import ComponentImages from '@assets/images/components';
import {AccountDetailsCard} from '@components/Cards';
import {TransferStackParamList} from '@navigation/types';
import TransferBeneficiaryModal, {
  IBeneficiaryOption,
} from '@components/Modal/TransferBeneficiaryModal';
import BeneficiaryCard from '@components/Cards/BeneficiaryCard';
import {styles} from './styles';
import Pad from '@components/Pad';

type BankTransferScreenNavigationProp = StackNavigationProp<
  TransferStackParamList,
  'PayrepBankTransfer'
>;

const User = {
  id: '101',
  name: 'Muhammad',
  acctNumber: '2260173542',
  walletBalance: '570,000.96',
  earnings: {
    commission: 'N100,000',
    terminals: '50',
    bonus: 'N10,000',
  },
};

interface IBank {
  name: string;
  code: string;
}

const beneficiaries: IBeneficiaryOption[] = [
  {
    bank_code: '1',
    name: 'Abdullahi Musa',
    bank_name: 'Access Bank',
    account_number: '1012123300',
  },
  {
    bank_code: '2',
    name: 'Abdullahi Musa',
    bank_name: 'Access Bank',
    account_number: '1012123300',
  },
  {
    bank_code: '3',
    name: 'Abdullahi Omeiza Hakken',
    bank_name: 'Access Bank',
    account_number: '1012123300',
  },
  {
    bank_code: '4',
    name: 'Abdullahi Musa',
    bank_name: 'Access Bank',
    account_number: '1012123300',
  },
  {
    bank_code: '5',
    name: 'Abdullahi Musa',
    bank_name: 'Access Bank',
    account_number: '1012123300',
  },
];

type PayrepBankTransferProps = StackScreenProps<
  TransferStackParamList,
  'PayrepBankTransfer'
>;

export default function PayrepBankTransfer({
  navigation: {navigate, goBack},
}: PayrepBankTransferProps) {
  const [showTransferBeneficiaryModal, setShowTransferBeneficiaryModal] =
    useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [accountNumber, setAccountNumber] = useState<string>('');
  const [showBeneficiaryCard, setShowBeneficiaryCard] = useState(false);
  const [selectedBeneficiary, setSelectedBeneficiary] = useState({
    name: '',
    code: '',
    bankName: '',
    accountNumber: '',
  });

  const handleClose = () => {
    setShowBeneficiaryCard(false);
    setAccountNumber('');
  };

  const handleBeneficiary = () => {
    setShowTransferBeneficiaryModal(!showTransferBeneficiaryModal);
  };

  const handleScreenNavigation = () => {
    navigate('ConfirmTransaction');
  };

  const handleAccountNumberChange = (text: string) => {
    setAccountNumber(text);
    if (text.length === 10) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setShowBeneficiaryCard(true);
      }, 2000);
    } else {
      setShowBeneficiaryCard(false);
    }
  };

  return (
    <MainLayout backAction={goBack} keyboardAvoidingType="scroll-view">
      <TransferBeneficiaryModal
        showModal={showTransferBeneficiaryModal}
        onClose={() => setShowTransferBeneficiaryModal(false)}
        onSelect={() => {}}
        options={beneficiaries}
      />
      <Typography title="Transfer to Payrep Account" type="heading5-sb" />

      <View>
        <AccountDetailsCard
          accountNumber="070236484927"
          accountName="John Doe"
          walletBalance={User.walletBalance}
          showDetails={false}
        />
      </View>
      <View>
        <View>
          {!showBeneficiaryCard && (
            <View>
              <View>
                <TextInput
                  label="Account Number"
                  type="text"
                  placeholder="Enter the account"
                  keyboardType="numeric"
                  error=""
                  value=""
                  maxLength={10}
                  onChangeText={handleAccountNumberChange}
                />
                <Pressable
                  style={styles.doubleUserTeamContainer}
                  onPress={handleBeneficiary}>
                  <Image
                    style={styles.doubleUserIcon}
                    source={ComponentImages.Wallet.teamLine}
                  />
                  <Typography title="Select Beneficiary" type="body-sb" />
                </Pressable>
              </View>

              {/* <Dropdown
                                    label="Select Bank"
                                    value={selectedBank.name}
                                    onTrigger={() => setShowBankModal(true)}
                                /> */}
            </View>
          )}
          {isLoading && <ActivityIndicator size="small" color="#0000ff" />}
        </View>

        {showBeneficiaryCard && !isLoading && (
          <BeneficiaryCard
            accountName={selectedBeneficiary.name}
            accountNumber={selectedBeneficiary.accountNumber}
            bankName={selectedBeneficiary.bankName}
            showCard={showBeneficiaryCard}
            onClose={handleClose}
          />
        )}
        <View style={{marginVertical: 24}}>
          <TextInput
            label="Amount"
            type="text"
            placeholder="Enter Amount"
            keyboardType="numeric"
            error=""
            value=""
            onChangeText={() => {}}
          />
          <TextInput
            label="Narration"
            multiline={true}
            numberOfLines={5}
            type="text"
            error=""
            placeholder="Enter Narration"
            value=""
            onChangeText={() => {}}
          />
        </View>
      </View>

      <Pad size={30} />

      <Button title="Confirm Transaction" onPress={handleScreenNavigation} />
    </MainLayout>
  );
}
