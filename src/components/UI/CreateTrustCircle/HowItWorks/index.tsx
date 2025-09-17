import { View, Text, ScrollView, Pressable, Image } from "react-native";
import React from "react";
import { styles } from "./style";
import ScreenImages from "@assets/images/screens";
import { Button, Typography } from "@components/Forms";
import Colors from "@theme/Colors";
import { scale, scaleHeight } from "@utils/Helpers";
import Divider from "@components/Miscellaneous/Divider";

interface HowItWorksProps {
	onClose?: () => void;
}

const HowItWorks = ({ onClose }: HowItWorksProps) => {
	const howItWorksData = [
		{
			title: "Unlock access",
			description:
				"Being in a Trust Circle is required before requesting Asset Finance",
			icon: ScreenImages.kidashiCreateTrustCircles.lockIcon,
		},
		{
			title: "Form a group of 3–10 women",
			description:
				"A Trust Circle must have at least 3 women and can include up to 10 women.",
			icon: ScreenImages.kidashiCreateTrustCircles.peopleIcon,
		},
		{
			title: "Build accountability",
			description:
				"Members of a Trust Circle hold each other accountable for repayments.",
			icon: ScreenImages.kidashiCreateTrustCircles.buildIcon,
		},
	];

	return (
		<View style={styles.container}>
			{/* Header */}
			<View style={styles.header}>
				<Typography
					title="Here's how it works:"
					type='heading-sb'
					color={Colors.gray[400]}
					style={styles.headerTitle}
				/>
			</View>

			<Divider gapY={scaleHeight(16)} gapX={scale(-20)} />

			{/* Steps */}
			<View style={styles.stepsContainer}>
				{howItWorksData.map((step, index) => (
					<View key={index}>
						<View style={styles.stepItem}>
							{/* Icon Container */}
							<View style={styles.iconContainer}>
								<Image source={step.icon} style={styles.stepIcon} />
							</View>

							{/* Text Content */}
							<View style={styles.textContainer}>
								<Typography
									title={step.title}
									type='body-sb'
									color={Colors.gray[900]}
									style={styles.stepTitle}
								/>
								<Typography
									title={step.description}
									type='body-r'
									color={Colors.gray[400]}
									style={styles.stepDescription}
								/>
							</View>
						</View>

						{/* Separator */}
						{index < howItWorksData.length - 1 && (
							<Divider gapY={scaleHeight(16)} gapX={scale(-20)} />
						)}
					</View>
				))}
			</View>
		</View>
	);
};

export default HowItWorks;
