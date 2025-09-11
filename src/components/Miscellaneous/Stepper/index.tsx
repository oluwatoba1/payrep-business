import React from "react";
import { View, Text } from "react-native";

import styles from "./styles";
import { Typography } from "@components/Forms";
import Colors from "@theme/Colors";
import { Row } from "@components/Layout";
import { MAIN_LAYOUT_HORIZONTAL_PADDING, width } from "@utils/Constants";
import { scale, scaleHeight } from "@utils/Helpers";

interface StepperProps {
	steps: number;
	currentStep: number;
}

export default function Stepper({ steps, currentStep }: StepperProps) {
	const gap = 10;
	const computeWidth = () => {
		const layoutWidth = width - 2 * scale(MAIN_LAYOUT_HORIZONTAL_PADDING);
		const totalPaddingWidth = (steps - 1) * (2 * gap);
		const totalStepsContainerWidth = steps * scaleHeight(40);

		return (
			(layoutWidth - totalPaddingWidth - totalStepsContainerWidth) / (steps - 1)
		);
	};
	return (
		<View style={styles.container}>
			{Array.from({ length: steps }).map((_, index) => {
				const stepNumber = index + 1;
				const isCompleted = stepNumber < currentStep;
				const isActive = stepNumber === currentStep;

				return (
					<Row
						key={index}
						alignItems='center'
						justifyContent='space-between'
						gap={gap}
					>
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

						{stepNumber !== steps && (
							<View
								style={[styles.stepperDivider, { width: computeWidth() }]}
							/>
						)}
					</Row>
				);
			})}
		</View>
	);
}
