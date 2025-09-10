import { Typography } from "@components/Forms";
import { Pressable, ScrollView } from "react-native";
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
				<Pressable
					key={index}
					style={[
						styles.tabItem,
						{ borderBottomWidth: value === item ? 1 : 0 },
					]}
				>
					<Typography
						title={item}
						type={value === item ? "body-sb" : "body-r"}
						color={value === item ? Colors.black : Colors.gray["400"]}
						onPress={() => onTap(item)}
					/>
				</Pressable>
			))}
		</ScrollView>
	);
}
