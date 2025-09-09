import {useState} from 'react';
import {Image, Pressable, ScrollView, View} from 'react-native';
import {MainLayout} from '@components/Layout';
import {mainSavingsStyles} from '../../styles';
import {
  Button,
  Dropdown,
  RadioButton,
  TextInput,
  Typography,
} from '@components/Forms';
import SavingsCard from '@components/Cards/SavingsCard';
import {BeneficiaryCard} from '@components/Cards';
import {StackScreenProps} from '@react-navigation/stack';
import {SavingsStackParamList} from '@navigation/types';
import {BankModal, ContactBeneficiaryModal} from '@components/Modal';

type LockedSavingsScreenProps = StackScreenProps<SavingsStackParamList>;

interface IBank {
  name: string;
  code: string;
}
const banks: IBank[] = [
  {
    name: 'Access Bank',
    code: '044',
  },
  {name: 'GTB', code: '056'},
  {name: 'Diamond Bank', code: '057'},
  {name: 'Unity Bank', code: '058'},
  {name: 'UBA', code: '060'},
  {name: 'StarBank', code: '061'},
  {name: 'JAIZ', code: '062'},
];
const beneficiaries = [
  {code: '1', name: 'Abdullahi Musa', accountNumber: '1012123300'},
  {code: '2', name: 'Abdullahi Musa', accountNumber: '1012123311'},
  {code: '3', name: 'Abdullahi Omeiza Hakken', accountNumber: '1013123300'},
  {code: '4', name: 'Yahaya Yunusa', accountNumber: '1012123301'},
  {code: '5', name: 'Critaino Ronaldo', accountNumber: '1012123320'},
  {code: '6', name: 'Lionel Messi', accountNumber: '1012123303'},
  {code: '7', name: 'Adaiza Takkan', accountNumber: '1012123310'},
];

export default function LockedSavingsWithdrawScreen({
  navigation: {navigate},
}: LockedSavingsScreenProps) {
  const [accountType, setAccountType] = useState<string>('');
  const [showAccountType, setShowAccountType] = useState<boolean>(false);
  const [showBeneficiaryCard, setShowBeneficiaryCard] =
    useState<boolean>(false);
  const [showBankModal, setShowBankModal] = useState<boolean>(false);
  const [showBankBeneficiaryModal, setShowBankBeneficiaryModal] =
    useState<boolean>(false);
  const [selectedBank, setSelectedBank] = useState<IBank>({name: '', code: ''});
  const [selectedBankBeneficiary, setSelectedBankBeneficiary] = useState({
    name: '',
    code: '',
    accountNumber: '',
  });

  const handleDropdownTrigger = () => {
    setShowAccountType(!showAccountType);
  };

  const handleRadioSelect = (value: string | number | undefined) => {
    setAccountType(value as string);
    setShowBeneficiaryCard(true);
    setShowAccountType(false);
  };

  const handleNavigate = () => {
    navigate('ConfirmSavingstransactionScreen');
  };

  const handleBankBeneficiaryModal = () => {
    setShowBankBeneficiaryModal(!showBankBeneficiaryModal);
  };
  return (
    <MainLayout backAction={() => {}}>
      <BankModal
        showModal={showBankModal}
        onClose={() => setShowBankModal(false)}
        options={banks}
        value={selectedBank.code}
        onSelect={bank => setSelectedBank(bank)}
        bankSearchPlaceHolder="Search Bank"
        bankModalTitle="Select Bank"
      />
      <ContactBeneficiaryModal
        showModal={showBankBeneficiaryModal}
        onClose={() => setShowBankBeneficiaryModal(false)}
        onSelect={beneficiary => {
          const selectedBeneficiary = {
            ...beneficiary,
            accountNumber: beneficiary.accountNumber || '',
          };
          setSelectedBankBeneficiary(selectedBeneficiary);
          setShowBeneficiaryCard(true);
          setShowBankBeneficiaryModal(false);
        }}
        options={beneficiaries}
        value={selectedBankBeneficiary.code}
      />
      <View style={mainSavingsStyles.container}>
        <View style={mainSavingsStyles.titleContainer}>
          <Typography type="heading4-sb" title="Withdraw Savings" />
          <Typography
            type="body-r"
            title="Withdrawing from easy savings to your personal account."
          />
        </View>
        <ScrollView>
          <SavingsCard
            totalSavings="N489,000"
            showWithdrawButton={false}
            showProgressBar={false}
            showImage={false}
            cardTitle="Locked Savings"
            customContainerStyle={mainSavingsStyles.lockedSavingsCard}
          />
          {accountType === 'personal_account' && (
            <TextInput placeholder="How much would you like to withdraw?" />
          )}
          <View style={mainSavingsStyles.dropdownAndButtonContainer}>
            <Dropdown
              label="Transfer to my Payrep Account"
              value={accountType ? accountType : ''}
              onTrigger={handleDropdownTrigger}
            />
            {/* {accountType === "other_bank_account" && (
                            <Pressable onPress={() => setShowBankModal(true)} style={mainSavingsStyles.selectBankButton}>
                                <Image style={mainSavingsStyles.icon} source={ScreenImages.SavingsScreen.bankIcon} />
                                <Typography title="Select Bank" type="body-sb" />
                            </Pressable>
                        )} */}
          </View>
          {showAccountType && (
            <View style={{gap: 14, margin: 16}}>
              <RadioButton
                options={[
                  {
                    title: 'Personal Bank Account',
                    value: 'personal_account',
                    width: 343,
                  },
                  // {title:"Other Bank Account", value:'other_bank_account', width:343},
                ]}
                selectedValue={accountType}
                onSelect={handleRadioSelect}
                optionContainerStyle={{height: 64}}
              />
            </View>
          )}

          {/* {accountType === "other_bank_account" && (
                        <View style={{}}>
                            <TextInput type="text" placeholder="Enter the account number" /> 
                            <Pressable onPress={handleBankBeneficiaryModal} style={{flexDirection:'row', gap:8}}>
                                <Image style={mainSavingsStyles.icon} source={ComponentImages.Wallet.teamLine}  />
                                <Typography title="Select Beneficiary" type="body-sb" />
                            </Pressable>
                        </View>
                    )} */}
          {showBeneficiaryCard && (
            <BeneficiaryCard
              accountName="Musa Abdullahi Omeize"
              accountNumber="3293000934"
              bankName="Payrep Mfb"
              showCard={true}
              onClose={() => setShowBeneficiaryCard(false)}
              title="Payrep Account Details"
            />
          )}
          <TextInput placeholder="Penalty Fee" />
          <TextInput placeholder="Narration" />
        </ScrollView>
        <View style={mainSavingsStyles.buttonContainer}>
          <Button title="Continue" onPress={handleNavigate} />
        </View>
      </View>
    </MainLayout>
  );
}
