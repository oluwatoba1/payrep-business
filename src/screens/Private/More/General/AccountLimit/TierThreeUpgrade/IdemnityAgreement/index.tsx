import {Button, Checkbox, HybridTypography, TextInput} from '@components/Forms';
import {MainLayout} from '@components/Layout';
import Pad from '@components/Pad';
import useToast from '@hooks/useToast';
import {MoreStackParamList} from '@navigation/types';
import {StackScreenProps} from '@react-navigation/stack';
import {useSubmitIdemnityAgreementMutation} from '@store/apis/complianceApi';
import Colors from '@theme/Colors';
import {useState} from 'react';
import useIdemnityAgreementValidation from './validators';
import {addCommas, removeCommas} from '@utils/Helpers';
import {DEFAULT_ERROR_MESSAGE} from '@utils/Constants';

type IdemnityAgreementProps = StackScreenProps<
  MoreStackParamList,
  'IdemnityAgreement'
>;

export default function IdemnityAgreement({
  navigation: {navigate},
  route,
}: IdemnityAgreementProps) {
  const {showToast} = useToast();
  const [isChecked, setIsChecked] = useState(false);
  const {formData, formErrors, setDailyLimit} = useIdemnityAgreementValidation(
    route.params.tier,
  );
  const [submitIdemnityAgreement, {isLoading}] =
    useSubmitIdemnityAgreementMutation();

  const submit = async () => {
    try {
      const {status, message} = await submitIdemnityAgreement({
        daily_limit: Number(removeCommas(formData.dailyLimit)),
        tier: route.params.tier.id,
      }).unwrap();
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
      rightTitle="Idemnity Agreement"
      backAction={() => navigate('AccountTiers')}
      isLoading={isLoading}
      keyboardAvoidingType="scroll-view">
      <Pad size={20} />
      <HybridTypography
        textTray={[
          {
            text: 'By checking the box below, you acknowledge and agree to the following terms:',
            bold: true,
          },
        ]}
        boldFontColor={Colors.black}
      />
      <HybridTypography
        textTray={[
          {
            text: '1. Assumption of Risk',
            bold: true,
          },
        ]}
        boldFontColor={Colors.black}
      />
      <HybridTypography
        textTray={[
          {
            text: 'You understand and accept all risks associated with ',
            bold: false,
          },
          {
            text: 'using our platform/services/products',
            bold: true,
          },
        ]}
        boldFontColor={Colors.black}
      />
      <HybridTypography
        textTray={[
          {
            text: 'You acknowledge that ',
            bold: true,
          },
          {
            text: 'Payrep ',
            bold: false,
          },
          {
            text: 'is not liable for any loss, injury, or damage that may occur.',
            bold: true,
          },
        ]}
        boldFontColor={Colors.black}
      />
      <HybridTypography
        textTray={[
          {
            text: '2. Indemnification',
            bold: true,
          },
        ]}
        boldFontColor={Colors.black}
      />
      <HybridTypography
        textTray={[
          {
            text: 'You agree to indemnify and hold ',
            bold: false,
          },
          {
            text: 'Payrep ',
            bold: true,
          },
          {
            text: 'harmless against any claims, losses, or damages arising from your use of the service.',
            bold: false,
          },
        ]}
        boldFontColor={Colors.black}
      />
      <HybridTypography
        textTray={[
          {
            text: 'This includes legal fees and other costs related to any disputes.',
            bold: false,
          },
        ]}
      />
      <Pad size={30} />
      <TextInput
        label="Daily Transfer Limit"
        keyboardType="numeric"
        placeholder="Ex: 30,000,000"
        maxLength={12}
        onChangeText={value => setDailyLimit(removeCommas(value))}
        value={addCommas(formData.dailyLimit)}
        error={formErrors.dailyLimit}
      />
      <Pad size={30} />
      <Checkbox
        label="I agree"
        value={isChecked}
        onPress={() => setIsChecked(!isChecked)}
      />
      <Pad size={30} />
      <Button disabled={!isChecked} title="Submit" onPress={submit} />
      <Pad size={40} />
    </MainLayout>
  );
}
