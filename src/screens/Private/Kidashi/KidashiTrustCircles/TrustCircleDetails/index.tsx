import { useCallback, useState } from "react";
import { BackHandler, FlatList, Image, Pressable, View } from "react-native";
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
import useToast from "@hooks/useToast";
import { useFetchTrustCircleMutation } from "@store/apis/kidashiApi";
import { DEFAULT_ERROR_MESSAGE } from "@utils/Constants";
import { KidashiDashboardEmptyState } from "@components/Miscellaneous";
import { KidashiDashboardEmptyStateProps } from "@components/Miscellaneous/KidashiDashboardEmptyState";
import PerformActionModal from "@components/UI/MemberDetails/PerformActionModal";
import { setTrustCircleDetails } from "@store/slices/kidashiSlice";
import { useAppDispatch } from "@store/hooks";

const emptyStateData: KidashiDashboardEmptyStateProps = {
	icon: ScreenImages.kidashiHome.searchIcon,
	title: "No members",
	description: "Add members by clicking on the action button below",
};

type TrustCircleDetailsProps = CompositeScreenProps<
	StackScreenProps<TrustCircleStackParamList, "TrustCircleDetails">,
	CompositeScreenProps<
		BottomTabScreenProps<KidashiBottomTabParamList, "KidashiMembers">,
		BottomTabScreenProps<KidashiBottomTabParamList, "KidashiHome">
	>
>;

export default function TrustCircleDetails({
	navigation: { navigate },
	route,
}: TrustCircleDetailsProps) {
	const { showToast } = useToast();
	const dispatch = useAppDispatch();

	const [fetchTrustCircle, { isLoading }] = useFetchTrustCircleMutation();

	const { reset } =
		useNavigation<BottomTabNavigationProp<KidashiBottomTabParamList>>();

	const [circleDetails, setCircleDetails] = useState<ITrustCircleDetail | null>(
		null
	);
	const [visible, setVisible] = useState<boolean>(false);

	const getCircleDetails = async () => {
		try {
			const { status, message, data } = await fetchTrustCircle({
				id: route.params?.id || "",
			}).unwrap();

			if (status) {
				setCircleDetails(data);
				dispatch(setTrustCircleDetails(data));
			} else {
				showToast("danger", message);
			}
		} catch (error: ErrorResponse | any) {
			console.log(error);
			showToast(
				"danger",
				error.data?.message || error.message || DEFAULT_ERROR_MESSAGE
			);
		}
	};

	// console.log(circleDetails);

	const resetAndGoBack = () => {
		reset({
			index: 0,
			routes: [{ name: "Trust Circles" }],
		});
	};

	useFocusEffect(
		useCallback(() => {
			getCircleDetails();
		}, [route.params?.id])
	);

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

	const overview: KidashiHomeCardProps["items"] = [
		{
			title: "Members",
			value: String(circleDetails?.members_count || 0),
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
						title={circleDetails?.circle_name || ""}
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
			<FlatList<IWomen>
				data={circleDetails?.women}
				renderItem={({ item }) => (
					<KidashiMemberItemCard
						title={`${item.first_name} ${item.surname}`}
						subtitle={item.mobile_number
							.split("")
							.map((c, index) => (index > 2 && index < 7 ? "*" : c))
							.join("")}
						onSelect={() => {
							navigate("KidashiMembers", {
								screen: "MemberDetails",
								params: { id: item.cba_customer_id },
							});
						}}
						rightNode={
							<Image
								source={ComponentImages.kidashiMemberCard.arrowRightIcon2}
								style={styles.proceedToMemberIcon}
							/>
						}
					/>
				)}
				showsVerticalScrollIndicator={false}
				ListEmptyComponent={<KidashiDashboardEmptyState {...emptyStateData} />}
			/>

			<Pressable
				style={styles.performActionButton}
				onPress={() => setVisible(true)}
			>
				<Image
					source={ScreenImages.kidashiMemberDetails.boltIcon}
					style={styles.boltIcon}
				/>
				<Typography
					title='Perform an Action'
					type='body-sb'
					style={styles.performActionText}
				/>
			</Pressable>

			<PerformActionModal
				options={[
					{
						title: "Add a Member",
						subTitle: "Add a new member to this Trust Circle",
						icon: ScreenImages.kidashiMemberDetails.addTeamIcon,
						onPress: () => {
							navigate("KidashiHome", {
								screen: "MemberRegistration",
								params: { screen: "MemberPhoneNumber" },
							});
						},
					},
				]}
				visible={visible}
				onClose={() => setVisible(false)}
			/>
		</MainLayout>
	);
}
