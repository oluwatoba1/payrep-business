import { Row } from "@components/Layout";

import {
	Image,
	Pressable,
	View,
	TouchableOpacity,
	ImageSourcePropType,
} from "react-native";
import { Typography } from "@components/Forms";
import ScreenImages from "@assets/images/screens";
import Colors from "@theme/Colors";
import { styles } from "./style";
import { useNavigation } from "@react-navigation/native";
import { ModalWrapper } from "..";
import Divider from "@components/Miscellaneous/Divider";
import { scaleHeight } from "@utils/Helpers";

export interface CircleOptions {
	label: string;
	sub: string;
	icon: ImageSourcePropType;
	onPress: () => void;
}

interface CreateTrustCircleModalProps {
	visible: boolean;
	onClose: () => void;
	options: CircleOptions[];
}

export default function CreateTrustCircleModal({
	visible,
	onClose,
	options,
}: CreateTrustCircleModalProps) {
	const { navigate } = useNavigation();

	return (
		<ModalWrapper visible={visible} onClose={onClose}>
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
					{options.map((item, index) => (
						<TouchableOpacity
							key={index}
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
							{index < options.length - 1 && <Divider gapY={scaleHeight(0)} />}
						</TouchableOpacity>
					))}
				</View>
			</View>
		</ModalWrapper>
	);
}
