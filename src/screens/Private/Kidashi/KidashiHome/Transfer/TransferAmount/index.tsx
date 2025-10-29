import { useState } from "react";
import { FlatList, Image, View } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";

import { Button, TextInput, Typography } from "@components/Forms";
import { MainLayout, Row } from "@components/Layout";
import Pad from "@components/Pad";
import { KidashiHomeStackParamList } from "@navigation/types";
import ScreenImages from "@assets/images/screens";
import { TrustCirclePill } from "@components/UI";
import { useAppSelector } from "@store/hooks";
import useToast from "@hooks/useToast";
import { Stepper } from "@components/Miscellaneous";
import { addCommas } from "@utils/Helpers";

type TransferAmountProps = StackScreenProps<
	KidashiHomeStackParamList,
	"TransferAmount"
>;

export default function TransferAmount({
	navigation: { navigate, goBack },
}: TransferAmountProps) {
	const { showToast } = useToast();

	const [amount, setAmount] = useState<string>("");
	const [amountError, setAmountError] = useState<string>("");

	const submit = () => {
		navigate("TransferConfirmation");
	};

	return (
		<MainLayout backAction={goBack} keyboardAvoidingType='view'>
			<Pad size={16} />

			<Stepper steps={3} currentStep={2} />

			<Pad size={16} />

			<Typography title='Select Verifiers' type='heading-sb' />
			<Typography
				title='Pick members from this circle to vouch. You can move forward now, but their confirmation is required before the new member becomes fully active'
				type='label-r'
			/>

			<Pad size={12} />

			<TrustCirclePill
				icon={ScreenImages.kidashiMemberAddition.verifierTrustCircle}
				title='Ladi Cooperative Group'
			/>

			<Pad size={24} />

			<TextInput
				label='Amount'
				type='text'
				placeholder='Enter Amount'
				keyboardType='numeric'
				error={amountError}
				value={amount}
				onChangeText={(text) => setAmount(addCommas(text))}
			/>

			<Pad size={30} />

			<Button title='Continue' onPress={submit} />
		</MainLayout>
	);
}
