import {Image, Pressable, View, ViewStyle} from 'react-native';
import {styles} from './styles';
import {Typography} from '../../Forms';
import CustomSwitch from '../../Forms/CustomSwitch';
import Pad from '@components/Pad';
import {Row} from '@components/Layout';

interface SettingOverviewCardItem {
  id: string;
  title: string;
  description?: string;
  profileIcon: any;
  rightIcon?: any;
  showToggle?: boolean;
  toggleSwitch?: (value: boolean) => void;
  isToggle?: boolean;
  onPress?: () => void;
  percent?: number;
  navigate: () => void;
}

interface SettingOverviewCardProps {
  data: SettingOverviewCardItem[];
  cardTitle?: string;
  customProfileContainerStyle?: ViewStyle;
  customCardStyle?: ViewStyle;
}

export default function SettingOverviewCard({
  data,
  cardTitle,
  customProfileContainerStyle = {},
  customCardStyle = {},
}: SettingOverviewCardProps) {
  const renderItem = ({
    item,
    index,
  }: {
    item: SettingOverviewCardItem;
    index: number;
  }) => {
    const isLastItem = index === data.length - 1;

    return (
      <Pressable
        style={[styles.card, isLastItem && styles.lastCard, customCardStyle]}
        onPress={_ => (!item.onPress ? item.navigate() : item.onPress())}
        disabled={item.showToggle && !item.onPress}>
        <Row containerStyle={styles.labelContainer}>
          <Image source={item.profileIcon} style={styles.icon} />
          <View style={styles.textContainer}>
            <Typography title={item.title} type="subheading-sb" />
            {item.description && (
              <Typography
                title={item.description}
                style={styles.subText}
                type="subheading"
              />
            )}
          </View>
        </Row>

        {item.showToggle ? (
          <CustomSwitch
            value={!!item.isToggle}
            onValueChange={item.toggleSwitch || (() => {})}
          />
        ) : (
          item.rightIcon && (
            <Image source={item.rightIcon} style={styles.icon} />
          )
        )}
      </Pressable>
    );
  };

  return (
    <View style={styles.container}>
      <Typography title={cardTitle || ''} />
      <Pad />
      <View style={[styles.profileContainer, customProfileContainerStyle]}>
        {data.map((item, index) => {
          return <View key={item.id}>{renderItem({item, index})}</View>;
        })}
      </View>
    </View>
  );
}
