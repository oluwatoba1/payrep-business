import { Image, View } from "react-native";
import React, { useMemo } from "react";
import SafeAreaWrapper from "@components/Layout/SafeAreaWrapper";
import { Button, Typography } from "@components/Forms";
import { MainLayout, Row } from "@components/Layout";
import { scale, scaleHeight } from "@utils/Helpers";
import Colors from "@theme/Colors";
import { styles } from "./style";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { MembersStackParamList } from "@navigation/types";
import ScreenImages from "@assets/images/screens";
import Divider from "@components/Miscellaneous/Divider";
import { ScrollView } from "react-native-gesture-handler";
import Pad from "@components/Pad";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { setAssetRequest } from "@store/slices/kidashiSlice";

type ReviewAssetRequestProps = NativeStackScreenProps<
	MembersStackParamList,
	"ReviewAssetRequest"
>;

const ReviewAssetRequest = ({
	navigation: { navigate, goBack },
	route,
}: ReviewAssetRequestProps) => {
	const dispatch = useAppDispatch();
	const items = route.params?.items || [];
	const productCode = route.params?.productCode || "";

	const memberDetails = useAppSelector((state) => state.kidashi.memberDetails);

	const total = useMemo(() => {
		return items.reduce((sum, it) => sum + (parseFloat(it.price) || 0), 0);
	}, [items]);

	const formatCurrency = (amount: number) => {
		return `₦ ${amount.toLocaleString("en-NG", {
			minimumFractionDigits: 2,
			maximumFractionDigits: 2,
		})}`;
	};

	const today = useMemo(() => {
		const date = new Date();
		return date.toLocaleDateString("en-GB", {
			day: "2-digit",
			month: "long",
			year: "numeric",
		});
	}, []);

	const proceed = () => {
		dispatch(
			setAssetRequest({
				items_requested: items,
				value: String(total),
				product_code: productCode,
			})
		);
		navigate("RepaymentOverview");
	};

	return (
		<SafeAreaWrapper title='Review Asset Request'>
			<View>
				<View style={styles.boxIconContainer}>
					<Image
						source={ScreenImages.kidashiMemberDetails.boxIcon}
						style={styles.boxIcon}
					/>
				</View>
				<Typography title='Review Asset Request' style={styles.screenTitle} />
				<Typography
					title='Confirm the items and total amount requested before submission. Make sure everything is accurate'
					type='body-sr'
					style={styles.screenSubTitle}
				/>
			</View>
			<View style={{ flex: 1 }}>
				<ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1 }}>
					<Divider gapY={scaleHeight(12)} />
					<Typography
						title='Summary'
						type='body-sb'
						style={styles.sectionTitle}
					/>
					<Divider gapY={scaleHeight(12)} />
					<View style={styles.row}>
						<Typography title='Member Name' type='label-r' />
						<Typography
							title={`${memberDetails?.first_name || ""} ${
								memberDetails?.surname || ""
							}`}
							type='body-sb'
						/>
					</View>
					<View style={styles.row}>
						<Typography title='Date' type='label-r' />
						<Typography title={today} type='body-sb' />
					</View>

					<Row
						alignItems='center'
						justifyContent='space-between'
						containerStyle={styles.itemsHeader}
					>
						<Row>
							<Typography title='List of items' type='body-sb' />
							<View style={styles.itemCountBadge}>
								<Typography
									title={`${items.length}`}
									type='body-sb'
									color={Colors.white}
								/>
							</View>
						</Row>
					</Row>
					<Divider gapY={scaleHeight(8)} />

					{items.map((it) => (
						<View key={it.id} style={styles.row}>
							<Typography title={it.name} type='label-r' />
							<Typography
								title={`${formatCurrency(parseFloat(it.price) || 0)}`}
								type='body-sb'
							/>
						</View>
					))}
				</ScrollView>
			</View>
			<Divider gapBottom={scaleHeight(16)} gapX={scale(-16)} />
			<Row>
				<Typography title='Total' type='body-b' />
				<Typography title={`${formatCurrency(total)}`} type='body-b' />
			</Row>

			<Pad size={scaleHeight(16)} />
			<Button title='Continue' onPress={proceed} />
		</SafeAreaWrapper>
	);
};

export default ReviewAssetRequest;
