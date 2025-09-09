import { ScrollView, View } from "react-native";
import { MainLayout } from "../../../../../components/Layout";
import { Typography } from "../../../../../components/Forms";
import { mainSavingsStyles } from "../../styles";
import SavingsCard from "../../../../../components/Cards/SavingsCard";
import { styles } from "./styles";
import { StackScreenProps } from "@react-navigation/stack";
import { SavingsStackParamList } from "../../../../../navigation/types";

type SavingsScreenProps = StackScreenProps<SavingsStackParamList>

export default function WithdrawSavingsList({navigation: {navigate}}:SavingsScreenProps) {
    const handleEasySavingsWithdrawNavigate = () => {
        navigate("EasySavingsWithdrawScreen")
    }
    const handleAutomatedSavingsWithdrawNavigate = () => {
        navigate("AutomatedSavingsWithdrawScreen")
    }
    const handleLockedSavingsWithdrawNavigate = () => {
        navigate("LockedSavingsWithdrawScreen")
    }
    return (
        <MainLayout backAction={() => {}}>
            <View style={mainSavingsStyles.container}>
                <View style={mainSavingsStyles.titleContainer}>
                    <Typography type="heading4-sb" title="Withdraw Savings" />
                    <Typography type="body-r" title="Select the savings you want to withdraw from and transfer the money to your payrep account. Please note that a penalty fee will apply if you withdraw before your savings maturity date." />
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
                    onWithdraw={handleAutomatedSavingsWithdrawNavigate}
                />
                <SavingsCard
                    totalSavings="N489,000"
                    progress={50}
                    progressBarText="Savings goal"
                    progressBarColor="#7A33A2"
                    progressBarBackgroundColor="#35005C"
                    showWithdrawButton={true}
                    showProgressBar={true}
                    showImage={false}
                    cardTitle="Locked Savings"
                    customContainerStyle={mainSavingsStyles.lockedSavingsCard}
                    withdrawCustomStyle={mainSavingsStyles.lockedSavingsWithdraw}
                    onWithdraw={handleLockedSavingsWithdrawNavigate}
                />
                </ScrollView>
            </View>
        </MainLayout>
    )
}