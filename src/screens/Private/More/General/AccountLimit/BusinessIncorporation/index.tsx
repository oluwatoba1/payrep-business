import React from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {types} from '@react-native-documents/picker';

import {MainLayout} from '@components/Layout';
import {Typography, Button, FileUploader, TextInput} from '@components/Forms';
import {MoreStackParamList} from '@navigation/types';
import useToast from '@hooks/useToast';
import {DEFAULT_ERROR_MESSAGE} from '@utils/Constants';
import useBusinessInformationValidation from './validators';
import Pad from '@components/Pad';
import {useSubmitBusinessTierRequirementsMutation} from '@store/apis/customerApi';

type BusinessInformationProps = StackScreenProps<
  MoreStackParamList,
  'BusinessIncorporation'
>;

export default function BusinessIncorporation({
  navigation: {navigate},
}: BusinessInformationProps) {
  const {showToast} = useToast();
  const {
    formData,
    formErrors,
    validateForm,
    setRcNumber,
    setCacDocument,
    setMemartDocument,
    setTin,
  } = useBusinessInformationValidation(showToast);
  const [submitBusinessTierRequirements, {isLoading}] =
    useSubmitBusinessTierRequirementsMutation();

  const submit = async () => {
    const fd = new FormData();
    fd.append('cac_document', {
      uri: formData.cacDocument[0].uri,
      name: formData.cacDocument[0].name,
      type: formData.cacDocument[0].type,
    });
    fd.append('memart_document', {
      uri: formData.memartDocument[0].uri,
      name: formData.memartDocument[0].name,
      type: formData.memartDocument[0].type,
    });
    fd.append('rc_number', formData.rcNumber);
    fd.append('tin', formData.tin);
    try {
      const {status, message} = await submitBusinessTierRequirements(
        fd,
      ).unwrap();

      if (status) {
        navigate('AccountTiers');
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

  return (
    <MainLayout
      keyboardAvoidingType="scroll-view"
      backAction={() => navigate('AccountTiers')}
      isLoading={isLoading}>
      <Typography type="heading4-sb" title="Business Tier Requirements" />
      <Typography
        type="body-r"
        title="Please fill out the following details about your business"
      />
      {/* Business name Inpute */}
      <TextInput
        label="RC Number"
        placeholder="Enter your RC Number"
        onChangeText={setRcNumber}
        value={formData.rcNumber}
        error={formErrors.rcNumber}
      />

      <FileUploader
        title="CAC document"
        subtitle="Upload your CAC document"
        file={formData.cacDocument.length > 0 ? formData.cacDocument[0] : null}
        onChoose={setCacDocument}
        type={[types.images]}
        notifier={message => showToast('warning', message)}
      />

      <FileUploader
        title="Memart document"
        subtitle="Upload your memart document"
        file={
          formData.memartDocument.length > 0 ? formData.memartDocument[0] : null
        }
        onChoose={setMemartDocument}
        type={[types.pdf]}
        notifier={message => showToast('warning', message)}
      />

      {/* Tax Identification Number Input */}
      <TextInput
        label="TIN"
        placeholder="Enter your TIN (optional)"
        onChangeText={setTin}
        value={formData.tin}
        error={formErrors.tin}
      />

      <Pad size={20} />

      <Button title="Save" onPress={() => validateForm(submit)} />

      <Pad size={40} />
    </MainLayout>
  );
}
