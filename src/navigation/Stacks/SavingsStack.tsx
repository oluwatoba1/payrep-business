import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SavingsStackParamList } from "../types";
import { AddEasySavingsScreen, AutoEasySavingsListScreen, AutomatedSavingsScreen, AutomatedSavingsWithdrawScreen, ConfirmSavingsTransactionScreen, EasySavingsListScreen, EasyWithdrawSavingsScreen, EditAutoEasySavingsScreen, EditEasySavingsScreen, LinkBankScreen, LinkCardScreen, LockSavingsScreen, LockSavingsWithdrawScreen, PreviewAutomatedSavingsScreen, PreviewEasySavingsScreen, PreviewLockSavingsScreen, SavingsReceiptScreen, SavingsScreen, SavingsSuccessMessageScreen, TotalSavingsScreen, TotalSavingsWithdrawScreen, WithdrawSavingsListScreen } from "../../screens/Private/Savings";

const Stack = createNativeStackNavigator<SavingsStackParamList>()

export default function SavingsStack() {
    return (
        <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName='SavingsScreen'>
            {/* other savings options */}
            <Stack.Screen name="SavingsScreen" component={SavingsScreen} />
            <Stack.Screen name="WithdrawSavingsListsScreen" component={WithdrawSavingsListScreen} />
            <Stack.Screen name="ConfirmSavingstransactionScreen" component={ConfirmSavingsTransactionScreen} />
            <Stack.Screen name="SavingsSuccessMessageScreen" component={SavingsSuccessMessageScreen} />
            <Stack.Screen name="LinkBankScreen" component={LinkBankScreen} />
            <Stack.Screen name="LinkCardScreen" component={LinkCardScreen} />
            <Stack.Screen name="SavingsReceiptScreen" component={SavingsReceiptScreen} />
            
            {/* easy savings */}
            <Stack.Screen name="AddEasySavingsScreen" component={AddEasySavingsScreen} />
            <Stack.Screen name="PreviewEasySavingsScreen" component={PreviewEasySavingsScreen} />
            <Stack.Screen name="EditEasySavingsScreen" component={EditEasySavingsScreen} />
            <Stack.Screen name="EasySavingsWithdrawScreen" component={EasyWithdrawSavingsScreen} />
            {/* automated savings */}
            <Stack.Screen name="AutomatedSavingsScreen" component={AutomatedSavingsScreen} />
            <Stack.Screen name="PreviewAutomatedSavingsScreen" component={PreviewAutomatedSavingsScreen} />
            {/* total savings */}
            <Stack.Screen name="TotalSavingsScreen" component={TotalSavingsScreen} />
            <Stack.Screen name="TotalSavingsWithdrawScreen" component={TotalSavingsWithdrawScreen} />
            <Stack.Screen name="AutomatedSavingsWithdrawScreen" component={AutomatedSavingsWithdrawScreen} />
            {/* locked savings */}
            <Stack.Screen name="LockedSavingsWithdrawScreen" component={LockSavingsWithdrawScreen} />
            <Stack.Screen name="LockedSavingsScreen" component={LockSavingsScreen} />
            <Stack.Screen name="PreviewLockedSavingsScreen" component={PreviewLockSavingsScreen} />
            <Stack.Screen name="EasySavingsListScreen" component={EasySavingsListScreen} />
            <Stack.Screen name="EditAutoEasySavingsScreen" component={EditAutoEasySavingsScreen} />
            <Stack.Screen name="AutoEasySavingsListScreen" component={AutoEasySavingsListScreen} />

            

        </Stack.Navigator>
    )
}