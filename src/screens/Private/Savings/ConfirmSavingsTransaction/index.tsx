import { View } from "react-native";
import { MainLayout } from "../../../../components/Layout";
import { Button, Typography } from "../../../../components/Forms";
import PinPad from "../../../../components/Forms/PinPad";
import { styles } from "./styles";
import { mainSavingsStyles } from "../styles";
import { StackScreenProps } from "@react-navigation/stack";
import { SavingsStackParamList } from "../../../../navigation/types";

type ConfirmSavingsScreenProps = StackScreenProps<SavingsStackParamList>;

interface IConfirmSavingsTransactionProps {
    senderAccountName?: string;
    senderAccountNumber?: string;
    receiverAccountName?: string;
    receiverAccountNumber?: string;
    bankName?: string;
    narration?: string;
    amount?: string;
    total?: string;
    navigation: ConfirmSavingsScreenProps['navigation'];
}

export default function ConfirmSavingsTransaction({
    senderAccountName = "Auto-Easy Savings",
    receiverAccountName = "",
    receiverAccountNumber = "",
    amount = "N20,000",
    total = "",
    bankName = "Payrep",
    narration = "",
    navigation,
}: IConfirmSavingsTransactionProps) {

    const handleEasySavingsDone = () => {
        navigation.navigate("SavingsSuccessMessageScreen", {
            title: "Successful",
            subTitle: `You have successfully transferred ${amount} to your personal account.`,
        });
    };

    return (
        <MainLayout backAction={() => navigation.goBack()}>
            <View style={mainSavingsStyles.container}>
                <View>
                    <Typography title="Transaction Confirmation" />
                </View>
                <View style={styles.transactionDetailsContainer}>
                    <View style={styles.detailRow}>
                        <Typography title="Sender" type="body-r" />
                        <Typography title={senderAccountName} />
                    </View>
                    <View style={styles.detailRow}>
                        <Typography title="Receiver" type="body-r" />
                        <Typography title={`${receiverAccountName} - ${receiverAccountNumber}`} />
                    </View>
                </View>
                <View style={styles.detailItem}>
                    <Typography title="Bank" type="body-r" />
                    <Typography title={bankName} />
                </View>
                <View style={styles.detailItem}>
                    <Typography title="Narration" type="body-r" />
                    <Typography title={narration} />
                </View>
                <View style={styles.amountDetailsContainer}>
                    <View style={styles.amountRow}>
                        <Typography title="Amount" type="body-sb" />
                        <Typography title={amount} type="body-sb" />
                    </View>
                </View>

                <View style={styles.pinPadContainer}>
                    <Typography title="Enter your four-digit PIN" type="body-sb" />
                    <PinPad
                        codeLength={4}
                        pin=""
                        onInput={(pin: string) => {}}
                    />
                </View>

                <View style={mainSavingsStyles.buttonContainer}>
                    <Button title="Complete Transaction" onPress={handleEasySavingsDone} />
                </View>
            </View>
        </MainLayout>
    );
}
