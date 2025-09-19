import {
	View,
	Text,
	SafeAreaView,
	Pressable,
	Image,
	TextInput,
} from "react-native";
import React from "react";
import ScreenImages from "@assets/images/screens";
import { styles } from "./style";
import { Button, Typography } from "@components/Forms";
import Colors from "@theme/Colors";
import Pad from "@components/Pad";
import { StackScreenProps } from "@react-navigation/stack";
import { TrustCircleStackParamList } from "@navigation/types";

type CircleNameProps = StackScreenProps<
	TrustCircleStackParamList,
	"CircleName"
>;

export default function CircleName({
	navigation: { navigate, goBack },
}: CircleNameProps) {
	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.header}>
				<Pressable onPress={goBack} style={styles.backButton}>
					<Image
						source={ScreenImages.kidashiCreateTrustCircles.backIcon}
						style={styles.backIcon}
					/>
				</Pressable>
			</View>
			<View style={styles.contentContainer}>
				<Typography
					title='Create a Trust Circle'
					type='heading5-sb'
					color={Colors.gray[900]}
				/>
				<Pad size={10} />
				<Typography
					title='Set up a Trust Circle for women who want to access loans together. Provide the details below to get started.'
					type='body-r'
					color={Colors.gray[600]}
				/>
				<Pad size={20} />
				<Typography
					title='Circle Name'
					type='body-r'
					color={Colors.gray[600]}
				/>
				<Pad size={4} />
				<TextInput
					style={styles.input}
					placeholder='Enter a name for your trust circle'
				/>
				<Pad size={10} />
			</View>
			<View style={{ flex: 1 }} />
			<Button title='Create Trust Circle' onPress={() => navigate("TrustCircleDetails")} />
		</SafeAreaView>
	);
}
