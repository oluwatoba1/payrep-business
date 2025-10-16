import { useEffect, useState } from "react";
import { Image, View } from "react-native";

import { Button, IconButton, PinPad, Typography } from "@components/Forms";
import { MainLayout, Row } from "@components/Layout";
import Pad from "@components/Pad";
import { TrustCirclePill } from "@components/UI";
import styles from "./styles";
import ComponentImages from "@assets/images/components";
import { StackScreenProps } from "@react-navigation/stack";
import { TrustCircleStackParamList } from "@navigation/types";
import Colors from "@theme/Colors";
import { DEFAULT_ERROR_MESSAGE } from "@utils/Constants";
import useToast from "@hooks/useToast";
import {
	useFetchVotesMutation,
	useValidateVoteMutation,
} from "@store/apis/kidashiApi";
import { useAppSelector } from "@store/hooks";

type MemberVerificationProps = StackScreenProps<
	TrustCircleStackParamList,
	"MemberVerification"
>;

export default function MemberVerification({
	navigation: { navigate },
}: MemberVerificationProps) {
	const { showToast } = useToast();

	const memberDetails = useAppSelector((state) => state.kidashi.memberDetails);
	const circle_details = useAppSelector(
		(state) => state.kidashi.circle_details
	);

	const [fetchVotes, { isLoading: isLoadingVotes }] = useFetchVotesMutation();
	const [validateVote, { isLoading: isLoadingValidateVote }] =
		useValidateVoteMutation();

	const [votes, setVotes] = useState<{ vote_id: string; otp: string }[]>([]);
	const [voters, setVoters] = useState<IVerifier[]>([]);

	const updateVote = (index: number, otp: string) => {
		const updatedVotes = [...votes];
		updatedVotes[index].otp = otp;
		setVotes(updatedVotes);
	};

	const retrieveVotes = async () => {
		try {
			const { status, message, data } = await fetchVotes({
				trust_circle_id: circle_details?.id || "",
				candidate_member: memberDetails?.id || "",
			}).unwrap();
			if (status) {
				setVoters(data);
				setVotes(
					data.map((voter: IVerifier) => ({
						vote_id: voter.id,
						otp: "",
					}))
				);
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

	const _validateVote = async () => {
		try {
			const { status, message } = await validateVote({ votes }).unwrap();
			if (status) {
				navigate("MemberAdditionSuccessScreen");
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

	useEffect(() => {
		retrieveVotes();
	}, []);

	return (
		<MainLayout
			keyboardAvoidingType='scroll-view'
			isLoading={isLoadingVotes || isLoadingValidateVote}
		>
			<Pad size={16} />

			<Typography title='Member Verification' type='heading-sb' />
			<Typography
				title='To confirm this new member, enter the OTP codes sent to 3 members of the trust circle. This step ensures that everyone is aware and in agreement'
				type='label-r'
			/>

			<Pad size={24} />

			{voters.map((voter, index) => (
				<View key={voter.id} style={styles.verifierContainer}>
					<TrustCirclePill
						icon={ComponentImages.kidashiMemberCard.memberIcon}
						title={`${voter.voter__first_name} ${voter.voter__surname}`}
					/>

					<Pad />

					<PinPad
						pin={votes[index]?.otp || ""}
						onInput={(otp) => updateVote(index, otp)}
						codeLength={4}
						error=''
					/>
				</View>
			))}

			<Pad size={120} />

			<IconButton onPress={() => navigate("MemberAdditionSuccessScreen")}>
				<Row gap={8} alignItems='center' justifyContent='center'>
					<Typography
						title='Skip for now'
						type='label-sb'
						color={Colors.primary["600"]}
					/>
					<Image
						source={ComponentImages.kidashiCard.arrowRight}
						style={styles.skipIcon}
					/>
				</Row>
			</IconButton>

			<Pad size={20} />

			<Button title='Continue' onPress={_validateVote} />
		</MainLayout>
	);
}
