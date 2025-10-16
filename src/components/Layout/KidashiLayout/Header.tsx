import { ReactNode } from "react";
import { Image, Pressable, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";

import Row from "../Row";
import ComponentImages from "@assets/images/components";
import { Typography } from "@components/Forms";
import Colors from "@theme/Colors";
import styles from "./styles";
import Pad from "@components/Pad";

interface KidashiHeaderProps {
	leftNode?: ReactNode;
	rightNode?: ReactNode;
	rightAction?: () => void;
	headerFooter?: ReactNode;
	goToNotifications: () => void;
	notificationCount?: number;
}

export default function KidashiHeader({
	leftNode,
	rightNode,
	rightAction = () => {},
	headerFooter,
	goToNotifications,
	notificationCount = 0,
}: KidashiHeaderProps) {
	return (
		<LinearGradient
			colors={["#FFE099", "#FFFFFF"]} // same color top → bottom
			start={{ x: 0, y: 0 }}
			end={{ x: 0, y: 1 }}
			style={styles.headerContainer}
		>
			<Row alignItems='center' justifyContent='space-between'>
				{leftNode ? (
					leftNode
				) : (
					<Image
						source={ComponentImages.kidashiLayout.kidashiBlackLogo}
						style={styles.kidashiLogo}
					/>
				)}
				{rightNode ? (
					rightNode
				) : (
					<Row alignItems='center' gap={8}>
						<Pressable
							onPress={goToNotifications}
							style={styles.bellIconContainer}
						>
							<Image
								source={ComponentImages.kidashiLayout.bellIcon}
								style={styles.bellIcon}
							/>
							{notificationCount > 0 ? (
								<View style={styles.notificationBadge}>
									<Typography
										title={`${
											notificationCount > 99 ? "99+" : notificationCount
										}`}
										style={styles.notificationBadgeText}
									/>
								</View>
							) : null}
						</Pressable>
						<Pressable onPress={rightAction} style={styles.returnHomeContainer}>
							<Row alignItems='center' gap={7}>
								<Image
									source={ComponentImages.kidashiLayout.returnHomeIcon}
									style={styles.returnHomeIcon}
								/>
								<Typography
									title='Return Home'
									type='label-sb'
									color={Colors.danger["700"]}
								/>
							</Row>
						</Pressable>
					</Row>
				)}
			</Row>
			{headerFooter ? (
				<View>
					<Pad size={16} />
					{headerFooter}
				</View>
			) : null}
		</LinearGradient>
	);
}
