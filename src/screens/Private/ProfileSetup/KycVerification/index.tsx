import {Button, Dropdown, TextInput} from '@components/Forms';
import {MainLayout} from '@components/Layout';
import Pad from '@components/Pad';
import {ProfileStackParamList} from '@navigation/types';
import {StackScreenProps} from '@react-navigation/stack';
import useBvnVerificationValidation from './validator';
import {
  useBvnLookupMutation,
  useNinLookupMutation,
} from '@store/apis/complianceApi';
import {useAppDispatch} from '@store/hooks';
import useToast from '@hooks/useToast';
import {useState} from 'react';
import {DEFAULT_ERROR_MESSAGE} from '@utils/Constants';
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
  ProfileStackParamList,
  'KycVerification'
>;

export default function KycVerification({
  navigation: {navigate, canGoBack, goBack},
}: KycVerificationProps) {
  const dispatch = useAppDispatch();
  const {showToast} = useToast();

  const {
    formData: {idNumber}, // we can rename this to `idNumber` if you want generic
    setIdNumber, // same here, it’s just storing whichever number is typed
    formErrors,
    validateForm,
  } = useBvnVerificationValidation();

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

  const [selectedOption, setSelectedOption] = useState({
    label: '',
    value: '',
  });

  const [showIsThisYouModal, setShowIsThisYouModal] = useState<boolean>(false);

  // Submit dynamically depending on ID type
  const submit = async () => {
    try {
      if (selectedOption.value === 'bvn') {
        const {status, message, data} = await bvnLookup({
          bvn: idNumber,
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
      } else if (selectedOption.value === 'nin') {
        const {status, message, data} = await ninLookup({
          nin: idNumber,
        }).unwrap();
        if (status && data) {
          delete data.image;
          setKycData({
            ...data,
            nin: idNumber,
            phoneNumber: data.phone_number, // depends on API shape
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

  // Proceed also depends on ID type
  const proceed = () => {
    setShowIsThisYouModal(false);
    if (selectedOption.value === 'bvn') {
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
    } else if (selectedOption.value === 'nin') {
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

    navigate('FacialRecognition');
  };

  return (
    <MainLayout
      rightTitle="KYC Registration"
      isLoading={isBvnLoading || isNinLoading}
      backAction={() => canGoBack() && goBack()}>
      <IsThisYouModal
        title={kycData.first_name + ' ' + kycData.last_name}
        showModal={showIsThisYouModal}
        onClose={() => setShowIsThisYouModal(false)}
        onProceed={proceed}
      />

      <Dropdown
        label="ID Type"
        options={[
          {label: 'BVN', value: 'bvn'},
          {label: 'NIN', value: 'nin'},
        ]}
        selectedOption={selectedOption}
        onSelect={setSelectedOption}
      />

      <Pad size={20} />

      <TextInput
        label={
          selectedOption.value === 'bvn'
            ? 'BVN (Dial *565*0# to retrieve your BVN)'
            : 'NIN (Dial *346# to retrieve your NIN)'
        }
        keyboardType="numeric"
        placeholder={
          selectedOption.value === 'bvn' ? 'Ex: 22222222222' : 'Ex: 12345678901'
        }
        maxLength={11} // adjust if NIN length differs
        onChangeText={setIdNumber}
        value={idNumber}
        error={formErrors.idNumber}
      />

      <Pad size={100} />

      <Button title="Next" onPress={() => validateForm(submit)} />
    </MainLayout>
  );
}
