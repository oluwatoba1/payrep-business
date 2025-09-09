import {useCallback, useState} from 'react';
import {BackHandler} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {useFocusEffect} from '@react-navigation/native';

import {MainLayout} from '@components/Layout';
import {ProfileStackParamList} from '@navigation/types';
import {Dropdown, Button, Typography} from '@components/Forms';
import {useUpdatePepMutation} from '@store/apis/customerApi';
import useToast from '@hooks/useToast';
import {DEFAULT_ERROR_MESSAGE} from '@utils/Constants';
import Pad from '@components/Pad';

const OPTIONS = [
  {label: 'Yes', value: 'yes'},
  {label: 'No', value: 'no'},
];

type PepProps = StackScreenProps<ProfileStackParamList, 'Pep'>;

export default function Pep({navigation: {navigate}}: PepProps) {
  const {showToast} = useToast();

  const [updatePep, {isLoading}] = useUpdatePepMutation();

  const [selectedValue, setSelectedValue] = useState<
    DefaultDropdownOption | undefined
  >();
  const [value, setValue] = useState<string>('');
  const [error, setError] = useState<string>('');

  const submit = async () => {
    if (value === null) {
      setError('Please select PEP status');
      return;
    }
    try {
      const {status, message} = await updatePep({
        pep: value === 'yes',
      }).unwrap();
      if (status) {
        navigate('SourceOfIncome');
      } else {
        showToast('danger', message);
      }
    } catch (error: ErrorResponse | any) {
      showToast(
        'danger',
        error.data?.message || error.message || DEFAULT_ERROR_MESSAGE,
      );
    }
  };

  useFocusEffect(
    useCallback(() => {
      const backAction = () => {
        navigate('ProfileCompletionIntro');
        return true; // Prevent default behavior
      };

      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
      );

      return () => backHandler.remove(); // Cleanup
    }, []),
  );

  return (
    <MainLayout
      backAction={() => navigate('ProfileCompletionIntro')}
      isLoading={isLoading}>
      <Typography title="PEP Status" type="heading4-sb" />

      <Pad size={20} />

      <Dropdown
        label="Are you a politically exposed person"
        options={OPTIONS}
        selectedOption={selectedValue}
        onSelect={option => {
          setSelectedValue(option);
          setValue(option.value);
        }}
        error={error}
      />

      <Pad size={40} />

      <Button title="Save" onPress={submit} />
    </MainLayout>
  );
}
