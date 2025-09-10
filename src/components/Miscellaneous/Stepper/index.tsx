import React from "react";
import { View, Text } from "react-native";

import styles from "./styles";
import { Typography } from "@components/Forms";
import Colors from "@theme/Colors";
import { Row } from "@components/Layout";

interface StepperProps {
	steps: number;
	currentStep: number;
}

export default function Stepper({ steps, currentStep }: StepperProps) {
	return (
		<View style={styles.container}>
			{Array.from({ length: steps }).map((_, index) => {
				const stepNumber = index + 1;
				const isCompleted = stepNumber < currentStep;
				const isActive = stepNumber === currentStep;

				return (
					<Row key={index}>
						{/* Step Circle */}
						<View
							style={[
								styles.step,
								isCompleted || isActive
									? styles.activeStep
									: styles.inactiveStep,
							]}
						>
							<Typography
								title={String(stepNumber)}
								color={Colors.black}
								type='label-sb'
							/>
						</View>

						{stepNumber !== steps && <View style={styles.stepperDivider} />}
					</Row>
				);
			})}
		</View>
	);
}
