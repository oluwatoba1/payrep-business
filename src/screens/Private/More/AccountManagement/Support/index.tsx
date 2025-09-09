import { Image, Pressable, View } from "react-native";
import { MainLayout } from "../../../../../components/Layout";
import { Typography } from "../../../../../components/Forms";
import ScreenImages from "../../../../../../assets/images/screens";
import { generalStyles } from "../../styles";
import { styles } from "./styles";

export default function SupportScreen() {

    const IMAGES = [
        ScreenImages.profileScreen.facebookIcon,
        ScreenImages.profileScreen.instaIcon,
        ScreenImages.profileScreen.twitterIcon,
        ScreenImages.profileScreen.youtubeIcon,
        ScreenImages.profileScreen.linkedInIcon,

    ]
    return (
        <MainLayout backAction={() => {}}>
            <View style={generalStyles.container}>
                <View style={styles.supportSection}>
                    <Typography title="Support" type="heading4-sb" />
                    <Typography title="We are available 24/7. Contact us via our different communication channels." type="subheading" />
                </View>

                <View style={styles.supportSection}>
                    <View style={styles.itemContainer}>
                        <Image source={ScreenImages.profileScreen.mailLineIcon} style={generalStyles.icon} />
                        <Typography title="Send us an email to Payrepsupport@gmail.com" type="subheading" />
                    </View>
                    <View>
                        <Typography title="Reach our customer representative on" type="subheading" style={styles.supportContact} />
                        <View style={styles.itemContainer}>
                            <Image source={ScreenImages.profileScreen.phoneLineIcon} style={generalStyles.icon} />
                            <Typography title="+2348190457823 or start a chat on whatsapp +2348067345123" type="body-sb"  />
                        </View>
                    </View>
                </View>

                <View style={generalStyles.buttonContainer}>
                    <Typography title="Connect with us on our Social Media Platform" type="subheading-sb" />
                    <View style={styles.itemContainer}>
                        {IMAGES.map((image, index) => (
                            <Pressable key={index}>
                                <Image source={image} style={generalStyles.icon} />
                            </Pressable>
                        ))}
                    </View>
                </View>
            </View>
        </MainLayout>
    )
}