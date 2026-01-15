import React from 'react';
import {View} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {types} from '@react-native-documents/picker';

import {MainLayout} from '@components/Layout';
import {Typography, Button, FileUploader} from '@components/Forms';
import {MoreStackParamList} from '@navigation/types';
import useToast from '@hooks/useToast';
import {DEFAULT_ERROR_MESSAGE} from '@utils/Constants';
import useMemartVerificationValidation from './validators';
import Pad from '@components/Pad';
import {useSubmitBusinessTierRequirementsMutation} from '@store/apis/customerApi';
import Colors from '@theme/Colors';
import {useUploadMeansofIdentificationMutation} from '@store/apis/complianceApi';

type MemartVerifiedProps = StackScreenProps<
  MoreStackParamList,
  'MemartVerification'
>;

export default function MemartVerification({
  navigation: {navigate},
}: MemartVerifiedProps) {
  const {showToast} = useToast();
  const {formData, formErrors, validateForm, setMemartDocument} =
    useMemartVerificationValidation(showToast);
  const [uploadMeansofIdentification, {isLoading}] =
    useUploadMeansofIdentificationMutation();

  const submit = async () => {
    const fd = new FormData();
    fd.append('memart_document', {
      uri: formData.memartDocument[0].uri,
      name: formData.memartDocument[0].name,
      type: formData.memartDocument[0].type,
    });
    fd.append('document_class', 'business');
    fd.append('document_type', 'memart');
    try {
      const {status, message} = await uploadMeansofIdentification(fd).unwrap();

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
      <Typography type="heading4-sb" title="Memart verification" />
      <Typography
        type="body-r"
        title="Please upload your memart verification document below to proceed."
      />

      <FileUploader
        title="Memart Document"
        subtitle="Upload your memart document"
        file={
          formData.memartDocument.length > 0 ? formData.memartDocument[0] : null
        }
        onChoose={setMemartDocument}
        type={[types.images]}
        notifier={message => showToast('warning', message)}
      />
      {formErrors.memartDocument ? (
        <Typography
          title={formErrors.memartDocument}
          type="label-r"
          color={Colors.danger.base}
        />
      ) : null}

      <Pad size={20} />

      <Button title="Save" onPress={() => validateForm(submit)} />

      <Pad size={40} />
    </MainLayout>
  );
}
