import { View, Text } from "react-native";
import React from "react";
import CreateTrustCircleHeader from "@components/UI/CreateTrustCircle/Header";
import HowItWorks from "@components/UI/CreateTrustCircle/HowItWorks";

const CreateTrustCircle = () => {
	return (
		<View>
			<CreateTrustCircleHeader />
			<HowItWorks />
		</View>
	);
};

export default CreateTrustCircle;
