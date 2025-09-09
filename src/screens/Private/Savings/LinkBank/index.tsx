import { View } from "react-native";
import { MainLayout } from "../../../../components/Layout";
import { Button, Dropdown, TextInput, Typography } from "../../../../components/Forms";
import { mainSavingsStyles } from "../styles";
import { StackScreenProps } from "@react-navigation/stack";
import { SavingsStackParamList } from "../../../../navigation/types";
import { useState } from "react";
import { BankModal } from "../../../../components";
import { BeneficiaryCard } from "../../../../components/Cards";

interface IBank {
    name: string;
    code: string;
}
const banks: IBank[] = [
    {
        name: 'Access Bank',
        code: '044',
    },
    { name: 'GTB', code: '056' },
];
type LinkCardProps = StackScreenProps<SavingsStackParamList>

export default function LinkBank({navigation: {navigate}}: LinkCardProps) {
    const [showBankModal, setShowBankModal] = useState<boolean>(false);
    const [selectedBank, setSelectedBank] = useState<IBank>({ name: '', code: '' });
    const [showBeneficiaryCard, setShowBeneficiaryCard] = useState<boolean>(false)
    

    const handleNavigate = () => {
        navigate('LinkCardScreen')
    }

    const handleBankSelect = () => {
        setShowBankModal(true)
        setShowBeneficiaryCard(true)
    }

    const handleCloseBeneficiaryCard = () => {
        setShowBeneficiaryCard(false)
    }
    return (
        <MainLayout backAction={() => {}}>
            <View style={mainSavingsStyles.container}>
                <BankModal
                    showModal={showBankModal}
                    onClose={() => setShowBankModal(false)}
                    options={banks}
                    value={selectedBank.code}
                    onSelect={bank => setSelectedBank(bank)}
                    bankModalTitle="Select Bank"
                />
                <View style={mainSavingsStyles.titleContainer}>
                    <Typography title="Link your Bank" type="heading4-sb" />
                    <Typography title="Link your bank details as a funding source for creating savings." type="body-r" />
                </View>
                <View>
                    <TextInput 
                        placeholder="Enter the account number"
                    />
                    {!showBeneficiaryCard && (
                        <Dropdown
                        label="Select Bank"
                        value={selectedBank.name}
                        onTrigger={() => handleBankSelect()}
                        />
                    )}
                </View>
                {showBeneficiaryCard  && (
                        <BeneficiaryCard
                            accountName={"Musa Abdullahi"}
                            accountNumber={"232323232323"}
                            bankName={"Gtb"}
                            showCard={showBeneficiaryCard}
                            onClose={handleCloseBeneficiaryCard}
                        />
                )}

                <View style={mainSavingsStyles.buttonContainer}>
                    <Button title="Process" onPress={handleNavigate} />
                </View>
            </View>
        </MainLayout>
    )
}