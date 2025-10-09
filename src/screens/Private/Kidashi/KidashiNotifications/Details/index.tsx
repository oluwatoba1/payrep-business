import React, { useEffect, useState, useCallback } from "react";
import { View, ScrollView, ActivityIndicator } from "react-native";
import SafeAreaWrapper from "@components/Layout/SafeAreaWrapper";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { KidashiHomeStackParamList } from "@navigation/types";
import {
	useGetNotificationDetailMutation,
	useUpdateNotificationMutation,
} from "@store/apis/kidashiApi";
import Divider from "@components/Miscellaneous/Divider";
import { formatDateTime } from "@utils/Helpers";
import { Typography } from "@components/Forms";
import { styles } from "./style";

type Props = NativeStackScreenProps<
	KidashiHomeStackParamList,
	"KidashiNotificationDetails"
>;

export default function KidashiNotificationDetails({ route }: Props) {
	const { notification_id } = route.params;
	const [getNotificationDetail, { isLoading: isFetching }]: any =
		useGetNotificationDetailMutation();
	const [updateNotification, { isLoading: isUpdating }]: any =
		useUpdateNotificationMutation();
	const [notification, setNotification] = useState<any>(null);

	const load = useCallback(async () => {
		try {
			// await updateNotification({ notification_id, is_read: true }).unwrap();
			const res = await getNotificationDetail({ notification_id }).unwrap();
			if (res?.status) {
				setNotification(res.data);
			}
		} catch (err) {
			// keep UI simple; optionally show toast
		}
	}, [notification_id]);

	useEffect(() => {
		load();
	}, [load]);

	return (
		<SafeAreaWrapper title='Notification Details'>
			<ScrollView contentContainerStyle={styles.container}>
				{(isFetching || isUpdating) && !notification ? (
					<View style={{ paddingVertical: 40 }}>
						<ActivityIndicator />
					</View>
				) : notification ? (
					<View>
						<View style={styles.header}>
							<Typography title={notification.title} style={styles.title} />
							<Typography
								title={`${formatDateTime(notification.created_at).date} ${
									formatDateTime(notification.created_at).time
								}`}
								style={styles.subtitle}
							/>
							{notification?.event_type && (
								<View style={styles.badge}>
									<Typography
										title={notification.event_type}
										style={styles.badgeText}
									/>
								</View>
							)}
						</View>

						<View style={styles.card}>
							<Typography title='Message' style={styles.sectionTitle} />
							<Typography
								title={notification.message}
								style={{ fontSize: 16, lineHeight: 22 }}
							/>
						</View>
					</View>
				) : (
					<Typography title='Unable to load notification.' />
				)}
			</ScrollView>
		</SafeAreaWrapper>
	);
}
