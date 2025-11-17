import ComponentImages from "@assets/images/components";
import { Typography } from "@components/Forms";
import { Row } from "@components/Layout";
import { Image, Pressable, View } from "react-native";
import Colors from "@theme/Colors";
import styles from "./styles";

export interface IResourceItem {
    status: string;
    value?: number;
    woman__first_name?: string;
    woman__surname?: string;
    woman__trust_circle__circle_name?: string;
}

interface ResourceItem {
    item: IResourceItem;
    isLastItem: boolean;
    onPress?: () => void;
}

export default function ResourceItemCard({
    item,
    isLastItem,
    onPress = () => { },
}: ResourceItem) {
    console.log("ITEMS", item);

    return (
        <Pressable onPress={onPress}>
            <Row
                alignItems='center'
                justifyContent='space-between'
                containerStyle={{
                    ...styles.container,
                    ...(isLastItem && { borderBottomWidth: 0 }),
                }}
            >
                <Row
                    gap={6}
                    alignItems='center'
                    justifyContent='flex-start'
                    containerStyle={{ width: "55%" }}
                >
                    <Row containerStyle={styles.iconContainer} justifyContent='center'>
                        <Image
                            source={ComponentImages.kidashiBottomNavigator.trustCircles}
                            style={styles.icon}
                        />
                    </Row>
                    <View>
                        <Typography
                            title={item.status}
                            type='body-sb'
                            color={Colors.neutral["600"]}
                            numberOfLines={1}
                        />
                        <Typography
                            title={`${item.woman__trust_circle__circle_name}`}
                            type='label-sb'
                            color={Colors.neutral["400"]}
                        />
                        <Typography
                            title={`${item.woman__first_name} ${item.woman__surname}`}
                            type='label-sb'
                            color={Colors.neutral["400"]}
                        />
                    </View>
                </Row>
                <Typography
                    title={item.value ? `+ ${item.value}` : ""}
                    type='body-sb'
                    color={Colors.success["600"]}
                />
            </Row>
        </Pressable>
    );
}
