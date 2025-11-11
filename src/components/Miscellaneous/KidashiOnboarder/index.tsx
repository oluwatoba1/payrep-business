import { useRef, useState } from "react";
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
			"Enter item details in the app, and Kidashi automatically shows the woman how much she will repay. No hidden charges.",
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
	const fadeAnim = useRef(new Animated.Value(1)).current;
	const buttonFade = useRef(new Animated.Value(1)).current;
	const [currentIndex, setCurrentIndex] = useState<number>(0);
	const [currentWidth, setCurrentWidth] = useState<number>(0);

	const triggerButtonTransition = () => {
		Animated.sequence([
			Animated.timing(buttonFade, { toValue: 1, duration: 250, useNativeDriver: true }),
			Animated.timing(buttonFade, { toValue: 1.5, duration: 250, useNativeDriver: true }),
		]).start();
	};

	const animateToIndex = (index: number) => {
		Animated.timing(animatedValue, {
			toValue: -index * width,
			duration: 400,
			useNativeDriver: false
		}).start();

		Animated.sequence([
			Animated.timing(fadeAnim, { toValue: 0, duration: 150, useNativeDriver: true }),
			Animated.timing(fadeAnim, { toValue: 1, duration: 150, useNativeDriver: true }),
		]).start();
		triggerButtonTransition();
		setCurrentIndex(index)
	}

	const goToNext = () => {
		if (currentIndex < ONBOARDING_ITEMS.length - 1) animateToIndex(currentIndex + 1)
	}

	const goToPrev = () => {
		if (currentIndex > 0) animateToIndex(currentIndex - 1)
	}

	const panResponder = PanResponder.create({
		onStartShouldSetPanResponder: () => true,
		onPanResponderMove: (_, { dx }) => {
			const offset = -currentIndex * width + dx;
			animatedValue.setValue(offset);
		},
		onPanResponderRelease: (_, { dx }) => {
			if (dx < -THRESHOLD && currentIndex < ONBOARDING_ITEMS.length - 1) goToNext();
			else if (dx > THRESHOLD && currentIndex > 0) goToPrev();
			else animateToIndex(currentIndex)
		},
	});

	const animatedBackgroundStyles: ViewStyle = {
		flexDirection: "row",
		width: width * ONBOARDING_ITEMS.length,
		transform: [{ translateX: animatedValue }],
	};

	const currentItem = ONBOARDING_ITEMS[currentIndex];

	return (
		<View style={styles.rootContainer}>
			<Row
				alignItems='center'
				justifyContent='space-between'
				containerStyle={styles.headerContainer}
			>
				<View style={styles.headerContainerLeft} />
				<View style={styles.headerContainerMiddle}>
					<Image
						source={ComponentImages.kidashiOnboarder.payrepMonochromeLogo}
						style={styles.headerContainerMiddleLogo}
					/>
				</View>
				<IconButton containerStyle={styles.cancelContainer} onPress={onCancel}>
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
			<Animated.View style={[animatedBackgroundStyles]} {...panResponder.panHandlers}>
				{ONBOARDING_ITEMS.map((item, index) => (
					<ImageBackground
						key={index}
						style={[styles.onboardingContainer, { width }]}
						source={item.image}
					>
						<View style={styles.overlay} />
					</ImageBackground>
				))}
			</Animated.View>
			<Animated.View style={[styles.textContainer, { opacity: fadeAnim }]}>
				<Image source={ComponentImages.kidashiOnboarder.kidashiLogo} style={styles.kidashiLogo} />
				<Pad size={16} />
				<Typography title={currentItem.title} type="heading-sb" style={styles.onboardingTitle} />
				<Pad size={8} />
				<Typography title={currentItem.description} type="label-sb" style={styles.onboardingDescription} />
			</Animated.View>

			<View style={styles.footerContainer}>

				<View style={styles.dotContainer}>
					{ONBOARDING_ITEMS.map((_, item) => (
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
				<Animated.View style={{ opacity: buttonFade }}>
					{currentIndex === 0 ? (
						<Button
							title="Next"
							color={Colors.white}
							onPress={goToNext}
							containerStyle={styles.fullButton}
						/>
					) : currentIndex === ONBOARDING_ITEMS.length - 1 ? (
						<Button
							title="Join Now"
							color={Colors.white}
							onPress={onProceed}
							containerStyle={styles.fullButton}
						/>
					) : (
						<Row
							alignItems="center"
							justifyContent="space-between"
							containerStyle={styles.navButtonsContainer}
						>
							<Button
								title="Previous"
								color="transparent"
								onPress={goToPrev}
								containerStyle={styles.outlinedButton}
								textStyle={{ color: Colors.white }}
							/>
							<Button
								title="Next"
								color={Colors.white}
								onPress={goToNext}
								containerStyle={styles.navButton}
							/>
						</Row>
					)}
				</Animated.View>

			</View>
		</View>

	);
}
