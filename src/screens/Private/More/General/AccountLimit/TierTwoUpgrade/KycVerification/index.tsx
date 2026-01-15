import {Button, TextInput} from '@components/Forms';
import {MainLayout} from '@components/Layout';
import Pad from '@components/Pad';
import {MoreStackParamList} from '@navigation/types';
import {StackScreenProps} from '@react-navigation/stack';
import useKycVerificationValidation from './validator';
import {
  useBvnLookupMutation,
  useNinLookupMutation,
} from '@store/apis/complianceApi';
import {useAppDispatch, useAppSelector} from '@store/hooks';
import useToast from '@hooks/useToast';
import {useState, useMemo} from 'react';
import {CUSTOMER_TYPE, DEFAULT_ERROR_MESSAGE} from '@utils/Constants';
import {IsThisYouModal} from '@components/Modal';
import {updateBvnData, updateNinData} from '@store/slices/complianceSlice';

interface IKycData {
  customer: string;
  first_name: string;
  middle_name: string;
  last_name: string;
  dob: string;
  bvn?: string;
  nin?: string;
  phoneNumber: string;
  email: string;
  gender: string;
}

type KycVerificationProps = StackScreenProps<
  MoreStackParamList,
  'KycVerification'
>;

export default function KycVerification({
  navigation: {navigate},
}: KycVerificationProps) {
  const dispatch = useAppDispatch();
  const {showToast} = useToast();
  const customer = useAppSelector(state => state.customer.customer);

  // Auto-detect lookup type based on KYC status
  const lookupType = useMemo(() => {
    return customer?.kyc?.bvn_verification_status ? 'nin' : 'bvn';
  }, [customer?.kyc?.bvn_verification_status]);

  const {
    formData: {idNumber},
    setIdNumber,
    formErrors,
    validateForm,
  } = useKycVerificationValidation();

  const [bvnLookup, {isLoading: isBvnLoading}] = useBvnLookupMutation();
  const [ninLookup, {isLoading: isNinLoading}] = useNinLookupMutation();

  const [kycData, setKycData] = useState<IKycData>({
    customer: '',
    first_name: '',
    middle_name: '',
    last_name: '',
    dob: '',
    bvn: '',
    nin: '',
    gender: '',
    phoneNumber: '',
    email: '',
  });

  const [showIsThisYouModal, setShowIsThisYouModal] = useState<boolean>(false);

  // Submit based on auto-detected lookup type
  const submit = async () => {
    try {
      if (lookupType === 'bvn') {
        const {status, message, data} = await bvnLookup({
          bvn: idNumber,
          customer_type: CUSTOMER_TYPE,
        }).unwrap();
        if (status && data) {
          delete data.image;
          setKycData({
            ...data,
            bvn: idNumber,
            phoneNumber: data.phone_number1,
          });
          setShowIsThisYouModal(true);
        } else {
          showToast('danger', message);
        }
      } else {
        const {status, message, data} = await ninLookup({
          nin: idNumber,
          customer_type: CUSTOMER_TYPE,
        }).unwrap();
        if (status && data) {
          delete data.image;
          setKycData({
            ...data,
            nin: idNumber,
            phoneNumber: data.phone_number,
          });
          setShowIsThisYouModal(true);
        } else {
          showToast('danger', message);
        }
      }
    } catch (error: ErrorResponse | any) {
      showToast(
        'danger',
        error.data?.message || error.message || DEFAULT_ERROR_MESSAGE,
      );
    }
  };

  // Proceed to facial recognition
  const proceed = () => {
    setShowIsThisYouModal(false);
    if (lookupType === 'bvn') {
      dispatch(
        updateNinData({
          firstName: '',
          lastName: '',
          middleName: '',
          dob: '',
          nin: '',
          gender: '',
          email: '',
          phoneNumber: '',
        }),
      );
      dispatch(
        updateBvnData({
          firstName: kycData.first_name,
          lastName: kycData.last_name,
          middleName: kycData.middle_name,
          dob: kycData.dob,
          bvn: kycData.bvn!,
          gender: kycData.gender,
          email: kycData.email,
          phoneNumber: kycData.phoneNumber,
        }),
      );
    } else {
      dispatch(
        updateBvnData({
          firstName: '',
          lastName: '',
          middleName: '',
          dob: '',
          bvn: '',
          gender: '',
          email: '',
          phoneNumber: '',
        }),
      );
      dispatch(
        updateNinData({
          firstName: kycData.first_name,
          lastName: kycData.last_name,
          middleName: kycData.middle_name,
          dob: kycData.dob,
          nin: kycData.nin!,
          gender: kycData.gender,
          email: kycData.email,
          phoneNumber: kycData.phoneNumber,
        }),
      );
    }

    navigate('NINVerification');
  };

  return (
    <MainLayout
      rightTitle="KYC Verification"
      isLoading={isBvnLoading || isNinLoading}
      backAction={() => navigate('MeansOfIdentification')}>
      <IsThisYouModal
        title={kycData.first_name + ' ' + kycData.last_name}
        showModal={showIsThisYouModal}
        onClose={() => setShowIsThisYouModal(false)}
        onProceed={proceed}
      />

      <TextInput
        label={
          lookupType === 'bvn'
            ? 'BVN (Dial *565*0# to retrieve your BVN)'
            : 'NIN (Dial *346# to retrieve your NIN)'
        }
        keyboardType="numeric"
        placeholder={
          lookupType === 'bvn' ? 'Ex: 22222222222' : 'Ex: 12345678901'
        }
        maxLength={11}
        onChangeText={setIdNumber}
        value={idNumber}
        error={formErrors.idNumber}
      />

      <Pad size={100} />

      <Button title="Next" onPress={() => validateForm(submit)} />
    </MainLayout>
  );
}
