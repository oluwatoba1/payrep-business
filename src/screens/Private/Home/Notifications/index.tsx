import React, {useState} from 'react';
import {Image, Pressable, ScrollView, View} from 'react-native';

import {MainLayout, Row} from '@components/Layout';
import styles from './styles';
import {Typography} from '@components/Forms';
import Colors from '@theme/Colors';
import IconImages from '@assets/images/appIcons';
import Pad from '@components/Pad';
import {getRelativeTime} from '@utils/Helpers';
import {StackScreenProps} from '@react-navigation/stack';
import {HomeStackParamList} from '@navigation/types';
import ComponentImages from '@assets/images/components';

interface INotification {
  title: string;
  description: string;
  time: string;
  read: boolean;
}

const Item = ({
  title,
  description,
  time,
  read = false,
  onReadUpdate,
}: INotification & {onReadUpdate: (updatedRead: boolean) => void}) => {
  const newTime = new Date(time);
  const relativeTime = getRelativeTime(newTime);

  const clickToRead = () => {
    onReadUpdate(true);
  };

  return (
    <Pressable style={styles.item} onPress={clickToRead}>
      <View style={styles.detailsContainer}>
        <View style={styles.iconBackground}>
          <Image source={IconImages.logo.payrepLogo} style={styles.icon} />
        </View>
        <View style={styles.details}>
          <Typography title={title} type="body-sb" />
          <Typography
            title={description}
            type="body-r"
            color={Colors.gray['base']}
          />
          <Typography
            title={relativeTime}
            type="label-r"
            color={Colors.gray['400']}
          />
        </View>
      </View>
      <View style={styles.indicatorArea}>
        {read && <View style={styles.readIndicator} />}
      </View>
    </Pressable>
  );
};

interface INotification {
  title: string;
  description: string;
  time: string;
  read: boolean;
}

const notificationData: INotification[] = [
  {
    title: 'Payment Received',
    description: 'You have received a payment of $150',
    time: '2024-08-23T14:35:00.000Z',
    read: false,
  },
  {
    title: 'New Message',
    description: 'You have a new message from support',
    time: '2024-08-23T09:15:00.000Z',
    read: false,
  },
  {
    title: 'Update Available',
    description: 'A new update for the app is available',
    time: '2024-08-22T18:00:00.000Z',
    read: true,
  },
  {
    title: 'Security Alert',
    description: 'A new login was detected from an unknown device',
    time: '2024-08-21T20:45:00.000Z',
    read: true,
  },
  {
    title: 'Scheduled Maintenance',
    description: 'The system will be under maintenance tomorrow',
    time: '2024-09-16T12:00:00.000Z',
    read: false,
  },
  {
    title: 'Promotion',
    description: 'Get 20% off on your next purchase',
    time: '2024-08-16T10:30:00.000Z',
    read: true,
  },
  {
    title: 'Welcome!',
    description: 'Thank you for joining our platform',
    time: '2024-09-18T16:20:00.000Z',
    read: true,
  },
  {
    title: 'Weekly Summary',
    description: 'Here is your weekly account summary',
    time: '2024-09-18T08:00:00.000Z',
    read: false,
  },
  {
    title: 'Transfer Request',
    description: 'You have a new transfer request',
    time: '2024-09-16T14:00:00.000Z',
    read: false,
  },
  {
    title: 'Invoice Ready',
    description: 'Your invoice for September is ready',
    time: '2024-09-18T10:00:00.000Z',
    read: true,
  },
];

type NotificationsProps = StackScreenProps<HomeStackParamList, 'Notifications'>;

export default function Notifications({
  navigation: {goBack},
}: NotificationsProps) {
  const [notifications, setNotifications] = useState<INotification[]>([]);

  const getDaySuffix = (day: number): string => {
    if (day >= 11 && day <= 13) return 'th';
    switch (day % 10) {
      case 1:
        return 'st';
      case 2:
        return 'nd';
      case 3:
        return 'rd';
      default:
        return 'th';
    }
  };

  const formatDate = (date: Date): string => {
    const day = date.getDate();
    const month = date.toLocaleString('default', {month: 'long'});
    const year = date.getFullYear();

    const daySuffix = getDaySuffix(day);

    return `${day}${daySuffix} ${month}, ${year}`;
  };

  const groupNotificationsByDate = (notifications: INotification[]) => {
    const groups: {[key: string]: INotification[]} = {};

    const sortedNotifications = notifications.sort(
      (a, b) => new Date(b.time).getTime() - new Date(a.time).getTime(),
    );

    sortedNotifications.forEach(notification => {
      const notificationDate = new Date(notification.time);
      const today = new Date();

      const isSameDay =
        notificationDate.getDate() === today.getDate() &&
        notificationDate.getMonth() === today.getMonth() &&
        notificationDate.getFullYear() === today.getFullYear();

      let dateKey: string;

      if (isSameDay) {
        dateKey = 'Today';
      } else {
        dateKey = formatDate(notificationDate);
      }

      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }
      groups[dateKey].push(notification);
    });

    return Object.keys(groups)
      .sort((a, b) => {
        if (a === 'Today') return -1;
        if (b === 'Today') return 1;

        return new Date(b).getTime() - new Date(a).getTime();
      })
      .map(date => ({
        title: date,
        notifications: groups[date],
      }));
  };

  const groupedNotifications = groupNotificationsByDate(notifications);

  const handleReadUpdate = (index: number, groupIndex: number) => {
    setNotifications(prevNotifications =>
      prevNotifications.map((notification, i) =>
        i === index ? {...notification, read: true} : notification,
      ),
    );
  };

  return (
    <MainLayout backAction={goBack}>
      <View style={styles.container}>
        <View>
          <Typography title="Notifications" type="heading4-sb" />
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          {groupedNotifications.length ? (
            groupedNotifications.map((group, groupIndex) => (
              <View key={groupIndex}>
                <Pad size={18} />
                <Typography
                  title={group.title}
                  type="body-r"
                  color={Colors.gray[400]}
                />
                <Pad size={18} />
                {group.notifications.map((notification, index) => (
                  <Item
                    key={index}
                    {...notification}
                    onReadUpdate={() => handleReadUpdate(index, groupIndex)}
                  />
                ))}
              </View>
            ))
          ) : (
            <View style={styles.emptyContainer}>
              <Image
                source={ComponentImages.disputes.emptyDisputes}
                style={styles.emptyBox}
              />
              <Typography
                title="You have no notifications"
                type="label-r"
                color={Colors.gray[400]}
                style={{textAlign: 'center'}}
              />
            </View>
          )}
        </ScrollView>
      </View>
    </MainLayout>
  );
}
