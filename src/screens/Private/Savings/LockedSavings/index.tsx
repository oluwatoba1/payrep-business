import {useState} from 'react';
import {ScrollView, View} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';

import {MainLayout} from '@components/Layout';
import {
  Button,
  Dropdown,
  RadioButton,
  TextInput,
  Typography,
} from '@components/Forms';
import {mainSavingsStyles} from '../styles';

import {SavingsStackParamList} from '@navigation/types';
import {InterestRateModal} from '@components/Modal';

type LockedSavingsProps = StackScreenProps<SavingsStackParamList>;

const interestRate = [
  {
    code: '1',
    name: '10 - 30 days',
    percentage: '12%',
  },
];

export default function LockedSavings({
  navigation: {navigate, goBack},
}: LockedSavingsProps) {
  const [showInterestRateModal, setShowInterestRateModal] =
    useState<boolean>(false);
  const [selectedInterestRate, setSelectedInterestRate] = useState({
    name: '',
    code: '',
    percentage: '',
  });
  const [showFundSource, setShowFundSource] = useState<boolean>(false);
  const [fundSource, setFundSource] = useState<string>('');

  const handleSourceDropdownTrigger = () => {
    setShowFundSource(prev => !prev);
  };

  const handleSourceRadioSelect = (value: string | number | undefined) => {
    setFundSource(value as string);
  };
  const handleDurationDropdownTrigger = () => {
    setShowInterestRateModal(prev => !prev);
  };

  const handleNavigate = () => {
    navigate('PreviewLockedSavingsScreen');
  };

  return (
    <MainLayout backAction={() => goBack()}>
      <InterestRateModal
        showModal={showInterestRateModal}
        onClose={() => setShowInterestRateModal(false)}
        onSelect={rate => {
          const selectedRate = {
            ...rate,
            percentage: rate.percentage,
          };
          setSelectedInterestRate(selectedRate);
        }}
        options={interestRate}
        value={selectedInterestRate.code}
      />
      <View style={mainSavingsStyles.container}>
        <View style={mainSavingsStyles.titleContainer}>
          <Typography title="Locked Savings" type="heading4-sb" />
          <Typography
            title="Easily set up your savings plan to work towards your personal goals."
            type="body-r"
          />
        </View>
        <ScrollView>
          <TextInput
            label=""
            type="text"
            placeholder="What goal are you setting for your locked savings?"
            value={''}
            // onChangeText={(text) => dispatch(setFirstName(text))}
          />
          <TextInput
            label=""
            type="text"
            placeholder="How much do you want to lock?"
            value={''}
            // onChangeText={(text) => dispatch(setFirstName(text))}
          />
          <Dropdown
            label="What is the duration?"
            value={selectedInterestRate ? selectedInterestRate.name : ''}
            onTrigger={handleDurationDropdownTrigger}
          />

          <TextInput
            label=""
            type="text"
            placeholder="Interest % calculated"
            value={''}
            // onChangeText={(text) => dispatch(setFirstName(text))}
          />
          <TextInput
            label=""
            type="text"
            placeholder="Maturity date"
            value={''}
            // onChangeText={(text) => dispatch(setFirstName(text))}
          />
          <Dropdown
            label="Set your primary source of fund"
            value={fundSource ? fundSource : ''}
            onTrigger={handleSourceDropdownTrigger}
          />
          {showFundSource && (
            <View style={{gap: 14, margin: 16}}>
              <RadioButton
                options={[
                  {title: 'N5,000', value: 'main_account', width: 343},
                  {title: 'Add Bank', value: 'add_bank', width: 343},
                  {title: 'Add New Card', value: 'new_card', width: 343},
                  {title: 'Added Card', value: 'listed_card', width: 343},
                ]}
                selectedValue={fundSource}
                onSelect={handleSourceRadioSelect}
                optionContainerStyle={{height: 64}}
              />
            </View>
          )}
        </ScrollView>
        <View style={mainSavingsStyles.buttonContainer}>
          <Button title="Continue" onPress={handleNavigate} />
        </View>
      </View>
    </MainLayout>
  );
}
