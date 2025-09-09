import { ScrollView, View } from "react-native";
import { MainLayout } from "../../../../../components/Layout";
import { Typography } from "../../../../../components/Forms";
import { mainSavingsStyles } from "../../styles";
import SavingsCard from "../../../../../components/Cards/SavingsCard";
import { StackScreenProps } from "@react-navigation/stack";
import { SavingsStackParamList } from "../../../../../navigation/types";

type SavingsScreenProps = StackScreenProps<SavingsStackParamList>

export default function AutoEasySavingsList({navigation: {navigate}}:SavingsScreenProps) {
    const handleAutoEasySavingsWithdrawNavigate = () => {
        navigate("AutomatedSavingsWithdrawScreen")
    }

    const handleAutoEasySavingsEditWithdrawNavigate = () => {
        navigate("EditAutoEasySavingsScreen")
    }
    
    return (
        <MainLayout backAction={() => {}}>
            <View style={mainSavingsStyles.container}>
                <View style={mainSavingsStyles.titleContainer}>
                    <Typography type="heading4-sb" title="Auto Easy Savings" />
                    <Typography type="body-r" title="withdraw transfer the money to Payrep Account." />
                </View>
                <ScrollView>
                <SavingsCard
                    totalSavings="N489,000"
                    progress={50}
                    progressBarText="Savings goal"
                    progressBarColor="#66B2B2"
                    progressBarBackgroundColor="#005C5C"
                    showWithdrawButton={true}
                    showProgressBar={true}
                    showImage={false}
                    cardTitle="Auto-Easy Savings"
                    customContainerStyle={mainSavingsStyles.automatedSavingsCard}
                    withdrawCustomStyle={mainSavingsStyles.automatedSavingsWithdraw}
                    onWithdraw={handleAutoEasySavingsWithdrawNavigate}
                    // onSavingsNavigate={handleAutoEasySavingsEditWithdrawNavigate}
                    onEditNavigate={handleAutoEasySavingsEditWithdrawNavigate}
                    showEditButton={true}
                />
                </ScrollView>
            </View>
        </MainLayout>
    )
}