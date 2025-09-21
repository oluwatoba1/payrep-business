import Colors from "@theme/Colors";

export const getStatusColor = (status: string) => {
	switch (status) {
		case "ongoing":
			return {
				backgroundColor: Colors.primary[100],
				color: Colors.cardColor.brown["200"],
			};
		case "approved":
			return {
				backgroundColor: Colors.success[50],
				color: Colors.success["base"],
			};
		case "pending approval":
			return {
				backgroundColor: Colors.primary[100],
				color: Colors.cardColor.brown["200"],
			};
		case "denied":
			return {
				backgroundColor: Colors.danger[100],
				color: Colors.danger["base"],
			};
		case "repaid":
			return {
				backgroundColor: Colors.success[50],
				color: Colors.success["base"],
			};
		case "cancelled":
			return {
				backgroundColor: Colors.neutral[50],
				color: Colors.neutral["base"],
			};
		case "rejected":
			return {
				backgroundColor: Colors.pink[50],
				color: Colors.pink[200],
			};
	}
};
