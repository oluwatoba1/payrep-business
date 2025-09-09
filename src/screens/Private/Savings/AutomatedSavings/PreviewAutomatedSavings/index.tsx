import { Image, View } from "react-native"
import { MainLayout } from "../../../../../components/Layout"
import { Button, Typography } from "../../../../../components/Forms"
import { mainSavingsStyles } from "../../styles"
import ScreenImages from "../../../../../../assets/images/screens"
import { styles } from "../styles"
import CustomCard from "../../../../../components/Cards/CustomCard"
import { SavingSection } from "../../../../../components"
import { StackScreenProps } from "@react-navigation/stack"
import { SavingsStackParamList } from "../../../../../navigation/types"

type PreviewAutomatedSavingsProps = StackScreenProps<SavingsStackParamList>

export default function PreviewAutomatedSavings({navigation: {navigate}}:PreviewAutomatedSavingsProps) {

    const handleAutomatedSavingsDone = () => {
        navigate("SavingsSuccessMessageScreen", {
            title: "Automated Savings",
            subTitle: "Congratulation! you've successfully set up N5,000 for your Automated savings goal."
        })
    }
    return (
        <MainLayout backAction={() => {}}>
            <View style={mainSavingsStyles.container}>
                <View style={mainSavingsStyles.titleContainer}>
                    <Typography title="Automated Savings" type="heading4-sb" />
                    <Typography title="Set up automatic savings and watch your money grow effortlessly." type="body-r" />
               </View>
               <View>
                    <Image source={ScreenImages.SavingsScreen.calendar} style={styles.calendarStyle} />
               </View>
               <CustomCard
                    visible={true}
                    // onPress={handleEditEasySavingsNavigation}
                    customContainerStyle={mainSavingsStyles.card}
                    >
                    <SavingSection title="Automated Savings" titleType="heading-sb" />

                    <SavingSection
                        title="How much to deduct from your main account?"
                        titleType="label-r"
                        value="N20,000"
                    />

                    <SavingSection
                        title="How would you like the amount to be deducted?"
                        titleType="label-r"
                        value="Daily(12th day)"
                    />

                    <SavingSection
                        title="Set your primary source of fund"
                        titleType="label-r"
                        value="Main account: N5,000.00"
                        noBorder
                    />
                </CustomCard>

                <View style={mainSavingsStyles.buttonContainer}>
                    <Button title="Set up Automated Savings" onPress={handleAutomatedSavingsDone}/>
                </View>
            </View>
        </MainLayout>
    )
}