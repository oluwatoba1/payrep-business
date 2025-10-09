import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	container: {
		padding: 16,
	},
	header: {
		marginBottom: 12,
	},
	title: {
		fontSize: 20,
		fontWeight: "700",
		marginBottom: 8,
	},
	subtitle: {
		color: "#6B7280",
		marginTop: 6,
	},
	badge: {
		alignSelf: "flex-start",
		backgroundColor: "#EEF2FF",
		borderColor: "#6366F1",
		borderWidth: 1,
		paddingHorizontal: 10,
		paddingVertical: 4,
		borderRadius: 999,
		marginTop: 4,
	},
	badgeText: {
		color: "#3730A3",
		fontSize: 12,
		fontWeight: "600",
		textTransform: "uppercase",
		letterSpacing: 0.4,
	},
	card: {
		backgroundColor: "#FFFFFF",
		borderWidth: 1,
		borderColor: "#E5E7EB",
		borderRadius: 12,
		padding: 16,
		marginTop: 8,
	},
	sectionTitle: {
		fontWeight: "600",
		marginBottom: 8,
	},
	metaRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingVertical: 8,
		borderBottomWidth: 1,
		borderBottomColor: "#F3F4F6",
	},
	metaKey: {
		color: "#6B7280",
	},
	metaValue: {
		color: "#111827",
		marginLeft: 16,
		flex: 1,
		textAlign: "right",
	},
});
