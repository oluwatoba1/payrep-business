import Colors from "@theme/Colors";

export const getStatusColor = (status: string) => {
	switch (status) {
		case "successful":
			return Colors.success[600];
		case "pending":
			return Colors.primary[600];
		case "failed":
			return Colors.danger[600];
		default:
			return Colors.gray[600];
	}
};

export const getStatusBackgroundColor = (status: string) => {
	switch (status) {
		case "successful":
			return Colors.success[50];
		case "pending":
			return Colors.primary[50];
		case "failed":
			return Colors.danger[50];
		default:
			return Colors.gray[50];
	}
};
