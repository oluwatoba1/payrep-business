import React from "react";
import { View, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Typography } from "../../Forms";
import { styles } from "./styles";
import Clipboard from "@react-native-clipboard/clipboard";
import ComponentImages from "../../../../assets/images/components";
import { cardStyles } from "../styles";



interface AccountDetails {
  account_name: string;
  account_number: string;
  bank: string;
}

interface WalletAccountCardProps {
  accountDetails: AccountDetails;
}

export default function  FundWalletAccountCard ({ accountDetails }:WalletAccountCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.row}>
        <Typography title="Account Name" type="subheading" />
        <View style={styles.textDetail}>
            <Typography title={accountDetails.account_name} />
            <TouchableOpacity onPress={() => Clipboard.setString(accountDetails.account_number)}>
                <Image
                  source={ComponentImages.accountDetailsCard.darkCopyIcon}
                  style={cardStyles.copyIcon}
                />
              </TouchableOpacity>
        </View>
      </View>
      <View style={styles.row}>
        <Typography title="Account Number" type="subheading" />
        <View style={styles.textDetail}>
            <Typography title={accountDetails.account_number} />
            <TouchableOpacity onPress={() => Clipboard.setString(accountDetails.account_number)}>
                <Image
                  source={ComponentImages.accountDetailsCard.darkCopyIcon}
                  style={cardStyles.copyIcon}
                />
            </TouchableOpacity>
        </View>
      </View>
      <View style={styles.row}>
        <Typography title="Bank" type="subheading" />
        <View style={styles.textDetail}>
            <Typography title={accountDetails.bank} />
            <TouchableOpacity onPress={() => Clipboard.setString(accountDetails.account_number)}>
                <Image
                  source={ComponentImages.accountDetailsCard.darkCopyIcon}
                  style={cardStyles.copyIcon}
                />
            </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

