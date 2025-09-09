import { Image, ImageURISource, Pressable } from "react-native";
import styles from "./styles";
import { scale, scaleHeight } from "../../../utils/Helpers";
import { StackNavigationProp } from "@react-navigation/stack";
import { WalletStackParamList } from "../../../navigation/types";
import { useNavigation } from "@react-navigation/native";

type BillsNavigationProp = StackNavigationProp<WalletStackParamList>;

interface CardProps {
    colour: string;
    arrow: ImageURISource;
    icon: ImageURISource;
    iconHeight?: number;
    iconWidth?: number;
    provider: string;

}

interface ICardProps {
    cardDetails: CardProps;
}

interface IBillsNavigationProps {
    navigation: BillsNavigationProp;
}



const BillsProviderCard: React.FC<ICardProps> = ({ cardDetails }) => {
    const navigation = useNavigation<IBillsNavigationProps>()
    const onCardPress = () => {
        navigation.navigate('CableTVSubscriptionScreen', { billProvider: cardDetails.provider, })
    }
    return (
        <Pressable onPress={onCardPress} style={{ ...styles.category, backgroundColor: cardDetails.colour, }}>
            <Image source={cardDetails.arrow} style={styles.categoryArrow} />
            <Image
                source={cardDetails.icon}
                style={{
                    ...styles.categoryIcon,
                    width: cardDetails.iconWidth,
                    height: cardDetails.iconHeight
                }} />
        </Pressable>
    )
}

export default BillsProviderCard;