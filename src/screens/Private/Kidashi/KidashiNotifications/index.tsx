import React, { useCallback, useState } from "react";
import {
	View,
	Text,
	FlatList,
	Image,
	TouchableOpacity,
	StyleSheet,
	RefreshControl,
} from "react-native";
import SafeAreaWrapper from "@components/Layout/SafeAreaWrapper";
import ScreenImages from "@assets/images/screens";
import Divider from "@components/Miscellaneous/Divider";
import { Row } from "@components/Layout";
import { useFetchNotificationsMutation } from "@store/apis/kidashiApi";
import { useFocusEffect } from "@react-navigation/native";
import EmptyState from "@components/Miscellaneous/EmptyState";
import { styles } from "./style";
import { formatDateTime } from "@utils/Helpers";

const NotificationItem = ({ item }: { item: INotification }) => (
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
				<Text style={styles.subtitle}>{item.message}</Text>
			</View>
			<View>
				<Row justifyContent='flex-end' gap={8} alignItems='center'>
					{!item.is_read && <View style={styles.dot} />}
					<Image
						source={ScreenImages.kidashiMemberDetails.chevronRightIcon}
						style={styles.chevronIcon}
					/>
				</Row>
				<Text style={styles.time}>{formatDateTime(item.created_at).date}</Text>
			</View>
		</Row>
		<Divider gapY={20} />
	</TouchableOpacity>
);

const NotificationIndex = () => {
	const [fetchNotifications, { data, isLoading, error }] =
		useFetchNotificationsMutation();
	const [notifications, setNotifications] = useState<INotification[]>([]);
	const getNotifications = async () => {
		fetchNotifications({
			filters: {},
		})
			.unwrap()
			.then((res) => {
				if (res.status) {
					setNotifications(res.data);
				} else {
					console.log(res.message);
				}
			})
			.catch((err) => {
				console.log(err);
			});
	};

	useFocusEffect(
		useCallback(() => {
			getNotifications();
		}, [])
	);

	return (
		<SafeAreaWrapper title='Notifications'>
			{notifications.length < 1 && (
				<View style={styles.emptyContainer}>
					<EmptyState
						icon={ScreenImages.kidashiHome.bellIcon}
						title='No notifications'
						description='You have no notifications'
					/>
				</View>
			)}
			<FlatList
				data={notifications}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => <NotificationItem item={item} />}
				contentContainerStyle={{ paddingVertical: 8 }}
				refreshControl={
					<RefreshControl refreshing={isLoading} onRefresh={getNotifications} />
				}
			/>
		</SafeAreaWrapper>
	);
};

export default NotificationIndex;
