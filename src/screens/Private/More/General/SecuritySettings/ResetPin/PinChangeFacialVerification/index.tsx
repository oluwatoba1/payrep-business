import React from 'react';
import {Image, View, Platform, Linking} from 'react-native';
import {useQoreIdSdk, OnResult} from '@qore-id/react-native-qoreid-sdk';
import {request, PERMISSIONS, RESULTS} from 'react-native-permissions';

import {MainLayout, Row} from '@components/Layout';
import {Button, Typography} from '@components/Forms';
import CustomCard from '@components/Cards/CustomCard';
import {styles} from './styles';
import IconImages from '@assets/images/appIcons';
import {StackScreenProps} from '@react-navigation/stack';
import {MoreStackParamList} from '@navigation/types';
import {useAppSelector} from '@store/hooks';
import useToast from '@hooks/useToast';
import {useVerificationCheckMutation} from '@store/apis/complianceApi';
import {DEFAULT_ERROR_MESSAGE, QOREID_CLIENT_ID} from '@utils/Constants';
import Pad from '@components/Pad';
import {formatToInternationalPhoneNumber, normalizeName} from '@utils/Helpers';

interface VerifyBvnProps {
  startTime: number;
  startDate: Date;
  timeout: number;
  verificationId: string;
}

type PinChangeFacialVerificationProps = StackScreenProps<
  MoreStackParamList,
  'PinChangeFacialVerification'
>;

const tips = [
  'Make sure your face is clearly and entirely visible.',
  'Ensure your environment is bright enough for a clear photo.',
  'Remove any hats, sunglasses, or masks that may obscure your face.',
  'Keep your camera steady to avoid blurry images.',
  'Position your face within the frame and look directly at the camera.',
  'Avoid harsh shadows by standing in a well-lit area.',
];

export default function PinChangeFacialVerification({
  navigation: {navigate, goBack},
}: PinChangeFacialVerificationProps) {
  const {showToast} = useToast();
  const bvnData = useAppSelector(state => state.compliance.bvnData);
  const ninData = useAppSelector(state => state.compliance.ninData);
  const customer = useAppSelector(state => state.customer.customer);

  const [verificationCheck, {isLoading}] = useVerificationCheckMutation();

  const timeoutAction = (args: VerifyBvnProps) => {
    if (Date.now() - args.startTime < args.timeout) {
      verifyBvnVerification(args);
    } else {
      showToast('danger', 'Verification pending, check back later');
      navigate('SecuritySettings');
    }
  };

  const verifyBvnVerification = async (args: VerifyBvnProps) => {
    try {
      const {status, data} = await verificationCheck({
        verification: args.verificationId,
      }).unwrap();
      if (status) {
        if (!data.length) {
          timeoutAction(args);
          return;
        }
        data[0].status
          ? navigate('NewPin', {verification_id: args.verificationId})
          : showToast('danger', 'KYC verification failed');
      } else {
        timeoutAction(args);
      }
    } catch (error: ErrorResponse | any) {
      showToast(
        'danger',
        error.data?.message || error.message || DEFAULT_ERROR_MESSAGE,
      );
    }
  };

  const initiatePoll = (verificationId: string, timeout: number = 30000) => {
    const startTime = Date.now();
    const startDate = new Date();

    verifyBvnVerification({startTime, startDate, timeout, verificationId});
  };

  const callback = (data: OnResult) => {
    if (['E_USER_CANCELED', 'E_GENERAL'].includes(data.code)) {
      showToast('danger', data.message);
      return;
    }
    initiatePoll(data.data.verification.id);
  };

  const {launchQoreId} = useQoreIdSdk({
    onResult: callback,
  });

  const onSubmit = async () => {
    const cameraPermission = await request(
      Platform.OS === 'ios'
        ? PERMISSIONS.IOS.CAMERA
        : PERMISSIONS.ANDROID.CAMERA,
    );
    const phoneNumber = customer?.mobile_number || '';
    if (cameraPermission === RESULTS.GRANTED) {
      const formData = {
        flowId: 0 /* Required for workflow */,
        clientId: QOREID_CLIENT_ID /* Required */,
        productCode: !!customer?.kyc?.bvn
          ? 'liveness_bvn'
          : 'liveness_nin' /* Required for collection */,
        customerReference: (customer?.id || '') + '_pinchange' /* Required */,
        applicantData: {
          firstName: customer?.first_name || '',
          middleName: normalizeName(customer?.other_name || ''),
          lastName: customer?.surname || '',
          gender: '',
          phoneNumber: formatToInternationalPhoneNumber(phoneNumber),
          email: customer?.email || '',
        },
        identityData: {
          idType: !!customer?.kyc?.bvn ? 'bvn' : 'nin',
          idNumber: customer?.kyc?.bvn || customer?.kyc?.nin || '',
        },
        addressData: {
          address: '',
          city: '',
          lga: '',
        },
      };

      launchQoreId(formData);
    } else {
      showToast('danger', 'Camera permission denied');
      setTimeout(() => {
        Linking.openSettings();
      }, 1500);
    }
  };

  return (
    <MainLayout
      keyboardAvoidingType="scroll-view"
      backAction={goBack}
      isLoading={isLoading}
      loadingTitle="Validating KYC"
      rightTitle="KYC Facial Recognition">
      <Pad size={16} />

      <Typography
        type="body-r"
        title="Please capture a photo of yourself. This will be used to confirm that your face matches the image on your identity card."
      />

      <Pad size={24} />

      <View style={styles.cardContainer}>
        <CustomCard visible={true} customContainerStyle={styles.container}>
          <View style={{gap: 14, alignItems: 'center'}}>
            <Typography title="Face Recognition Tips" />

            <View style={{alignSelf: 'center'}}>
              <Image
                source={IconImages.popup.faceRecognition}
                style={{width: 48, height: 48}}
              />
            </View>

            {tips.map((tip, index) => (
              <Row
                key={index}
                gap={10}
                alignItems="flex-start"
                justifyContent="flex-start"
                containerStyle={{width: '95%'}}>
                <Typography title="•" type="body-r" />
                <Typography type="label-r" title={tip} />
              </Row>
            ))}
          </View>
        </CustomCard>
      </View>

      <Pad size={100} />

      <Button title="Capture" onPress={onSubmit} />
    </MainLayout>
  );
}
