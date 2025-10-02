import { View, Text } from "react-native";
import React from "react";
import Divider from "@components/Miscellaneous/Divider";
import Pad from "@components/Pad";
import { scale, scaleHeight } from "@utils/Helpers";
import { Button, Typography } from "@components/Forms";
import { styles } from "./styles";
import { Row } from "@components/Layout";
import Colors from "@theme/Colors";
import { ScrollView } from "react-native-gesture-handler";
import { Status } from "@screens/Private/Kidashi/KidashiMembers/MemberDetails/Assets/AssetDetails";

interface AssetDetailItem {
	name: string;
	amount: string;
}

interface AssetDetailListProps {
	memberName?: string;
	trustCircle?: string;
	date?: string;
	time?: string;
	items?: AssetDetailItem[];
	total?: string;
	status?: AssetStatus;
}

const AssetDetailList = ({
	memberName = "",
	trustCircle = "",
	date = "",
	time = "",
	items = [],
	total = "",
}: AssetDetailListProps) => {
	return (
		<View style={styles.container}>
			<Pad size={scaleHeight(16)} />

			{/* Details Section */}
			<View>
				<Divider gapY={scaleHeight(8)} />
				<Typography
					type='heading5-sb'
					title='Details'
					style={styles.sectionTitle}
				/>
				<Divider gapY={scaleHeight(8)} />
				<View style={styles.detailsContainer}>
					<View style={styles.detailRow}>
						<Typography
							title='Member Name'
							type='body-r'
							color={Colors.gray[400]}
						/>
						<Typography title={memberName} type='body-sb' />
					</View>
					<Divider gapY={scaleHeight(8)} />

					<View style={styles.detailRow}>
						<Typography
							title='Trust Circle'
							type='body-r'
							color={Colors.gray[400]}
						/>
						<Typography title={trustCircle} type='body-sb' />
					</View>
					<Divider gapY={scaleHeight(8)} />

					<View style={styles.detailRow}>
						<Typography title='Date' type='body-r' color={Colors.gray[400]} />
						<Typography title={date} type='body-sb' />
					</View>
					<Divider gapY={scaleHeight(8)} />

					<View style={styles.detailRow}>
						<Typography title='Time' type='body-r' color={Colors.gray[400]} />
						<Typography title={time} type='body-sb' />
					</View>
				</View>
			</View>

			{/* List of Items Section */}
			<View>
				<Divider gapY={scaleHeight(8)} />
				<Row justifyContent='flex-start' alignItems='center' gap={scale(8)}>
					<Typography
						type='heading5-sb'
						title='List of items'
						style={styles.sectionTitle}
					/>
					<View style={styles.itemCountBadge}>
						<Typography
							title={items.length.toString()}
							type='label-sb'
							color={Colors.white}
						/>
					</View>
				</Row>
				<Divider gapY={scaleHeight(8)} />
				<View style={styles.itemsContainer}>
					{items.map((item, index) => (
						<View key={index}>
							<View style={styles.itemRow}>
								<Typography title={item.name} type='body-r' />
								<Typography title={item.amount} type='body-r' />
							</View>
							{index < items.length - 1 && <Divider gapY={scaleHeight(8)} />}
						</View>
					))}
				</View>
			</View>

			<Pad size={scaleHeight(16)} />
			{/* Total Section */}
			<View style={styles.totalSection}>
				<Row>
					<Typography
						title='Total'
						type='heading5-sb'
						style={styles.sectionTitle}
					/>
					<Typography
						title={total}
						type='heading5-sb'
						style={styles.sectionTitle}
					/>
				</Row>
			</View>

			{/* {status === "approved" && (
				<View>
					<Row gap={scale(8)}>
						<Button title='Accept' containerStyle={{ flex: 1 }} />
						<Button
							title='Reject'
							containerStyle={styles.rejectedCardContainer}
							textStyle={{ color: Colors.danger["base"] }}
						/>
					</Row>
				</View>
			)} */}
			<Pad size={scaleHeight(16)} />
		</View>
	);
};

export default AssetDetailList;
