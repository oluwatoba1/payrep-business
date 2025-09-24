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
import { useState } from "react";

type SelectVerifiersProps = StackScreenProps<
	TrustCircleStackParamList,
	"SelectVerifiers"
>;

interface IMember {
	id: string;
	title: string;
	subtitle: string;
}

export default function SelectVerifiers({
	navigation: { navigate, goBack },
}: SelectVerifiersProps) {
	const [members, setMembers] = useState<IMember[]>([
		{ id: "1", title: "Gambo Salami", subtitle: "090*****1234" },
		{ id: "2", title: "Susannah Bali", subtitle: "081*****7734" },
		{ id: "3", title: "Shekinat Sanusi", subtitle: "080*****9934" },
		{ id: "4", title: "Ruka Abubakar", subtitle: "070*****3334" },
	]);
	const [selectedMembers, setSelectedMembers] = useState<IMember[]>([]);

	const onSelect = (item: IMember) => {
		setSelectedMembers([...selectedMembers, item]);
	};
	return (
		<MainLayout backAction={goBack}>
			<Pad size={16} />

			<Typography title='Select Verifiers' type='heading-sb' />
			<Typography
				title='Pick members from this circle to vouch. You can move forward now, but their confirmation is required before the new member becomes fully active'
				type='label-r'
			/>

			<Pad size={12} />

			<Row alignItems='center' gap={8} containerStyle={styles.trustCircleCard}>
				<Image
					source={ScreenImages.kidashiMemberAddition.verifierTrustCircle}
					style={styles.trustCircleIcon}
				/>
				<Typography
					title='Ladi Cooperative Group'
					type='label-sb'
					color={Colors.neutral.base}
				/>
			</Row>

			<Pad size={24} />

			<View>
				<View style={styles.memberHeader}>
					<Typography
						title='Members'
						type='body-sb'
						color={Colors.neutral.base}
					/>
				</View>

				<FlatList<IMember>
					data={[...new Set([...selectedMembers, ...members])]}
					renderItem={({ item }) => (
						<KidashiMemberItemCard
							{...item}
							value={!!selectedMembers.find((member) => member.id === item.id)}
							onSelect={() => onSelect(item)}
						/>
					)}
				/>
			</View>

			<Button title='Continue' onPress={() => navigate("MemberVerification")} />
		</MainLayout>
	);
}
