import React, { useState } from "react";
import { Image, Pressable, View, StyleSheet } from "react-native";
import CustomCard from "../CustomCard";
import ComponentImages from "../../../../assets/images/components";
import IconImages from "../../../../assets/images/appIcons";
import { Typography } from "../../Forms";
import { styles } from "./styles";

interface AcctDetailsProps {
  accountNumber?: string;
  walletBalance: string;
  onCopyButtonPress?: () => void; 
}

export default function AccountDetailsCardNew({
  accountNumber,
  walletBalance,
  onCopyButtonPress
}: AcctDetailsProps) {
  const [showBalance, setShowBalance] = useState<boolean>(false);

  const toggleBalanceVisibility = () => {
    setShowBalance((prev) => !prev);
  };

  return (
    <CustomCard visible={true} customContainerStyle={styles.cardContainer}>
      <View style={styles.polygonOneContainer}>
        <Image
          source={ComponentImages.accountDetailsCard.polygon}
          style={styles.polygonOne}
        />
      </View>
      <View style={styles.polygonTwoContainer}>
        <Image source={ComponentImages.accountDetailsCard.polygonTwo} />
      </View>
      <View style={styles.contentContainer}>
        <View style={styles.balanceContainer}>
          <Typography title="Balance" type="label-sb" />
          <View style={styles.balanceAmountContainer}>
            <Typography title="₦" type="heading4-b" />
            <Typography
              title={showBalance ? walletBalance : "**************"}
              type="heading4-b"
            />
            <Pressable
              accessibilityLabel="Toggle Balance Visibility"
              onPress={toggleBalanceVisibility}
              style={styles.eyeIconPressable}
            >
              <Image
                source={showBalance ? IconImages.icon.eyeOff : IconImages.icon.eye}
                style={styles.icon}
              />
            </Pressable>
          </View>
        </View>
        {accountNumber && (
          <View style={styles.accountNumberContainer}>
            <Typography title="Account Number" type="body-r" />
            <Typography title={accountNumber} type="body-sb" />
            <Pressable
              accessibilityLabel="Copy Account Number"
              style={styles.copyIconPressable}
              onPress={() => {
              }}
            >
              <Image
                source={IconImages.icon.copyDark}
                style={styles.icon}
              />
            </Pressable>
          </View>
        )}
      </View>
    </CustomCard>
  );
}


