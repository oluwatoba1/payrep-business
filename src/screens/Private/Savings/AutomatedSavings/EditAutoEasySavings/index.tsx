import { ScrollView, View } from "react-native";
import { useState } from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { SavingsStackParamList } from "../../../../../navigation/types";
import { MainLayout } from "../../../../../components/Layout";
import { mainSavingsStyles } from "../../styles";
import { Button, Dropdown, RadioButton, TextInput, Typography } from "../../../../../components/Forms";
import { AccountDetailsCardV2 } from "../../../../../components/Cards";
import ScreenImages from "../../../../../../assets/images/screens";


type AutomatedSavingsProps = StackScreenProps<SavingsStackParamList>

export default function EditAutoEasySavingsWithdraw({navigation: {navigate, goBack}}:AutomatedSavingsProps) {
    const [showFundSource, setShowFundSource] = useState<boolean>(false)
    const [showDateSelected, setShowDateSelected] = useState<boolean>(false)
    const [fundSource, setFundSource] = useState<string>('')
    const [dateSelected, setDateSelected] = useState<string>('')


    const handleSourceDropdownTrigger = () => {
        setShowFundSource(!showFundSource);
    };

    const handleDateDropdownTrigger = () => {
        setShowDateSelected(!showDateSelected);
    };

    const handleSourceRadioSelect = (value: string | number | undefined) => {
        setFundSource(value as string);
    };

    const handleDateRadioSelect = (value: string | number | undefined) => {
        setDateSelected(value as string);
    };

    const handleNavigate = () => {
        navigate('PreviewAutomatedSavingsScreen', {
            amount: "N20,000",
            date: "Daily(12th day)",
            source: "Added Card"
        })
    }
    return (
        <MainLayout backAction={() => goBack()}>
            <View style={mainSavingsStyles.container}>
               <View style={mainSavingsStyles.titleContainer}>
                    <Typography title="Edit Auto Easy Savings" type="heading4-sb" />
                    <Typography title="Edit auto easy savings and watch your money grow effortlessly." type="body-r" />
               </View>
                <View style={{flex:0.4}}>
                    <AccountDetailsCardV2 walletBalance="400,000"/>
                </View>
                
                <ScrollView style={{flex: 1}}>
                    <TextInput type='text' placeholder='How much to deduct from your main account?' 
                            value={''}
                            // onChangeText={(text) => dispatch(setFirstName(text))}
                    />
                     <Dropdown
                        label="How would you like the amount to deducted?"
                        value={dateSelected ? dateSelected : ''}
                        onTrigger={handleDateDropdownTrigger}
                    />
                     {showDateSelected && (
                        <View style={{gap:14, margin: 16}}>
                            <RadioButton
                                options={[
                                    {title:"Daily", value:'daily', width:163, buttonIcon:ScreenImages.SavingsScreen.calendarLine},
                                    {title:"Weekly", value:'add_bank', width:163, buttonIcon:ScreenImages.SavingsScreen.calendarLine},
                                    {title:"Monthly", value:'new_card', width:163, buttonIcon:ScreenImages.SavingsScreen.calendarLine},
                                ]}
                                selectedValue={dateSelected}
                                onSelect={handleDateRadioSelect}
                                optionContainerStyle={{height:44}}
                                
                            />
                        </View>
                    )}
                    
                    <Dropdown
                        label="Set your primary source of fund"
                        value={fundSource ? fundSource : ''}
                        onTrigger={handleSourceDropdownTrigger}
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
                                onSelect={handleSourceRadioSelect}
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