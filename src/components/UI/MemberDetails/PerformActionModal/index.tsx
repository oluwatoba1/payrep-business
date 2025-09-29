import { Image, Pressable, View } from "react-native";
import React from "react";
import ScreenImages from "@assets/images/screens";
import { ModalWrapper } from "@components/Modal";
import { Row } from "@components/Layout";
import { Typography } from "@components/Forms";
import { styles } from "./style";
import Divider from "@components/Miscellaneous/Divider";
import { scale, scaleHeight } from "@utils/Helpers";
import { MembersStackParamList } from "@navigation/types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackScreenProps } from "@react-navigation/stack";

interface PerformActionModalProps {
	visible: boolean;
	onClose: () => void;
	parent: "MemberDetails" | "TrustCircle";
	onAddMemberPress?: () => void;
	onRequestAssetPress?: () => void;
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
	parent,
	onAddMemberPress,
	onRequestAssetPress,
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

			<ActionCard
				title='Request Asset Finance'
				subTitle='Apply for asset support'
				icon={ScreenImages.kidashiMemberDetails.boxIcon}
				onPress={() => {
					if (parent === "MemberDetails") {
						onRequestAssetPress?.();
					}
				}}
			/>

			{parent === "TrustCircle" && (
				<>
					<ActionCard
						title='Add a Member'
						subTitle='Add a new member to this Trust Circle'
						icon={ScreenImages.kidashiMemberDetails.addTeamIcon}
						onPress={() => {
							if (parent === "TrustCircle") {
								onAddMemberPress?.();
							}
						}}
					/>
				</>
			)}
		</ModalWrapper>
	);
};

export default PerformActionModal;
