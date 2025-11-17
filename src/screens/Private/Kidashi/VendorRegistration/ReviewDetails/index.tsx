import { StackScreenProps } from "@react-navigation/stack";
import { Image, View } from "react-native";

import { Button, IconButton, Typography } from "@components/Forms";
import { MainLayout, Row } from "@components/Layout";
import { KidashiRegistrationStackParamList } from "@navigation/types";
import styles from "./styles";
import ScreenImages from "@assets/images/screens";
import Pad from "@components/Pad";
import Tab from "@components/Miscellaneous/Tab";
import { useState } from "react";
import Guarantors from "./Guarantors";
import AboutMyBusiness from "./AboutMyBusiness";
import { Stepper } from "@components/Miscellaneous";
import useToast from "@hooks/useToast";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { useRegisterMutation } from "@store/apis/kidashiApi";
import { DEFAULT_ERROR_MESSAGE } from "@utils/Constants";
import { setVendorId } from "@store/slices/kidashiSlice";
import { persistAppState } from "@utils/Helpers";
import { updateAppstate } from "@store/slices/appSlice";

type ReviewDetailsProps = StackScreenProps<
	KidashiRegistrationStackParamList,
	"ReviewDetails"
>;

export default function ReviewDetails({
	navigation: { navigate, goBack },
}: ReviewDetailsProps) {
	const dispatch = useAppDispatch();
	const [activeTab, setActiveTab] = useState<string>("Guarantors");

	const { showToast } = useToast();
	const customer = useAppSelector((state) => state.customer.customer);
	const registration = useAppSelector((state) => state.kidashi.registration);
	const [register, { isLoading }] = useRegisterMutation();

	const handleSubmit = async () => {
		try {
			const { status, message, vendor_id } = await register({
				business_type: registration?.business_type || "",
				community: registration?.community || "",
				guarantors: registration?.guarantors || [],
				business_description: registration?.business_description || "",

				cba_customer_id: customer?.id || "",
			}).unwrap();

			if (status) {
				persistAppState({
					newKidashiVendor: true,
				});
				dispatch(
					updateAppstate({
						newKidashiVendor: true,
					})
				);
				navigate("OnboardingSuccess");
				dispatch(setVendorId(vendor_id));
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

	console.log(registration);

	return (
		<MainLayout
			keyboardAvoidingType='scroll-view'
			rightTitle='Review and Send'
			backAction={goBack}
			isLoading={isLoading}
		>
			<Stepper steps={3} currentStep={3} />

			<Pad />

			<View style={styles.reviewHeader}>
				<View style={styles.vendorPlaceholderContainer}>
					<Image
						source={ScreenImages.kidashiReviewDetails.userPlaceholder}
						style={styles.vendorPlaceholderImage}
					/>
				</View>

				<Pad size={8} />

				<Typography
					title={customer?.business_name || ""}
					type='subheading-sb'
				/>
				<Typography title={registration.business_type} type='label-r' />

				<Pad size={8} />

				<IconButton
					containerStyle={styles.editContainer}
					onPress={() => navigate("VendorInformation")}
				>
					<Row alignItems='center' justifyContent='flex-start' gap={8}>
						<Image
							source={ScreenImages.kidashiReviewDetails.editIcon}
							style={styles.editIcon}
						/>
						<Typography title='Edit' type='label-sb' />
					</Row>
				</IconButton>
			</View>

			<Pad size={24} />

			<Tab
				items={["Guarantors", "About my business"]}
				onTap={setActiveTab}
				value={activeTab}
			/>

			<Pad size={24} />

			{activeTab === "Guarantors" ? (
				<Guarantors
					guarantors={registration?.guarantors || []}
					onEdit={() => navigate("GuarantorDetails")}
				/>
			) : (
				<AboutMyBusiness
					businessDescription={registration?.business_description || ""}
				/>
			)}

			<Pad size={40} />

			<Button title='Submit for Review' onPress={handleSubmit} />

			<Pad size={100} />
		</MainLayout>
	);
}
