import {useCallback, useEffect, useState} from 'react';
import {Image, View, Pressable, BackHandler} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {createShimmerPlaceholder} from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';

import {MainLayout, Row} from '@components/Layout';
import {Typography} from '@components/Forms';
import {BillsStackParamList, BottomTabParamList} from '@navigation/types';
import SearchInput from '@components/Forms/SearchInput';
import {styles} from './styles';
import Colors from '@theme/Colors';
import Pad from '@components/Pad';
import {useGetVasCategoriesMutation} from '@store/apis/serviceApi';
import useToast from '@hooks/useToast';
import {DEFAULT_ERROR_MESSAGE, shimmerDelay} from '@utils/Constants';
import {chunkArray} from '@utils/Helpers';
import {useAppDispatch} from '@store/hooks';
import {setVasCategory} from '@store/slices/serviceSlice';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';

type BillsCategoriesProps = StackScreenProps<
  BillsStackParamList,
  'BillsCategories'
>;

export default function BillsCategories({
  navigation: {navigate, goBack, canGoBack},
}: BillsCategoriesProps) {
  const dispatch = useAppDispatch();
  const [getVasCategories, {isLoading}] = useGetVasCategoriesMutation();
  const {showToast} = useToast();

  const [searchText, setSearchText] = useState<string>('');
  const [categories, setCategories] = useState<IVasCategoryResponse[]>([]);

  const {reset} = useNavigation<BottomTabNavigationProp<BottomTabParamList>>();

  const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

  const handleSearch = (text: string) => {
    setSearchText(text);
  };

  const fetchCategories = async () => {
    try {
      const {status, message, data} = await getVasCategories().unwrap();
      if (status) {
        setCategories(data);
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

  const handleNavigate = (category: IVasCategoryResponse) => {
    dispatch(setVasCategory(category));
    navigate('BillsServices');
  };

  const navigateToHome = () => {
    reset({
      index: 0,
      routes: [
        {
          name: 'Home',
          state: {
            index: 0,
            routes: [{name: 'Dashboard'}],
          },
        },
      ],
    });
    return true;
  };

  useFocusEffect(
    useCallback(() => {
      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        navigateToHome,
      );

      return () => backHandler.remove(); // Cleanup
    }, []),
  );

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <MainLayout backAction={navigateToHome} keyboardAvoidingType="scroll-view">
      <Typography title="Bills" />
      <View style={styles.searchContainer}>
        <SearchInput
          searchPlaceholder="Search bills"
          searchText={searchText}
          onSearch={handleSearch}
        />
      </View>

      <Typography
        title="Select Category"
        type="subheading-sb"
        color={Colors.gray['base']}
      />
      <Pad size={12} />

      {isLoading ? (
        <Row gap={10}>
          <ShimmerPlaceholder
            visible={!isLoading}
            delay={shimmerDelay}
            style={
              isLoading ? styles.shimmerContainer : {}
            }></ShimmerPlaceholder>
          <ShimmerPlaceholder
            visible={!isLoading}
            delay={shimmerDelay}
            style={
              isLoading ? styles.shimmerContainer : {}
            }></ShimmerPlaceholder>
        </Row>
      ) : (
        chunkArray([...categories], 2).map((chunk, index) => (
          <Row gap={10} key={index}>
            {chunk.map((category, i) => (
              <Pressable
                key={`${index}-${i}`}
                style={styles.categoryContainer}
                onPress={() => handleNavigate(category)}>
                <Typography title={category.name} type="body-b" />
                <Pad />
                <Image
                  source={{uri: category.image}}
                  style={styles.categoryIcon}
                />
                <Pad />
                <Typography
                  title={category.description}
                  type="body-r"
                  style={{textAlign: 'center'}}
                />
              </Pressable>
            ))}
          </Row>
        ))
      )}
    </MainLayout>
  );
}
