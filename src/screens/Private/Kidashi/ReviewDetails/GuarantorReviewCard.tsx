import { Image, View } from "react-native";
import styles from "./styles";
import { Row } from "@components/Layout";
import ScreenImages from "@assets/images/screens";
import { IconButton, Typography } from "@components/Forms";
import Pad from "@components/Pad";
import Colors from "@theme/Colors";

interface GuarantorReviewCardProps {
	guarantorDetails: IGuarantorDetails;
	onEdit: () => void;
}

export default function GuarantorReviewCard({
	guarantorDetails,
	onEdit,
}: GuarantorReviewCardProps) {
	return (
		<View style={[styles.reviewCardContainer, styles.reviewPadding]}>
			<Row containerStyle={styles.reviewCardHeader}>
				<Row gap={10}>
					<View style={styles.vendorPlaceholderContainer}>
						<Image
							source={ScreenImages.kidashiReviewDetails.userPlaceholder}
							style={styles.vendorPlaceholderImage}
						/>
					</View>
					<View>
						<Typography
							title={`${guarantorDetails.firstName} ${guarantorDetails.lastName}`}
							type='subheading-sb'
						/>
						<Typography title={guarantorDetails.gender} type='subheading' />
					</View>
				</Row>
				<IconButton containerStyle={styles.editContainer} onPress={onEdit}>
					<Row alignItems='center' justifyContent='flex-start' gap={8}>
						<Image
							source={ScreenImages.kidashiReviewDetails.editIcon}
							style={styles.editIcon}
						/>
						<Typography title='Edit' type='label-sb' />
					</Row>
				</IconButton>
			</Row>
			<Pad size={12} />

			<Row alignItems='center' justifyContent='space-between'>
				<Typography
					title='Date of Birth'
					type='subheading'
					color={Colors.neutral["400"]}
				/>
				<Typography
					title={guarantorDetails.dateOfBirth}
					type='body-sb'
					style={{ textAlign: "right" }}
				/>
			</Row>
			<Pad size={8} />
			<Row alignItems='center' justifyContent='space-between'>
				<Typography
					title='NIN'
					type='subheading'
					color={Colors.neutral["400"]}
				/>
				<Typography
					title={guarantorDetails.nin}
					type='body-sb'
					style={{ textAlign: "right" }}
				/>
			</Row>
			<Pad size={8} />
			<Row alignItems='center' justifyContent='space-between'>
				<Typography
					title='State'
					type='subheading'
					color={Colors.neutral["400"]}
				/>
				<Typography
					title={guarantorDetails.state}
					type='body-sb'
					style={{ textAlign: "right" }}
				/>
			</Row>
			<Pad size={8} />
			<Row alignItems='center' justifyContent='space-between'>
				<Typography
					title='LGA'
					type='subheading'
					color={Colors.neutral["400"]}
				/>
				<Typography
					title={guarantorDetails.lga}
					type='body-sb'
					style={{ textAlign: "right" }}
				/>
			</Row>
			<Pad size={8} />
			<Row alignItems='center' justifyContent='space-between'>
				<Typography
					title='Email'
					type='subheading'
					color={Colors.neutral["400"]}
				/>
				<Typography
					title={guarantorDetails.email}
					type='body-sb'
					style={{ textAlign: "right" }}
				/>
			</Row>
			<Pad size={8} />
			<Row alignItems='center' justifyContent='space-between'>
				<Typography
					title='Phone'
					type='subheading'
					color={Colors.neutral["400"]}
				/>
				<Typography
					title={guarantorDetails.phone}
					type='body-sb'
					style={{ textAlign: "right" }}
				/>
			</Row>
		</View>
	);
}
