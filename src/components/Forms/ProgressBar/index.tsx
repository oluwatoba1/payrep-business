import { View, Text } from "react-native";
import React from "react";
import { styles } from "./styles";
import Colors from "@theme/Colors";

const ProgressBar = ({
	progress,
	color,
}: {
	progress: number;
	color?: string;
}) => {
	return (
		<View style={styles.container}>
			<View
				style={[
					styles.progressBar,
					{
						width: `${progress}%`,
						backgroundColor: color || Colors.neutral.base,
					},
				]}
			/>
		</View>
	);
};

export default ProgressBar;
