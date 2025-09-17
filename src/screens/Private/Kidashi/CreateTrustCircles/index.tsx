import { View, Text, Image } from "react-native";
import React from "react";
import CreateTrustCircleHeader from "@components/UI/CreateTrustCircle/Header";
import HowItWorks from "@components/UI/CreateTrustCircle/HowItWorks";
import { styles } from "./style";
import { Button, Typography } from "@components/Forms";
import Pad from "@components/Pad";
import { Pressable, ScrollView } from "react-native-gesture-handler";
import Colors from "@theme/Colors";
import ScreenImages from "@assets/images/screens";
import { useNavigation } from "@react-navigation/native";

const CreateTrustCircle = () => {
	const navigation = useNavigation();
	return (
		<ScrollView style={styles.container}>
			<CreateTrustCircleHeader />
			<View style={styles.contentContainer}>
				<HowItWorks />
				<Pad size={30} />
				<Pressable
					style={styles.skipButton}
					onPress={() => navigation.goBack()}
				>
					<Typography
						title='Skip for now'
						type='body-sb'
						color={Colors.gray[400]}
					/>
					<Image
						source={ScreenImages.kidashiCreateTrustCircles.forwardIcon}
						style={styles.skipIcon}
					/>
				</Pressable>
				<Pad size={40} />
				<Button
					onPress={() => navigation.navigate("CircleName" as never)}
					title={`Alright, Let's Go`}
				/>
			</View>
		</ScrollView>
	);
};

export default CreateTrustCircle;
