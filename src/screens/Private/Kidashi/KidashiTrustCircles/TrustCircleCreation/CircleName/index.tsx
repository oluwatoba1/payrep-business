import { View, Text, SafeAreaView, Pressable, Image } from "react-native";
import React from "react";
import ScreenImages from "@assets/images/screens";
import { styles } from "./style";
import { Button, Typography, TextInput } from "@components/Forms";
import Colors from "@theme/Colors";
import Pad from "@components/Pad";
import { StackScreenProps } from "@react-navigation/stack";
import { TrustCircleStackParamList } from "@navigation/types";
import useTrustCircleForm from "./validators";
import useToast from "@hooks/useToast";
import { useAppSelector } from "@store/hooks";
import { DEFAULT_ERROR_MESSAGE } from "@utils/Constants";
import { useCreateTrustCircleMutation } from "@store/apis/kidashiApi";
import { MainLayout } from "@components/Layout";

type CircleNameProps = StackScreenProps<
	TrustCircleStackParamList,
	"CircleName"
>;

export default function CircleName({
	navigation: { navigate, goBack },
}: CircleNameProps) {
	const vendor_id = useAppSelector((state) => state.kidashi.vendor_id);
	const { showToast } = useToast();
	const [createTrustCircle, { isLoading }] = useCreateTrustCircleMutation();
	const {
		circleName,
		setCircleName,
		formErrors,
		validateForm,
		clearFormError,
	} = useTrustCircleForm();

	const handleSubmit = async () => {
		validateForm(async () => {
			try {
				const payload = {
					vendor_id,
					circle_name: circleName,
					description: "",
				};
				console.log(payload);
				const response = await createTrustCircle(payload).unwrap();
				if (response.status) {
					navigate("TrustCircleDetails", { id: response.circle_id });
				} else {
					showToast("danger", response.message);
				}
			} catch (error: any) {
				showToast(
					"danger",
					error.data?.message || error.message || DEFAULT_ERROR_MESSAGE
				);
			}
		});
	};

	return (
		<MainLayout backAction={goBack} isLoading={isLoading}>
			<Typography
				title='Create a Trust Circle'
				type='heading5-sb'
				color={Colors.gray[900]}
			/>
			<Pad size={10} />
			<Typography
				title='Set up a Trust Circle for women who want to access loans together. Provide the details below to get started.'
				type='body-r'
				color={Colors.gray[600]}
			/>
			<Pad size={20} />
			<TextInput
				label='Circle Name'
				placeholder='Enter a name for your trust circle'
				value={circleName}
				onChangeText={(text) => {
					setCircleName(text);
					clearFormError("circleName");
				}}
				error={formErrors.circleName}
			/>
			<Pad size={20} />

			<Button title='Create Trust Circle' onPress={handleSubmit} />
		</MainLayout>
	);
}
