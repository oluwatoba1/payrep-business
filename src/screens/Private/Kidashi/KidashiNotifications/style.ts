import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	avatarContainer: {
		width: 42,
		height: 42,
		borderRadius: 21,
		backgroundColor: "#EDE9FE",
		alignItems: "center",
		justifyContent: "center",
		marginRight: 12,
	},
	avatar: {
		width: 24,
		height: 24,
		tintColor: "#5B21B6",
		resizeMode: "contain",
	},
	textContainer: {
		flex: 1,
	},
	title: {
		fontSize: 14,
		fontWeight: "600",
		color: "#111827",
		marginBottom: 2,
	},
	subtitle: {
		fontSize: 13,
		color: "#6B7280",
	},

	dot: {
		width: 8,
		height: 8,
		borderRadius: 4,
		backgroundColor: "#EF4444",
	},
	time: {
		fontSize: 12,
		color: "#9CA3AF",
		marginLeft: 54, // aligns with text start
		marginBottom: 6,
	},
	chevronIcon: {
		width: 24,
		height: 24,
		resizeMode: "contain",
	},
	emptyContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		paddingVertical: 80,
	},
});
