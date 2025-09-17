import ScreenImages from "@assets/images/screens";
import { IconButton, TextInput, Typography } from "@components/Forms";
import { Row } from "@components/Layout";
import Colors from "@theme/Colors";
import styles from "./styles";
import { Image } from "react-native";

interface SearchContainerProps {
	searchText: string;
	setSearchText: (text: string) => void;
	onSearch: () => void;
	placeholder: string;
}

export default function SearchContainer({
	searchText,
	setSearchText,
	onSearch,
	placeholder,
}: SearchContainerProps) {
	return (
		<Row gap={8} alignItems='center' containerStyle={styles.searchContainer}>
			<TextInput
				label=''
				value={searchText}
				onChangeText={setSearchText}
				placeholder={placeholder}
				customTextInputStyle={styles.searchInput}
				customInputContainerStyle={styles.searchInputContainer}
				numberOfLines={1}
				rightNode={
					searchText ? (
						<IconButton
							onPress={() => setSearchText("")}
							containerStyle={styles.clearContainer}
						>
							<Typography title='x' type='body-sb' color={Colors.white} />
						</IconButton>
					) : null
				}
			/>
			<IconButton containerStyle={styles.searchButton} onPress={onSearch}>
				<Image
					source={ScreenImages.kidashiHome.searchIcon}
					style={styles.searchIcon}
				/>
				<Typography
					title='Search'
					type='body-sb'
					color={Colors.danger["700"]}
				/>
			</IconButton>
		</Row>
	);
}
