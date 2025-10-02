import Colors from "@theme/Colors";

export const getStatusColor = (status: AssetStatus) => {
	switch (status) {
		case "REQUESTED":
			return {
				backgroundColor: Colors.primary[100],
				color: Colors.cardColor.brown["200"],
			};
		case "APPROVED":
			return {
				backgroundColor: Colors.success[50],
				color: Colors.success["base"],
			};
		case "QUERIED":
			return {
				backgroundColor: Colors.primary[100],
				color: Colors.cardColor.brown["200"],
			};

		case "FAILED":
			return {
				backgroundColor: Colors.danger[50],
				color: Colors.danger["base"],
			};

		case "REJECTED":
			return {
				backgroundColor: Colors.pink[50],
				color: Colors.pink[200],
			};
	}
};
