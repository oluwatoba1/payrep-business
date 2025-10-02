import { View, Image, Pressable, ScrollView, Keyboard } from "react-native";
import React from "react";
import { styles } from "./style";
import ScreenImages from "@assets/images/screens";
import { Typography } from "@components/Forms";
import { useNavigation } from "@react-navigation/native";
import Divider from "@components/Miscellaneous/Divider";
import { scaleHeight } from "@utils/Helpers";
import LogoLoader from "../LogoLoader";

interface SafeAreaWrapperProps {
	children: React.ReactNode;
	backAction?: () => void;
	title?: string;
	canScroll?: boolean;
	isLoading?: boolean;
}

const SafeAreaWrapper = ({
	children,
	backAction,
	title,
	canScroll = false,
	isLoading = false,
}: SafeAreaWrapperProps) => {
	const navigation = useNavigation();

	const ContentWrapper = canScroll ? ScrollView : View;
	const contentProps = canScroll
		? {
				style: styles.scrollContent,
				showsVerticalScrollIndicator: false,
		  }
		: { style: styles.content };

	return (
		<View
			onStartShouldSetResponder={() => {
				Keyboard.dismiss();
				return false;
			}}
			style={styles.container}
		>
			<LogoLoader isLoading={isLoading} title='' />
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
			<ContentWrapper {...contentProps}>{children}</ContentWrapper>
		</View>
	);
};

export default SafeAreaWrapper;
