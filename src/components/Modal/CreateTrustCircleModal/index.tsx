import { Row } from "@components/Layout";

import { Image, Pressable, View, TouchableOpacity } from "react-native";
import { Typography } from "@components/Forms";
import ScreenImages from "@assets/images/screens";
import Colors from "@theme/Colors";
import { styles } from "./style";
import { useNavigation } from "@react-navigation/native";
import { ModalWrapper } from "..";
import Divider from "@components/Miscellaneous/Divider";
import { scaleHeight } from "@utils/Helpers";

interface CreateTrustCircleModalProps {
	visible: boolean;
	onClose: () => void;
}

export default function CreateTrustCircleModal({
	visible,
	onClose,
}: CreateTrustCircleModalProps) {
	const { navigate } = useNavigation();
	const modalContentData = [
		{
			label: "Create a PayRep Account",
			sub: "Open a main account for your member to use",
			icon: ScreenImages.kidashiHome.createAccount,
			onPress: () => {
				// navigate("CreatePayRepAccount");
			},
		},
		{
			label: "Join Kidashi Program",
			sub: "Enroll a member on Kidashi",
			icon: ScreenImages.kidashiHome.joinKidashi,
			onPress: () => {
				// navigate("JoinKidashiProgram");
			},
		},
		{
			label: "Create a Trust Circle",
			sub: "Set up a new group for loans",
			icon: ScreenImages.kidashiHome.createTrustCircle,
			onPress: () => {
				navigate("CreateTrustCircles" as never);
			},
		},
	];
	return (
		<ModalWrapper
			visible={visible}
			onClose={onClose}
			// dismissOnTouchOutside={true}
		>
			<View style={styles.container}>
				{/* Header */}
				<View style={styles.header}>
					<Typography
						title='What would you like to do?'
						color={Colors.gray[400]}
						type='heading-sb'
					/>
					<Pressable onPress={onClose} style={styles.closeButton}>
						<Image
							style={styles.closeIcon}
							source={ScreenImages.kidashiHome.closeIcon}
						/>
					</Pressable>
				</View>
				<Divider gapX={-10} />

				{/* Options List */}
				<View style={styles.optionsContainer}>
					{modalContentData.map((item, index) => (
						<TouchableOpacity
							key={index}
							style={styles.optionItem}
							onPress={item.onPress}
							activeOpacity={0.7}
						>
							<View style={styles.optionContent}>
								<View style={styles.iconContainer}>
									<Image source={item.icon} style={styles.optionIcon} />
								</View>
								<View style={styles.textContainer}>
									<Typography
										title={item.label}
										color={Colors.gray[900]}
										type='body-sb'
									/>
									<Typography
										title={item.sub}
										color={Colors.gray[300]}
										type='body-r'
									/>
								</View>
								<Image
									source={ScreenImages.kidashiHome.caretRight}
									style={styles.arrowIcon}
								/>
							</View>
							{index < modalContentData.length - 1 && (
								<Divider gapY={scaleHeight(16)} />
							)}
						</TouchableOpacity>
					))}
				</View>
			</View>
		</ModalWrapper>
	);
}
