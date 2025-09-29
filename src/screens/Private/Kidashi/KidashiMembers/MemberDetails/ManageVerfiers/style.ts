import { StyleSheet } from "react-native";
import Colors from "@theme/Colors";
import { scale, scaleHeight } from "@utils/Helpers";

export const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	headerSection: {
		alignItems: "center",
		marginBottom: scaleHeight(16),
	},
	iconContainer: {
		width: scale(60),
		height: scale(60),
		borderRadius: scale(30),
		backgroundColor: Colors.gray["100"],
		justifyContent: "center",
		alignItems: "center",
		marginBottom: scaleHeight(12),
	},
	headerIcon: {
		width: scale(28),
		height: scale(28),
		resizeMode: "contain",
	},
	title: {
		fontSize: scale(20),
		fontWeight: "600",
		color: Colors.gray["900"],
		marginBottom: scaleHeight(8),
		textAlign: "center",
	},
	subtitle: {
		fontSize: scale(12),
		color: Colors.gray["600"],
		lineHeight: scaleHeight(20),
		textAlign: "center",
		marginBottom: scaleHeight(12),
	},
	infoBanner: {
		backgroundColor: Colors.primary["100"],
		padding: scale(12),
		borderRadius: scale(100),
		borderWidth: 1,
		borderColor: Colors.primary["400"],
		width: "100%",
	},
	infoText: {
		fontSize: scale(12),
		color: Colors.cardColor.brown["200"],
		lineHeight: scaleHeight(20),
	},
	infoIcon: {
		width: scale(16),
		height: scale(16),
		tintColor: Colors.cardColor.brown["200"],
		marginRight: scale(8),
	},

	searchLabel: {
		color: Colors.gray["700"],
	},
	searchContainer: {
		backgroundColor: Colors.gray["50"],
		borderRadius: scale(8),
		paddingHorizontal: scale(12),
		paddingVertical: scaleHeight(8),
		borderWidth: 1,
		borderColor: Colors.gray["200"],
	},
	searchInput: {
		flex: 1,
		fontSize: scale(14),
		color: Colors.gray["900"],
		paddingVertical: scaleHeight(8),
	},
	clearButton: {
		width: scale(24),
		height: scale(24),
		borderRadius: scale(12),
		backgroundColor: Colors.gray["400"],
		justifyContent: "center",
		alignItems: "center",
	},
	searchButtonContainer: {
		flexDirection: "row",
		gap: scale(8),
		alignItems: "center",
		justifyContent: "center",
	},
	arrowIcon: {
		width: scale(16),
		height: scale(16),
		tintColor: Colors.black,
		resizeMode: "contain",
	},
	verifiersSection: {
		flex: 1,
	},
	sectionTitle: {
		fontSize: scale(16),
		color: Colors.gray["700"],
	},
	verifierItem: {
		flexDirection: "row",
		alignItems: "center",
		gap: scale(12),
	},
	avatarPlaceholder: {
		borderRadius: "100%",
	},
	avatarPlaceholderImage: {
		width: scale(50),
		height: scale(50),
		resizeMode: "contain",
	},
	verifierInfo: {
		flex: 1,
	},
	phoneText: {
		marginTop: scaleHeight(2),
	},
	checkIcon: {
		width: scale(16),
		height: scale(16),
		tintColor: Colors.success["600"],
	},
	chevronIcon: {
		width: scale(16),
		height: scale(16),
		tintColor: Colors.gray["400"],
	},
	accountFoundSection: {
		marginTop: scaleHeight(16),
		marginBottom: scaleHeight(16),
	},
	accountFoundLabel: {
		marginBottom: scaleHeight(8),
		color: Colors.gray["700"],
	},
	accountFoundCard: {
		backgroundColor: Colors.primary["100"],
		padding: scale(12),
		borderRadius: scale(100),
		marginBottom: scaleHeight(12),
		borderWidth: 1,
		borderColor: Colors.primary["400"],
	},
	infoRedIcon: {
		width: scale(16),
		height: scale(16),
		tintColor: Colors.cardColor.brown["200"],
	},
	statusDot: {
		width: scale(8),
		height: scale(8),
		borderRadius: scale(4),
		backgroundColor: Colors.gray["400"],
	},
	generateOTPButton: {
		backgroundColor: Colors.primary["base"],
		paddingVertical: scaleHeight(12),
		borderRadius: scale(8),
	},
	modalCloseIcon: {
		width: scale(16),
		height: scale(16),
		tintColor: Colors.gray["700"],
	},
	modalContent: {
		alignItems: "center",

		// paddingHorizontal: scale(20),
	},

	successIcon: {
		width: scale(64),
		height: scale(64),
		resizeMode: "contain",
	},
	modalTitle: {
		fontSize: scale(20),
		fontWeight: "600",
		color: Colors.gray["900"],
		textAlign: "center",
		marginVertical: scaleHeight(12),
	},
	modalSubtitle: {
		fontSize: scale(14),
		color: Colors.gray["600"],
		lineHeight: scaleHeight(20),
		textAlign: "center",
		marginBottom: scaleHeight(24),
	},
	doneButton: {
		width: "100%",
	},
	otpModalContent: {
		alignItems: "center",
		width: "100%",
	},
	iconsContainer: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		marginBottom: scaleHeight(24),
		position: "relative",
	},

	centerIconContainer: {
		width: scale(60),
		height: scale(60),
		borderRadius: scale(30),
		backgroundColor: Colors.gray["200"],
		justifyContent: "center",
		alignItems: "center",
		zIndex: 1,
	},
	shieldIcon: {
		width: scale(32),
		height: scale(32),
		tintColor: Colors.gray["600"],
		resizeMode: "contain",
	},
	otpModalTitle: {
		fontSize: scale(20),
		fontWeight: "600",
		color: Colors.gray["900"],
		textAlign: "center",
		marginBottom: scaleHeight(8),
	},
	otpModalSubtitle: {
		fontSize: scale(14),
		color: Colors.gray["600"],
		lineHeight: scaleHeight(20),
		textAlign: "center",
		marginBottom: scaleHeight(32),
	},
	verifyButton: {
		width: "100%",
	},
	actionRow: {
		width: "100%",
		paddingHorizontal: scale(20),
	},
	actionButton: {
		flexDirection: "row",
		alignItems: "center",
		gap: scale(8),
		paddingVertical: scaleHeight(8),
		marginTop: scaleHeight(8),
	},
	actionIcon: {
		width: scale(16),
		height: scale(16),
		resizeMode: "contain",
	},
	resendText: {
		color: Colors.primary["600"],
		fontSize: scale(12),
		marginTop: scaleHeight(2),
	},
	removeText: {
		color: Colors.danger["400"],
		fontSize: scale(12),
		marginTop: scaleHeight(2),
	},
});
