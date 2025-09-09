import { Image, ScrollView, Text, TouchableOpacity, View, ViewStyle } from "react-native";
import styles from "./styles";
import React from "react";
import { Typography } from "../../Forms";
import Colors from "../../../theme/Colors";
import ComponentImages from "../../../../assets/images/components";
import CustomCard from "../CustomCard";
import Pad from "../../Pad";

interface Terminal {
    serialNo: string;
    transactionsCount: string;
    withdrawalsCount: string;
    withdrawalAmount: string;
    lastTransaction: string;
    terminalContainerStyle?: ViewStyle;
    badgeStyle?: ViewStyle;
}

const stylesDictionary = {
    1: [styles.badge1, styles.terminalContainerStyle1],
    2: [styles.badge2, styles.terminalContainerStyle2],
    3: [styles.badge3, styles.terminalContainerStyle3],
    4: [styles.badge4, styles.terminalContainerStyle4],
    5: [styles.badge5, styles.terminalContainerStyle5],
}

const Item = ({
    serialNo, 
    transactionsCount, 
    withdrawalsCount, 
    withdrawalAmount, 
    lastTransaction,
    terminalContainerStyle,
    badgeStyle
}: Terminal) => {
    return (
        <CustomCard visible customContainerStyle={terminalContainerStyle}>
                <View style={{flexDirection: 'row', gap: 4}}>
                    <Typography title="Terminal" type="label-sb" />
                    <Typography title={serialNo} type="label-sb" />
                </View>
                <Pad size={16}/>
                <View style={{gap: 24}}>
                    <View style={styles.transactionsDetailsContatiner}>
                        <View style={styles.transactionsDetails}>
                            <Typography title="Number of Transactions:" type="label-r"/>
                            <View style={badgeStyle}>
                                <Typography title={transactionsCount} color={Colors.white} type="body-b"/>
                            </View>
                        </View>
                        <View>
                            <Typography title="Total Number of Withdrawals:" type="label-r" />
                            <Typography title={withdrawalsCount} type="body-b" />
                        </View>
                        <View>
                            <Typography title="Total Withdrawal Amount:" type="label-r" />
                            <Typography title={withdrawalAmount} type="body-b" />
                        </View>
                    </View>
                    <View style={styles.lastTransactionDate}>
                    <Typography title="Last Transaction Date:" type="label-r" />
                        <Typography title={lastTransaction} type="label-sb" />
                    </View>
                </View>
            </CustomCard>
    );
};


export default function TerminalsCard({terminals}: {terminals: Terminal[]}) {

    return (
        <View>
            {terminals.length > 0 ? (
                <View>
                    <ScrollView contentContainerStyle={styles.terminal} showsVerticalScrollIndicator={false}>
                        {terminals.map((terminals, index) => {
                            const selectedStyles = stylesDictionary[index+1] || [styles.badge1, styles.terminalContainerStyle1];
                            
                            return(
                                <Item 
                                    key={index} 
                                    {...terminals}
                                    terminalContainerStyle={{ ...styles.terminalContainerStyle, ...selectedStyles[1] }}
                                    badgeStyle={{ ...styles.badge, ...selectedStyles[0] }}
                                     />
                            )
                        })}
                    </ScrollView>
                </View>
            ) : (
                <View style={styles.emptyContainer}>
                    <Image
                        source={ComponentImages.disputes.emptyDisputes}
                        style={styles.emptyBox}
                    />
                    <Typography
                        title="You have no terminals assigned to you yet!"
                        type="label-r"
                        color={Colors.gray[400]}
                    />
                </View>
            )}
        </View>
    );
}