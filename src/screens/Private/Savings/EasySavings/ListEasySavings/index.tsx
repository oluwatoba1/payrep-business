import { ScrollView, View } from "react-native";
import { MainLayout } from "../../../../../components/Layout";
import { Typography } from "../../../../../components/Forms";
import { mainSavingsStyles } from "../../styles";
import SavingsCard from "../../../../../components/Cards/SavingsCard";
import { StackScreenProps } from "@react-navigation/stack";
import { SavingsStackParamList } from "../../../../../navigation/types";

type SavingsScreenProps = StackScreenProps<SavingsStackParamList>

export default function EasySavingsList({navigation: {navigate}}:SavingsScreenProps) {
    const handleEasySavingsWithdrawNavigate = () => {
        navigate("EasySavingsWithdrawScreen")
    }
    
    return (
        <MainLayout backAction={() => {}}>
            <View style={mainSavingsStyles.container}>
                <View style={mainSavingsStyles.titleContainer}>
                    <Typography type="heading4-sb" title="Easy Savings" />
                    <Typography type="body-r" title="Select the savings you want to withdraw from and transfer the money to your chosen bank. Please note that a penalty fee will apply if you withdraw before your savings maturity date." />
                </View>
                <ScrollView>
                <SavingsCard
                    totalSavings="N489,000"
                    progress={50}
                    progressBarText="Savings goal"
                    progressBarColor="#F9E2D2"
                    progressBarBackgroundColor="#6C350F"
                    showWithdrawButton={true}
                    showProgressBar={true}
                    showImage={false}
                    cardTitle="Easy Savings"
                    customContainerStyle={mainSavingsStyles.easySavingsCard}
                    withdrawCustomStyle={mainSavingsStyles.easySavingsWithdraw}
                    onWithdraw={handleEasySavingsWithdrawNavigate}
                />
                </ScrollView>
            </View>
        </MainLayout>
    )
}