import {StackScreenProps} from '@react-navigation/stack';
import {types} from '@react-native-documents/picker';

import {MainLayout} from '@components/Layout';
import {Button, FileUploader, Typography} from '@components/Forms';

import Pad from '@components/Pad';
import {MoreStackParamList} from '@navigation/types';
import useToast from '@hooks/useToast';
import {DEFAULT_ERROR_MESSAGE} from '@utils/Constants';
import {useUploadMeansofIdentificationMutation} from '@store/apis/complianceApi';
import useDocumentValidation from './validators';
import {useTierUpgradeMutation} from '@store/apis/customerApi';
import {useFocusEffect} from '@react-navigation/native';
import {useCallback} from 'react';
import {BackHandler} from 'react-native';

type ProofOfAddressProps = StackScreenProps<
  MoreStackParamList,
  'ProofOfAddress'
>;

export default function ProofOfAddress({
  navigation: {navigate},
}: ProofOfAddressProps) {
  const {showToast} = useToast();
  const {formData, validateForm, setFile} = useDocumentValidation(showToast);

  const [uploadMeansofIdentification, {isLoading}] =
    useUploadMeansofIdentificationMutation();
  const [tierUpgrade, {isLoading: isUpgrading}] = useTierUpgradeMutation();

  const upgradeTier = async () => {
    try {
      const {status, message} = await tierUpgrade().unwrap();
      if (status) {
        navigate('MeansOfIdentification');
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

  const submit = async () => {
    const fd = new FormData();
    fd.append('file', formData.file[0]);
    fd.append('document_class', 'proof_of_address');
    fd.append('document_type', formData.documentType);
    try {
      const {status, message} = await uploadMeansofIdentification(fd).unwrap();
      if (status) {
        navigate('MeansOfIdentification');
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
        navigate('AccountTiers');
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
      backAction={() => navigate('AccountTiers')}
      keyboardAvoidingType="scroll-view"
      isLoading={isLoading || isUpgrading}>
      <Typography title="Proof of Address" type="heading4-sb" />
      <Typography type="body-r" title="Please upload your utility bill" />

      <Pad size={16} />

      <FileUploader
        file={formData.file.length > 0 ? formData.file[0] : null}
        onChoose={setFile}
        type={[types.images]}
        notifier={message => showToast('warning', message)}
      />

      <Button title="Save" onPress={() => validateForm(submit)} />
      <Pad size={40} />
    </MainLayout>
  );
}
