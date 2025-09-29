import { StackScreenProps } from "@react-navigation/stack";
import { CompositeScreenProps } from "@react-navigation/native";

import { MainLayout } from "@components/Layout";
import { Typography, Button, TextInput } from "@components/Forms";
import {
	KidashiRegistrationStackParamList,
	BottomTabParamList,
} from "@navigation/types";
import Pad from "@components/Pad";
import useVendorItems from "./validators";
import styles from "./styles";
import { Stepper } from "@components/Miscellaneous";
import { setRegistrationDetails } from "@store/slices/kidashiSlice";
import { useAppDispatch } from "@store/hooks";

type VendorItemsProps = CompositeScreenProps<
	StackScreenProps<KidashiRegistrationStackParamList, "VendorItems">,
	StackScreenProps<BottomTabParamList, "Home">
>;

export default function VendorItems({
	navigation: { navigate, goBack },
}: VendorItemsProps) {
	const dispatch = useAppDispatch();
	const { formData, formErrors, validateForm, setBusinessDescription } =
		useVendorItems();

	const submit = async () => {
		console.log({
			business_description: formData.businessDescription,
		});
		validateForm(() => {
			dispatch(
				setRegistrationDetails({
					business_description: formData.businessDescription,
				})
			);
			navigate("GuarantorDetails");
		});
	};

	return (
		<MainLayout
			keyboardAvoidingType='scroll-view'
			backAction={() => navigate("VendorInformation")}
		>
			<Stepper steps={3} currentStep={2} />

			<Pad size={20} />

			<Typography type='heading4-sb' title='What do you sell?' />
			<Typography
				type='body-r'
				title='Give a short description of your business so we know the kind of goods or services you provide'
			/>

			<TextInput
				label='Business Description'
				placeholder='e.g., I sell Foodstuff, Provisions, Second-hand clothes'
				onChangeText={setBusinessDescription}
				value={formData.businessDescription}
				error={formErrors.businessDescription}
				customTextInputStyle={styles.customTextInputStyle}
				multiline
				numberOfLines={4}
				textAlignVertical='top'
			/>

			<Pad size={200} />

			<Button title='Next' onPress={submit} />
		</MainLayout>
	);
}
