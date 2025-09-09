import { View } from "react-native";
import { MainLayout } from "../../../../../../components/Layout";
import { Button, TextInput, Typography } from "../../../../../../components/Forms";
import { styles } from "./styles";
import CardForm from "../../../../../../components/Forms/CardForm";
import { generalStyles } from "../../../styles";
import { StackScreenProps } from "@react-navigation/stack";
import { MoreStackParamList } from "../../../../../../navigation/types";

type ViewBankCardScreenProps = StackScreenProps<MoreStackParamList>

export default function ViewCard ({navigation: {navigate, goBack}}:ViewBankCardScreenProps) {
    const handleNavigateToEditScreen = () => {
        navigate("MoreSuccessMessageScreen", {
            title: "Edit Bank Card",
            subTitle: "Bank Card updated successfully"
            
        })
    }
    
    return (
        <MainLayout backAction={() => goBack()}>
            <View style={generalStyles.container}>
                <View>
                    <Typography title="View Card" type="heading" />
                    <Typography title="Edit or delete your card details." type="subheading" />
                    <CardForm />
                </View>
                <View style={[generalStyles.buttonContainer, styles.buttonContainer]}>
                    <Button title="Delete" textStyle={styles.textStyles} containerStyle={styles.deleteButton} />
                    <Button containerStyle={styles.editButton} title="Edit" onPress={handleNavigateToEditScreen} />
                </View>
            </View>
        </MainLayout>

    )
}