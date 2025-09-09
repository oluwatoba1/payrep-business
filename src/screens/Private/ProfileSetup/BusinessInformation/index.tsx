import React, {useCallback} from 'react';
import {BackHandler, View} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';

import {MainLayout} from '@components/Layout';
import {Typography, Button, TextInput} from '@components/Forms';
import {ProfileStackParamList} from '@navigation/types';
import {styles} from './styles';
import useToast from '@hooks/useToast';
import {DEFAULT_ERROR_MESSAGE} from '@utils/Constants';
import useBusinessInformationValidation from './validators';
import Pad from '@components/Pad';
import {useUpdateBusinessInformationMutation} from '@store/apis/customerApi';
import {scaleHeight} from '@utils/Helpers';
import {useFocusEffect} from '@react-navigation/native';

type BusinessInformationProps = StackScreenProps<
  ProfileStackParamList,
  'BusinessInformation'
>;

export default function BusinessInformation({
  navigation: {navigate},
}: BusinessInformationProps) {
  const {showToast} = useToast();
  const {
    formData,
    formErrors,
    validateForm,
    setBusinessName,
    setBusinessDescription,
    setBusinessAddress,
  } = useBusinessInformationValidation(showToast);
  const [updateBusinessInformation, {isLoading}] =
    useUpdateBusinessInformationMutation();

  const submit = async () => {
    try {
      const {status, message} = await updateBusinessInformation({
        business_name: formData.businessName,
        business_description: formData.businessDescription,
        business_address: formData.businessAddress,
      }).unwrap();
      if (status) {
        navigate('Pin');
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
      keyboardAvoidingType="scroll-view"
      backAction={() => navigate('ProfileCompletionIntro')}
      isLoading={isLoading}>
      <Typography type="heading4-sb" title="Business Information" />
      <Typography
        type="body-r"
        title="Please fill out the following details about your business"
      />
      <View style={styles.inputContainer}>
        {/* Business name Input */}
        <TextInput
          label="Business Name"
          placeholder="Enter your business name"
          onChangeText={setBusinessName}
          value={formData.businessName}
          error={formErrors.businessName}
        />

        {/* Business description Input */}
        <TextInput
          label="Business description"
          placeholder="Describe your business briefly"
          onChangeText={setBusinessDescription}
          value={formData.businessDescription}
          error={formErrors.businessDescription}
          multiline={true}
          numberOfLines={5}
          customTextInputStyle={{minHeight: scaleHeight(120)}}
        />
        {/* Business address Input */}
        <TextInput
          label="Business Address"
          placeholder="Enter your business address"
          onChangeText={setBusinessAddress}
          value={formData.businessAddress}
          error={formErrors.businessAddress}
        />
      </View>

      <Pad size={20} />

      <Button title="Save" onPress={() => validateForm(submit)} />

      <Pad size={40} />
    </MainLayout>
  );
}
