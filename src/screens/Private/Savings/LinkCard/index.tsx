import { View } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import { useState } from "react";

import { MainLayout } from "@components/Layout";
import { Button, TextInput, Typography } from "@components/Forms";
import { mainSavingsStyles } from "../styles";
import { LogoLoader } from "@components/Layout";
import { SavingsStackParamList } from "@navigation/types";

type LinkCardProps = StackScreenProps<SavingsStackParamList>

export default function LinkCard({navigation: {navigate}}:LinkCardProps) {
    const [isLoading, setIsLoading] = useState<boolean>(false)


    const handleNavigate = () => {
        setIsLoading(true)
        setTimeout(() => {
            setIsLoading(false)
            navigate('PreviewEasySavingsScreen')
        }, 3000)

    }
    return (
        <MainLayout backAction={() => {}}>
            <View style={mainSavingsStyles.container}>
                <View style={mainSavingsStyles.titleContainer}>
                    <Typography title="Link your Card" type="heading4-sb" />
                    <Typography title="Link your card details as a funding source for creating savings." type="body-r" />
                </View>
                <View>
                    <TextInput 
                        placeholder="What is your card type (Mastercard/Verve)"
                    />
                    <TextInput 
                        placeholder="Enter your card number"
                    />
                    <TextInput 
                        placeholder="Expiry Date"
                    />
                    <TextInput 
                        placeholder="CVV"
                    />
                </View>
                <View style={mainSavingsStyles.buttonContainer}>
                    <Button title="Verify Card" onPress={handleNavigate} />
                </View>
                <LogoLoader
                    title="Verifying Card"
                    isLoading={isLoading}
                />
            </View>
        </MainLayout>
    )
}