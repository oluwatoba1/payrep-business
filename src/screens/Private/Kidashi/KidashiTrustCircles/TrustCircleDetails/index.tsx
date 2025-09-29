import { useCallback, useState } from "react";
import { BackHandler, FlatList, Image, View } from "react-native";
import {
	BottomTabNavigationProp,
	BottomTabScreenProps,
} from "@react-navigation/bottom-tabs";
import { StackScreenProps } from "@react-navigation/stack";

import { IconButton, Typography } from "@components/Forms";
import {
	KidashiBottomTabParamList,
	TrustCircleStackParamList,
} from "@navigation/types";
import {
	CompositeScreenProps,
	useFocusEffect,
	useNavigation,
} from "@react-navigation/native";
import MainLayout from "@components/Layout/KidashiLayout";
import { scaleHeight } from "@utils/Helpers";
import ComponentImages from "@assets/images/components";
import styles from "./styles";
import Pad from "@components/Pad";
import Colors from "@theme/Colors";
import KidashiHomeCard, {
	KidashiHomeCardProps,
} from "@components/Cards/KidashiHomeCard";
import Tab from "@components/Miscellaneous/Tab";
import { KidashiMemberItemCard } from "@components/Cards";
import ScreenImages from "@assets/images/screens";

const overview: KidashiHomeCardProps["items"] = [
	{
		title: "Members",
		value: "0",
		backgroundColor: Colors.neutral["50"],
		titleColor: Colors.neutral["400"],
		descriptionColor: Colors.black,
	},
	{
		title: "Outstanding",
		value: "₦0.00",
		backgroundColor: Colors.success["100"],
		titleColor: Colors.success["400"],
		descriptionColor: Colors.success["700"],
	},
];

interface IMember {
	id: string;
	title: string;
	subtitle: string;
}

type TrustCircleDetailsProps = CompositeScreenProps<
	StackScreenProps<TrustCircleStackParamList, "TrustCircleDetails">,
	BottomTabScreenProps<KidashiBottomTabParamList, "KidashiMembers">
>;

export default function TrustCircleDetails({
	navigation: { navigate, goBack },
}: TrustCircleDetailsProps) {
	const { reset } =
		useNavigation<BottomTabNavigationProp<KidashiBottomTabParamList>>();

	const [members, setMembers] = useState<IMember[]>([
		{ id: "1", title: "Gambo Salami", subtitle: "090*****1234" },
		{ id: "2", title: "Susannah Bali", subtitle: "081*****7734" },
		{ id: "3", title: "Shekinat Sanusi", subtitle: "080*****9934" },
		{ id: "4", title: "Ruka Abubakar", subtitle: "070*****3334" },
	]);

	const [selectedMembers, setSelectedMembers] = useState<IMember[]>([]);

	const resetAndGoBack = () => {
		reset({
			index: 0,
			routes: [{ name: "Trust Circles" }],
		});
	};

	useFocusEffect(
		useCallback(() => {
			const backHandler = BackHandler.addEventListener(
				"hardwareBackPress",
				() => {
					resetAndGoBack();
					return true;
				}
			);

			return () => backHandler.remove(); // Cleanup
		}, [])
	);

	return (
		<MainLayout
			leftNode={
				<IconButton
					onPress={resetAndGoBack}
					containerStyle={{ paddingVertical: scaleHeight(10) }}
				>
					<Image
						source={ComponentImages.header.backIcon}
						style={styles.backIcon}
					/>
				</IconButton>
			}
			headerFooter={
				<View>
					<Pad size={16} />

					<Image
						source={ScreenImages.kidashiHome.trustCircleDetailsIcon}
						style={styles.trustCircleDetailsIcon}
					/>

					<Pad size={8} />

					<Typography
						title='Ladi Cooperative Group'
						type='subheading-sb'
						color={Colors.neutral["600"]}
					/>
				</View>
			}
		>
			<Pad size={16} />

			<KidashiHomeCard items={overview} />

			<Pad size={16} />

			<Tab items={["Members"]} value='Members' onTap={() => {}} />
			<FlatList<IMember>
				data={members}
				renderItem={({ item }) => (
					<KidashiMemberItemCard
						{...item}
						onSelect={() =>
							navigate("KidashiMembers", { screen: "MemberDetails" })
						}
						rightNode={
							<Image
								source={ComponentImages.kidashiMemberCard.arrowRightIcon2}
								style={styles.proceedToMemberIcon}
							/>
						}
					/>
				)}
				showsVerticalScrollIndicator={false}
			/>
		</MainLayout>
	);
}
