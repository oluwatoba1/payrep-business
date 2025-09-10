import { useState } from "react";
import {
	Animated,
	Image,
	ImageBackground,
	ImageSourcePropType,
	PanResponder,
	View,
	ViewStyle,
} from "react-native";

import styles from "./styles";
import Pad from "@components/Pad";
import { width } from "@utils/Constants";
import { Button, IconButton, Typography } from "@components/Forms";
import ComponentImages from "@assets/images/components";
import { Row } from "@components/Layout";
import Colors from "@theme/Colors";

interface OnboardingItem {
	title: string;
	description: string;
	image: ImageSourcePropType;
}

interface OnboarderProps {
	onProceed: () => void;
	onCancel: () => void;
}

const THRESHOLD = 100;

const ONBOARDING_ITEMS: OnboardingItem[] = [
	{
		title: "Sell more, even when women don’t have cash.",
		description:
			"With Kidashi, women in your Trust Circle can buy items on credit. You get paid instantly into your account, while they pay back later.",
		image: ComponentImages.kidashiOnboarder.backgroundOne,
	},
	{
		title: "List items, set prices, and get paid.",
		description:
			"Enter item details in the app, and Kidashi automatically shows the woman how much she will repay with just 5% interest. No hidden charges.",
		image: ComponentImages.kidashiOnboarder.backgroundTwo,
	},
	{
		title: "You always get your money.",
		description:
			"Once a request is approved, money goes straight to your account. Hand over the items, and Kidashi handles repayment tracking.",
		image: ComponentImages.kidashiOnboarder.backgroundThree,
	},
	{
		title: "Join thousands of vendors empowering women every day.",
		description:
			"With Kidashi, you’re not just selling — you’re helping women grow their businesses, care for their families, and live better lives.",
		image: ComponentImages.kidashiOnboarder.backgroundFour,
	},
];

export default function Onboarder({ onProceed, onCancel }: OnboarderProps) {
	const [animatedValue] = useState(new Animated.Value(0));
	const [currentIndex, setCurrentIndex] = useState<number>(0);
	const [currentWidth, setCurrentWidth] = useState<number>(0);
	const panResponder = PanResponder.create({
		onStartShouldSetPanResponder: () => true,
		onPanResponderMove: (_, gestureState) => {
			const { dx } = gestureState;
			if ((dx >= 0 && currentIndex !== 0) || (dx <= 0 && currentIndex < 2))
				animatedValue.setValue(currentWidth + dx);
		},
		onPanResponderRelease: (_, gestureState) => {
			const { dx } = gestureState;
			if (dx < -THRESHOLD && currentIndex < 2) {
				Animated.timing(animatedValue, {
					toValue: currentWidth - width,
					duration: 300,
					useNativeDriver: false,
				}).start(() => {
					setCurrentIndex(currentIndex + 1);
					setCurrentWidth(currentWidth - width);
				});
			} else if (dx > THRESHOLD && currentIndex !== 0) {
				Animated.timing(animatedValue, {
					toValue: currentWidth + width,
					duration: 300,
					useNativeDriver: false,
				}).start(() => {
					setCurrentIndex(currentIndex - 1);
					setCurrentWidth(currentWidth + width);
				});
			} else {
				Animated.spring(animatedValue, {
					toValue: currentWidth,
					friction: 5,
					useNativeDriver: false,
				}).start();
			}
		},
	});

	const animatedStyles: ViewStyle = {
		flexDirection: "row",
		transform: [{ translateX: animatedValue }],
	};

	return (
		<View>
			<Animated.View style={animatedStyles} {...panResponder.panHandlers}>
				{ONBOARDING_ITEMS.map((item, index) => (
					<ImageBackground
						key={index}
						style={styles.onboardingContainer}
						source={item.image}
					>
						<Row alignItems='center' justifyContent='space-between'>
							<View style={styles.headerContainerLeft} />
							<View style={styles.headerContainerMiddle}>
								<Image
									source={ComponentImages.kidashiOnboarder.payrepMonochromeLogo}
									style={styles.headerContainerMiddleLogo}
								/>
							</View>
							<IconButton onPress={onCancel}>
								<Row alignItems='center' justifyContent='flex-start' gap={5}>
									<Image
										source={ComponentImages.kidashiOnboarder.cancelIcon}
										style={styles.cancelIcon}
									/>
									<Typography
										title='Cancel'
										type='label-r'
										color={Colors.neutral["200"]}
									/>
								</Row>
							</IconButton>
						</Row>
						<View style={styles.footerContainer}>
							<Image
								source={ComponentImages.kidashiOnboarder.kidashiLogo}
								style={styles.kidashiLogo}
							/>
							<Pad size={16} />
							<Typography
								title={item.title}
								type='heading-sb'
								style={styles.onboardingTitle}
							/>
							<Pad size={8} />
							<Typography
								title={item.description}
								type='label-sb'
								style={styles.onboardingDescription}
							/>
							<Pad size={16} />
							<View style={styles.dotContainer}>
								{[0, 1, 2, 3].map((item) => (
									<View
										key={item}
										style={
											item === currentIndex
												? styles.activeDot
												: styles.inactiveDot
										}
									/>
								))}
							</View>
							<Pad size={16} />
							{currentIndex === ONBOARDING_ITEMS.length - 1 ? (
								<Button
									title='Join Now'
									color={Colors.white}
									onPress={onProceed}
								/>
							) : null}
						</View>
					</ImageBackground>
				))}
			</Animated.View>
		</View>
	);
}
