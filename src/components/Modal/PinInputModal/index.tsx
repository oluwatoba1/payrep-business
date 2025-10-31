import React, { useState, useEffect } from "react";
import { View, Image, ImageSourcePropType } from "react-native";
import { Button, PinPad, Typography } from "@components/Forms";
import { ModalWrapper } from "..";
import { styles } from "./styles";
import Pad from "@components/Pad";
import Colors from "@theme/Colors";

interface PinInputProps {
	title: string;
	description?: string;
	image?: ImageSourcePropType;
	showModal: boolean;
	onClose: () => void;
	onProceed: (pin: string) => Promise<boolean>;
	isLoadingPin?: boolean;
}

export default function PinInputModal({
	title,
	description,
	image,
	showModal,
	onClose,
	onProceed,
	isLoadingPin = false,
}: PinInputProps) {
	const [pin, setPin] = useState("");
	const [error, setError] = useState<string>("");
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		if (!showModal) {
			setPin("");
			setError("");
			setIsLoading(false);
		}
	}, [showModal]);

	const handleProceed = async () => {
		if (pin.length === 4 && !isLoading) {
			setIsLoading(true);
			try {
				const success = await onProceed(pin);
				if (!success) {
					setError("Invalid PIN. Please try again");
					setPin("");
				}
			} catch (error) {
				setError("An error occurred. Please try again");
				setPin("");
			} finally {
				setIsLoading(false);
			}
		} else {
			setError("PIN must be 4 digits");
		}
	};
	// Render PIN dots
	const renderPinDots = () => {
		const dots = [];
		for (let i = 0; i < 4; i++) {
			const isFilled = i < pin.length;
			dots.push(
				<View
					key={i}
					style={[styles.pinDot, isFilled ? styles.pinDotFilled : {}]}
				/>
			);
		}
		return <View style={styles.pinDotsContainer}>{dots}</View>;
	};

	return (
		<ModalWrapper
			isLoading={isLoading || isLoadingPin}
			visible={showModal}
			onClose={onClose}
			modalContentStyle={{ height: 600 }}
		>
			<View style={styles.container}>
				<View style={styles.header}>
					{image ? (
						<Image source={image} style={styles.image} />
					) : (
						<View style={styles.iconContainer}>
							<View style={styles.lockIcon}>
								<View style={styles.lockBody} />
								<View style={styles.lockShackle} />
							</View>
						</View>
					)}

					{/* Title */}
					<Typography title={title} type='body-sb' style={styles.title} />
					{description ? (
						<Typography
							title={description}
							type='body-r'
							style={{ textAlign: "center" }}
						/>
					) : (
						renderPinDots()
					)}
				</View>

				<View style={styles.pinPadContainer}>
					<PinPad
						codeLength={4}
						pin={pin}
						onInput={setPin}
						secure={true}
						pinScale={8}
						error=''
					/>
				</View>

				<Pad size={16} />
			</View>
			<Button title='Pay' onPress={handleProceed} />

			<Pad size={16} />

			<Button title='Cancel' onPress={onClose} color={Colors.neutral["50"]} />
		</ModalWrapper>
	);
}
