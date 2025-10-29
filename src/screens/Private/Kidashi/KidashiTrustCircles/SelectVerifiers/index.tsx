import { FlatList, Image, View } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";

import { Button, Typography } from "@components/Forms";
import { MainLayout, Row } from "@components/Layout";
import Pad from "@components/Pad";
import { TrustCircleStackParamList } from "@navigation/types";
import ScreenImages from "@assets/images/screens";
import Colors from "@theme/Colors";
import styles from "./styles";
import { KidashiMemberItemCard } from "@components/Cards";
import { useEffect, useState } from "react";
import { TrustCirclePill } from "@components/UI";
import { useAppSelector } from "@store/hooks";
import useToast from "@hooks/useToast";
import {
	useAddMemberToTrustCircleMutation,
	useSearchWomanMutation,
} from "@store/apis/kidashiApi";
import { DEFAULT_ERROR_MESSAGE } from "@utils/Constants";
import { Stepper } from "@components/Miscellaneous";

type SelectVerifiersProps = StackScreenProps<
	TrustCircleStackParamList,
	"SelectVerifiers"
>;

export default function SelectVerifiers({
	navigation: { navigate, goBack },
}: SelectVerifiersProps) {
	const { showToast } = useToast();

	const [addMemberToTrustCircle, { isLoading }] =
		useAddMemberToTrustCircleMutation();
	const [searchWoman, { isLoading: isLoadingSearchWoman }] =
		useSearchWomanMutation();

	const circle_details = useAppSelector(
		(state) => state.kidashi.circle_details
	);
	const vendor_id = useAppSelector((state) => state.kidashi.vendor?.id);
	const memberDetails = useAppSelector((state) => state.kidashi.memberDetails);

	const [selectedMembers, setSelectedMembers] = useState<iWomanMemberDetails[]>(
		[]
	);

	const [members, setMembers] = useState<iWomanMemberDetails[]>([]);

	const fetchWomen = async () => {
		await searchWoman({
			trust_circle_id: circle_details?.id || "",
		})
			.unwrap()
			.then((res) => {
				if (res.status) {
					setMembers(res.data);
				}
			})
			.catch((err) => {
				console.log(err);
				showToast("danger", err.data.message || DEFAULT_ERROR_MESSAGE);
			});
	};

	const submit = async () => {
		try {
			const { status, message } = await addMemberToTrustCircle({
				initiating_vendor_id: vendor_id || "",
				woman_id: memberDetails?.id || "",
				trust_circle_id: circle_details?.id || "",
				selected_voters: selectedMembers.map((member) => member.id),
			}).unwrap();
			if (status) {
				navigate("MemberVerification");
			} else {
				showToast("danger", message || DEFAULT_ERROR_MESSAGE);
			}
		} catch (error: any) {
			showToast("danger", error.data.message || DEFAULT_ERROR_MESSAGE);
		}
	};

	const onSelect = (item: iWomanMemberDetails) => {
		const member = selectedMembers.find((member) => member.id === item.id);
		if (member) {
			setSelectedMembers(
				selectedMembers.filter((item) => item.id !== member.id)
			);
			return;
		}
		setSelectedMembers([...selectedMembers, item]);
	};

	useEffect(() => {
		fetchWomen();
	}, [circle_details?.id]);

	return (
		<MainLayout
			backAction={goBack}
			keyboardAvoidingType='view'
			isLoading={isLoading}
		>
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

			<View>
				<View style={styles.memberHeader}>
					<Typography
						title='Members'
						type='body-sb'
						color={Colors.neutral.base}
					/>
				</View>

				<FlatList<iWomanMemberDetails>
					data={[...new Set([...selectedMembers, ...members])]}
					renderItem={({ item }) => (
						<KidashiMemberItemCard
							title={`${item.first_name} ${item.surname}`}
							subtitle={item.mobile_number}
							isSelected={
								!!selectedMembers.find((member) => member.id === item.id)
							}
							onSelect={() => onSelect(item)}
						/>
					)}
					keyExtractor={(item) => item.id}
					showsVerticalScrollIndicator={false}
				/>
			</View>

			<Pad size={30} />

			<Button title='Continue' onPress={submit} />
		</MainLayout>
	);
}
