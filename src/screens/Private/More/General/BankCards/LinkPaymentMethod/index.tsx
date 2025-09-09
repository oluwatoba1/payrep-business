import React from "react"
import { Image, ScrollView, View } from "react-native"
import {MainLayout} from "../../../../../../components/Layout"
import { Typography } from "../../../../../../components/Forms"
import { generalStyles } from "../../../styles"
import CustomCard from "../../../../../../components/Cards/CustomCard"
import ScreenImages from "../../../../../../../assets/images/screens"
import {styles} from './styles'
import { StackScreenProps } from "@react-navigation/stack"
import { MoreStackParamList } from "../../../../../../navigation/types"

type LinkPaymentMethodScreenProps = StackScreenProps<MoreStackParamList>

export default function LinkPaymentMethod({navigation:{navigate, goBack}}:LinkPaymentMethodScreenProps) {
    const handleAddNewCardNavigate = () => {
        navigate('AddBankCardScreen')
    }
    return (
        <MainLayout backAction={() => goBack()}>
            <View style={generalStyles.container}>
                <View style={generalStyles.titleContainer}>
                    <Typography title="Add Card/Link Bank" type="heading4-sb" />
                    <Typography title="Manage your payment methods by adding your bank details and debit cards. Adding payment methods makes it easier to transact." type="body-r"  />
                </View>
                <ScrollView>
                    <CustomCard visible={true} customContainerStyle={styles.cardContainer}>
                        <View style={styles.cardContent}>
                            <Image source={ScreenImages.MoreScreen.piggybank} style={styles.image} />
                            <Typography title="Link Bank" type="body-sb" style={styles.text} />
                        </View>
                    </CustomCard>
                    <CustomCard onPress={handleAddNewCardNavigate} visible={true} customContainerStyle={styles.cardContainer}>
                        <View style={styles.cardContent}>
                            <Image source={ScreenImages.MoreScreen.bankCard} style={styles.image} />
                            <Typography title="Link New Card" type="body-sb" style={styles.text} />
                        </View>
                    </CustomCard>
                </ScrollView>
            </View>
        </MainLayout>
    )
}