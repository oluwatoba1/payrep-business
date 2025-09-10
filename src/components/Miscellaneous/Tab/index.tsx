import { Typography } from "@components/Forms";
import { ScrollView } from "react-native";
import styles from "./styles";
import Colors from "@theme/Colors";

interface TabProps {
	items: string[];
	onTap: (item: string) => void;
	value: string;
}

export default function Tab({ items, onTap, value }: TabProps) {
	return (
		<ScrollView
			horizontal
			showsHorizontalScrollIndicator={false}
			contentContainerStyle={styles.tabContainer}
		>
			{items.map((item, index) => (
				<Typography
					key={index}
					title={item}
					type={value === item ? "label-sb" : "label-r"}
					style={[
						styles.tabText,
						{ textDecorationLine: value === item ? "underline" : "none" },
					]}
					color={value === item ? Colors.black : Colors.gray["1000"]}
					onPress={() => onTap(item)}
				/>
			))}
		</ScrollView>
	);
}
