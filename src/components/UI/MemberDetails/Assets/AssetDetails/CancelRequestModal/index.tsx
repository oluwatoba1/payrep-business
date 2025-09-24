import { View, Text, Image } from "react-native";
import React from "react";
import { ModalWrapper } from "@components/Modal";
import { styles } from "./style";
import ScreenImages from "@assets/images/screens";
import Pad from "@components/Pad";
import { scaleHeight } from "@utils/Helpers";
import { Button, Typography } from "@components/Forms";

interface CancelRequestModalProps {
	visible: boolean;
	onClose: () => void;
}

const CancelRequest = ({ visible, onClose }: CancelRequestModalProps) => {
	return (
		<ModalWrapper visible={visible} onClose={onClose}>
			<View style={styles.container}>
				<View style={styles.cautionIconContainer}>
					<Image
						source={ScreenImages.kidashiMemberDetails.cautionIcon}
						style={styles.cautionIcon}
					/>
				</View>
				<Pad size={scaleHeight(16)} />
				<Typography title='Cancel Request?' type='body-sb' />
				<Pad size={scaleHeight(8)} />
				<Typography
					title='Are you sure you want to cancel this request?'
					type='body-r'
				/>
				<Pad size={scaleHeight(16)} />
				<View style={styles.buttonContainer}>
					<Button title='Cancel Request' onPress={onClose} />
					<Button
						title='Close'
						onPress={onClose}
						containerStyle={styles.closeButton}
					/>
				</View>
			</View>
		</ModalWrapper>
	);
};

export default CancelRequest;
