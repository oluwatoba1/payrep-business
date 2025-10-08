import React from "react";
import {
	View,
	Text,
	FlatList,
	Image,
	TouchableOpacity,
	StyleSheet,
} from "react-native";
import SafeAreaWrapper from "@components/Layout/SafeAreaWrapper";
import ScreenImages from "@assets/images/screens";
import Divider from "@components/Miscellaneous/Divider";
import { Row } from "@components/Layout";

const notifications = [
	{
		id: "1",
		title: "New Member joined Ladi Coop...",
		subtitle: "Zainab Abubakar",
		time: "16 Sep at 10:32 am",
		unread: true,
	},
	{
		id: "2",
		title: "New Trust Circle Created",
		subtitle: "Kaduna Market Women",
		time: "15 Sep at 4:12 pm",
		unread: true,
	},
	{
		id: "3",
		title: "Funding Successful",
		subtitle: "₦20,000 credited to Hauwa Ibr...",
		time: "15 Sep at 2:08 pm",
		unread: true,
	},
];

const NotificationItem = ({ item }: any) => (
	<TouchableOpacity activeOpacity={0.8}>
		<Row>
			<View style={styles.avatarContainer}>
				<Image
					source={ScreenImages.kidashiMemberDetails.userPlaceholder}
					style={styles.avatar}
				/>
			</View>

			<View style={styles.textContainer}>
				<Text style={styles.title} numberOfLines={1}>
					{item.title}
				</Text>
				<Text style={styles.subtitle}>{item.subtitle}</Text>
			</View>
			<View>
				<Row justifyContent='flex-end' gap={8} alignItems='center'>
					{item.unread && <View style={styles.dot} />}
					<Image
						source={ScreenImages.kidashiMemberDetails.chevronRightIcon}
						style={styles.chevronIcon}
					/>
				</Row>
				<Text style={styles.time}>{item.time}</Text>
			</View>
		</Row>
		<Divider gapY={20} />
	</TouchableOpacity>
);

const NotificationIndex = () => {
	return (
		<SafeAreaWrapper title='Notifications'>
			<FlatList
				data={notifications}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => <NotificationItem item={item} />}
				contentContainerStyle={{ paddingVertical: 8 }}
			/>
		</SafeAreaWrapper>
	);
};

export default NotificationIndex;

const styles = StyleSheet.create({
	avatarContainer: {
		width: 42,
		height: 42,
		borderRadius: 21,
		backgroundColor: "#EDE9FE",
		alignItems: "center",
		justifyContent: "center",
		marginRight: 12,
	},
	avatar: {
		width: 24,
		height: 24,
		tintColor: "#5B21B6",
		resizeMode: "contain",
	},
	textContainer: {
		flex: 1,
	},
	title: {
		fontSize: 14,
		fontWeight: "600",
		color: "#111827",
		marginBottom: 2,
	},
	subtitle: {
		fontSize: 13,
		color: "#6B7280",
	},

	dot: {
		width: 8,
		height: 8,
		borderRadius: 4,
		backgroundColor: "#EF4444",
	},
	time: {
		fontSize: 12,
		color: "#9CA3AF",
		marginLeft: 54, // aligns with text start
		marginBottom: 6,
	},
	chevronIcon: {
		width: 24,
		height: 24,
		resizeMode: "contain",
	},
});
