import React from 'react';
import {View, Text, Image, ImageSourcePropType} from 'react-native';

import styles from './styles';
import Colors from '../../../theme/Colors';
import ComponentImages from '../../../../assets/images/components';
import {Row, SwipeableView} from '../../Layout';
import {useAppSelector} from '../../../store/hooks';

interface TypeProps {
  backgroundColor: string;
  icon: ImageSourcePropType;
  textColor: string;
}

export default function Toast() {
  const requests: IToastItem[] = useAppSelector(
    state => state.app.toastRequests,
  );
  const toastMap: Record<string, TypeProps> = {
    success: {
      backgroundColor: Colors.success['50'],
      icon: ComponentImages.toast.success,
      textColor: Colors.success.base,
    },
    warning: {
      backgroundColor: Colors.primary['50'],
      icon: ComponentImages.toast.warning,
      textColor: Colors.primary.base,
    },
    danger: {
      backgroundColor: Colors.danger['50'],
      icon: ComponentImages.toast.danger,
      textColor: Colors.danger.base,
    },
  };

  return (
    <View style={styles.container}>
      {requests.map((request, i) => (
        <SwipeableView
          key={i}
          direction="right"
          autoHide={true}
          duration={request.duration}>
          <View
            style={styles.toastContainer(
              toastMap[request.type].backgroundColor,
            )}>
            <Row alignItems="flex-start" gap={16}>
              <Image
                source={toastMap[request.type].icon}
                style={styles.toastIcon}
              />
              <Text
                numberOfLines={2}
                style={styles.toastText(toastMap[request.type].textColor)}>
                {request.message}
              </Text>
            </Row>
          </View>
        </SwipeableView>
      ))}
    </View>
  );
}
