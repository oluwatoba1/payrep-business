import ComponentImages from "@assets/images/components";
import { Button, Typography } from "@components/Forms";
import MainLayout from "@components/Layout/KidashiLayout";
import { KidashiHomeStackParamList } from "@navigation/types";
import { StackScreenProps } from "@react-navigation/stack";
import { Image, Pressable, View } from "react-native";
import styles from "./styles";
import { Row } from "@components/Layout";
import Pad from "@components/Pad";
import ScreenImages from "@assets/images/screens";
import { useAppSelector } from "@store/hooks";
import { addCommas, formatDateTime } from "@utils/Helpers";
import Colors from "@theme/Colors";
import { useRef, useState } from "react";
import ShareModal from "@components/Modal/ShareModal";

type TransferDetailsProps = StackScreenProps<
	KidashiHomeStackParamList,
	"TransferDetails"
>;

export default function TransferDetails({
	navigation: { navigate },
}: TransferDetailsProps) {
	const selectedTransaction = useAppSelector(
		(state) => state.account.selectedTransaction
	);
	const viewShotRef = useRef(null);
	const [modalVisible, setModalVisible] = useState<boolean>(false);

	const formatTransactionDate = formatDateTime(
		selectedTransaction?.created_at || ""
	);

	const handleShareModal = () => {
		setModalVisible((prev) => !prev);
	};

	return (
		<MainLayout
			leftNode={
				<Pressable>
					<Row gap={8} alignItems='center'>
						<Image
							source={ComponentImages.header.backIcon}
							style={styles.backIcon}
						/>
						<Typography title='Transaction Details' type='subheading-sb' />
					</Row>
				</Pressable>
			}
			rightNode={<Typography title='' type='subheading-sb' />}
			keyboardAvoidingType='scroll-view'
		>
			<ShareModal
				selectedTransaction={selectedTransaction}
				viewRef={viewShotRef}
				visible={modalVisible}
				onClose={() => setModalVisible(false)}
			/>
			<Pad size={24} />

			<View style={styles.headerContainer}>
				<Image
					source={ScreenImages.kidashiHome.transactionDetailsHeaderIcon}
					style={styles.headerIcon}
				/>

				<Pad size={8} />

				<Typography
					title={`+ ₦${addCommas(selectedTransaction?.amount || 0)}`}
					type='subheading-sb'
					color={Colors.success.base}
				/>

				<Pad size={6} />

				<Typography title='Deposit' type='body-r' />

				<Pad size={8} />

				<Image
					source={ScreenImages.kidashiHome.transactionDetailsSuccessPill}
					style={styles.successIcon}
				/>
			</View>
			<Row containerStyle={styles.itemContainer}>
				<Typography title='Transaction ID' type='body-r' />
				<Typography
					title={selectedTransaction?.reference_number || ""}
					type='body-sb'
				/>
			</Row>
			<Row containerStyle={styles.itemContainer}>
				<Typography title='Date' type='body-r' />
				<Typography title={formatTransactionDate?.date} type='body-sb' />
			</Row>
			<Row containerStyle={styles.itemContainer}>
				<Typography title='Time' type='body-r' />
				<Typography title={formatTransactionDate?.time} type='body-sb' />
			</Row>
			<Row containerStyle={styles.itemContainer}>
				<Typography title='Payment Method' type='body-r' />
				<Typography title='Transfer' type='body-sb' />
			</Row>
			<Row containerStyle={styles.itemContainer}>
				<Typography title='Amount' type='body-r' />
				<Typography
					title={addCommas(selectedTransaction?.amount || 0, false)}
					type='body-sb'
				/>
			</Row>

			<Pad size={40} />

			<Button
				containerStyle={styles.button}
				title='Download'
				onPress={handleShareModal}
			/>
		</MainLayout>
	);
}
