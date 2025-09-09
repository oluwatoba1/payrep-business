import { Image, View, StyleSheet } from "react-native";
import { MainLayout } from "../../../../../components/Layout";
import { mainSavingsStyles } from "../../styles";
import { Button, Typography } from "../../../../../components/Forms";
import CustomCard from "../../../../../components/Cards/CustomCard";
import ScreenImages from "../../../../../../assets/images/screens";
import { SavingSection } from "../../../../../components";
import { StackScreenProps } from "@react-navigation/stack";
import { SavingsStackParamList } from "../../../../../navigation/types";

type PreviewEasySavingsProps = StackScreenProps<SavingsStackParamList>

export default function PreviewEasySavings({navigation: {navigate}}:PreviewEasySavingsProps) {
    const handleEditEasySavingsNavigation = () => {
        navigate("EditEasySavingsScreen")
    }

    const handleEasySavingsDone = () => {
        navigate("SavingsSuccessMessageScreen", {
            title: "Easy Savings",
            subTitle: "Congratulation! you've successfully set up N5,000 for your personalized savings goal."
        })
    }
  return (
    <MainLayout backAction={() => {}}>
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
          onPress={handleEditEasySavingsNavigation}
          customContainerStyle={mainSavingsStyles.card}
        >
          <SavingSection title="Easy Savings" titleType="heading-sb" />

          <SavingSection
            title="What is your savings goal"
            titleType="label-r"
            value="Travelling"
          />

          <SavingSection
            title="How much do you want to save?"
            titleType="label-r"
            value="N5,000.00"
          />

          <SavingSection
            title="What is your goal deadline"
            titleType="label-r"
            value="December, 2024"
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


