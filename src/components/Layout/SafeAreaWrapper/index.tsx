import { View, Image, Pressable } from "react-native";
import React from "react";
import { styles } from "./style";
import ScreenImages from "@assets/images/screens";
import { Typography } from "@components/Forms";
import { useNavigation } from "@react-navigation/native";
import Divider from "@components/Miscellaneous/Divider";
import { scaleHeight } from "@utils/Helpers";

interface SafeAreaWrapperProps {
	children: React.ReactNode;
	backAction?: () => void;
	title?: string;
}

const SafeAreaWrapper = ({
	children,
	backAction,
	title,
}: SafeAreaWrapperProps) => {
	const navigation = useNavigation();
	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Pressable onPress={backAction || (() => navigation.goBack())}>
					<Image
						source={ScreenImages.kidashiMemberDetails.backIcon}
						style={styles.icon}
					/>
				</Pressable>
				<Typography title={title || ""} />
			</View>
			<Divider gapY={scaleHeight(10)} />
			{children}
		</View>
	);
};

export default SafeAreaWrapper;
