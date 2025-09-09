import {View, Image} from "react-native"
import styles from "./styles"
import IconImages from "../../../../assets/images/appIcons"

interface OnboardingCardProp {
    header: string;
    description: string;
}

export default function OnboardingCard({header, description}:OnboardingCardProp) {
    return (
        <View style={styles.cardContainer}>
            <Image style={styles.cardImage} source={IconImages.users.femaleUser} alt="user" />
        </View>
    )
}