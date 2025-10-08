import { Image, View } from "react-native";
import React from "react";
import { Button, Typography } from "@components/Forms";
import { styles } from "./style";
import ScreenImages from "@assets/images/screens";
import { scale, scaleHeight } from "@utils/Helpers";
import Divider from "@components/Miscellaneous/Divider";
import Colors from "@theme/Colors";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MembersStackParamList } from "@navigation/types";
import MemberDetails from "../..";
import { useAppSelector } from "@store/hooks";

type RequestProps = NativeStackScreenProps<
	MembersStackParamList,
	"RequestSubmitted"
>;

const RequestSubmitted = ({ navigation }: RequestProps) => {
	const memberDetails = useAppSelector((state) => state.kidashi.memberDetails);
	return (
		<View style={styles.container}>
			<View style={styles.iconRow}>
				<Image
					source={ScreenImages.kidashiMemberDetails.checkIcon}
					style={styles.successIcon}
				/>

				<View style={styles.boxIconContainer}>
					<Image
						source={ScreenImages.kidashiMemberDetails.boxIcon}
						style={styles.boxIcon}
					/>
				</View>
			</View>

			<View style={styles.badge}>
				<Typography title='#2329230120' type='body-sb' />
			</View>

			<Divider gapY={scaleHeight(12)} />

			<Typography title='Request Sent for Processing' style={styles.title} />
			<Typography
				title='The asset finance request has been submitted. Once approved, you’ll need to accept or reject the payment schedule.'
				type='body-r'
				style={styles.subtitle}
			/>

			<Divider gapY={scaleHeight(20)} />

			<Button
				title='Return'
				onPress={() =>
					navigation.navigate("MemberDetails", {
						id: memberDetails?.cba_customer_id || "",
					})
				}
				containerStyle={{ width: "100%" }}
			/>
		</View>
	);
};

export default RequestSubmitted;
