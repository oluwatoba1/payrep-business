import { Image, ImageSourcePropType, Pressable, View } from "react-native";
import React from "react";
import ScreenImages from "@assets/images/screens";
import { ModalWrapper } from "@components/Modal";
import { Row } from "@components/Layout";
import { Typography } from "@components/Forms";
import { styles } from "./style";
import Divider from "@components/Miscellaneous/Divider";
import { scale, scaleHeight } from "@utils/Helpers";

interface Option {
	title: string;
	subTitle: string;
	icon: ImageSourcePropType;
	onPress: () => void;
}
interface PerformActionModalProps {
	visible: boolean;
	onClose: () => void;
	options: Option[];
}

interface ActionCardProps {
	title: string;
	subTitle?: string;
	icon: any;
	onPress: () => void;
}

const ActionCard = ({ title, subTitle, icon, onPress }: ActionCardProps) => {
	return (
		<Pressable style={styles.actionCard} onPress={onPress}>
			<Row justifyContent='space-between'>
				<Row gap={scale(8)}>
					<View style={styles.iconContainer}>
						<Image source={icon} style={styles.icon} />
					</View>
					<View>
						<Typography title={title} type='body-sb' />
						<Typography
							title={subTitle || ""}
							type='body-r'
							style={styles.subTitle}
						/>
					</View>
				</Row>
				<Image
					source={ScreenImages.kidashiMemberDetails.chevronRightIcon}
					style={styles.chevronRightIcon}
				/>
			</Row>
			<Divider gapY={12} />
		</Pressable>
	);
};

const PerformActionModal = ({
	visible,
	onClose,
	options,
}: PerformActionModalProps) => {
	return (
		<ModalWrapper visible={visible} onClose={onClose}>
			<Row>
				<Typography title='Perform an Action' type='body-sb' />
				<Pressable onPress={onClose} style={styles.closeButton}>
					<Image
						source={ScreenImages.kidashiMemberDetails.closeIcon}
						style={styles.closeIcon}
					/>
				</Pressable>
			</Row>
			<Divider gapY={scaleHeight(16)} gapX={scale(-16)} />

			{options.map((option) => (
				<ActionCard
					title={option.title}
					subTitle={option.subTitle}
					icon={ScreenImages.kidashiMemberDetails.boxIcon}
					onPress={option.onPress}
				/>
			))}
		</ModalWrapper>
	);
};

export default PerformActionModal;
