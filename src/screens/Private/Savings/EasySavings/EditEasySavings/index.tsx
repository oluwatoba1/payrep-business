import { ScrollView, View } from "react-native";
import { useState } from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { SavingsStackParamList } from "../../../../../navigation/types";
import { MainLayout } from "../../../../../components/Layout";
import { mainSavingsStyles } from "../../styles";
import { Button, Dropdown, RadioButton, TextInput, Typography } from "../../../../../components/Forms";


type LinkBankAccountProps = StackScreenProps<SavingsStackParamList>
export default function AddEasySavings({navigation: {navigate}}: LinkBankAccountProps) {
    const [showFundSource, setShowFundSource] = useState<boolean>(false)
    const [fundSource, setFundSource] = useState<string>('')


    const handleDropdownTrigger = () => {
        setShowFundSource(!showFundSource);
    };

    const handleRadioSelect = (value: string | number | undefined) => {
        setFundSource(value as string);
    };
   
    const handleEasySavingsDone = () => {
        navigate("SavingsSuccessMessageScreen", {
            title: "Easy Savings",
            subTitle: "Congratulation! you've successfully set up N5,000 for your personalized savings goal."
        })
    }

    return (
        <MainLayout backAction={() => {}}>
            <View style={mainSavingsStyles.container}>
                <Typography title="Easy Savings" type="heading4-sb" />
                <Typography title="Update  your savings goals or set new ones to stay on track." type="body-r" />
                <ScrollView>
                    <TextInput type='text' placeholder='What is your savings goal?' 
                            value={''}
                            // onChangeText={(text) => dispatch(setFirstName(text))}
                    />
                    <TextInput type='text' placeholder='How much do you want to save?' 
                            value={''}
                            // onChangeText={(text) => dispatch(setFirstName(text))}
                    />
                    <TextInput type='text' placeholder='What is your goal deadline?' 
                            value={''}
                            // onChangeText={(text) => dispatch(setFirstName(text))}
                    />
                    <Dropdown
                        label="Set your primary source of fund"
                        value={fundSource ? fundSource : ''}
                        onTrigger={handleDropdownTrigger}
                    />
                    {showFundSource && (
                        <View style={{gap:14, margin: 16}}>
                            <RadioButton 
                                options={[
                                    {title:"N5,000", value:'main_account', width:343},
                                    {title:"Add Bank", value:'add_bank', width:343},
                                    {title:"Add New Card", value:'new_card', width:343},
                                    {title:"Added Card", value:'listed_card', width:343},
                                ]}
                                selectedValue={fundSource}
                                onSelect={handleRadioSelect}
                                optionContainerStyle={{height:64}}
                                
                            />
                        </View>
                    )}
                </ScrollView>
                <View style={mainSavingsStyles.buttonContainer}>
                    <Button title="Update Savings Goal" onPress={handleEasySavingsDone} />
                </View>
            </View>
        </MainLayout>
    )
}