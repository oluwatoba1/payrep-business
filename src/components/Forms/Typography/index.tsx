import { ColorValue, Text, TextProps } from "react-native";
import styles from "./styles";
import Colors from "../../../theme/Colors";
import { PNB, PNR, PNSB } from "../../../theme/Fonts";

interface ISubTypographyProps {
	color: string;
	fontSize: number;
	lineHeight: number;
	fontFamily: string;
	letterSpacing?: number;
}

interface ITypographyProps extends TextProps {
	title: string;
	color?: string;
	type?:
		| "heading"
		| "subheading"
		| "text"
		| "subheading-sb"
		| "subheading-b"
		| "label-sb"
		| "label-r"
		| "body-r"
		| "body-sr"
		| "body-sb"
		| "heading-sb"
		| "heading3-b"
		| "heading4-b"
		| "heading4-sb"
		| "heading5-sb"
		| "body-b";
}

export default function Typography({
	title,
	color,
	type = "text",
	...props
}: ITypographyProps) {
	const typographyMap = (): ISubTypographyProps => {
		switch (type) {
			case "heading":
				return {
					color: color || Colors.gray[700],
					fontSize: 24,
					lineHeight: 24 * 1.3,
					fontFamily: PNSB,
				};
			case "heading-sb":
				return {
					color: color || Colors.gray[700],
					fontSize: 18,
					lineHeight: 23.4,
					fontFamily: PNSB,
					letterSpacing: -0.36,
				};
			case "heading3-b":
				return {
					color: color || Colors.gray[700],
					fontSize: 32,
					lineHeight: 40,
					fontFamily: PNB,
					letterSpacing: -0.64,
				};
			case "heading4-b":
				return {
					color: color || Colors.gray[700],
					fontSize: 24,
					lineHeight: 31.2,
					fontFamily: PNB,
					letterSpacing: -0.48,
				};
			case "heading4-sb":
				return {
					color: color || Colors.gray[700],
					fontSize: 24,
					lineHeight: 31.2,
					fontFamily: PNSB,
					letterSpacing: -0.48,
				};
			case "heading5-sb":
				return {
					color: color || Colors.gray[700],
					fontSize: 18,
					lineHeight: 23.4,
					fontFamily: PNSB,
					letterSpacing: -0.36,
				};
			case "subheading":
				return {
					color: color || Colors.gray[700],
					fontSize: 14,
					lineHeight: 14 * 1.5,
					fontFamily: PNR,
				};
			case "subheading-sb":
				return {
					color: color || Colors.gray[700],
					fontFamily: PNSB,
					fontSize: 16,
					lineHeight: 21,
				};
			case "subheading-b":
				return {
					color: color || Colors.gray[700],
					fontFamily: PNB,
					fontSize: 16,
					lineHeight: 21,
				};
			case "body-b":
				return {
					color: color || Colors.gray[700],
					fontFamily: PNB,
					fontSize: 14,
					lineHeight: 21,
				};
			case "body-sb":
				return {
					color: color || Colors.gray[700],
					fontFamily: PNSB,
					fontSize: 14,
					lineHeight: 20.8,
				};
			case "body-r":
				return {
					color: color || Colors.gray[700],
					fontFamily: PNR,
					fontSize: 14,
					lineHeight: 21,
				};
			case "body-sr":
				return {
					color: color || Colors.gray[700],
					fontFamily: PNR,
					fontSize: 14,
					lineHeight: 21,
				};
			case "label-sb":
				return {
					color: color || Colors.gray[700],
					fontFamily: PNSB,
					fontSize: 12,
					lineHeight: 18,
					letterSpacing: 0.12,
				};
			case "label-r":
				return {
					color: color || Colors.gray[700],
					fontFamily: PNR,
					fontSize: 12,
					lineHeight: 18,
					letterSpacing: 0.12,
				};
			case "text":
				return {
					color: color || Colors.gray[700],
					fontSize: 18,
					lineHeight: 18 * 1.3,
					fontFamily: PNSB,
				};

			default:
				return {
					color: color || Colors.gray[700],
					fontSize: 18,
					lineHeight: 18 * 1.3,
					fontFamily: PNSB,
				};
		}
	};

	return (
		<Text {...props} style={[styles.text({ ...typographyMap() }), props.style]}>
			{title}
		</Text>
	);
}
