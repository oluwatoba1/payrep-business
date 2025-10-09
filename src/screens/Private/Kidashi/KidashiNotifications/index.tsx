import React, { useCallback, useState } from "react";
import {
	View,
	FlatList,
	Image,
	TouchableOpacity,
	RefreshControl,
	ActivityIndicator,
} from "react-native";
import SafeAreaWrapper from "@components/Layout/SafeAreaWrapper";
import ScreenImages from "@assets/images/screens";
import Divider from "@components/Miscellaneous/Divider";
import { Row } from "@components/Layout";
import {
	useFetchNotificationsMutation,
	useGetNotificationDetailMutation,
	useUpdateNotificationMutation,
} from "@store/apis/kidashiApi";
import { useFocusEffect } from "@react-navigation/native";
import EmptyState from "@components/Miscellaneous/EmptyState";
import { styles } from "./style";
import { formatDateTime } from "@utils/Helpers";
import { Typography } from "@components/Forms";
import ModalWrapper from "@components/Modal/ModalWrapper";

const NotificationItem = ({
	item,
	onPress,
}: {
	item: INotification;
	onPress: (id: string) => void;
}) => {
	return (
		<TouchableOpacity activeOpacity={0.8} onPress={() => onPress(item.id)}>
			<Row>
				<View style={styles.avatarContainer}>
					<Image
						source={ScreenImages.kidashiMemberDetails.userPlaceholder}
						style={styles.avatar}
					/>
				</View>

				<View style={styles.textContainer}>
					<Typography
						title={item.title}
						style={styles.title}
						numberOfLines={1}
					/>
					<Typography title={item.message} style={styles.subtitle} />
				</View>
				<View>
					<Row justifyContent='flex-end' gap={8} alignItems='center'>
						{!item.is_read && <View style={styles.dot} />}
						<Image
							source={ScreenImages.kidashiMemberDetails.chevronRightIcon}
							style={styles.chevronIcon}
						/>
					</Row>
					<Typography
						title={formatDateTime(item.created_at).date}
						style={styles.time}
					/>
				</View>
			</Row>
			<Divider gapY={20} />
		</TouchableOpacity>
	);
};

const NotificationIndex = () => {
	const [fetchNotifications, { data, isLoading, error }] =
		useFetchNotificationsMutation();
	const [getNotificationDetail] = useGetNotificationDetailMutation() as any;
	const [updateNotification] = useUpdateNotificationMutation() as any;
	const [notifications, setNotifications] = useState<INotification[]>([]);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [selected, setSelected] = useState<any>(null);
	const [isDetailLoading, setIsDetailLoading] = useState(false);
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

	const openDetails = async (notification_id: string) => {
		try {
			setIsDetailLoading(true);
			const res = await getNotificationDetail({ notification_id }).unwrap();
			if (res?.status) {
				setSelected(res.data);
				setIsModalVisible(true);
				markAsRead(notification_id);
			}
		} catch (e) {
			// noop
		} finally {
			setIsDetailLoading(false);
		}
	};

	const markAsRead = async (notification_id: string) =>
		updateNotification({ notification_id, is_read: true }).unwrap();

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
				renderItem={({ item }) => (
					<NotificationItem item={item} onPress={openDetails} />
				)}
				contentContainerStyle={{ paddingVertical: 8 }}
				refreshControl={
					<RefreshControl refreshing={isLoading} onRefresh={getNotifications} />
				}
			/>

			<ModalWrapper
				visible={isModalVisible}
				onClose={() => setIsModalVisible(false)}
			>
				{isDetailLoading || !selected ? (
					<View style={styles.loadingContainer}>
						<ActivityIndicator />
					</View>
				) : (
					<View>
						<View style={styles.detailsHeaderRow}>
							<Typography title='Notification' style={styles.modalTitle} />
							<TouchableOpacity onPress={() => setIsModalVisible(false)}>
								<Image
									source={ScreenImages.kidashiMemberDetails.closeIcon}
									style={styles.closeIcon}
								/>
							</TouchableOpacity>
						</View>
						<View style={styles.detailsInfoWrapper}>
							<Typography
								title={selected.title}
								style={{ fontSize: 16, fontWeight: "600", marginBottom: 6 }}
							/>
							<Typography
								title={`${formatDateTime(selected.created_at).date} ${
									formatDateTime(selected.created_at).time
								}`}
								style={styles.detailsDateText}
							/>
						</View>
						<Divider gapY={10} />
						<Typography title={selected.message} style={styles.messageText} />
					</View>
				)}
			</ModalWrapper>
		</SafeAreaWrapper>
	);
};

export default NotificationIndex;
