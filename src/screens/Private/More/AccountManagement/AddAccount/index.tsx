import {useEffect, useState} from 'react';
import {StackScreenProps} from '@react-navigation/stack';

import {Button, Dropdown, Typography} from '@components/Forms';
import {MainLayout} from '@components/Layout';
import Pad from '@components/Pad';
import useToast from '@hooks/useToast';
import {MoreStackParamList} from '@navigation/types';
import {
  useCreateSecondaryAccountMutation,
  useGetProductsMutation,
} from '@store/apis/accountApi';
import {ACCOUNT_TYPES, DEFAULT_ERROR_MESSAGE} from '@utils/Constants';
import {useAppSelector} from '@store/hooks';

type AddAccountProps = StackScreenProps<MoreStackParamList, 'AddAccount'>;

type AccountTypes = 'savings' | 'current' | 'pos' | 'pool' | 'virtual';

export default function AddAccount({navigation: {goBack}}: AddAccountProps) {
  const {showToast} = useToast();
  const customerId = useAppSelector(state => state.customer.customer?.id) || '';
  const [getProducts, {isLoading: isProductsLoading}] =
    useGetProductsMutation();
  const [createSecondaryAccount, {isLoading}] =
    useCreateSecondaryAccountMutation();

  const [selectedAccountType, setSelectedAccountType] = useState<{
    label: string;
    value: string;
  }>({label: '', value: ''});
  const [selectedProduct, setSelectedProduct] = useState<{
    label: string;
    value: string;
  }>({label: '', value: ''});
  const [products, setProducts] = useState<
    {
      label: string;
      value: string;
    }[]
  >([]);

  const fetchProducts = async () => {
    try {
      const {status, message, data} = await getProducts({
        type: selectedAccountType.value as AccountTypes,
      }).unwrap();

      if (status) {
        setProducts(
          data.map(product => ({label: product.name, value: product.id})),
        );
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

  const createAccount = async () => {
    if (!selectedAccountType.value) {
      showToast('warning', 'Select an account type');
      return;
    }

    if (!selectedProduct.value) {
      showToast('warning', 'Select a product');
      return;
    }

    try {
      const {status, message} = await createSecondaryAccount({
        customer: customerId,
        account_type: selectedAccountType.value as AccountTypes,
        product: selectedProduct.value,
      }).unwrap();

      showToast(status ? 'success' : 'danger', message);
      if (status) {
        setSelectedAccountType({label: '', value: ''});
        setSelectedProduct({label: '', value: ''});
        goBack();
      }
    } catch (error: ErrorResponse | any) {
      showToast(
        'danger',
        error.data?.message || error.message || DEFAULT_ERROR_MESSAGE,
      );
    }
  };

  useEffect(() => {
    !!selectedAccountType.value && fetchProducts();
  }, [selectedAccountType]);

  return (
    <MainLayout
      rightTitle="Add new account"
      backAction={goBack}
      isLoading={isLoading}>
      <Typography title="Add a secondary account" type="body-r" />

      <Pad size={30} />

      <Dropdown
        label="Account types"
        options={ACCOUNT_TYPES}
        selectedOption={selectedAccountType}
        onSelect={option => {
          setSelectedAccountType(option);
          //   setCountry(option.value);
        }}
        error=""
      />

      <Pad size={20} />

      <Dropdown
        label="Products"
        options={products}
        selectedOption={selectedProduct}
        onSelect={option => {
          setSelectedProduct(option);
          //   setCountry(option.value);
        }}
        error=""
        isLoading={isProductsLoading}
      />

      <Pad size={50} />

      <Button title="Create" onPress={createAccount} />
    </MainLayout>
  );
}
