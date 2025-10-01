import React, { useCallback, useEffect, useState } from "react";
import { styles } from "./style";
import SafeAreaWrapper from "@components/Layout/SafeAreaWrapper";
import MemberDetailsHeaderComp from "@components/UI/MemberDetails/HeaderComp";
import MemberDetailsCard from "@components/UI/MemberDetails/MemberDetailsCard";
import Colors from "@theme/Colors";
import Tab from "@components/Miscellaneous/Tab";
import AccountInfo from "@components/UI/MemberDetails/AccountInfo";
import MoreDetails from "@components/UI/MemberDetails/MoreDetails";
import Transactions from "@components/UI/MemberDetails/Transactions";
import Pad from "@components/Pad";
import { StackScreenProps } from "@react-navigation/stack";
import { MembersStackParamList } from "@navigation/types";
import { BackHandler, Image, Pressable } from "react-native";
import { Typography } from "@components/Forms";
import ScreenImages from "@assets/images/screens";
import PerformActionModal from "@components/UI/MemberDetails/PerformActionModal";
import { useFocusEffect } from "@react-navigation/native";
import { MainLayout } from "@components/Layout";
import { useGetMemberDetailsMutation } from "@store/apis/kidashiApi";
import useToast from "@hooks/useToast";
import { DEFAULT_ERROR_MESSAGE } from "@utils/Constants";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { setMemberDetails } from "@store/slices/kidashiSlice";

type TabType = "Transactions" | "More details" | "Account Info";

type MemberDetailsProps = StackScreenProps<
	MembersStackParamList,
	"MemberDetails"
>;
const MemberDetails = ({
	navigation: { navigate, goBack },
	route,
}: MemberDetailsProps) => {
	const dispatch = useAppDispatch();
	const { showToast } = useToast();
	const [getMemberDetails, { isLoading }] = useGetMemberDetailsMutation();

	const memberDetails = useAppSelector((state) => state.kidashi.memberDetails);

	const [activeTab, setActiveTab] = useState<TabType>("Transactions");
	const [visible, setVisible] = useState<boolean>(false);

	// console.log(route.params.id);

	const fetchDetails = async () => {
		try {
			const { status, message, data } = await getMemberDetails({
				cba_customer_id: route.params.id,
			}).unwrap();
			if (status) {
				console.log({ data });
				dispatch(setMemberDetails(data));
			} else {
				showToast("danger", message);
				goBack();
			}
		} catch (error: ErrorResponse | any) {
			console.log(error);
			showToast(
				"danger",
				error.data?.message || error.message || DEFAULT_ERROR_MESSAGE
			);
		}
	};

	useEffect(() => {
		fetchDetails();
	}, [route.params.id]);

	const backAction = () => {
		goBack();
		return true; // Prevent default behavior
	};

	// e0d8775f-45d0-4ba3-9442-039dca3948d4

	useFocusEffect(
		useCallback(() => {
			const backHandler = BackHandler.addEventListener(
				"hardwareBackPress",
				backAction
			);

			return () => backHandler.remove(); // Cleanup
		}, [])
	);

	console.log({ memberDetails });

	return (
		<SafeAreaWrapper backAction={backAction} title='Member Details'>
			<MemberDetailsHeaderComp
				onOTPManagePress={() => navigate("ManageVerfiers")}
				userName={`${memberDetails?.first_name} ${memberDetails?.surname}`}
				status={memberDetails?.status}
			/>
			<MemberDetailsCard navigate={navigate} memberDetails={memberDetails} />
			<Tab
				items={["Transactions", "More details", "Account Info"]}
				value={activeTab}
				onTap={(value) => setActiveTab(value as TabType)}
			/>
			<Pad size={16} />
			{activeTab === "Transactions" && <Transactions navigate={navigate} />}
			{activeTab === "More details" && <MoreDetails details={memberDetails} />}
			{activeTab === "Account Info" && <AccountInfo details={memberDetails} />}
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
			{/* */}
			<PerformActionModal
				visible={visible}
				onClose={() => setVisible(false)}
				parent='MemberDetails'
				onRequestAssetPress={() => navigate("EnterAssetInformation")}
				// onAddMemberPress={() => navigate("")}
			/>
		</SafeAreaWrapper>
	);
};

export default MemberDetails;
