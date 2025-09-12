import { ReactNode } from "react";
import { Image, Pressable } from "react-native";
import LinearGradient from "react-native-linear-gradient";

import Row from "../Row";
import ComponentImages from "@assets/images/components";
import { Typography } from "@components/Forms";
import Colors from "@theme/Colors";

interface KidashiHeaderProps {
	leftNode?: ReactNode;
	rightNode?: ReactNode;
	rightAction?: () => void;
}

export default function KidashiHeader({
	leftNode,
	rightNode,
	rightAction = () => {},
}: KidashiHeaderProps) {
	return (
		<LinearGradient
			colors={["#FFF1D0", "#FFF1D0"]} // same color top → bottom
			start={{ x: 0, y: 0 }}
			end={{ x: 0, y: 1 }}
		>
			<Row>
				{leftNode ? (
					leftNode
				) : (
					<Image source={ComponentImages.kidashiLayout.kidashiBlackLogo} />
				)}
				{rightNode ? (
					rightNode
				) : (
					<Row alignItems='center' gap={8}>
						<Pressable>
							<Image source={ComponentImages.kidashiLayout.bellIcon} />
						</Pressable>
						<Pressable onPress={rightAction}>
							<Row alignItems='center' gap={7}>
								<Image source={ComponentImages.kidashiLayout.returnHomeIcon} />
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
		</LinearGradient>
	);
}
