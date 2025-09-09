import { ScrollView, View } from "react-native";
import { MainLayout } from "../../../../../../components/Layout";
import { Button, Dropdown, RadioButton, TextInput, Typography } from "../../../../../../components/Forms";
import { mainSavingsStyles } from "../../../styles";
import { useState } from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { SavingsStackParamList } from "../../../../../../navigation/types";
import ScreenImages from "../../../../../../../assets/images/screens";

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
    const handleNavigate = () => {
        navigate('LinkBankScreen')
    }

    return (
        <MainLayout backAction={() => {}}>
            <View style={mainSavingsStyles.container}>
                <Typography title="Easy Savings" type="heading4-sb" />
                <Typography title="Easily set up your savings plan to work towards your personal goals." type="body-r" />
                <ScrollView>
                    <TextInput type='text' placeholder='What is your savings goal?' 
                            value={''}
                            // onChangeText={(text) => dispatch(setFirstName(text))}
                    />
                    <TextInput type='text' placeholder='How much do you want to save?' 
                            value={''}
                            // onChangeText={(text) => dispatch(setFirstName(text))}
                    />
                    {/* <TextInput type='text' placeholder='What is your goal deadline?' 
                            value={''}
                            // onChangeText={(text) => dispatch(setFirstName(text))}
                    /> */}
                    <Dropdown
                        label="Set your primary source of fund"
                        value={fundSource ? fundSource : ''}
                        onTrigger={handleDropdownTrigger}
                    />
                    {showFundSource && (
                        <View style={{gap:14, margin: 16}}>
                            <RadioButton 
                                options={[
                                    {title:"Payrep: Main Account", value:'main_account', width:343, description:"N5,000"},
                                    {title:"Add Bank", value:'add_bank', width:343, buttonIcon:ScreenImages.MoreScreen.piggybank},
                                    {title:"Add New Card", value:'new_card', width:343, buttonIcon:ScreenImages.MoreScreen.bankCard},
                                    {title:"Added Card", value:'listed_card', width:343, buttonIcon:ScreenImages.MoreScreen.bankCard},
                                ]}
                                selectedValue={fundSource}
                                onSelect={handleRadioSelect}
                                optionContainerStyle={{height:64}}
                                
                            />
                        </View>
                    )}
                </ScrollView>
                <View style={mainSavingsStyles.buttonContainer}>
                    <Button title="Continue" onPress={handleNavigate} />
                </View>
            </View>
        </MainLayout>
    )
}