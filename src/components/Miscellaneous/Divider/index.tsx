import { StyleProp, View, ViewStyle } from "react-native";
import { styles } from "./styles";
import Colors from "@theme/Colors";

interface DividerProps {
	style?: StyleProp<ViewStyle>;
	dividerColor?: string;
	gapTop?: number;
	gapBottom?: number;
	gapX?: number;
	gapY?: number;
}

export default function Divider({
	style,
	dividerColor,
	gapTop,
	gapBottom,
	gapX,
	gapY,
}: DividerProps) {
	return (
		<View
			style={[
				styles.separator,
				{
					backgroundColor: dividerColor || Colors.gray[100],
					marginTop: gapTop,
					marginBottom: gapBottom,
					marginHorizontal: gapX,
					marginVertical: gapY,
					...(style as Record<string, unknown>),
				},
			]}
		/>
	);
}
