import { useCallback, useState } from "react";
import { BackHandler } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { CompositeScreenProps, useFocusEffect } from "@react-navigation/native";

import { MainLayout } from "@components/Layout";
import {
	KidashiHomeStackParamList,
	MemberRegistrationStackParamList,
} from "@navigation/types";
import { Dropdown, Button, Typography } from "@components/Forms";
import { useUpdatePepMutation } from "@store/apis/customerApi";
import useToast from "@hooks/useToast";
import { DEFAULT_ERROR_MESSAGE } from "@utils/Constants";
import Pad from "@components/Pad";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { useUpdateWomanPepMutation } from "@store/apis/kidashiApi";
import { useAppSelector } from "@store/hooks";
import { Stepper } from "@components/Miscellaneous";

const OPTIONS = [
	{ label: "Yes", value: "yes" },
	{ label: "No", value: "no" },
];

type MemberPepProps = CompositeScreenProps<
	StackScreenProps<MemberRegistrationStackParamList, "MemberPep">,
	BottomTabScreenProps<KidashiHomeStackParamList, "KidashiDashboard">
>;

export default function MemberPep({
	navigation: { navigate },
}: MemberPepProps) {
	const { showToast } = useToast();

	const [updatePep, { isLoading }] = useUpdatePepMutation();

	const customerId = useAppSelector(
		(state) => state.auth.registration.customer_id
	);

	const [selectedValue, setSelectedValue] = useState<
		DefaultDropdownOption | undefined
	>();
	const [value, setValue] = useState<string>("");
	const [error, setError] = useState<string>("");

	const submit = async () => {
		if (value === null) {
			setError("Please select PEP status");
			return;
		}
		try {
			const { status, message } = await updatePep({
				pep: value === "yes",
			}).unwrap();
			if (status) {
				navigate("MemberSourceOfIncome");
			} else {
				showToast("danger", message);
			}
		} catch (error: ErrorResponse | any) {
			showToast(
				"danger",
				error.data?.message || error.message || DEFAULT_ERROR_MESSAGE
			);
		}
	};

	useFocusEffect(
		useCallback(() => {
			const backAction = () => {
				navigate("KidashiDashboard");
				return true; // Prevent default behavior
			};

			const backHandler = BackHandler.addEventListener(
				"hardwareBackPress",
				backAction
			);

			return () => backHandler.remove(); // Cleanup
		}, [])
	);

	return (
		<MainLayout
			backAction={() => navigate("KidashiDashboard")}
			isLoading={isLoading}
		>
			<Stepper steps={8} currentStep={7} />
			<Typography title='PEP Status' type='heading-sb' />
			<Typography
				title='Are you politically exposed? Please respond with either Yes or No.'
				type='label-sb'
			/>

			<Pad size={20} />

			<Dropdown
				label='Are you a politically exposed person'
				options={OPTIONS}
				selectedOption={selectedValue}
				onSelect={(option) => {
					setSelectedValue(option);
					setValue(option.value);
				}}
				error={error}
			/>

			<Pad size={40} />

			<Button title='Save and Continue' onPress={submit} />
		</MainLayout>
	);
}
