import { View } from "react-native";
import { MainLayout } from "../../../../../components/Layout";
import { Typography } from "../../../../../components/Forms";
import { mainWalletStyles } from "../../../Wallet/mainWalletStyles";
import FundWalletAccountCard from "../../../../../components/Cards/FundWalletAccountCard";



export default function FundWallet() {
    const ITEMS = {
        title: "Add Money via Bank Transfer",
        subTitle: "Fund your wallet by topping it up with a transfer from any of your banking accounts, and then send the money using the details below.",

    }   
    const accountDetailsCard = {
        account_name: "Musa Abdullahi Omeiza",
        account_number: "0991199900",
        bank: "VFD",
      }; 
    return (
        <MainLayout backAction={() => {}}>
            <View style={mainWalletStyles.container}>
                <Typography title={ITEMS.title} />
                <View>
                    <Typography title={ITEMS.subTitle} type="subheading" />
                </View>
                <View>
                    <FundWalletAccountCard accountDetails={accountDetailsCard}/>
                </View>
            </View>
        </MainLayout>
    )
}