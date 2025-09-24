import React, { useRef, useEffect } from "react";
import {
	Animated,
	Image,
	TouchableOpacity,
	View,
	ViewStyle,
	TextStyle,
	Pressable,
} from "react-native";
import Typography from "../Typography";
import IconImages from "../../../../assets/images/appIcons";
import { styles } from "./styles";
import { Row } from "@components/Layout";

interface CheckboxProps {
	label?: string;
	value: boolean;
	onPress: () => void;
	containerStyle?: ViewStyle;
	checkStyle?: ViewStyle;
}

export default function Checkbox({
	label,
	value,
	onPress,
	containerStyle = {},
	checkStyle = {},
}: CheckboxProps) {
	return (
		<Row
			alignItems='center'
			justifyContent='flex-start'
			gap={10}
			containerStyle={containerStyle}
		>
			<Pressable onPress={onPress} style={styles.checkbox}>
				{value ? <View style={[styles.check, checkStyle]} /> : <View />}
			</Pressable>
			{label ? <Typography title={label} type='body-r' /> : null}
		</Row>
	);
}
