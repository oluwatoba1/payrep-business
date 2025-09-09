import { Image, View, StyleSheet } from "react-native";
import { MainLayout } from "../../../../../components/Layout";
import { mainSavingsStyles } from "../../styles";
import { Button, Typography } from "../../../../../components/Forms";
import CustomCard from "../../../../../components/Cards/CustomCard";
import ScreenImages from "../../../../../../assets/images/screens";
import { SavingSection } from "../../../../../components";
import { StackScreenProps } from "@react-navigation/stack";
import { SavingsStackParamList } from "../../../../../navigation/types";

type PreviewLockedSavingsProps = StackScreenProps<SavingsStackParamList>

export default function PreviewLockedSavings({navigation: {navigate, goBack}}:PreviewLockedSavingsProps) {
    
    const handleEasySavingsDone = () => {
        navigate("SavingsSuccessMessageScreen", {
            title: "Easy Savings",
            subTitle: "Congratulations! you've successfully set up N5,000 for your personalized savings goal."
        })
    }
  return (
    <MainLayout backAction={() => goBack()}>
      <View style={mainSavingsStyles.container}>
        <View style={mainSavingsStyles.titleContainer}>
          <Typography title="Easy Savings" type="heading4-sb" />
          <Typography
            title="Easily set up your savings plan to work towards your personal goals."
            type="body-r"
          />
        </View>

        <Image
          source={ScreenImages.SavingsScreen.targetIcon}
          style={mainSavingsStyles.targetIcon}
        />

        <CustomCard
          visible={true}
          customContainerStyle={mainSavingsStyles.card}
        >
          <SavingSection title="Locked Savings" titleType="heading-sb" />

          <SavingSection
            title="What goal are you seting for your locked savings?"
            titleType="label-r"
            value="Shopping"
          />

          <SavingSection
            title="How much do you want to lock?"
            titleType="label-r"
            value="N5,000.00"
          />

          <SavingSection
            title="What is the duration"
            titleType="label-r"
            value="1-30 days(12%)"
          />
          <SavingSection
            title="Interest % calculated"
            titleType="label-r"
            value="N5,000.00"
            noBorder
          />
          <SavingSection
            title="Maturity date"
            titleType="label-r"
            value="5th December, 2024"
          />
          <SavingSection
            title="Set your primary source of fund"
            titleType="label-r"
            value="Main account: N5,000.00"
            noBorder
          />

          <SavingSection
            title="Set your primary source of fund"
            titleType="label-r"
            value="Main account: N5,000.00"
            noBorder
          />
        </CustomCard>

        <View style={mainSavingsStyles.buttonContainer}>
          <Button title="Save" onPress={handleEasySavingsDone}/>
        </View>
      </View>
    </MainLayout>
  );
}


